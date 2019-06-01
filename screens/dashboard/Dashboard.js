import {Body, Container, Content, Header, Text} from 'native-base';
import {Alert, Image, StyleSheet, TouchableOpacity, View, Dimensions, ImageBackground} from 'react-native';
import React, {Component} from "react";

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green'
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'red'
    },
    backgroundImage: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 80,
        width: 80
    }

})


class Dashboard extends Component {
    handleOnPress = () => {
        console.log('puff')
        Alert.alert('Inside method')
    }

    constructor(props) {
        super(props);
        this.handleOnPress = this.handleOnPress.bind(this);
    }

    render() {

        return <Container>
            <Header><Body><Text style={styles.headerText}>Lost voices</Text></Body></Header>
            <Content contentContainerStyle={{flex: 1}}>

                <Container>
                    <ImageBackground source={require('../../assets/images/Icons/LostVoicesBACKGROUND.png')}
                                     resizeMode='cover'
                                     style={[{
                                         width: '100%',
                                         height: '100%',
                                         flex: 1
                                     }]}>
                        <Content>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                marginTop: 10
                            }}>
                                <View style={{
                                    width: 360,
                                    height: 100,
                                    justifyContent: 'center'
                                }}><Text style={styles.titleText}> LOST </Text>
                                    <Text style={styles.titleText}> VOICES </Text></View>

                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                marginTop: 20,
                                marginLeft: 30
                            }}>
                                <View style={{
                                    width: 170, height: 100, justifyContent: 'center'
                                }}><Image
                                    style={styles.button}
                                    source={require('../../assets/images/Icons/Info.png')}
                                /></View>
                                <View
                                    style={{
                                        width: 170, height: 100, justifyContent: 'center'
                                    }}>
                                    <TouchableOpacity style={styles.touchable}
                                                      onPress={() => this.props.navigation.navigate('contribute')}>
                                        <Image
                                            style={styles.button}
                                            source={require('../../assets/images/Icons/Contribute.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                marginTop: 20,
                                marginLeft: 30
                            }}>
                                <View style={{
                                    width: 170,
                                    height: 100,
                                    justifyContent: 'center'
                                }}>
                                    <View style={styles.view}>
                                        <TouchableOpacity style={styles.touchable}
                                                          onPress={() => this.props.navigation.navigate('search')}>

                                            <Image
                                                style={styles.button}
                                                source={require('../../assets/images/Icons/Investigate.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: 170, height: 100, justifyContent: 'center'
                                    }}>
                                    <TouchableOpacity style={styles.touchable}
                                                      onPress={() => this.props.navigation.navigate('contribute')}>
                                        <Image
                                            style={styles.button}
                                            source={require('../../assets/images/Icons/ProfilePrefs.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Content>
                    </ImageBackground>
                </Container>

            </Content>
        </Container>
    }
}

export default Dashboard;