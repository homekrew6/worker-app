import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Container, Button, Header, Title, Body, Content, Footer, FooterTab } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FSpinner from 'react-native-loading-spinner-overlay';
import styles from './styles'; 
import api from '../../api';
import I18n from '../../i18n/i18n';

class commissionList extends Component {
    constructor() {
        super();
        this.state = { 
            visible: false,
            conList: ''
        };
    }

    componentDidMount() {
        api.post('Workers/getCommissionList', { 
            id: this.props.navigation.state.params.workerId,
            commission: this.props.navigation.state.params.commission
        }).then((resConList) => {
            this.setState({ conList: resConList.response.message });
        });
    }
    render() {
        return (
            <Container >
                <FSpinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <Header style={styles.appHdr2} androidStatusBarColor="#81cdc7" noShadow>
                    <Button transparent onPress={() => this.props.navigation.goBack()} style={{ width: 30 }}>
                        <Ionicons name="ios-arrow-back" style={{ fontSize: 26, color: '#fff' }} />
                    </Button>
                    <Body style={{ alignItems: 'center' }}>
                        <Title>{I18n.t('commission_list')}</Title>
                    </Body>
                    <Button transparent style={{ width: 30, backgroundColor: 'transparent' }} disabled />
                </Header>

                <Content style={styles.bgWhite} >
                    <View>
                        <View><Text>Service name</Text></View>
                    </View>
                </Content>

            </Container>
        );
    }
}

export default commissionList;
