import React, { Component } from "react";
import { Text } from 'react-native';
import { Container, Content, Form, Item, Input } from "native-base";

import I18n from '../../i18n/i18n';

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
