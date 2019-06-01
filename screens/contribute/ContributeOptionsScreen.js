import React, {Component} from "react";
import {Body, Button, Container, Content, Header, Icon, Left, Text, Footer, FooterTab} from "native-base";
import {ImageBackground, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import LocationOnMap from "../../components/LocationOnMap";
import RecordVoice from "../../components/RecordVoice";

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green'
    }, backgroundImage: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    viewCol2: {
        width: 50, height: 30, justifyContent: 'center'
    },
    button: {
        height: 70,
        width: 80,
        justifyContent: 'center'
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class ContributeOptionsScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container>
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name="home"/>
                    </Button>
                </Left>
                <Body><Text style={styles.headerText}>Lost voices</Text></Body></Header>
            <Content contentContainerStyle={{flex: 1}}>
                <Container>
                    <ImageBackground source={require('../../assets/images/Icons/LostVoicesBACKGROUND.png')}
                                     resizeMode='cover'
                                     style={styles.backgroundImage}>
                        <Content>
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    marginTop: 20,
                                    textAlign: 'center'
                                }}>
                                The story of your community shouldn't be forgotten. Add your story and pictures to the
                                soundmap and
                                help remember the history of your area. </Text>
                            <View style={{flex: 1, flexDirection: "column", marginTop: 40}}>
                                <View style={{flexDirection: "row"}}>
                                    <View>
                                        <TouchableOpacity style={styles.touchable}
                                                          onPress={() => this.props.navigation.navigate('contributeVoice')}>
                                            <Image
                                                style={styles.button}
                                                source={require('../../assets/images/Icons/Microphone.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            marginLeft: 10,
                                            textAlign: 'center'
                                        }}>{'\n'}Press the button and tell your story.</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: "row", marginTop: 30}}>
                                    <View>
                                        <TouchableOpacity style={styles.touchable}
                                                          onPress={() => this.props.navigation.navigate('contribute')}>
                                            <Image
                                                style={styles.button}
                                                source={require('../../assets/images/Icons/Camera.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            marginLeft: 10,
                                            textAlign: 'center'
                                        }}>{'\n'}Press the button to take your story.</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: "row", marginTop: 30}}>
                                    <View>
                                        <TouchableOpacity style={styles.touchable}
                                                          onPress={() => this.props.navigation.navigate('contributePicture')}>
                                            <Image
                                                style={styles.button}
                                                source={require('../../assets/images/Icons/Upload.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            marginLeft: 10,
                                            textAlign: 'center'
                                        }}>{'\n'}Press the button and upload an {'\n'}old picture.</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: "row", marginTop: 30}}>
                                    <View>
                                        <TouchableOpacity style={styles.touchable}
                                                          onPress={() => this.props.navigation.navigate('contribute')}>
                                            <Image
                                                style={styles.button}
                                                source={require('../../assets/images/Icons/Link.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            marginLeft: 10,
                                            textAlign: 'center'
                                        }}>{'\n'}Press the button to link your story {'\n'}to your picture.</Text>
                                    </View>
                                </View>
                            </View>
                        </Content>

                    </ImageBackground>

                </Container>
            </Content>
        </Container>
    }
}

export default ContributeOptionsScreen;