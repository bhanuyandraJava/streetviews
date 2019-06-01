import React, {Component} from "react";
import {Body, Button, Container, Content, Header, Icon, Left, Text} from "native-base";
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    titleText : {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
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
                <Body><Text style={styles.titleText} >Lost voices</Text></Body></Header>
            <Content contentContainerStyle={{flex: 1}}>
                <Container>
                    <Content>
                    </Content>
                </Container>
            </Content>
        </Container>
    }
}

export default ContributeScreen;