import React, {Component} from "react";
import {Body, Button, Container, Content, Header, Icon, Left, Text, Footer, FooterTab} from "native-base";
import {ImageBackground, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import LocationOnMap from "../../components/LocationOnMap";

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
});

class ContributeLocationScreen extends Component {
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
                            <LocationOnMap/>
                        </Content>
                        <Footer style={{height:85}}>
                            <FooterTab  style={{backgroundColor: 'transparent'}}>
                                <Button onPress={() => this.props.navigation.navigate('uploadOptions')}>
                                    <Image
                                        style={styles.button}
                                        source={require('../../assets/images/Icons/Add.png')}
                                    />
                                </Button>
                                <Button>
                                    <Text
                                        style={{color: "white", fontWeight: "bold", fontSize: 15, textAlign: 'center'}}>Press
                                        the button to tell your story</Text>
                                </Button>
                            </FooterTab>

                        </Footer>
                    </ImageBackground>

                </Container>
            </Content>
        </Container>
    }
}

export default ContributeLocationScreen;