import React, { Component } from "react";
import { Image, View, StatusBar, ImageBackground, TouchableOpacity, AsyncStorage } from "react-native";
import { Container, Button, H3, Text, Header, Title, Body, Left, Right, Content, Item, Footer, FooterTab } from "native-base";
import FSpinner from 'react-native-loading-spinner-overlay';
import styles from './styles'; 
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n/i18n';
const carve = require("../../../img/icon17.png");
class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'English',
            visible: false,
            currency: 'USD'
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
                        <Title>Settings</Title>
                    </Body>
                    <Button transparent style={{ width: 30, backgroundColor: 'transparent' }} disabled/>
                </Header>

                <Content style={styles.bgWhite} >


                    <View style={{ flex: 1, flexDirection: 'row', marginTop: -50 }}>
                        <Image source={carve} style={{ flex: 1, height: 50 }}></Image>
                    </View>
                    <View>

                        <TouchableOpacity style={styles.confirmationItem} onPress={() => this.props.navigation.navigate('LanguageList')}>
                            <View style={styles.confirmationIconView}>
                                <Entypo name='language' style={{ fontSize: 20, color: '#1e3768' }} />
                            </View>
                            <Text style={styles.confirmationMainTxt}>{I18n.t('language')}</Text>
                            <Text style={styles.confirmationDateTime}>{this.state.language}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmationItem} onPress={() => this.props.navigation.navigate('CurrencyList')}>
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
                        <TouchableOpacity style={styles.confirmationServicefooterItem} onPress={() => this.props.navigation.navigate('Menu')} >
                            <Text style={styles.confirmationServicefooterItmTxt}>{I18n.t('continue')}</Text>
                        </TouchableOpacity>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}


export default Settings;
