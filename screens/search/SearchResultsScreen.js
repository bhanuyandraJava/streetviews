import React, { Component }  from "react";
import {Body, Container, Content, Header, Text, Icon, Left, Button} from "native-base";
import StreetImage from '../../components/StreetImage';
import {View} from 'react-native';

class SearchResultsScreen extends Component
{
    constructor(props) {
        super(props);
    }

    render()
    {
        return <Container>
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name="home" />
                    </Button>
                </Left>
                <Body><Text>Street views</Text></Body></Header>
            <Content contentContainerStyle={{flex: 1}}>
                <Container>
                    <Content>
                        <View>
                            <StreetImage uri='https://i.rcahms.gov.uk/canmore/d/SC00634677.jpg' viewName='Gorbals'
                                         viewSubName='Building' likes='10 Likes'/>
                            <StreetImage uri='https://i.rcahms.gov.uk/canmore/d/SC00972834.jpg' viewName='Gorbals'
                                         viewSubName='ArialView' likes='12 Likes'/>
                            <StreetImage uri='https://i.rcahms.gov.uk/canmore/d/SC00634680.jpg' viewName='Gorbals'
                                         viewSubName='Building' likes='8 Likes'/>
                        </View>
                    </Content>

                </Container>

            </Content>
        </Container>
    }
}
export default SearchResultsScreen;