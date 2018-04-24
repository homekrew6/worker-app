import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, AsyncStorage } from "react-native";
import { Container, Header, Button, Content, Form, Item, Icon, Frame, Input, Label, Text, CardItem, Right, Card, Left, Body, Title, Thumbnail } from "native-base";
import { logout } from './elements/authActions'
import I18n from '../../i18n/i18n';
import styles from "./styles";
import api from '../../api';
import { NavigationActions } from "react-navigation";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const profileImage = require("../../../img/atul.png");
const icon1 = require("../../../img/icon1.png");
const icon2 = require("../../../img/icon2.png");
const icon3 = require("../../../img/icon3.png");
const icon4 = require("../../../img/icon4.png");
const icon5 = require("../../../img/icon5.png");
const icon6 = require("../../../img/icon6.png");
const icon7 = require("../../../img/icon7.png");
const icon8 = require("../../../img/icon8.png");
const back_arow = require("../../../img/arrow_back.png");
const logo_hdr = require("../../../img/logo2.png");
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state={ 
            visible:'',
            notificatonCount: 0,
         };
        AsyncStorage.getItem("language").then((value)=>{
        if(value)
        {
            const value1=JSON.parse(value);
            I18n.locale = value1.Code;
            this.setState({visible:'fhfh'});
        }
        })
    };

    logout() {
        AsyncStorage.getItem("userToken").then((userToken) => {
            if (userToken) {
                const userToken1 = JSON.parse(userToken);
                api.put(`Workers/editWorker/${userToken1.userId}?access_token=${userToken1.id}`, { deviceToken: '' }).then((resEdit) => {
                    AsyncStorage.clear();
                    AsyncStorage.setItem("IsSliderShown", "true").then((res) => {

                    })
                    this.props.logout(res => {
                        if (res) {
                            //this.props.navigation.navigate("Login");
                            this.props.navigation.dispatch(resetAction);
                        } else {
                            this.props.navigation.navigate("Menu")
                        }
                    })
                }).catch((err) => {
                });
            }
        })
    }

componentWillMount(){
    // console.log('this is saikat bala');    
    // console.log(this.props.auth.data);
    api.post('Notifications/getUnreadWorkerNot', { "workerId": this.props.auth.data.id }).then((res) => {
        this.setState({ 
          notificatonCount: res.response.message,
         })
      }).catch((err) => {
        console.log(err);
      });
}

    render() {
        return (
            <Container >
                <StatusBar backgroundColor="#81cdc7" />

                <Content>
                    <Header style={styles.bg_white} androidStatusBarColor="#81cdc7" >
                        <Button transparent />
                        <Body style={styles.appHdrtitleWarp}>
                            <Image source={logo_hdr} style={{ height: 18, width: 110 }} />
                        </Body>
                        <Button transparent >
                            <Icon name='search' style={styles.bg_head_icon} />
                        </Button>
                    </Header>

                    <Card>

                        <CardItem style={styles.pcard}>
                            <View style={styles.flx_View}>
                                {
                                    this.props.auth.data.image ? (
                                        <Thumbnail source={{ uri: this.props.auth.data.image }} style={styles.profileImage} />
                                    ) : (
                                            <Thumbnail source={profileImage} style={styles.profileImage} />
                                        )
                                }
                                <View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")}>
                                        <Text style={styles.pname}>{this.props.auth.data.name}</Text>
                                        <Text style={styles.pemail}>{this.props.auth.data.email}</Text>
                                        <Text style={styles.pphone}>{this.props.auth.data.phone}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </CardItem>
                        <CardItem>
                            <View style={styles.pBtmTxt}>
                                <Text style={styles.pBtmTxt_Txt}>Credit: AED 0.00</Text>
                            </View>
                        </CardItem>
                    </Card>

                    <Card>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate('NotificationList',{ workerId: this.props.auth.data.id })}>
                            <Image source={icon1} style={styles.menuCardIcon} />
                            <Text style={styles.menuCardTxt}>{I18n.t('notification')}</Text>
                            {
                                this.state.notificatonCount != 0 ? (  
                                <View style={styles.artNt}>
                                    <Text style={styles.artNtTxt}>{this.state.notificatonCount}</Text>
                                </View>
                                ):null

                            }
                            <View style={styles.arw_lft}>
                                <Image source={back_arow} style={styles.arw_lft_img} />
                            </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate("AvailableJobs")} >
                                <Image source={icon2} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('my_job')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate('MyLocation')} >
                                <Image source={icon3} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('my_location')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate("MyPaymentList")}>
                                <Image source={icon4} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('my_card')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate("myTiming")} >
                                <Image source={icon4} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('my_timing')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <View style={styles.menuCardView}>
                                <Image source={icon5} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('my_promo_code')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </View>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate('Support')}>
                                <Image source={icon6} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('support')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate("Settings")} >
                                <Image source={icon7} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('setting')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.logout()}>
                                <Image source={icon8} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('logout')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                    </Card>

                    <View >
                        <Text style={styles.version}>Ver 2.6 Build 2425 - March 2018</Text>
                    </View>

                </Content>
            </Container>
        );
    };
};

Menu.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (cb) => dispatch(logout(cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
