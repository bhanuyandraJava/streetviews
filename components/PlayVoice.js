import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants, Audio, Permissions } from 'expo';

// https://github.com/expo/expo/issues/1141

const source = {
    uri: require("../assets/videos/GlasgowGorbalsDemolition08-05-2016.mp3")
};

export default class PlayVoice extends Component {
    state = {
        playingStatus: "nosound",
    };

    playSound = async () => {
        await Audio.setIsEnabledAsync(true);
        const sound = new Audio.Sound();
        await sound.loadAsync(require('../assets/videos/GlasgowGorbalsDemolition08-05-2016.mp3'));
        await sound.playAsync();
    }

    async _playRecording() {
        const { sound } = await Audio.Sound.createAsync(
            source,
            {
                shouldPlay: true,
                isLooping: true,
            },
            this._updateScreenForSoundStatus,
        );
        this.sound = sound;
        this.setState({
            playingStatus: 'playing'
        });
    }

    _updateScreenForSoundStatus = (status) => {
        if (status.isPlaying && this.state.playingStatus !== "playing") {
            this.setState({ playingStatus: "playing" });
        } else if (!status.isPlaying && this.state.playingStatus === "playing") {
            this.setState({ playingStatus: "donepause" });
        }
    };

    async _pauseAndPlayRecording() {
        if (this.sound != null) {
            if (this.state.playingStatus == 'playing') {
                console.log('pausing...');
                await this.sound.pauseAsync();
                console.log('paused!');
                this.setState({
                    playingStatus: 'donepause',
                });
            } else {
                console.log('playing...');
                await this.sound.playAsync();
                console.log('playing!');
                this.setState({
                    playingStatus: 'playing',
                });
            }
        }
    }

    _syncPauseAndPlayRecording() {
        //if (this.sound != null) {
            if (this.state.playingStatus == 'playing') {
                this.sound.pauseAsync();
            } else {
                this.sound.playSound();
            }
       // }
    }


    _playAndPause = () => {
        switch (this.state.playingStatus) {
            case 'nosound':
                this._playRecording();
                break;
            case 'donepause':
            case 'playing':
                this._pauseAndPlayRecording();
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this._syncPauseAndPlayRecording}>
                    <Text style={styles.buttonText}>
                        {this.state.playingStatus}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        paddingTop: Constants.statusBarHeight,
    },
    button: {
        width: 256,
        height: 256/1.618,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});
