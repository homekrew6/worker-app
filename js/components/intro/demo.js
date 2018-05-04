import React, { Component } from "react";
import { Image, View, StatusBar, Dimensions, Text } from "react-native";

import { Container, Header, Content, Form, Item, Input, Label } from "native-base";
import ImageSlider from 'react-native-image-slider';
import I18n from '../../i18n/i18n';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Demo extends Component {
	constructor(props) {
        super(props);
    }


	render() {
		return (
			<Container >
				<Content>
					<Text>{I18n.t('greeting')}</Text>
					<Form>
            <Item inlineLabel>
              <Label>{I18n.t('username')}</Label>
              <Input />
            </Item>
            <Item inlineLabel last>
              <Label>{I18n.t('password')}</Label>
              <Input />
            </Item>
          </Form>
				</Content>
			</Container>
		);
	}
}

export default Demo;
