import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'moment-timezone';
import { Image, View, StatusBar, AsyncStorage, Text, TouchableOpacity } from "react-native";
import { Container, Header, Button, Content, Body, Title } from "native-base";

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import I18n from '../../i18n/i18n';
import api from '../../api/index';
import { availablejobs, setNewData, acceptJob, declineJob } from './elements/jobActions'

const logo_hdr = require("../../../img/logo2.png");
const totalImg = require("../../../img/icon/coins.png");
class TotalBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonAnswer: [],
            currency: 'AED',
            totalPrice: 0,
            materialTotalPrice: 0,
            grndtotal: 0,
            commission:'0.0'
        };
    }

componentDidMount() {

    AsyncStorage.getItem("currency").then((value) => {
        if (value) {
            const value1 = JSON.parse(value);
            this.setState({ currency: value1.language })
        }
    });
    let jodId = this.props.navigation.state.params.jobDetails.id;
    if(this.props.navigation.state.params.jobDetails && this.props.navigation.state.params.jobDetails.worker && this.props.navigation.state.params.jobDetails.worker.commission)
    {
        this.setState({commission:this.props.navigation.state.params.jobDetails.worker.commission});
    }
        api.post('jobSelectedQuestions/getJobSelectedAnswerList', { "id": jodId }).then((resAns) => {
            if(resAns.response.message.length && resAns.response.message.length>0 && resAns.response.message[0].questionList)
            {
  let jsonAnswer = JSON.parse(resAns.response.message[0].questionList);
            let finalList = [];
            let totalPrice=0;
            for (let i = 0; i < jsonAnswer.length; i++) {
                if (jsonAnswer[i].type != 5) {
                  
                    let price = this.CalculatePrice(jsonAnswer[i].type,
                        jsonAnswer[i].answers[0].option_price_impact,
                        jsonAnswer[i].answers[0].price_impact,
                        jsonAnswer[i].answers[0].time_impact,
                        jsonAnswer[i].IncrementId,
                        jsonAnswer[i].Status,
                        jsonAnswer[i].answers, jsonAnswer[i].start_range, jsonAnswer[i].rangeValue )
                        
                        if(price)
                        {
                            totalPrice = totalPrice + price;
                            price = parseFloat(price).toFixed(2);
                            jsonAnswer[i].price = price;
                        }
                       
                        jsonAnswer[i].option_price_impact = jsonAnswer[i].answers[0].option_price_impact;

                        if(jsonAnswer[i].type != 3){
                            jsonAnswer[i].priceImp = jsonAnswer[i].answers[0].price_impact;
                            jsonAnswer[i].priceImp = jsonAnswer[i].priceImp;
                        }
                        else{
                            jsonAnswer[i].answers.map((ans1)=>{
                                if( ans1.selected == true ){
                                    jsonAnswer[i].priceImp = ans1.price_impact;
                                    jsonAnswer[i].priceImp = jsonAnswer[i].priceImp;
                                }
                            })
                        }
                        finalList.push(jsonAnswer[i]);
                }

            }
            totalPrice=parseFloat(totalPrice).toFixed(2);
            this.setState({ jsonAnswer: jsonAnswer, totalPrice:totalPrice });
            }
          
            api.post('jobMaterials/getJobMaterialByJobId', { "jobId": jodId }).then((materialAns) => {
                let materialList = materialAns.response.message;
                materialTotalPrice = 0;
                materialList.map((materialItem)=>{
                    if(materialItem.materials){
                        materialTotalPrice = Number(materialTotalPrice) + Number(materialItem.price);
                    }
                })
                materialTotalPrice =parseFloat( materialTotalPrice).toFixed(2);
                this.setState({
                    materialTotalPrice: materialTotalPrice,
                })
                let grndtotal = (parseFloat(this.state.totalPrice) + parseFloat(this.state.materialTotalPrice)).toFixed(2);
                this.setState({
                    grndtotal: grndtotal,
                })
                
            }).catch(err => {
                
            });

        })
}
    CalculatePrice(type, impact_type, price_impact, time_impact, impact_no, BoolStatus, AnsArray, start_range,
        rangeValue) {
  
        let retPrice;
        let totalPrice=0;
        switch (type) {
            case 1:
                if (impact_type === 'Addition') {
                    //retPrice = Number(price_impact) + Number(impact_no);
                    impact_no = Number(impact_no);
                    for (let i = 1; i <= impact_no; i++) {
                        totalPrice = totalPrice + i + Number(price_impact);
                    }
                } else {
                    impact_no = Number(impact_no);
                    for (let i = 1; i <= impact_no; i++) {
                        totalPrice = totalPrice + (i * Number(price_impact));
                    }
                    //retPrice = Number(price_impact) * Number(impact_no);
                }

                //this.setState({ totalPrice: this.state.totalPrice + retPrice });

                return totalPrice;
                break;
            case 4:
                if (rangeValue) {
                    if (impact_type === 'Addition') {
                        //retPrice = Number(price_impact) + Number(impact_no);
                        totalPrice = totalPrice + (start_range + Number(price_impact));
                    } else {
                        totalPrice = totalPrice + (start_range * Number(price_impact));

                        //retPrice = Number(price_impact) * Number(impact_no);
                    }
                    return totalPrice;
                }
                break;
            case 2:
                if (BoolStatus) {

                    //this.setState({ totalPrice: this.state.totalPrice + retPrice });
                    retPrice = Number(price_impact);
                    return retPrice ;

                } else {
                    return null;
                }
                break;
            case 3:
                AnsArray.map((ansData) => {
                    if (ansData.selected) {
                        retPrice = Number(ansData.price_impact);
                    }
                })

                //this.setState({ totalPrice: this.state.totalPrice + retPrice });

                return retPrice;
                break;

        }
    }

    render() {
        

        return (

            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Header style={styles.headerWarp} noShadow noShadow androidStatusBarColor="#81cdc7" onPress={() => this.props.navigation.goBack()}>
                    <TouchableOpacity transparent activeOpacity={0.5} style={{ width: 40, justifyContent: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" style={styles.headIcon2} />
                    </TouchableOpacity>
                    <Body style={styles.headBody}>
                        <Title><Text>{I18n.t('total_bill')}</Text></Title>
                    </Body>
                    <TouchableOpacity activeOpacity={1} style={{ width: 40, justifyContent: 'center', alignItems: 'flex-end' }} /> 
                </Header>
                <Content style={styles.bgWhite}>
                     <View style={{ flex: 1 }} >
                        {
                            this.state.jsonAnswer.length > 0 ?
                                this.state.jsonAnswer.map((AnsList, key) => {
                                    return (
                                        AnsList.type === 5 ? null :
                                            <View key={key} style={styles.totalBillitem}>
                                                <View style={styles.imagesWarp} >
                                                {
                                                    AnsList.image? (
                                                        <Image source={{uri: AnsList.image}} style={styles.totalImage} />
                                                    ): (
                                                        <Image source={logo_hdr} style={styles.totalImage} />
                                                    )

                                                }
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={[styles.text1, { fontSize: 12 }]}>{AnsList.name}</Text>
                                                </View>
                                                <View style={{ width: 80 }}>
                                                {
                                                    AnsList.type === 1? (
                                                        <Text style={[styles.text2, { fontSize: 12 }]}>{AnsList.IncrementId}</Text>
                                                    ):(null)
                                                }
                                                {
                                                    AnsList.priceImp ? (
                                                        <Text style={[styles.text2, { color: '#ccc', fontSize: 12 }]}>{AnsList.option_price_impact == 'Addition'? '+ ': 'x '}{ this.state.currency} { (AnsList.priceImp)}</Text>
                                                    ):(null)
                                                }
                                                    
                                                </View>
                                                <View style={[ styles.price ]}>
                                                    <Text style={[styles.priceText, { color: '#ccc', fontSize: 12 }]} >{this.state.currency}
                                                        {
                                                            AnsList.price
                                                        }
                                                    </Text>
                                                </View>
                                            </View>

                                    )
                                }) : null
                        }

                        <View style={styles.totalBillitem}>
                            <View style={styles.imagesWarp} >
                                <Image source={logo_hdr} style={styles.totalImage} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.text1, { fontSize: 12 }]}>{I18n.t('materials')}</Text>
                            </View>
                            <View style={[ styles.price ]}>
                                <Text style={[styles.priceText, { color: '#ccc', fontSize: 12 }]} >{this.state.currency}
                                    {
                                        (this.state.materialTotalPrice)
                                    }
                                </Text>
                            </View>
                        </View>

                        <View style={styles.totalBillitem}>
                            <View style={styles.imagesWarp} >
                                <Image source={totalImg} style={styles.totalImage} />
                            </View>
                            <View>
                                <Text  style={styles.text1}>{I18n.t('total')}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text></Text>
                            </View>
                            <View style={styles.price}>
                                <Text style={styles.priceText}>{this.state.currency} {this.state.grndtotal}</Text>
                            </View>
                        </View>
                         <View>
                        <Text style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10 }}>{I18n.t('commission')}</Text>
                    </View>
                    <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/coins.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>{I18n.t('total')}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                           
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>{this.state.currency} {this.state.commission}</Text>
                        </View>
                    </View> 
                    </View>
                    
                    {/* <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/flower.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>Need Yes</Text>
                        </View>
                        <View style={{ flex: 1  }}>
                            <Text style={styles.text2}>2 Bedroom</Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}></Text>
                        </View>
                    </View>
                    <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/lightbulb.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>Bulbs to change</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text2}>2</Text>
                        </View>
                        <View style={styles.price}>
                        </View>
                    </View>
                    <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/wrench-tool-in-a-hand.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>Light Fixtures</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text2}>2</Text>
                        </View>
                        <View style={styles.price}>
                        </View>
                    </View>
                    <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/timer.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>Hours</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text2}>2</Text>
                            <Text style={[styles.text2, { color: '#ccc', fontSize: 12 }]}>x {this.state.currency} 50</Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>{this.state.currency} 60.00</Text>
                        </View>
                    </View>
                    <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/standing-up-man-.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>Cleaners</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text2}>2</Text>
                            <Text style={[styles.text2, { color: '#ccc', fontSize: 12 }]}>x {this.state.currency} 50</Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>{this.state.currency} 60.00</Text>
                        </View>
                    </View>
                    <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/shopping-cart.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>Materials</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>{this.state.currency} 60.00</Text>
                        </View>
                    </View>
                    <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/coins.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>Total</Text>
                        </View>
                        <View style={{ flex: 1 }}>

                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>{this.state.currency} 60.00</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10 }}>Commission</Text>
                    </View>
                    <View style={styles.totalBillitem}>
                        <View>
                            <Image source={require('../../../img/icon/coins.png')} style={styles.totalImage} />
                        </View>
                        <View>
                            <Text style={styles.text1}>Total</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                           
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.priceText}>{this.state.currency} 60.00</Text>
                        </View>
                    </View> */}
                </Content>
            </Container>
        )
    }
}

TotalBill.propTypes = {
    auth: PropTypes.object.isRequired,
    availableJobs: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        availableJobs: state.availableJobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        availablejobs: (id) => dispatch(availablejobs(id)),
        setNewData: (data) => dispatch(setNewData(data)),
        acceptJob: (jobId, workerId) => dispatch(acceptJob(jobId, workerId)),
        declineJob: (jobId, workerId, serviceId) => dispatch(declineJob(jobId, workerId, serviceId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalBill);
