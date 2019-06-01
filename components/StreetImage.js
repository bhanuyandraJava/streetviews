import React, {Component} from 'react';
import {Image} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right
} from 'native-base';

export default class StreetImage extends Component {

    render(props) {
        return (
            <Card>
                <CardItem style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0
                }}>
                    <Left>
                        {/*<Thumbnail source={{uri: 'Image URL'}} />*/}
                        <Body>
                        <Text>{this.props.viewName}</Text>
                        <Text note>{this.props.viewSubName}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: this.props.uri}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up"/>
                            <Text>{this.props.likes}</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Button transparent>
                        <Icon active name="chatbubbles"/>
                        <Text>4 Comments</Text>
                    </Button>
                    </Body>
                    <Right>
                        <Text>contribute</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}