import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { Camera, Permissions} from 'expo';

export default class TakePicture extends React.Component {
    state = {
        hasCameraPermission: null,
        isCapturing: false,
        accessCameraLabel: 'Start',
        capturedPhoto: null
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

    }

    async accessCamera()
    {
        if (this.state.isCapturing)
        {
            let photo = await this.camera.takePictureAsync();
            this.setState({ isCapturing: false, accessCameraLabel: 'Retake', capturedPhoto: photo.uri});
        }
        else
        {
            this.setState({ isCapturing: true, accessCameraLabel: 'Capture', capturedPhoto: null});
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: '#fff'}}>
                    <View style={styles.photoGroup}>
                        { !this.state.isCapturing?
                            <View style={{ height: "100%", width: "100%" , justifyContent: 'center'}}>
                                { !this.state.capturedPhoto?
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={styles.headerText}>Take picture</Text>
                                    </View>
                                    :
                                    <Image style={{ height: "100%", width: "100%" }} source={{uri: this.state.capturedPhoto}}/>
                                }
                            </View>
                            :
                            <View style={{ height: "100%", width: "100%"  }}>
                                <Camera style={{ height: "100%", width: "100%" }} ref={ref => { this.camera = ref}} type={Camera.Constants.Type.back}/>
                            </View>
                        }
                    </View>
                    <TouchableOpacity style={styles.CameraButton} onPress={()=>this.accessCamera()}>
                        <Text>{this.state.accessCameraLabel}</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    CameraButton: {height: 40, width: '100%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'},
    photoGroup: { height: 400, justifyContent: 'space-around', alignItems: 'center', width: "100%", alignSelf: 'center', borderWidth: 1},
});
