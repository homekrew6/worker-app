import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signup } from './elements/authActions'
import { Image, ImageBackground, View, StatusBar, Alert, TouchableOpacity } from "react-native";

import { Container, Content, Item, Input, Text, CheckBox } from "native-base";
import styles from "./styles";
import I18n from '../../i18n/i18n';
import FSpinner from 'react-native-loading-spinner-overlay';
import PopoverTooltip from 'react-native-popover-tooltip';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const launchscreenBg = require("../../../img/bg-login.png");
const launchscreenLogo = require("../../../img/logo.png");
const buttonImage = require("../../../img/bg-button.png");

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            chkbox_chk: false
        }
    }

    pressSignup() {
        //return false;
        if (!this.state.name.trim()) {
            Alert.alert('Please enter name');
            return false;
        }
        
        if (!this.state.email.trim()) {
            Alert.alert('Please enter email');
            return false;
        }
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regEmail.test(this.state.email)){
            Alert.alert('Please enter a valid email');
            return false;
        }
        if (!this.state.password) {
            Alert.alert('Please enter password');
            return false;
        }
        const password_pattern = /(?=.*[A-Z]).{6,}/;
        if (!password_pattern.test(this.state.password)) {
            Alert.alert('Password must have one capital letter and min six characters');
            return false;
        }
        if (!this.state.phone.trim()) {
            Alert.alert('Please enter phone');
            return false;
        }
        if (!this.state.chkbox_chk) {
            Alert.alert('Please check Terms and Conditions');
            return false;
        }
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const phone = this.state.phone;

        this.props.signup(name, email, password, phone).then(res => {
            if(res.worker && res.worker.Error){
                if(res.worker.Error === true){
                    Alert.alert(res.worker.message);
                }
            }else{
                if (res.type == 'success') {
                    Alert.alert('Successfully Registered.');
                    this.props.navigation.navigate("Login");
                } else {
                    Alert.alert('Please check all fields and try again');
                }
            }
            
        }).catch(err => {
            Alert.alert('Please check all fields and try again');

        })

    }
    chkbox_check() {
        if (this.state.chkbox_chk) this.setState({ chkbox_chk: false });
        else this.setState({ chkbox_chk: true });
    }

    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
                    <Content>
                        <FSpinner visible={this.props.auth.busy} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                        <View style={styles.logoContainer}>
                            <Image source={launchscreenLogo} style={styles.logo} />
                        </View>

                        <View style={{ padding: 20 }}>

                            <Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input onChangeText={(text) => this.setState({ name: text })} value={this.state.name} placeholder={I18n.t('name')} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>

                            <Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input onChangeText={(text) => this.setState({ email: text })} value={this.state.email}  placeholder={I18n.t('email')} keyboardType={'email-address'} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>

                            <Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input onChangeText={(text) => this.setState({ password: text })} value={this.state.password}  placeholder={I18n.t('password')} secureTextEntry={true} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                                    <PopoverTooltip
                                        ref='tooltip1'
                                        buttonComponent={
                                            <Icon name="information-outline" style={{ fontSize: 26, paddingRight: 10, color: '#29416f', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}></Icon>
                                        }
                                        items={[
                                            {
                                                label: 'Min length six, one Caps',
                                                onPress: () => { }
                                            }
                                        ]}
                                    />
                            </Item>

                            <Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input onChangeText={(text) => this.setState({ phone: text })} placeholder={I18n.t('phone_number')} keyboardType={'numeric'} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>

                            <View style={{ flexDirection: 'row', flex: 1, paddingTop: 15, paddingBottom: 10 }} >
                                <View style={{ width: 35 }}>
                                    <CheckBox color='#29416f' checked={this.state.chkbox_chk} onPress={() => this.chkbox_check()} />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14 }}>{I18n.t('i_agree_to_the_term_and_conditions')}</Text>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 14, color: '#29416f' }}>{I18n.t('terms_and_conditions')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginTop: 15 }} onPress={() => this.pressSignup()} >
                                <ImageBackground source={buttonImage} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 55 }} >
                                    <Text style={{ color: '#fff', fontSize: 20, marginTop: -10, height: 30 }}>{I18n.t('signup')}</Text>
                                </ImageBackground>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ color: '#252525' }}>{I18n.t('already_registered')} </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                                    <Text style={{ color: '#29416f' }}>{I18n.t('login')}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

Signup.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (name, email, password, phone) => dispatch(signup(name, email, password, phone))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
 
