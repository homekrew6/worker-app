import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class MyLocation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Content>

                    <Header style={styles.appHdr2}>
                        <Button transparent >
                            <Icon name="chevron-left" style={{ fontSize: 20, color: "#71beb8" }} />
                        </Button>
                        <Body style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#1e3768' }}>My Location</Text>
                        </Body>
                        <Button transparent >
                            <Ico name='edit' style={{ color: '#1e3768', fontSize: 18,  fontWeight: 'nornal' }} />
                            <Text style={{ color: '#1e3768', fontWeight: 'nornal' }}>Edit</Text>
                        </Button>
                    </Header>

                    <Card>hi</Card>
                    
                </Content>
            </Container>
        );
    }
}

export default MyLocation;
