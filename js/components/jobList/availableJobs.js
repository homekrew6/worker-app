import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import { Image, RefreshControl, View, StatusBar, Alert, TouchableOpacity, ListView, AsyncStorage, Text } from "react-native";
import { Container, Header, Button, Content, List, ListItem, Tab, Tabs, ScrollableTab, Body } from "native-base";
import FSpinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import I18n from '../../i18n/i18n';
import api from '../../api/index';
import { availablejobs, setNewData, acceptJob, declineJob } from './elements/jobActions';
import { navigateAndSaveCurrentScreen } from '../accounts/elements/authActions';


class AvailableJobs extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            finalJobData: [],
            listItemFlag: false,
            loader: false,
            currency: 'AED',
            refreshing: false,
            backReturn: false,
            availableJobs: {},
            IsProfileDisabled: false,
        };
    }

    getLocalTimeFormat(gmtTime){
        // const gmtToDeiveTimeObj = moment.tz(gmtTime, "Europe/London");
        // const timezoneDevice = DeviceInfo.getTimezone();
        // const gmtToDeiveTime = gmtToDeiveTimeObj.clone().tz(timezoneDevice).format('ddd DD-MMM-YYYY hh:mm A');
        // return gmtToDeiveTime;
        let dateNow = new Date();
        var nUTC_diff = dateNow.getTimezoneOffset();
        let slicedDate = gmtTime.slice(0, -4);
        let timeToMan = Math.abs(nUTC_diff);
        let utc_check = Math.sign(nUTC_diff);
        let localTime;
        if(utc_check === 1 || utc_check === 0) {
            localTime = moment(slicedDate).subtract(timeToMan, 'minutes').format('ddd DD-MMM-YYYY hh:mm A');
        }else{
            localTime = moment(slicedDate).add(timeToMan, 'minutes').format('ddd DD-MMM-YYYY hh:mm A');
        }
        return localTime;
    }
    getTimeDiffLocal(gmtTime){
       

        // const gmtToDeiveTimeObj = moment.tz(gmtTime, "Europe/London");
        // const timezoneDevice = DeviceInfo.getTimezone();
        // const gmtToDeiveTime = gmtToDeiveTimeObj.clone().tz(timezoneDevice).format();
        let getLocalTime = this.getLocalTimeFormat(gmtTime);
        let gmtToDeiveTime = moment(getLocalTime);
        //const timeDiffNow = moment(gmtToDeiveTime, "YYYY-MM-DD hh:mm:ss a").fromNow();
        const now = new Date();
        const timeDur = moment.duration({ from: now, to: gmtToDeiveTime });
        let hourDiff = {  };
        let intValueText = 'Starts in ';
        if (Math.sign(timeDur._data.hours) === 1 || Math.sign(timeDur._data.hours) === 0){
            //positive
            //hourDiff.startTime = Math.abs(timeDur._data.hours);
            hourDiff.timeInt = true;
            if(timeDur._data.years > 0){
                hourDiff.startTime = intValueText + Math.abs(timeDur._data.years) + " Year";
            } else if(timeDur._data.months > 0){
                if(timeDur._data.months === 1){
                    hourDiff.startTime = intValueText + Math.abs(timeDur._data.months) + " Month";
                }else{
                    hourDiff.startTime = intValueText + Math.abs(timeDur._data.months) + " Months";
                }
            } else if(timeDur._data.days > 0){
                if(timeDur._data.days === 1){
                    hourDiff.startTime = intValueText + Math.abs(timeDur._data.days) + " day";
                }else{
                    hourDiff.startTime = intValueText + Math.abs(timeDur._data.days) + " days";
                }
            } else if(timeDur._data.hours > 0){
                if(timeDur._data.hours === 1){
                    hourDiff.startTime = intValueText + Math.abs(timeDur._data.hours) + " hour";
                }else{
                    hourDiff.startTime = intValueText + Math.abs(timeDur._data.hours) + " hours";
                }
            } else if(timeDur._data.minutes > 0){
                if(timeDur._data.minutes === 1){
                    hourDiff.startTime = intValueText + Math.abs(timeDur._data.minutes) + " minute";
                }else{
                    hourDiff.startTime = intValueText + Math.abs(timeDur._data.minutes) + " minutes";
                }
            } else{
                hourDiff.startTime = intValueText + Math.abs(timeDur._data.seconds) + " second";
            }
        }else{
            //negative
            hourDiff.timeInt = false;
            let checkHour = Math.abs(timeDur._data.hours);
            hourDiff.startTime = " This Job got closed";
        }
        return hourDiff;
    }

    goDetails(item){
        this.setState({ IsProfileDisabled: true });
        setTimeout(() => {
            this.setState({ IsProfileDisabled: false });
        }, 3000);
        const data = this.props.auth.data;
        data.activeScreen = 'JobDetails';
        data.previousScreen = "AvailableJobs";
        this.props.navigateAndSaveCurrentScreen(data);
        this.props.navigation.navigate('JobDetails',{jobDetails:item});
    }

    componentDidMount() {
       
        this.jobdata();
        AsyncStorage.getItem("currency").then((value) => {
            if (value) {
                const value1 = JSON.parse(value);
                this.setState({ currency: value1.language })
            }
        });
    }
    goNotification(){
        this.setState({ IsProfileDisabled: true });
        setTimeout(() => { this.setState({ IsProfileDisabled: false }); }, 3000);
        this.props.navigation.navigate('NotificationList')
    }
   
    jobdata() {
        let id = this.props.auth.data.id;
        this.props.availablejobs(id, moment.tz.guess()).then(res => {
            let data = { data: {}};
            data.data = res;
            this.setState({
                listItemFlag: true,
                loader: false,
                availableJobs: data,
            });
        }).catch(err => {
            this.setState({
                loader: false
            });
        });
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    //bala: Start~
    
    IgnoreJob(data){
        this.setState({
            loader: true
        })
        let jobId = data.id;
        let workerId = this.props.auth.data.id;
        let serviceId = data.serviceId;
        let language = this.props.auth.data.language ? this.props.auth.data.language : 'en';
        api.post('Jobs/ignoreJob', { "id": jobId, "workerId": workerId, "serviceId": serviceId, 'currencyId': data.currencyId, 'language': language}).then((resIgnore) => {
            if (resIgnore.response.type == "Error") {
                Alert.alert('', resIgnore.response.message);
                this.setState({ loader: false });
            } else {
                this.jobdata();
            }
        }).catch((errCatch) => {
            Alert.alert(I18n.t('failed_please_try_again'));
        })
    }

    declineJob(data){
        this.setState({
            loader: true
        })
        let jobId = data.id;
        let workerId = this.props.auth.data.id;
        let serviceId = data.serviceId;
        
        this.props.declineJob(jobId, workerId, serviceId).then(res => {
                this.jobdata();                
        }).catch(err => {
            this.setState({
                loader: false
            })
        })
    }

    //bala: End

    acceptJob(data) {
        this.setState({ loader: true });
        let jobId = data.id;
        let workerId = this.props.auth.data.id;
        let customerId=data.customer.id;
        let language = this.props.auth.data.language ? this.props.auth.data.language: 'en';

        api.post('Jobs/acceptJob', { "id": jobId, "status": "ACCEPTED", "workerId": workerId, "customerId": customerId, "language": language}).then(responseJson => {
            if (responseJson.response.type == "Error"){
                Alert.alert('', responseJson.response.message);
                this.setState({ loader: false });                
            }else{
                this.setState({ loader: false });
                this.props.navigation.navigate('JobDetails', { jobDetails: data });
            }
        }).catch(err => {
        })
    }

    onRefresh(){
        this.jobdata();
    }


    render() {

        let items;
        if (this.state.availableJobs.data) {
            items = this.state.availableJobs.data.response.message.upcomingJobs;
        }
        if (this.state.availableJobs.data){


            const dateList = [];
            this.state.availableJobs.data.response.message.upcomingJobs.map((data, key) => {
                let dateConvertAva = new Date(data.postedDate);
                let dataFormatAva = moment(dateConvertAva).format('DD MMM YYYY');
                dateList.push(dataFormatAva);

            });
            const uniqueList = dateList.filter(this.onlyUnique);
            const sortedList = uniqueList.sort(function(a,b){
                const retValue = new Date(a) - new Date(b);
                return retValue;
            });
            let finalArray = [];
            sortedList.map((dateOne, key) => {
            let dateNow = new Date();
            let nowDateFormat = moment(dateNow).format('DD MMM YYYY');
            let convertedDate = new Date(dateOne);
            let dateNew = moment(convertedDate).format('DD MMM YYYY');

            var tomorrow = new Date();
            tomorrow.setDate(dateNow.getDate()+1);
            let tomorrowFormat = moment(tomorrow).format('DD MMM YYYY');

            if(nowDateFormat === dateNew){
                dateNew = 'Today';
            }else if (tomorrowFormat === dateNew) {
                dateNew = 'Tomorrow';
            }
            let finalObject = {date: dateNew, data: []};
            this.state.availableJobs.data.response.message.upcomingJobs.map((dataNew, key) => {
                let timeDiffNowRet = this.getTimeDiffLocal(dataNew.postedDate);
                let postDateCompare = new Date(dataNew.postedDate);
                if(dateOne === moment(postDateCompare).format('DD MMM YYYY')){
                    dataNew.startTime = timeDiffNowRet;
                    finalObject.data.push(dataNew);

                }
            })
            finalArray.push(finalObject);
        })
        finalArray.map((item)=>{
                item.data.map((item1)=>{
                    if(item1.price && typeof(item1.price) !='string')
                    {
                        item1.price=item1.price.toFixed(2);
                    }
                });
            });
        // upcoming jobs

            const dateList2 = [];
            this.state.availableJobs.data.response.message.acceptedJobs.map((data, key) => {
                let dateConvertUpa = new Date(data.postedDate);
                let dataFormatUpa = moment(dateConvertUpa).format('DD MMM YYYY');
                dateList2.push(dataFormatUpa);
            })
            const uniqueList2 = dateList2.filter(this.onlyUnique);
            const sortedList2 = uniqueList2.sort(function (a, b) {
                const retValue = new Date(a) - new Date(b);
                return retValue;
            });

            let finalArray2 = [];
            sortedList2.map((dateOne, key) => {

                let dateNow = new Date();
                let nowDateFormat = moment(dateNow).format('DD MMM YYYY');
                let convertedDate = new Date(dateOne);
                let dateNew = moment(convertedDate).format('DD MMM YYYY');

                var tomorrow = new Date();
                tomorrow.setDate(dateNow.getDate() + 1);
                let tomorrowFormat = moment(tomorrow).format('DD MMM YYYY');

                if (nowDateFormat === dateNew) {
                    dateNew = 'Today';
                } else if (tomorrowFormat === dateNew) {
                    dateNew = 'Tomorrow';
                }
                let finalObject = { date: dateNew, data: [] };
                this.state.availableJobs.data.response.message.acceptedJobs.map((dataNew, key) => {
                    let timeDiffNowRet = this.getTimeDiffLocal(dataNew.postedDate);
                    let postDateCompare = new Date(dataNew.postedDate);
                    if (dateOne === moment(postDateCompare).format('DD MMM YYYY')) {
                        dataNew.startTime = timeDiffNowRet;
                        finalObject.data.push(dataNew);
                    }
                })

                finalArray2.push(finalObject);

            });
            finalArray2.map((item)=>{
                item.data.map((item1)=>{
                    if(item1.price && typeof(item1.price) !='string'){
                        item1.price=item1.price.toFixed(2);
                    }
                });
            });




             // ongoing jobs

             const dateListOnGoing = [];
             this.state.availableJobs.data.response.message.onGoingJobs.map((data, key) => {
                 let dateConvertUpa = new Date(data.postedDate);
                 let dataFormatUpa = moment(dateConvertUpa).format('DD MMM YYYY');
                 dateListOnGoing.push(dataFormatUpa);
             })
             const uniqueList3 = dateListOnGoing.filter(this.onlyUnique);
             const sortedList3 = uniqueList3.sort(function (a, b) {
                 const retValue = new Date(a) - new Date(b);
                 return retValue;
             });

             let finalArray3 = [];
             sortedList3.map((dateOne, key) => {

                 let dateNow = new Date();
                 let nowDateFormat = moment(dateNow).format('DD MMM YYYY');
                 let convertedDate = new Date(dateOne);
                 let dateNew = moment(convertedDate).format('DD MMM YYYY');

                 var tomorrow = new Date();
                 tomorrow.setDate(dateNow.getDate() + 1);
                 let tomorrowFormat = moment(tomorrow).format('DD MMM YYYY');

                 if (nowDateFormat === dateNew) {
                     dateNew = 'Today';
                 } else if (tomorrowFormat === dateNew) {
                     dateNew = 'Tomorrow';
                 }
                 let finalObject = { date: dateNew, data: [] };
                 this.state.availableJobs.data.response.message.onGoingJobs.map((dataNew, key) => {
                     let timeDiffNowRet = this.getTimeDiffLocal(dataNew.postedDate);
                     let postDateCompare = new Date(dataNew.postedDate);
                     if (dateOne === moment(postDateCompare).format('DD MMM YYYY')) {
                         dataNew.startTime = timeDiffNowRet;
                         finalObject.data.push(dataNew);
                     }
                 })

                 finalArray3.push(finalObject);

             });
             finalArray3.map((item)=>{
                 item.data.map((item1)=>{
                     if(item1.price && typeof(item1.price) !='string'){
                         item1.price=item1.price.toFixed(2);
                     }
                 });
             });


             //complete job
             const dateListComp = [];
             this.state.availableJobs.data.response.message.completedJobs.map((data, key) => {
                 let dateConvertUpa = new Date(data.postedDate);
                 let dataFormatUpa = moment(dateConvertUpa).format('DD MMM YYYY');
                 dateListComp.push(dataFormatUpa);
             })
             const uniqueList4 = dateListComp.filter(this.onlyUnique);
             const sortedList4 = uniqueList4.sort(function (a, b) {
                 const retValue = new Date(a) - new Date(b);
                 return retValue;
             });

             let finalArray4 = [];
             sortedList4.map((dateOne, key) => {

                 let dateNow = new Date();
                 let nowDateFormat = moment(dateNow).format('DD MMM YYYY');
                 let convertedDate = new Date(dateOne);
                 let dateNew = moment(convertedDate).format('DD MMM YYYY');

                 var tomorrow = new Date();
                 tomorrow.setDate(dateNow.getDate() + 1);
                 let tomorrowFormat = moment(tomorrow).format('DD MMM YYYY');

                 if (nowDateFormat === dateNew) {
                     dateNew = 'Today';
                 } else if (tomorrowFormat === dateNew) {
                     dateNew = 'Tomorrow';
                 }
                 let finalObject = { date: dateNew, data: [] };
                 this.state.availableJobs.data.response.message.completedJobs.map((dataNew, key) => {
                     let timeDiffNowRet = this.getTimeDiffLocal(dataNew.postedDate);
                     let postDateCompare = new Date(dataNew.postedDate);
                     if (dateOne === moment(postDateCompare).format('DD MMM YYYY')) {
                         dataNew.startTime = timeDiffNowRet;
                         finalObject.data.push(dataNew);
                     }
                 })

                 finalArray4.push(finalObject);

             });
             finalArray4.map((item)=>{
                 item.data.map((item1)=>{
                     if(item1.price && typeof(item1.price) !='string'){
                         item1.price=item1.price.toFixed(2);
                     }
                 });
             });


             //////////////////////////////////////////////////////////////////
             //complete job
            //  const dateListCancel = [];
            //  this.state.availableJobs.data.response.message.completedJobs.map((data, key) => {
            //      let dateConvertCan = new Date(data.postedDate);
            //      let dataFormatCan = moment(dateConvertCan).format('DD MMM YYYY');
            //      dateListCancel.push(dataFormatCan);
            //  })
            //  const uniqueList5 = dateListCancel.filter(this.onlyUnique);
            //  const sortedList5 = uniqueList5.sort(function (a, b) {
            //      const retValue = new Date(a) - new Date(b);
            //      return retValue;
            //  });

            //  let finalArray5 = [];
            //  sortedList5.map((dateOne, key) => {

            //      let dateNow = new Date();
            //      let nowDateFormat = moment(dateNow).format('DD MMM YYYY');
            //      let convertedDate = new Date(dateOne);
            //      let dateNew = moment(convertedDate).format('DD MMM YYYY');

            //      var tomorrow = new Date();
            //      tomorrow.setDate(dateNow.getDate() + 1);
            //      let tomorrowFormat = moment(tomorrow).format('DD MMM YYYY');

            //      if (nowDateFormat === dateNew) {
            //          dateNew = 'Today';
            //      } else if (tomorrowFormat === dateNew) {
            //          dateNew = 'Tomorrow';
            //      }
            //      let finalObject = { date: dateNew, data: [] };
            //      this.state.availableJobs.data.response.message.completedJobs.map((dataNew, key) => {
            //          let timeDiffNowRet = this.getTimeDiffLocal(dataNew.postedDate);
            //          let postDateCompare = new Date(dataNew.postedDate);
            //          if (dateOne === moment(postDateCompare).format('DD MMM YYYY')) {
            //              dataNew.startTime = timeDiffNowRet;
            //              finalObject.data.push(dataNew);
            //          }
            //      })

            //      finalArray5.push(finalObject);

            //  });
            //  finalArray5.map((item)=>{
            //      item.data.map((item1)=>{
            //          if(item1.price && typeof(item1.price) !='string'){
            //              item1.price=item1.price.toFixed(2);
            //          }
            //      });
            //  });

        return (

            <Container >

                <StatusBar
                    backgroundColor="#f3f3f3"
                />

                <Header style={styles.headerWarp} noShadow androidStatusBarColor="#f3f3f3">
                    <TouchableOpacity transparent onPress={() => 
                    {
                        this.setState({ IsProfileDisabled: true });
                        setTimeout(() => {
                            this.setState({ IsProfileDisabled: false });
                        }, 3000);
                        this.props.navigation.navigate('Menu')
                    }
                        } activeOpacity={0.5} style={{ width: 40, justifyContent: 'center' }}
                        disabled={this.state.IsProfileDisabled}
                        >
                        <MaterialIcons name="menu" style={styles.headIcon2} />
                    </TouchableOpacity>

                    <Body style={styles.headBody}>
                        <Image source={require('../../../img/logo2.png')} style={{ height: 20, width: 115 }}/>
                    </Body>
                    <TouchableOpacity transparent onPress={() => this.goNotification()} activeOpacity={0.5} style={{ width: 40, justifyContent: 'center', alignItems: 'flex-end' }} disabled={this.state.IsProfileDisabled} >
                        <MaterialIcons name="notifications" style={styles.headIcon2} />
                    </TouchableOpacity>
                </Header>

                <Tabs
                    tabBarUnderlineStyle={styles.Tabs}
                    locked={true}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTab tabsContainerStyle={{ backgroundColor: '#81cdc7' }} />}
                >
                    <Tab heading={I18n.t('available_jobs')} tabStyle={{ backgroundColor: '#81cdc7', }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Content
                            refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />}
                        >
                            {
                                finalArray.length === 0 ?
                                <View style={{ alignSelf: 'center', padding: 20 }}>
                                    <Text>{I18n.t('no_job_found')}</Text>
                                </View>
                                :

                            finalArray.map((dataQ, key) => {
                                return(
                                <View key={key}>
                                    <View style={styles.dayHeading}>
                                        <Text>{dataQ.date}</Text>
                                    </View>
                                    <List
                                        dataSource={this.ds.cloneWithRows(dataQ.data)}
                                        //dataArray={dataQ.data}
                                        renderRow={( item, data ) =>
                                            <ListItem style={item.startTime.timeInt === false ? styles.jobListItemDisable : styles.jobListItem}>
                                                <TouchableOpacity
                                                    disabled={this.state.IsProfileDisabled}
                                                    style={styles.listWarp}
                                                    onPress={() => item.startTime.timeInt === true ? this.goDetails(item) : null}
                                                    activeOpacity={item.startTime.timeInt === true ? 0 : 1}
                                                >
                                                    <View style={styles.listWarp}>
                                                        <View style={styles.listWarpImageWarp}>
                                                            <Image source={{ uri: item.service.banner_image }} style={styles.listWarpImage} />
                                                        </View>
                                                        <View style={styles.listWarpTextWarp}>
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text style={{ fontWeight: 'bold' }}>{item.service?item.service.name:''}</Text>
                                                            </View>
                                                            <View style={styles.flexDirectionRow}>
                                                                {/* <Text style={[styles.fontWeight700, { fontSize: 14 }]}>
                                                                    Tuesday
                                                                </Text>
                                                                <Text style={{ fontSize: 14 }}> 10:00 AM</Text> */}
                                                                <Text style={{ fontSize: 14 }}>{item.postedDate?this.getLocalTimeFormat(item.postedDate):''}</Text>
                                                            </View>
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text>{item.userLocation ? item.userLocation.name : ''}</Text>
                                                            </View>
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text style={ item.startTime.timeInt === true ? {color: '#81cdc7'} : {color: '#FF0000'} }>{item.startTime.startTime}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ paddingLeft: 5 }}>
                                                            <Text style={styles.listWarpPriceUp}>{item.currency?item.currency.name:'AED'} {item.price}</Text>
                                                            <Text style={styles.listWarpPriceDown}>{item.service ? parseInt(item.service.time_interval / 60) + "." : ''}{item.service?item.service.time_interval % 60 < 10 ? "0" + item.service.time_interval % 60 : item.service.time_interval % 60:''} hour(s)</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </ListItem>
                                        }
                                        renderLeftHiddenRow={data =>
                                            data.startTime.timeInt === true ?
                                                <TouchableOpacity style={styles.leftAction} onPress={() => this.IgnoreJob(data)} >
                                                    <MaterialIcons name="close" style={styles.leftActionIcon} />
                                                    <Text style={styles.leftActionText}>{I18n.t('ignore_button')}</Text>
                                                </TouchableOpacity>
                                                : <View style={styles.leftAction}>
                                                </View>}

                                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                            data.startTime.timeInt === true ?
                                                <TouchableOpacity style={styles.rightAction} onPress={() => this.acceptJob(data)} >
                                                    <MaterialIcons name="done" style={styles.leftActionIcon} />
                                                    <Text style={styles.leftActionText}>{I18n.t('accept_button')}</Text>
                                                </TouchableOpacity>
                                                : <View style={styles.leftAction}>
                                                </View>}
                                        leftOpenValue={75}
                                        rightOpenValue={-75}

                                    />
                                </View>
                                )
                            })}
                        </Content>
                    </Tab>

                    <Tab heading={I18n.t('upcoming_jobs')} tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Content
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />}>
                            {
                                finalArray2.length === 0 ?
                                    <View style={{ alignSelf: 'center', padding: 20 }}>
                                        <Text>{I18n.t('no_job_found')}</Text>
                                    </View>
                                :

                            finalArray2.map((dataQ, key) => {
                                return (
                                    <View key={key}>
                                        <View style={styles.dayHeading}>
                                            <Text>{dataQ.date}</Text>
                                        </View>
                                        <List
                                            dataArray={dataQ.data}
                                            style={styles.jobList}
                                            renderRow={(item) =>
                                            <ListItem style={styles.jobListItem}>
                                                    <TouchableOpacity style={styles.listWarp} onPress={() => this.goDetails(item)} disabled={this.state.IsProfileDisabled}>
                                                    <View style={styles.listWarpImageWarp}>
                                                        <Image source={{uri: item.service.banner_image}} style={styles.listWarpImage} />
                                                    </View>
                                                    <View style={styles.listWarpTextWarp}>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text style={{ fontWeight: 'bold' }}>{item.service ? item.service.name:''}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            {/* <Text style={[styles.fontWeight700, { fontSize: 14 }]}>Tuesday </Text>
                                                            <Text style={{ fontSize: 14 }}> 10:00 AM</Text> */}
                                                            <Text style={{ fontSize: 12 }}>{item.postedDate?this.getLocalTimeFormat(item.postedDate):''}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>{item.userLocation ? item.userLocation.name : ''}</Text>
                                                        </View>
                                                        {
                                                            item.status === 'STARTED' ?
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text style={{ color: '#81cdc7', fontSize: 16 }}>{item.startTime.startTime}</Text>
                                                            </View>: null
                                                        }
                                                    </View>
                                                    <View style={{ paddingLeft: 5 }}>
                                                        <Text style={styles.listWarpPriceUp}>{item.currency.name} {item.price}</Text>
                                                        <Text style={styles.listWarpPriceDown}>{item.service ? parseInt(item.service.time_interval / 60) + "." : ''}{item.service ? item.service.time_interval % 60 < 10 ? "0" + item.service.time_interval % 60 : item.service.time_interval % 60 : ''} hour(s)</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </ListItem>}
                                        />
                                    </View>
                                )
                            })}
                        </Content>
                    </Tab>

                    {/* On going jobs */}

                    <Tab heading={I18n.t('onGoingJobs')} tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Content
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />}>
                            {
                            finalArray3.length === 0 ?
                                    <View style={{ alignSelf: 'center', padding: 20 }}>
                                        <Text>{I18n.t('no_job_found')}</Text>
                                    </View>
                                :

                            finalArray3.map((dataQ, key) => {
                                return (
                                    <View key={key}>
                                        <View style={styles.dayHeading}>
                                            <Text>{dataQ.date}</Text>
                                        </View>
                                        <List
                                            dataArray={dataQ.data}
                                            style={styles.jobList}
                                            renderRow={(item) =>
                                            <ListItem style={styles.jobListItem}>
                                                    <TouchableOpacity 
                                                        disabled={this.state.IsProfileDisabled}
                                                        style={styles.listWarp} 
                                                        onPress={() => { this.goDetails(item) }} 
                                                    >
                                                    <View style={styles.listWarpImageWarp}>
                                                            <Image source={{uri: item.service.banner_image}} style={styles.listWarpImage} />
                                                    </View>
                                                    <View style={styles.listWarpTextWarp}>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text style={{ fontWeight: 'bold' }}>{item.service.name}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            {/* <Text style={[styles.fontWeight700, { fontSize: 14 }]}>Tuesday </Text>
                                                            <Text style={{ fontSize: 14 }}> 10:00 AM</Text> */}
                                                                <Text style={{ fontSize: 12 }}>{item.postedDate ? this.getLocalTimeFormat(item.postedDate) : ''}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>{item.userLocation ? item.userLocation.name : ''}</Text>

                                                        </View>
                                                        {
                                                                item.status === 'STARTED'?
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text style={{ color: '#81cdc7', fontSize: 16 }}>{item.startTime.startTime}</Text>
                                                            </View>: null
                                                        }
                                                    </View>
                                                    <View style={{ paddingLeft: 5 }}>
                                                        <Text style={styles.listWarpPriceUp}>{item.currency.name} {item.price}</Text>
                                                        <Text style={styles.listWarpPriceDown}>{item.service ? parseInt(item.service.time_interval / 60) + "." : ''}{item.service ? item.service.time_interval % 60 < 10 ? "0" + item.service.time_interval % 60 : item.service.time_interval % 60 : ''} hour(s)</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </ListItem>}
                                        />
                                    </View>
                                )
                            })}
                        </Content>
                    </Tab>

                    {/* Completed Jobs */}

                    <Tab heading={I18n.t('completedJobs')} tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Content
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />}>
                            {
                            finalArray4.length === 0 ?
                                    <View style={{ alignSelf: 'center', padding: 20 }}>
                                        <Text>{I18n.t('no_job_found')}</Text>
                                    </View>
                                :

                            finalArray4.map((dataQ, key) => {
                                return (
                                    <View key={key}>
                                        <View style={styles.dayHeading}>
                                            <Text>{dataQ.date}</Text>
                                        </View>
                                        <List
                                            dataArray={dataQ.data}
                                            style={styles.jobList}
                                            renderRow={(item) =>
                                            <ListItem style={styles.jobListItem}>
                                                    <TouchableOpacity style={styles.listWarp} onPress={() => this.goDetails(item)} disabled={this.state.IsProfileDisabled}>
                                                    <View style={styles.listWarpImageWarp}>
                                                            <Image source={{uri: item.service.banner_image}} style={styles.listWarpImage} />
                                                    </View>
                                                    <View style={styles.listWarpTextWarp}>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text style={{ fontWeight: 'bold' }}>{item.service.name}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            {/* <Text style={[styles.fontWeight700, { fontSize: 14 }]}>Tuesday </Text>
                                                            <Text style={{ fontSize: 14 }}> 10:00 AM</Text> */}
                                                                <Text style={{ fontSize: 12 }}>{item.postedDate ? this.getLocalTimeFormat(item.postedDate) : ''}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>{item.userLocation ? item.userLocation.name : ''}</Text>

                                                        </View>
                                                        {
                                                                item.status === 'STARTED'?
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text style={{ color: '#81cdc7', fontSize: 16 }}>{item.startTime.startTime}</Text>
                                                            </View>: null
                                                        }
                                                    </View>
                                                    <View style={{ paddingLeft: 5 }}>
                                                        <Text style={styles.listWarpPriceUp}>{item.currency.name} {item.price}</Text>
                                                        <Text style={styles.listWarpPriceDown}>{item.service ? parseInt(item.service.time_interval / 60) + "." : ''}{item.service ? item.service.time_interval % 60 < 10 ? "0" + item.service.time_interval % 60 : item.service.time_interval % 60 : ''} hour(s)</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </ListItem>}
                                        />
                                    </View>
                                )
                            })}
                        </Content>
                    </Tab>

                    <Tab heading={I18n.t('ignoredJobs')} tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        {this.state.availableJobs.data.response.message.declinedJobs? (
                            <List
                                dataArray={this.state.availableJobs.data.response.message.declinedJobs}
                                style={styles.jobList}
                                renderRow={(item) =>
                                <ListItem style={styles.jobListItem}>
                                    <View style={styles.listWarp}>
                                        <View style={styles.listWarpImageWarp}>
                                            <Image source={{ uri: item.service.banner_image }} style={styles.listWarpImage} />
                                        </View>
                                        <View style={styles.listWarpTextWarp}>
                                            <View style={styles.flexDirectionRow}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.service?item.service.name:''}</Text>
                                            </View>
                                            <View style={styles.flexDirectionRow}>
                                                <Text style={{ fontSize: 14 }}> {item.job ? this.getLocalTimeFormat(item.job.postedDate):'' } </Text>
                                            </View>
                                        </View>
                                        <View style={{ paddingLeft: 5 }}>
                                            <Text style={styles.listWarpPriceUp}>{item.currency?item.currency.name:'AED'} {item.job?item.job.price:''}</Text>
                                            <Text style={styles.listWarpPriceDown}>{item.service ? parseInt(item.service.time_interval / 60) + "." : ''}{item.service ? item.service.time_interval % 60 < 10 ? "0" + item.service.time_interval % 60 : item.service.time_interval % 60 : ''} hour(s)</Text>
                                        </View>
                                    </View>
                                </ListItem>
                            }
                        />
                        ):(
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{I18n.t('nodatafound')}</Text>
                            </View>
                        )
                        }
                    </Tab>

                    <Tab heading={I18n.t('cancel_jobs')} tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        {this.state.availableJobs.data.response.message.cancelledJobs? (
                            <List
                                dataArray={this.state.availableJobs.data.response.message.cancelledJobs}
                                style={styles.jobList}
                                renderRow={(item) =>
                                <ListItem style={styles.jobListItem}>
                                    <View style={styles.listWarp}>
                                        <View style={styles.listWarpImageWarp}>
                                            <Image source={{ uri: item.service ? item.service.banner_image: '' }} style={styles.listWarpImage} />
                                        </View>
                                        <View style={styles.listWarpTextWarp}>
                                            <View style={styles.flexDirectionRow}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.service ? item.service.name: ''}</Text>
                                            </View>
                                            <View style={styles.flexDirectionRow}>
                                                <Text style={{ fontSize: 14 }}> {item.job ? this.getLocalTimeFormat(item.job.postedDate) : ''} </Text>
                                            </View>
                                        </View>
                                    </View>
                                </ListItem>
                            }
                        />
                        ):(
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{I18n.t('nodatafound')}</Text>
                            </View>
                        )
                        }
                    </Tab>
                    
                </Tabs>
                <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
            </Container>
        );
        }
        else{
            return (
                <Container >
                    <StatusBar
                    backgroundColor="#f3f3f3"
                />
                 <FSpinner visible={true} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    <Header style={styles.headerWarp} noShadow androidStatusBarColor="#f3f3f3" >
                        <TouchableOpacity transparent onPress={() => this.props.navigation.navigate('Menu')} activeOpacity={0.5} style={{ width: 40, justifyContent: 'center' }}>
                            <MaterialIcons name="menu" style={styles.headIcon2} />
                        </TouchableOpacity>

                        <Body style={styles.headBody}>
                            <Image source={require('../../../img/logo2.png')} style={{ height: 20, width: 115 }} />
                        </Body>
                        <TouchableOpacity 
                            transparent 
                            onPress={() => {
                                this.goNotification()
                            }} 
                            activeOpacity={0.5} 
                            style={{ width: 40, justifyContent: 'center', alignItems: 'flex-end' }}
                            disabled={this.state.IsProfileDisabled} 
                            >
                            <MaterialIcons name="notifications" style={styles.headIcon2} />
                        </TouchableOpacity>
                    </Header>

                </Container>
            )
        }
    }
}

AvailableJobs.propTypes = {
    auth: PropTypes.object.isRequired,
    availableJobs: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        availableJobs: state.availableJobs
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        availablejobs: (id, timeZone) => dispatch(availablejobs(id, timeZone)),
        setNewData: (data) => dispatch(setNewData(data)),
        acceptJob: (jobId, workerId) => dispatch(acceptJob(jobId, workerId)),
        declineJob: (jobId, workerId, serviceId, language) => dispatch(declineJob(jobId, workerId, serviceId, language)),
        navigateAndSaveCurrentScreen: (data) => dispatch(navigateAndSaveCurrentScreen(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableJobs);
