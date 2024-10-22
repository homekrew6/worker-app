import React, { Component } from "react";
import { Image, View, StatusBar, TouchableOpacity, AsyncStorage, Text } from "react-native";
import { Container, Button, Header, Title, Body, Content, Footer, FooterTab } from "native-base";

import FSpinner from 'react-native-loading-spinner-overlay';
import styles from './styles'; 
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n/i18n';
import { navigateAndSaveCurrentScreen } from '../accounts/elements/authActions';
import { NavigationActions } from "react-navigation";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../api';
const carve = require("../../../img/icon17.png");
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'English',
            visible: false,
            currency: 'AED'
        }

    }
    componentDidMount() {
        this.setState({ visible: true });
        AsyncStorage.getItem("language").then((value) => {
            if (value) {
                const langValue = JSON.parse(value);
                this.setState({ language: langValue.language });
                this.setState({ visible: false });
            }
            else {
                this.setState({ visible: false });
            }
            AsyncStorage.getItem("currency").then((value) => {
                if (value) {
                    const langValue = JSON.parse(value);
                    this.setState({ currency: langValue.language });
                    this.setState({ visible: false });
                }
                else {
                    this.setState({ visible: false });
                }
            }).catch((err) => {
                this.setState({ visible: false });
            })
        }).catch((err) => {
            AsyncStorage.getItem("currency").then((value) => {
                if (value) {
                    const langValue = JSON.parse(value);
                    this.setState({ currency: langValue.language });
                    this.setState({ visible: false });
                }
                else {
                    this.setState({ visible: false });
                }
            }).catch((err) => {
                this.setState({ visible: false });
            })
        });

    }

    logout() {
        this.setState({ visible: true });
        AsyncStorage.getItem("userToken").then((userToken) => {
            if (userToken) {
                const userToken1 = JSON.parse(userToken);
                api.put(`Workers/editWorker/${userToken1.userId}?access_token=${userToken1.id}`, { deviceToken: '' }).then((resEdit) => {
                    AsyncStorage.clear();
                    AsyncStorage.removeItem('userToken');
                    AsyncStorage.setItem("IsSliderShown", "true").then((res) => {
                        debugger;
                        I18n.locale = 'en';
                        this.setState({ visible: false });
                        this.props.navigation.dispatch(resetAction);
                    });
                }).catch((err) => {
                });
            }
        })
    }


    navigate(screen) {
        const data = this.props.auth.data;
        data.activeScreen = screen;
        data.previousScreen = "Settings";
        this.props.navigateAndSaveCurrentScreen(data);
       this.props.navigation.navigate(screen);
        
      }
    render() {
        return (
            <Container >


                <FSpinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />

                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <Header style={styles.appHdr2} androidStatusBarColor="#81cdc7" noShadow>
                    <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} activeOpacity={0.5} style={{ width: 40, justifyContent: 'center' }}>
                        <Ionicons name="ios-arrow-back" style={{ fontSize: 26, color: '#fff' }} />
                    </TouchableOpacity>
                    <Body style={{ alignItems: 'center' }}>
                        <Title><Text>{I18n.t('setting_page_title')}</Text></Title>
                    </Body>
                    <TouchableOpacity activeOpacity={1} style={{ width: 40, justifyContent: 'center', alignItems: 'flex-end' }} />
                </Header>

                <Content style={styles.bgWhite} >


                    <View style={{ flex: 1, flexDirection: 'row', marginTop: -50 }}>
                        <Image source={carve} style={{ flex: 1, height: 50 }}></Image>
                    </View>
                    <View>

                        <TouchableOpacity style={styles.confirmationItem} onPress={() => this.navigate('LanguageList')}>
                            <View style={styles.confirmationIconView}>
                                <Entypo name='language' style={{ fontSize: 20, color: '#1e3768' }} />
                            </View>
                            <Text style={styles.confirmationMainTxt}>{I18n.t('language')}</Text>
                            <Text style={styles.confirmationDateTime}>{this.state.language}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmationItem} onPress={() => this.navigate('CurrencyList')}>
                            <View style={styles.confirmationIconView}>
                                <MaterialCommunityIcons name='currency-usd' style={{ fontSize: 20, color: '#1e3768' }} />
                            </View>
                            <Text style={styles.confirmationMainTxt}>{I18n.t('currency')}</Text>
                            <Text style={styles.confirmationDateTime}>{this.state.currency}</Text>
                        </TouchableOpacity>


                    </View>


                </Content>
                <Footer>
                    <FooterTab>
                        {/* <TouchableOpacity style={styles.confirmationServicefooterItem} onPress={() => this.confirmationContinue()} >
                        <Text style={styles.confirmationServicefooterItmTxt}>CONTINUE</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.confirmationServicefooterItem, { backgroundColor: '#1e3768' }]} onPress={() => this.logout()} >
                            <Text style={[styles.confirmationServicefooterItmTxt]}>{I18n.t('logout').toUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmationServicefooterItem} onPress={() => this.props.navigation.navigate('Menu')} >
                            <Text style={styles.confirmationServicefooterItmTxt}>{I18n.t('continue')}</Text>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}


//export default Settings;


Settings.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateAndSaveCurrentScreen: (data) => dispatch(navigateAndSaveCurrentScreen(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);