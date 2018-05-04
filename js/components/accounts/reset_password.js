import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from './elements/authActions'
import api from '../../api'
import { NavigationActions } from "react-navigation"
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, ImageBackground } from "react-native";

import { Container, Header, Button, Content, Form, Left, Right, Body, Title, Item, Icon, Frame, Input, Label, Text } from "native-base";

import I18n from '../../i18n/i18n';
import styles from "./styles";
import FSpinner from 'react-native-loading-spinner-overlay';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const lockImage = require("../../../img/lock.png");
const buttonImage = require("../../../img/bg-button.png");
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            password: '',
            visible: false
        }
    }

    pressSend() {
        if (!this.state.otp) {
            Alert.alert('Please enter otp');
            return false;
        }

        if (!this.state.password) {
            Alert.alert('Please enter password');
            return false;
        }

        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regEmail.test(this.state.email)) {
            Alert.alert('Please enter a valid email');
            return false;
        }
        
        this.setState({ visible: true });
        api.post('Customers/otpChecking', { otp: this.state.otp }).then(res => {
            api.post('Workers/reset-password?access_token=' + res.response.access_token, { newPassword: this.state.password }).then(resReset => {
                
                this.setState({ visible: false });
                Alert.alert('Password changed successfully')
                //this.props.navigation.navigate("Login");
                this.props.navigation.dispatch(resetAction);                
            }).catch((errReset) => {
                this.setState({ visible: false });
                Alert.alert('Please try again')
            })
        }).catch((err) => {
            this.setState({ visible: false });
            Alert.alert('Wrong OTP.')
        })
    }


    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <StatusBar backgroundColor="#81cdc7" />
                <Content>
                    <FSpinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    <Header style={{ backgroundColor: '#fff' }} androidStatusBarColor="#81cdc7">
                        <Left style={{ marginRight: -15 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon style={{ color: '#81cdc7' }} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: '#1e3768' }}>{I18n.t('reset_password')}</Title>
                        </Body>
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
                                <Text style={{ color: '#515151', fontSize: 10 }}>{I18n.t('reset_password_text3')}</Text>
                                <Text style={{ color: '#515151', fontSize: 10 }}>{I18n.t('reset_password_text4')}</Text>

                            </View>

                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input onChangeText={(text) => this.setState({ otp: text })} value={this.state.otp} keyboardType={'numeric'} placeholder={I18n.t('four_digit_code')} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }}/>
                            </Item>
                            <Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45, marginTop: 10 }}>
                                <Input onChangeText={(text) => this.setState({ password: text })} value={this.state.password} secureTextEntry={true} placeholder={I18n.t('new_password')} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>
                        </View>
                    </View>
                    <TouchableOpacity transparent 
                        style={{ flex: 1, flexDirection: 'row', marginTop: 15, paddingLeft: 15, paddingRight: 15 }}
                        onPress={() => this.pressSend()}
                    >
                        <ImageBackground 
                            source={buttonImage} 
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 55 }}
                        >
                            <Text style={{ color: '#fff', fontSize: 20, marginTop: -10, height: 30 }}>{I18n.t('save_password')}</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                </Content>
            </Container>
        );
    }
}

ResetPassword.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
