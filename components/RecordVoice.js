import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Slider, Alert } from 'react-native';
import { Constants, Audio, Permissions } from 'expo';

export default class RecordVoice extends Component {

    constructor(props) {
        super(props)
        this.recording = null;
        this.sound = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.state = {
            haveRecordingPermissions: false,
            isLoading: false,
            isPlaybackAllowed: false,
            muted: false,
            soundPosition: null,
            soundDuration: null,
            recordingDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isRecording: false,
            fontLoaded: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.recordingContainer}>
                    <TouchableOpacity
                        onPress={this._onRecordPressed}>
                        <Text style={styles.paragraph}>RECORD</Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.paragraph}>
                        {this.state.isRecording ? 'LIVE' : ''}
                    </Text>
                    <Text
                        style={styles.paragraph}>
                        {this._getRecordingTimestamp()}
                    </Text>
                </View>
                <View style={styles.playbackContainer}>
                    <Slider
                        style={styles.playbackSlider}
                        value={this._getSeekSliderPosition()}
                        onValueChange={this._onSeekSliderValueChange}
                        onSlidingComplete={this._onSeekSliderSlidingComplete}
                        disabled={
                            !this.state.isPlaybackAllowed || this.state.isLoading
                        }
                    />
                    <Text
                        style={styles.paragraph}>
                        {this._getPlaybackTimestamp()}
                    </Text>
                </View>
                <View style={styles.playStopContainer}>
                    <TouchableOpacity
                        onPress={this._onPlayPausePressed}
                        disabled={
                            !this.state.isPlaybackAllowed || this.state.isLoading
                        }>
                        <Text style={styles.paragraph}>PLAY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._onPlayPausePressed}
                        disabled={
                            !this.state.isPlaybackAllowed || this.state.isLoading
                        }>
                        <Text style={styles.paragraph}>{this.state.isPlaying ? 'PAUSE' : 'PLAY'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._onStopPressed}
                        disabled={
                            !this.state.isPlaybackAllowed || this.state.isLoading
                        }>
                        <Text style={styles.paragraph}>STOP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.volumeContainer}>
                    <TouchableOpacity
                        style={styles.wrapper}
                        onPress={this._onMutePressed}
                        disabled={
                            !this.state.isPlaybackAllowed || this.state.isLoading
                        }>
                        <Text style={styles.paragraph}>{ this.state.muted ? 'UNMUTE' : 'MUTE'}</Text>
                    </TouchableOpacity>
                    <Slider
                        style={styles.volumeSlider}
                        value={1}
                        onValueChange={this._onVolumeSliderValueChange}
                        disabled={
                            !this.state.isPlaybackAllowed || this.state.isLoading
                        }
                    />
                </View>
            </View>
        );
    }
    componentDidMount() {
        console.log("WORKING...")

        Audio.setIsEnabledAsync(true);
        Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentLockedModeIOS: false,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
            playsInSilentModeIOS: false
        });
        this._askForAudioPermission();
    }

    _askForAudioPermission = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({
            haveRecordingPermissions: response.status === 'granted',
        });
        console.log("PERMISSION:", JSON.stringify(this.state.haveRecordingPermissions));
    };

    _onRecordPressed = () => {
        console.log("RECORD PRESSED");
        if (this.state.isRecording) {
            console.log("IS RECORDING STATE", this.state.isRecording);
            this._stopRecordingAndEnablePlayback();
        } else {
            console.log("IS RECORDING STATE", this.state.isRecording);
            this._stopPlaybackAndBeginRecording();
        }
    };

    async _stopPlaybackAndBeginRecording() {
        console.log("STOPPED PLAYBACK AND STARTING TO RECORD...");
        this.setState({
            isLoading: true,
        });
        if (this.sound !== null) {
            await this.sound.unloadAsync();
            //this.sound.setCallback(null);
            this.sound = null;
        }
        if (this.recording !== null) {
            //this.recording.setCallback(null);
            this.recording = null;
        }

        const recording = new Audio.Recording();
        console.log("RECORDING", recording);
        await recording.prepareToRecordAsync();
        //recording.setCallback(this._updateScreenForRecordingStatus);

        this.recording = recording;
        await this.recording.startAsync(); // Will call callback to update the screen.
        this.setState({
            isLoading: false,
        });
    }

    _updateScreenForRecordingStatus = (status) => {
        console.log("UPDATING SCREEN FOR RECORDING STATUS", status);
        if (status.canRecord) {
            this.setState({
                isRecording: status.isRecording,
                recordingDuration: status.durationMillis,
            });
        } else if (status.isDoneRecording) {
            this.setState({
                isRecording: false,
                recordingDuration: status.durationMillis,
            });
        }
    };

    _updateScreenForSoundStatus = (status) => {
        console.log("UPDATING SCREEN FOR SOUND STATUS", status);
        if (status.isLoaded) {
            this.setState({
                soundDuration: status.durationMillis,
                soundPosition: status.positionMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                shouldCorrectPitch: status.shouldCorrectPitch,
                isPlaybackAllowed: true,
            });
        } else {
            this.setState({
                soundDuration: null,
                soundPosition: null,
                isPlaybackAllowed: false,
            });
            if (status.error) {
                Alert(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    async _stopRecordingAndEnablePlayback() {
        console.log("STOPPED RECORDING AND ENABLING PLAYBACK");
        this.setState({
            isLoading: true,
        });
        await this.recording.stopAndUnloadAsync();
        const { sound, status } = await this.recording.createNewLoadedSound(
            {
                isLooping: true,
                isMuted: this.state.muted,
                volume: this.state.volume,
                rate: this.state.rate,
                shouldCorrectPitch: this.state.shouldCorrectPitch,
            },
            this._updateScreenForSoundStatus
        );
        console.log("SOUND AND STATUS", sound, status);
        this.sound = sound;
        this.setState({
            isLoading: false,
        });
    }

    onPlayPausePressed = () => {
        if (this.sound != null) {
            if (this.state.isPlaying) {
                this.sound.pauseAsync();
                console.log("PAUSED");
            } else {
                this.sound.playAsync();
                console.log("PAUSE..PLAYED");
            }
        }
    };

    _onStopPressed = () => {
        if (this.sound != null) {
            this.sound.stopAsync();
        }
    };

    _onMutePressed = () => {
        if (this.sound != null) {
            this.sound.setIsMutedAsync(!this.state.muted);
            console.log("MUTED");
        }
    };

    _onVolumeSliderValueChange = (value) => {
        if (this.sound != null) {
            this.sound.setVolumeAsync(value);
        }
    };

    _trySetRate = async (rate, shouldCorrectPitch) => {
        if (this.sound != null) {
            try {
                await this.sound.setRateAsync(rate, shouldCorrectPitch);
            } catch (error) {
                // Rate changing could not be performed, possibly because the client's Android API is too old.
            }
        }
    };

    _onRateSliderSlidingComplete = async (value) => {
        this._trySetRate(value * 3.0, this.state.shouldCorrectPitch);
    };

    _onSeekSliderValueChange = (value) => {
        console.log("SEEK SLIDER VALUE", value);
        if (this.sound != null && !this.isSeeking) {
            this.isSeeking = true;
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
            this.sound.pauseAsync();
        }
    };

    _onSeekSliderSlidingComplete = async (value) => {
        if (this.sound != null) {
            this.isSeeking = false;
            const seekPosition = value * this.state.soundDuration;
            if (this.shouldPlayAtEndOfSeek) {
                this.sound.playFromPositionAsync(seekPosition);
            } else {
                this.sound.setPositionAsync(seekPosition);
            }
        }
    };

    _getSeekSliderPosition() {
        if (
            this.sound != null &&
            this.state.soundPosition != null &&
            this.state.soundDuration != null
        ) {
            return this.state.soundPosition / this.state.soundDuration;
        }
        return 0;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getPlaybackTimestamp() {
        if (
            this.sound != null &&
            this.state.soundPosition != null &&
            this.state.soundDuration != null
        ) {
            return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
        }
        return '';
    }

    _getRecordingTimestamp() {
        if (this.state.recordingDuration != null) {
            return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
        }
        return `${this._getMMSSFromMillis(0)}`;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    playStopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    playbackContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    playbackSlider: {
        alignSelf: 'stretch',
    },
    volumeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 150,
        maxWidth: 150,
    },
    volumeSlider: {
        width: 250,
    },
});
