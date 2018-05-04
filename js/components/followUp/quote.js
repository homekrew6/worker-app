import React, { Component } from 'react';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, AsyncStorage, Text } from 'react-native';
import { Footer, FooterTab, Thumbnail, Container, Header, Button, Content, Form, Item, Frame, Input, Label, CardItem, Right, Card, Left, Body, Title, ActionSheet } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
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
            hoursTotal: 0,
            pricePending: '',
            IsModalVisible: false,
            id: '',
            materialsId: ',',
            materialTotalPrice:''
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
                    let item1 = {
                        id: item.id, 
                        name: item.materials ? item.materials.name : '', 
                        price: item.price ? item.price: '', 
                        image: item.materials ? (item.materials.image ? item.materials.image : '') : '',
                        count: item.count, 
                        materialsId: item.materialsId,
                        actualPrice: item.materials ? item.materials.price : '', 
                        totalPrice: item.materials ? item.count * item.materials.price: ''
                        };
                        if(Number(item1.price)!=0)
                        {

                        }
                        else
                        {
                            item1.price='';
                        }
                        if(typeof(item1.price)!='string')
                        {
                            item1.price = item1.price.toFixed();
                        }
                    addedItemsList.push(item1);
                });
                let totalPrice = 0;
                let materialTotalPrice=0;
                if (addedItemsList.length){
                    addedItemsList.map((item) => {
                        materialTotalPrice = materialTotalPrice + Number(item.price);
                    }); 
                }
                totalPrice = materialTotalPrice + 50;
                materialTotalPrice = materialTotalPrice.toFixed(2);
                totalPrice = totalPrice.toFixed(2);
                this.setState({
                        loader: false, 
                        addedMaterialsList: addedItemsList,
                        totalPrice: totalPrice,
                    materialTotalPrice: materialTotalPrice
                });
            }
        }).catch((err) => {
            this.setState({ loader: false });
        })
        
        this.setState({ loader: true });
        api.get('jobFollowUps').then((followupDetailsRes) => {
            let followUpDetails;
            let hoursTotal = 0;

            // let totalPrice
                    
            followupDetailsRes.map((item) => {
                if (item.jobId == this.props.navigation.state.params.jobId) {
                    followUpDetails = item;
                    hoursTotal = item.hours * 50;
                }
            });
             if(hoursTotal==0)
             {
                 hoursTotal=50;
             }
            hoursTotal=hoursTotal.toFixed(2);
            this.setState({
                followUpDetails: followUpDetails ? followUpDetails : '',
                hoursTotal: hoursTotal,
                loader: false
            })          
        }).catch((err2) => {
            this.setState({ loader: false });
        });
    }

    setPendingMat(item){
        this.setState({ IsModalVisible: true });
        this.setState({ id: item.materialsId, materialsId: item.id });
    }

    AddPendingMat(){
        this.setState({ IsModalVisible: true });
        if(this.state.pricePending !== ''){
            api.post('Materials/updateupdateMaterialPrice', {
                jobMaterialId: this.state.materialsId, 
                id: this.state.id , 
                price: this.state.pricePending
            }).then((PendingRes) => {
                
                if(PendingRes.type === 'Error'){
                    Alert.alert('Please try again later');
                    this.setState({ IsModalVisible: false });
                }else{
                    Alert.alert('Added SuccessFully');
                    api.post("jobMaterials/getJobMaterialByJobId", { "jobId": this.props.navigation.state.params.jobId }).then((addedList) => {                
                        if (addedList.type != "Error") {
                            let addedItemsList = [];
                            addedList.response.message.map((item) => {
                                let item1 = {
                                    id: item.id, 
                                    name: item.materials ? item.materials.name : '', 
                                    price: item.price ? item.price: 0, 
                                    image: item.materials ? (item.materials.image ? item.materials.image : '') : '',
                                    count: item.count, 
                                    materialsId: item.materialsId,
                                    actualPrice: item.materials ? item.materials.price : '', 
                                    totalPrice: item.materials ? item.count * item.materials.price: ''
                                    };
                                addedItemsList.push(item1);
                            });
                            let totalPrice = 0;
                            let materialTotalPrice=0;
                            if (addedItemsList.length){
                                addedItemsList.map((item) => {
                                    materialTotalPrice = materialTotalPrice + item.totalPrice;
                                }); 
                            }
                            totalPrice=materialTotalPrice+50;
                            totalPrice=totalPrice.toFixed(2);
                            materialTotalPrice = materialTotalPrice.toFixed(2);
                            this.setState({
                                    loader: false, 
                                    addedMaterialsList: addedItemsList,
                                    totalPrice: totalPrice,
                                materialTotalPrice: materialTotalPrice
                            });
                        }
            
                    }).catch((err) => {
                        this.setState({ loader: false });
                    })
                    this.setState({ IsModalVisible: false });
                }
                
            }).catch((err) => {
                Alert.alert('Please try again later');
                this.setState({ IsModalVisible: false });
            })
        }else{
            this.setState({ IsModalVisible: false });
            Alert.alert('Please add price');
        }
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
                                <Text style={styles.priceText}>{this.state.currency} {(this.state.materialTotalPrice)}</Text>
                            </View>
                        </View>
                        {
                            this.state.addedMaterialsList?
                        ( <View style={{ paddingLeft: 15, backgroundColor: '#fff', paddingRight: 10 }}>
                        
                            {
                                this.state.addedMaterialsList.map((item, key) => {
                                    return(
                                        // <View style={styles.totalBillitem} >
                                        <TouchableOpacity key={key} style={styles.totalBillitem} onPress={() => item.price ? null : this.setPendingMat(item)}>
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
                                        </TouchableOpacity>
                                        // </View>
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
                              {
                                    this.state.followUpDetails.hours?(
                                        <Text style={styles.text2}>{this.state.followUpDetails.hours}</Text>
                                    ):(
                                            <Text style={styles.text2}>1</Text>
                                    )
                              }
                                <Text style={[styles.text2, { color: '#ccc', fontSize: 12 }]}>x {this.state.currency} 50.00</Text>
                               
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
                                <Text style={styles.priceText}>{this.state.currency} {(this.state.totalPrice) }</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12 }}><Text>* </Text>{I18n.t('quoteMsg')}</Text>
                        </View>
                    </View>
                    <Modal isVisible={this.state.IsModalVisible}>
                        <TouchableOpacity
                            transparent style={{ flex: 1, justifyContent: 'center', display: 'flex', width: '100%' }}
                            onPress={() => this.setState({ IsModalVisible: false })}
                            activeOpacity={1}
                        >

                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 99999, }} onPress={() => this.setState({ IsModalVisible: false })}>
                                <Ionicons style={{ color: 'rgba(255,255,255,0.5)', fontSize: 36 }} name='md-close-circle' />
                            </TouchableOpacity>

                            <View style={{ backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' }}>
                                <View>
                                    <Item regular style={{ borderColor: 'transparent', borderWidth: 1, borderRadius: 2, height: 45 }}>
                                        <Input onChangeText={(price) => this.setState({ pricePending: price })} placeholder={I18n.t('enter_price_of_material')} keyboardType={'numeric'} value={this.state.price} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                                    </Item>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.setState({ IsModalVisible: false })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: 'red' }}>
                                        <Text style={{ color: '#fff' }}>{I18n.t('cancel')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.AddPendingMat()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: '#81cdc7' }}>
                                        <Text style={{ color: '#fff' }}>{I18n.t('add')}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </TouchableOpacity>
                    </Modal>
                </Content>
            </Container>
        );
    }
}

export default Quote;
