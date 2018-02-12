import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from './elements/authActions'
import { Image, View, ScrollView, StatusBar, Dimensions, Alert, TouchableOpacity } from "react-native";

import { Container, Header, Button, Content, Form, Item, Icon, Frame, Input, Label, Text } from "native-base";
import styles from "./styles";
import I18n from '../../i18n/i18n';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const launchscreenBg = require("../../../img/bg-login.png");
const launchscreenLogo = require("../../../img/logo.png");
const buttonImage = require("../../../img/bg-button.png");

class Signup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Image source={launchscreenBg} style={styles.imageContainer}>
                    <Content>
                        
                        <View style={styles.logoContainer}>
                            <Image source={launchscreenLogo} style={styles.logo} />
                        </View>

                        <View style={{ padding: 20 }}>

                            <Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input placeholder={I18n.t('name')} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>

                            <Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input placeholder={I18n.t('email')} keyboardType={'email-address'} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>

                            <Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input placeholder={I18n.t('password')} secureTextEntry={true} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                            </Item>

                            <Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
                                <Input placeholder={I18n.t('phone_number')} keyboardType={'numeric'} style={{ textAlign: 'center', color: '#29416f', fontSize: 14, placeholderTextColor: '#29416f' }} />
                            </Item>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }} >
                                <Image source={buttonImage} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 55 }} >
                                    <Text style={{ color: '#fff', fontSize: 20, marginTop: -10, height: 30 }}>{I18n.t('signup')}</Text>
                                </Image>
                            </View>

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
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
