import React, { Component } from "react";
import { Image, AsyncStorage, View, StatusBar, Dimensions, Alert, TouchableOpacity, ScrollView, Text } from "react-native";
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FSpinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Button, Content, Body, Title, Footer, Card, CardItem } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';
import api from '../../api/index';

const logo_hdr = require("../../../img/logo2.png");
const icon2 = require("../../../img/icon/hourglass.png");
const icon3 = require("../../../img/icon/calendar2.png");
const icon4 = require("../../../img/icon/shopping-cart2.png");
const icon5 = require("../../../img/icon/coins2.png");
const back_arow = require("../../../img/arrow_back.png");

const win = Dimensions.get('window').width;
class FollowUpList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IsVisible: false,
            currency: 'AED',
            jobDetails: '',
            totalPrice: '0.00',
            hours: 1,
            saveDateDB: '',
            materialsId: ''
        }

    }

    onFollowUpCall(snapshot){
        if (snapshot && snapshot.val()) { 
            const key = Object.keys(snapshot.val())[0];
            const ref = firebase.database().ref().child('tracking').child(key); 
            const data = { 
                "jobId": `${this.state.jobDetails.id}`, 
                "customerId": `${this.state.jobDetails.customerId}`, 
                "workerId": `${this.state.jobDetails.workerId}`, 
                "status": "FOLLOWEDUP",
            } 
            ref.update(data).then((thenRes) => {
                let toSendData = { 
                    "id": this.state.jobDetails.id,
                    "price":this.state.totalPrice, 
                    "followUpDate":this.state.saveDateDB, 
                    "jobMaterialId": this.state.materialsId, 
                    "jobStartTime": this.state.jobDetails.jobStartTime, 
                    "jobEndTime": this.state.jobDetails.jobEndTime,
                    "hours": this.state.hours,
                    "expectedTimeInterval": this.state.jobDetails.expectedTimeInterval,
                };
                api.post('Jobs/followUpStart', toSendData).then((res) => {
                    if (res.response.type == "Error") {
                        this.setState({ IsVisible: false });
                        Alert.alert(I18n.t('please_try_again_later'));
                    } else {
                        this.setState({ IsVisible: false });
                        AsyncStorage.removeItem("jobDetails");
                        AsyncStorage.removeItem("totalPrice");
                        AsyncStorage.removeItem("saveDateDB");
                        AsyncStorage.removeItem("materialsId");
                        this.props.navigation.navigate('AvailableJobs');
                    }
                })

                //change job status for job started
                api.post('Jobs/changeJobStatusByWorker', {
                    "id": this.state.jobDetails.id,
                    "status": 'FOLLOWEDUP',
                    "customerId": this.state.jobDetails.customerId,
                }).then((response) => {
                    api.post('Jobs/getJobDetailsById', {
                        "id": this.state.jobDetails.id,
                        "workerId": this.state.jobDetails.workerId
                    }).then((response) => {
                        this.setState({ jobDetails: response.response.message[0], loader: false});
                    }).catch((err) => {
            
                    })
                }).catch((err) => {

                })
                //job status change end //
            })
        }
    }

    startFollowUp() {
        if(this.state.saveDateDB){
            if (this.state.totalPrice !== '0.00'){
                this.setState({ IsVisible: true });

                api.post("jobMaterials/getJobMaterialByJobId", { "jobId": this.props.navigation.state.params.jobDetails.id }).then((addedList) => {
                    if (addedList.type != "Error") {
                        if(addedList.response.message.length !== 0){
                            let addedItemsList = [];
                            let isPriceAdded=true;
                            for(let i =0; i < addedList.response.message.length; i++){
                                if(!addedList.response.message[i].price){
                                isPriceAdded = false;
                                break;
                                }
                                else
                                {
                                    if (Number(addedList.response.message[i].price)!=0)
                                    {

                                    }
                                    else
                                    {
                                        isPriceAdded = false;
                                        break;
                                    }
                                }
                            }
                            if(isPriceAdded){
                                let jobIdTr = `${this.state.jobDetails.id}`;
                                let refFollowFirebase = firebase.database().ref().child('tracking');
                                refFollowFirebase.orderByChild('jobId').equalTo(jobIdTr).once('value').then((snapshot) => {
                                    this.onFollowUpCall(snapshot);
                                    setTimeout(() => {
                                        if (this.state.loader === true) {
                                            this.onFollowUpCall(snapshot);
                                            setTimeout(() => {
                                                refFollowFirebase.off();
                                                if(this.state.loader){
                                                    Alert.alert(I18n.t('internal_error_try_again'));
                                                    this.setState({ loader: false });
                                                }                                        
                                            }, 5000);
                                        }
                                    }, 5000);
                                }) 
                            } else {
                                this.setState({ loader: false, IsVisible: false });
                                Alert.alert(I18n.t('please_add_price_for_material'));
                            }
                        } else {
                            Alert.alert(I18n.t('please_add_a_material'));
                            this.setState({ loader: false, IsVisible: false });
                        }
                    }
                }).catch((err) => {
                    this.setState({ loader: false });
                })
            } else {
                Alert.alert(I18n.t('please_add_price_material_to_submit'));
            }
        } else {
            Alert.alert(I18n.t('please_select_time_date'));
        }
        
                
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.refs && this.refs.ScrollViewStart)
                this.refs.ScrollViewStart.scrollToEnd();
        }, 50);


        // AsyncStorage.getItem("currency").then((value) => {
        //     if (value) {
        //         const value1 = JSON.parse(value);
        //         this.setState({ currency: value1.language })
        //     }
        // }).catch((err) => {
        // });

        this.setState({ currency: this.props.navigation.state.params.jobDetails.currency.name });

        if (this.props.navigation.state.params.jobDetails) {
            AsyncStorage.setItem("jobDetails", JSON.stringify(this.props.navigation.state.params.jobDetails)).then((res) => {
                this.setState({ jobDetails: this.props.navigation.state.params.jobDetails })
            }).catch((err) => {

            })
        }
        else {
            AsyncStorage.getItem("jobDetails").then((value) => {
                if (value) {
                    this.setState({ jobDetails: JSON.parse(value) });
                }
            })
        }
        if (this.props.navigation.state.params.totalPrice) {
            // AsyncStorage.setItem("totalPrice", this.props.navigation.state.params.totalPrice).then((res) => {
            //     this.setState({ totalPrice: this.props.navigation.state.params.totalPrice });
            // })
        }
        else {
            // AsyncStorage.getItem("totalPrice").then((value) => {
            //     if (value) {
            //         this.setState({ totalPrice: value });
            //     }
            // })
        }
        if (this.props.navigation.state.params.saveDateDB) {
            AsyncStorage.setItem("saveDateDB", this.props.navigation.state.params.saveDateDB).then((res) => {
                this.setState({ saveDateDB: this.props.navigation.state.params.saveDateDB });
            })

        }
        else {
            AsyncStorage.getItem("saveDateDB").then((value) => {
                if (value) {
                    this.setState({ saveDateDB: value });
                }
            })
        }
        if (this.props.navigation.state.params.materialsId) {
            AsyncStorage.setItem("materialsId", this.props.navigation.state.params.materialsId.toString()).then((res) => {
                this.setState({ materialsId: this.props.navigation.state.params.materialsId });
            })
        }
        else {
            AsyncStorage.getItem("materialsId").then((value) => {
                if (value) {
                    this.setState({ materialsId: value });
                }
            })
        }
        let jobId =  this.props.navigation.state.params.jobDetails.id;
        api.post("jobMaterials/getJobMaterialByJobId", { "jobId": jobId }).then((addedList) => {                
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
                        totalPrice: item.count * item.materials.price
                        };
                    addedItemsList.push(item1);
                });
                let totalPrice = 0;
                if (addedItemsList.length){
                    addedItemsList.map((item) => {
                        totalPrice = totalPrice + Number(item.price);
                    }); 
                }
                totalPrice = totalPrice + 50;
                totalPrice = totalPrice.toFixed(2);
                this.setState({
                        loader: false, 
                        addedMaterialsList: addedItemsList,
                        totalPrice: totalPrice
                });
            }
        }).catch((err) => {
            this.setState({ loader: false });
        })

    }


    StartJobSlide() {

    }


    subtractHours() {
        if (this.state.hours == 1) {

        }
        else {
            let hours = this.state.hours;
            hours = hours - 1;
            this.setState({ hours: hours });
        }
    }
    addHours() {
        let hours = this.state.hours;
        hours = hours + 1;
        this.setState({ hours: hours });
    }


    render() {
        return (
            <Container >
                <FSpinner visible={this.state.IsVisible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Header style={styles.appHdr2} noShadow androidStatusBarColor="#81cdc7" >
                    <Button transparent onPress={() => this.props.navigation.goBack()} style={{ width: 30 }}>
                        <Ionicons name="ios-arrow-back" style={styles.headIcon2} />
                    </Button>
                    <Body style={styles.headBody}>
                        <Title>{I18n.t('followUp')}</Title>
                    </Body>
                </Header>

                <Content style={styles.bgWhite} >

                    <Card>

                        <CardItem style={styles.menuCarditem}>
                            <View style={styles.menuCardView}  >
                                <Image source={icon2} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('hours')}</Text>
                                <View style={styles.arw_lft}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                        <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: '#81cdc7', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.subtractHours()}>
                                            <FontAwesome name='minus' style={{ fontSize: 14, color: '#fff' }} />

                                        </TouchableOpacity>
                                        <View style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>
                                                {this.state.hours}
                                            </Text>
                                        </View>

                                        <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: '#81cdc7', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.addHours()}>
                                            <FontAwesome name="plus" style={{ fontSize: 14, color: '#fff' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate('FollowUpDate', { jobDetails: this.props.navigation.state.params.jobDetails })} >
                                <Image source={icon3} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('date_timing')}</Text>
                                <View style={styles.arw_lft}>
                                    <Text>
                                        {this.state.saveDateDB}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <TouchableOpacity style={styles.menuCardView} onPress={() => this.props.navigation.navigate("AddMaterial", { jobDetails: this.state.jobDetails })}>
                                <Image source={icon4} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('materials')}</Text>
                                <View style={styles.arw_lft}>
                                    <Image source={back_arow} style={styles.arw_lft_img} />
                                </View>
                            </TouchableOpacity>
                        </CardItem>

                        <CardItem style={styles.menuCarditem}>
                            <View style={styles.menuCardView}  >
                                <Image source={icon5} style={styles.menuCardIcon} />
                                <Text style={styles.menuCardTxt}>{I18n.t('total')}</Text>
                                <View style={styles.arw_lft}>
                                    <Text>
                                        {this.state.currency} {this.state.totalPrice}
                                    </Text>
                                </View>
                            </View>
                        </CardItem>

                    </Card>

                </Content>
                <Footer>
                    <ScrollView
                        ref='ScrollViewStart'
                        pagingEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={400}
                        onScrollEndDrag={() => this.StartJobSlide()}
                        style={{ width: '100%' }}>
                        <View style={{ width: win, backgroundColor: 'white', paddingLeft: 10, paddingRight: 10 }}>
                            <TouchableOpacity
                                style={{ flex: 1, alignItems: 'center', backgroundColor: '#81cdc7', justifyContent: 'center', marginTop: 3, borderRadius: 5 }}
                                activeOpacity={1}
                                onPress={() => this.startFollowUp()}
                            >
                                <Text style={{ color: '#fff' }}>{I18n.t('submit')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: win, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                            <View style={{ backgroundColor: '#81cdc7', paddingLeft: 10, paddingRight: 10 }}>
                                <FontAwesome name="angle-right" style={{ color: '#fff', fontSize: 40 }} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 15 }}>
                                <Text>{I18n.t('slide_to_click_submit')}</Text>
                            </View>
                        </View>

                    </ScrollView>
                </Footer>

            </Container>
        );
    }
}


export default FollowUpList;
