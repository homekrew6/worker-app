import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from "react-navigation";
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, ListView, Geolocation, platform, AsyncStorage } from "react-native";
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, List, ListItem, Icon, Tab, Tabs, ScrollableTab, Body, Title } from "native-base";
import FSpinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import I18n from '../../i18n/i18n';
import { availablejobs, setNewData, acceptJob, declineJob } from './elements/jobActions'
const imageIcon1 = require('../../../img/icon/home.png');

class TotalBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: 'USD'
        };
    }

componentDidMount() {

    AsyncStorage.getItem("currency").then((value) => {
        if (value) {
            const value1 = JSON.parse(value);
            this.setState({ currency: value1.language })
        }
    })
}

    render() {
        

        return (

            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Header style={styles.headerWarp} noShadow noShadow androidStatusBarColor="#81cdc7" onPress={() => this.props.navigation.goBack()}>
                    <Button transparent style={{ width: 30 }}>
                        <Ionicons name="ios-arrow-back" style={styles.headIcon2} />
                    </Button>
                    <Body style={styles.headBody}>
                        <Title>Total Bill</Title>
                    </Body>
                    <Button transparent style={{ width: 30, backgroundColor: 'transparent' }} disabled={true}/>
                </Header>
                <Content>
                    <View style={styles.totalBillitem}>
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
                    </View>
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
