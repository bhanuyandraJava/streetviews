import React from 'react';
import { ImageEditor, Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

export default class PictureUpload extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Upload image from camera roll"
                    onPress={this._pickImage}
                />
                {image &&
                <Image source={{ uri: image }} style={{ width: 400, height: 400}} />}
            </View>
        );
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            quality: 1
        });

        if (result.cancelled) {
            console.log('got here');
            return;
        }

        let resizedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(result.uri,
                {
                    offset: { x: 0, y: 0 },
                    size: { width: result.width, height: result.height },
                    displaySize: { width: 50, height: 50 },
                    resizeMode: 'contain',
                },
                (uri) => resolve(uri),
                () => reject(),
            );
        });

        // this gives you a rct-image-store URI or a base64 image tag that
        // you can use from ImageStore

        this.setState({ image: resizedUri });
    };
}
