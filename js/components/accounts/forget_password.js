import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './elements/authActions';
import { Image, View, StatusBar, Alert, TouchableOpacity, ImageBackground, Text } from "react-native";
import api from '../../api';
import FSpinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Button, Content, Left, Body, Title, Item, Icon, Input } from "native-base";

import I18n from '../../i18n/i18n';
import styles from "./styles";

const lockImage = require("../../../img/lock.png");
const buttonImage = require("../../../img/bg-button.png");
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            visible: false
        }
    }

    pressSend() {
        if (!this.state.email.trimLeft()) {
            Alert.alert(I18n.t('enter_email'));
            return false;
        }
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regEmail.test(this.state.email)) {
            Alert.alert(I18n.t('please_enter_valid_email'));
            return false;
        }
        this.setState({ visible: true });
        api.post('Workers/emailChecking',{email:this.state.email}).then(res => {
            api.post('Workers/reset',{email:this.state.email}).then(resReset => {
                this.setState({ visible: false });
                this.props.navigation.navigate('ResetPassword');
            }).catch((errReset) => {
                this.setState({ visible: false });
                Alert.alert(I18n.t('please_try_again'));
            })
        }).catch((err) => {
            this.setState({ visible: false });
            Alert.alert(I18n.t('email_does_not_exist'));
        })


    }


    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <StatusBar backgroundColor="#81cdc7" />
                <Content>
                    <FSpinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    <Header style={{ backgroundColor: '#fff' }} androidStatusBarColor="#81cdc7">
                        <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} activeOpacity={0.5} style={{ width: 40, justifyContent: 'center' }}>
                            <Icon style={{ color: '#81cdc7' }} name='arrow-back' />
                        </TouchableOpacity>
                        <Body style={{ alignItems: 'center' }}>
                            <Title style={{ color: '#1e3768', textAlign: 'center' }}>{I18n.t('reset_password')}</Title>
                        </Body>
                        <TouchableOpacity activeOpacity={1} style={{ width: 40, justifyContent: 'center', alignItems: 'flex-end' }} />                        
                    </Header>

                    <View style={{ padding: 20 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', height: 120, top: 20 }}>
                            <Image source={lockImage} style={{ width: 80, height: 80 }} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#81cdc7', fontSize: 20 }}>*</Text>
                                <Text style={{ marginTop: -20, color: '#81cdc7' }}>___</Text>
                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                                <Text style={{ color: '#81cdc7', fontSize: 20 }}>*</Text>
                                <Text style={{ marginTop: -20, color: '#81cdc7' }}>___</Text>
                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                                <Text style={{ color: '#81cdc7', fontSize: 20 }}>*</Text>
                                <Text style={{ marginTop: -20, color: '#81cdc7' }}>___</Text>
                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                                <Text style={{ color: '#81cdc7', fontSize: 20 }}>*</Text>
                                <Text style={{ marginTop: -20, color: '#81cdc7' }}>___</Text>
                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                                <Text style={{ color: '#81cdc7', fontSize: 20 }}>*</Text>
                                <Text style={{ marginTop: -20, color: '#81cdc7' }}>___</Text>
                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                                <Text style={{ color: '#81cdc7', fontSize: 20 }}>*</Text>
                                <Text style={{ marginTop: -20, color: '#81cdc7' }}>___</Text>
                            </View>

                        </View>

                        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#515151', fontSize: 10 }}>{I18n.t('reset_password_text1')}</Text>
                                <Text style={{ color: '#515151', fontSize: 10 }}>{I18n.t('reset_password_text2')}</Text>
                            </View>

                        </View>
                        <View style={{ marginTop: 30 }}>

                            <Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input onChangeText={(text) => this.setState({ email: text })} value={this.state.email} keyboardType={'email-address'} placeholder={I18n.t('email_address')} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>

                        </View>

                    </View>

                    <TouchableOpacity transparent style={{ height: 70, marginTop: 20, flexDirection: 'row', paddingLeft: 15, paddingRight:15 }} onPress={() => this.pressSend()} >

                        <ImageBackground source={buttonImage} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 55 }} >
                            <Text style={{ color: '#fff', fontSize: 20, marginTop: -10, height: 30 }}>{I18n.t('send_otp')}</Text>
                        </ImageBackground>

                    </TouchableOpacity>

                </Content>
            </Container>
        );
    }
}

ForgotPassword.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
