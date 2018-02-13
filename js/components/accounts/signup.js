import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signup } from './elements/authActions'
import { Image, View, ScrollView, StatusBar, Dimensions, Alert, TouchableOpacity } from "react-native";

import { Container, Header, Button, Content, Form, Item, Icon, Frame, Input, Label, Text } from "native-base";
import styles from "./styles";
import I18n from '../../i18n/i18n';
import FSpinner from 'react-native-loading-spinner-overlay';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
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
            phone: ''

        }
    }

    pressSignup() {
        //return false;
        if (!this.state.name) {
            Alert.alert('Please enter name');
            return false;
        }
        if (!this.state.email) {
            Alert.alert('Please enter email');
            return false;
        }
        if (!this.state.password) {
            Alert.alert('Please enter password');
            return false;
        }
        if (!this.state.phone) {
            Alert.alert('Please enter phone');
            return false;
        }
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const phone = this.state.phone;

        this.props.signup(name, email, password, phone).then(res => {
            if (res.type == 'success') {
                Alert.alert('Successfully saved.');
                this.props.navigation.navigate("Login");
            } else {
                Alert.alert('Data not saved,please try again');
            }
        }).catch(err => {
            console.log(err);
            Alert.alert('Data not saved,please try again');

        })

    }

    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Image source={launchscreenBg} style={styles.imageContainer}>
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
                            </Item>

                            <Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input onChangeText={(text) => this.setState({ phone: text })} placeholder={I18n.t('phone_number')} keyboardType={'numeric'} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>

                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginTop: 15 }} onPress={() => this.pressSignup()} >
                                <Image source={buttonImage} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 55 }} >
                                    <Text style={{ color: '#fff', fontSize: 20, marginTop: -10, height: 30 }}>{I18n.t('signup')}</Text>
                                </Image>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -13 }}>
                                <Text>- {I18n.t('or')} -</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                                <Button block transparent style={{ borderWidth: 1, borderColor: '#29416f', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ color: '#29416f' }}>{I18n.t('via_facebook')}</Text>
                                </Button>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                                <Button block transparent style={{ borderWidth: 1, borderColor: '#29416f', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ color: '#29416f' }}>{I18n.t('via_gmail')}</Text>
                                </Button>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ color: '#252525' }}>{I18n.t('not_a_register_member')} </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                                    <Text style={{ color: '#29416f' }}>{I18n.t('login')}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Content>
                </Image>
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
 
