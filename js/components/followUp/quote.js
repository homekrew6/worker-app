import React, { Component } from 'react';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import { Footer, FooterTab, Thumbnail, Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, CardItem, Right, Card, Left, Body, Title, ActionSheet } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FSpinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import I18n from '../../i18n/i18n';
import api from '../../api/index';


const icon2 = require("../../../img/icon/hourglass.png"); 
const icon3 = require("../../../img/icon/calendar2.png");
const icon4 = require("../../../img/icon/shopping-cart2.png");
const icon5 = require("../../../img/icon/coins2.png");
const icon6 = require("../../../img/icon6.png");
const icon7 = require("../../../img/icon7.png");
const icon8 = require("../../../img/icon/lightBulb2.png");
const back_arow = require("../../../img/arrow_back.png");



class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            addedMaterialsList: [],
            currency: 'AED',
            followUpDetails: '',
            totalPrice: 0,
            hoursTotal: 0
         }
    }
    componentDidMount() {
        AsyncStorage.getItem("currency").then((value) => {
            if (value) {
                const value1 = JSON.parse(value);
                this.setState({ currency: value1.language })
            }
        })

        this.setState({ loader: true });
        api.post("jobMaterials/getJobMaterialByJobId", { "jobId": this.props.navigation.state.params.jobId }).then((addedList) => {                
            if (addedList.type != "Error") {
                let addedItemsList = [];

                addedList.response.message.map((item) => {
                    let item1 = { id: item.id, name: item.materials ? item.materials.name : '', price: item.price ? item.price: 0, image: item.materials ? (item.materials.image ? item.materials.image : '') : '', count: item.count, actualPrice: item.materials ? item.materials.price : '', totalPrice: item.materials ? item.count * item.materials.price: '' };
                    addedItemsList.push(item1);
                });
                let totalPrice = 0;

                if (addedItemsList.length){
                    addedItemsList.map((item) => {
                        totalPrice = totalPrice + item.totalPrice;
                    }); 
                }

                this.setState({
                        loader: false, 
                        addedMaterialsList: addedItemsList,
                        totalPrice: totalPrice
                });
            }

        }).catch((err) => {
            this.setState({ loader: false });
            console.log('error');
        })
        this.setState({ loader: true });
        api.get('jobFollowUps').then((followupDetailsRes) => {
            let followUpDetails;
            let hoursTotal = 0;

            // let totalPrice

            console.log('followUpDetails', followupDetailsRes);  
            console.log(this.props.navigation.state.params.jobId)                      
            followupDetailsRes.map((item) => {
                if (item.jobId == this.props.navigation.state.params.jobId) {
                    followUpDetails = item;
                    hoursTotal = item.hours * parseInt(item.price)
                }
            });
            console.log('hoursTotal', hoursTotal);  
            hoursTotal=hoursTotal.toFixed(2);
            this.setState({
                followUpDetails: followUpDetails ? followUpDetails : '',
                hoursTotal: hoursTotal,
                loader: false
            })          
        }).catch((err2) => {
            this.setState({ loader: false });
            console.log('error');
        });
    }

    render() {
        
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Header style={styles.appHdr2} noShadow androidStatusBarColor="#81cdc7">
                    <Button transparent onPress={() => this.props.navigation.goBack()} style={{ width: 30 }}>
                        <Ionicons name="ios-arrow-back" style={styles.headIcon2} />                       
                    </Button>
                    <Body style={styles.headBody}>
                        <Title>{I18n.t('quote')}</Title>
                    </Body>
                    <Button transparent style={{ width: 30, backgroundColor: 'transparent', }} disabled={true} />
                </Header>
                <Content>
                    {/* <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} /> */}

                    <View>
                        
                        <View style={styles.totalBillitem}>
                            <View style={styles.imagesWarp}>
                                <Image source={icon4} style={styles.totalImage} />
                            </View>
                            <View>
                                <Text style={styles.text1}>{I18n.t('materials')}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.priceText}>{this.state.currency} {(this.state.totalPrice)}</Text>
                            </View>
                        </View>
                        {
                            this.state.addedMaterialsList?
                        ( <View style={{ paddingLeft: 15, backgroundColor: '#fff', paddingRight: 10 }}>
                        
                            {
                                this.state.addedMaterialsList.map((item, key) => {
                                    return(
                                        <View style={styles.totalBillitem} key={key}>
                                            <View style={[styles.imagesWarp, styles.subMaterials]}>
                                                <Image source={{uri: item.image}} style={styles.totalImage} />
                                            </View>
                                            <View>
                                                <Text style={styles.text1}>{item.name}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text2}>{item.count}</Text>
                                                {
                                                    item.price ?(
                                                        <Text style={[styles.text2, { color: '#ccc', fontSize: 12 }]}>x {this.state.currency} {item.price}</Text>
                                                    ):(
                                                        <Text style={[styles.text2, { color: '#ccc', fontSize: 12 }]}>{I18n.t('pending')}</Text>
                                                    )
                                                }
                                            </View>
                                            <View style={styles.price}>
                                                {
                                                    item.price ? (
                                                        <Text style={[styles.priceText, { color: '#ccc' }]}>{this.state.currency} {item.totalPrice}</Text>
                                                    ) : (
                                                        <Text style={[styles.priceText, { color: '#ccc' }]}>{I18n.t('pending')}</Text>
                                                        )
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>): (console.log())
                        }
                        <View style={styles.totalBillitem}>
                            <View style={styles.imagesWarp}>
                                <Image source={icon2} style={styles.totalImage} />
                            </View>
                            <View>
                                <Text style={styles.text1}>{I18n.t('hours')}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.text2}>{this.state.followUpDetails.hours}</Text>
                                <Text style={[styles.text2, { color: '#ccc', fontSize: 12 }]}>x {this.state.currency} {this.state.followUpDetails.price}</Text>
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.priceText}>{this.state.currency} {(this.state.hoursTotal)}</Text>
                            </View>
                        </View>
                        <View style={styles.totalBillitem}>
                            <View>
                                <Image source={icon5} style={styles.totalImage} />
                            </View>
                            <View>
                                <Text style={styles.text1}>{I18n.t('total')}</Text>
                            </View>
                            <View style={{ flex: 1 }}>

                            </View>
                            <View style={styles.price}>
                                <Text style={styles.priceText}>{this.state.currency} {(this.state.totalPrice + this.state.hoursTotal) }</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12 }}><Text>* </Text>{I18n.t('quoteMsg')}</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Quote;
