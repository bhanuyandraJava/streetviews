import React, {Component} from "react";
import {Body, Button, Container, Content, Header, Icon, Left, Text} from "native-base";
import {StyleSheet} from 'react-native';
import LocationOnMap from "../../components/LocationOnMap";
import RecordVoice from "../../components/RecordVoice";

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green'
    }
});
class ContributeScreen extends Component {
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
                <Body><Text style={styles.headerText} >Lost voices</Text></Body></Header>
            <Content contentContainerStyle={{flex: 1}}>
                <Container>
                    <Content>
                        <LocationOnMap/>
                        <RecordVoice/>
                    </Content>
                </Container>
            </Content>
        </Container>
    }
}

export default ContributeScreen;