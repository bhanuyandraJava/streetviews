import React, {Component} from "react";
import {Body, Button, Container, Content, Header, Icon, Left, Text, Footer, FooterTab} from "native-base";
import {ImageBackground, StyleSheet, Image } from 'react-native';
import LocationOnMap from "../../components/LocationOnMap";
import PlayVoice from "../../components/PlayVoice";

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

class SearchVoiceResultsScreen extends Component {
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
                       <PlayVoice/>
                    </ImageBackground>

                </Container>
            </Content>
        </Container>
    }
}

export default SearchVoiceResultsScreen;