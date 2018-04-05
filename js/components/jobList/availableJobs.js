import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from "react-navigation";
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, ListView, Geolocation, platform, AsyncStorage } from "react-native";
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, List, ListItem, Icon, Tab, Tabs, ScrollableTab, Body } from "native-base";
import FSpinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import I18n from '../../i18n/i18n';
import { availablejobs, setNewData, acceptJob, declineJob } from './elements/jobActions'
const imageIcon1 = require('../../../img/icon/home.png');

class AvailableJobs extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            finalJobData: [],
            listItemFlag: false,
            loader: false,
            currency:'USD',
        };
    }

    getTimeDiffLocal(gmtTime){
        
        const gmtToDeiveTimeObj = moment.tz(gmtTime, "Europe/London");
        const timezoneDevice = DeviceInfo.getTimezone();
        const gmtToDeiveTime = gmtToDeiveTimeObj.clone().tz(timezoneDevice).format();
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
                hourDiff.startTime = intValueText + Math.abs(timeDur._data.months) + " Month";
            } else if(timeDur._data.days > 0){
                hourDiff.startTime = intValueText + Math.abs(timeDur._data.days) + " day";
            } else if(timeDur._data.hours > 0){
                hourDiff.startTime = intValueText + Math.abs(timeDur._data.hours) + " hour";
            } else if(timeDur._data.minutes > 0){
                hourDiff.startTime = intValueText + Math.abs(timeDur._data.minutes) + " hour";
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
        this.props.navigation.navigate('JobDetails',{jobDetails:item});
    }

  
    componentDidMount(){
        AsyncStorage.getItem("currency").then((value) => {
            if (value) {
                const value1 = JSON.parse(value);
                this.setState({ currency: value1.language })
            }
        })
    }

    componentWillMount(){
        this.jobdata(); 
    }

    jobdata(){
        let id = this.props.auth.data.id;
        this.props.availablejobs(id).then(res => {
            this.setState({ 
                listItemFlag: true,
                loader: false 
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                loader: false
            })
        }) 
    }

    onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
//bala: Start
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
            console.log(err);
            this.setState({
                loader: false
            })
        })
    }
//bala: End
    acceptJob(data) {
        this.setState({
            loader: true
        })
        let jobId = data.id;        
        let workerId = this.props.auth.data.id;
        console.log(jobId, workerId );
        this.props.acceptJob( jobId , workerId ).then(res => {
            this.jobdata();
        }).catch(err => {
            console.log(err);
            this.setState({
                loader: false
            })
        })
    }
    

    render() {     
        let items;
        if (this.props.availableJobs.data) {
            items = this.props.availableJobs.data.response.message.upcomingJobs
        } 
        if (this.props.availableJobs.data){
            console.log(this.props.availableJobs.data.response.message.declinedJobs)

            const dateList = [];
            this.props.availableJobs.data.response.message.upcomingJobs.map((data, key) => {
                let dateConvertAva = new Date(data.postedDate);
                let dataFormatAva = moment(dateConvertAva).format('DD MMM YYYY');
                dateList.push(dataFormatAva);
                
            }) 
            const uniqueList = dateList.filter( this.onlyUnique );                    
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
            this.props.availableJobs.data.response.message.upcomingJobs.map((dataNew, key) => {
                let timeDiffNowRet = this.getTimeDiffLocal(dataNew.postedDate);
                let postDateCompare = new Date(dataNew.postedDate);
                if(dateOne === moment(postDateCompare).format('DD MMM YYYY')){
                    dataNew.startTime = timeDiffNowRet;
                    finalObject.data.push(dataNew);
                    
                }
            })
            finalArray.push(finalObject);
        })

        // upcoming jobs

            const dateList2 = [];
            this.props.availableJobs.data.response.message.acceptedJobs.map((data, key) => {
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
                this.props.availableJobs.data.response.message.acceptedJobs.map((dataNew, key) => {
                    let timeDiffNowRet = this.getTimeDiffLocal(dataNew.postedDate);
                    let postDateCompare = new Date(dataNew.postedDate);
                    if (dateOne === moment(postDateCompare).format('DD MMM YYYY')) {
                        dataNew.startTime = timeDiffNowRet;
                        finalObject.data.push(dataNew);
                    }
                })

                finalArray2.push(finalObject);
                
            })

        return (
            
            <Container >
                <StatusBar
                    backgroundColor="#f3f3f3"
                />
                <Header style={styles.headerWarp} noShadow androidStatusBarColor="#f3f3f3">
                    <Button transparent >
                        <MaterialIcons name="menu" style={styles.headIcon2} />
                    </Button>
                    <Button transparent>
                        <MaterialIcons name="notifications" style={styles.headIcon2} />
                    </Button>
                    <Body style={styles.headBody}>
                        <Image source={require('../../../img/logo2.png')} style={{ height: 20, width: 115 }}/>
                    </Body>
                    <Button transparent />
                    <Button transparent>
                        <MaterialIcons name="search" style={styles.headIcon2} />
                    </Button>
                </Header>
                <Tabs
                    tabBarUnderlineStyle={styles.Tabs}
                    locked={true}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTab tabsContainerStyle={{ backgroundColor: '#81cdc7' }} />}
                >
                    <Tab heading="AVAILABLE JOBS" tabStyle={{ backgroundColor: '#81cdc7', }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Content>
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
                                                    style={styles.listWarp} 
                                                    onPress={() => item.startTime.timeInt === true ? this.goDetails(item) : console.log()}
                                                    activeOpacity={item.startTime.timeInt === true ? 0 : 1}
                                                >
                                                    <View style={styles.listWarp}>
                                                        <View style={styles.listWarpImageWarp}>
                                                            <Image source={{ uri: item.service.banner_image }} style={styles.listWarpImage} />
                                                        </View>
                                                        <View style={styles.listWarpTextWarp}>
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text>{item.service.name}</Text>
                                                            </View>
                                                            <View style={styles.flexDirectionRow}>
                                                                {/* <Text style={[styles.fontWeight700, { fontSize: 14 }]}> 
                                                                    Tuesday
                                                                </Text>
                                                                <Text style={{ fontSize: 14 }}> 10:00 AM</Text> */}
                                                                <Text style={{ fontSize: 14 }}>{item.postedDate}</Text>
                                                            </View>
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text>{item.userLocation.name}</Text>
                                                            </View>
                                                            <View style={styles.flexDirectionRow}>
                                                                <Text style={{ color: '#81cdc7' }}>{item.startTime.startTime}</Text>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.listWarpPriceUp}>{this.state.currency} {item.price}</Text>
                                                            <Text style={styles.listWarpPriceDown}>4 hours</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </ListItem>
                                        }
                                        renderLeftHiddenRow={data =>
                                            data.startTime.timeInt === true ?
                                            <TouchableOpacity style={styles.leftAction} onPress={() => this.declineJob(data)}>
                                                <MaterialIcons name="close" style={styles.leftActionIcon} />
                                                <Text style={styles.leftActionText}>{I18n.t('decline_button')}</Text>
                                            </TouchableOpacity>
                                                : <View style={styles.leftAction}>
                                                </View>}

                                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                            data.startTime.timeInt === true ?
                                                <TouchableOpacity style={styles.rightAction} onPress={() => this.acceptJob(data)}>
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
                    <Tab heading="UPCOMING JOBS" tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Content>
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
                                                <TouchableOpacity style={styles.listWarp} onPress={() => this.goDetails(item)}>
                                                    <View style={styles.listWarpImageWarp}>
                                                            <Image source={{uri: item.service.banner_image}} style={styles.listWarpImage} />
                                                    </View>
                                                    <View style={styles.listWarpTextWarp}>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>{item.service.name}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            {/* <Text style={[styles.fontWeight700, { fontSize: 14 }]}>Tuesday </Text>
                                                            <Text style={{ fontSize: 14 }}> 10:00 AM</Text> */}
                                                                <Text style={{ fontSize: 12 }}>{item.postedDate}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>{item.userLocation.name}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                                <Text style={{ color: '#81cdc7', fontSize: 16 }}>{item.startTime.startTime}</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.listWarpPriceUp}>{this.state.currency} {item.price}</Text>
                                                        <Text style={styles.listWarpPriceDown}>4 hours</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </ListItem>}
                                        />
                                    </View>
                                )
                            })}
                        </Content>
                    </Tab>
                    <Tab heading="DECLINEDJOBS" tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        {this.props.availableJobs.data.response.message.declinedJobs? (
                            <List
                                dataArray={this.props.availableJobs.data.response.message.declinedJobs}
                            style={styles.jobList}
                            renderRow={(item) =>
                                <ListItem style={styles.jobListItem}>
                                    <View style={styles.listWarp}>
                                        <View style={styles.listWarpImageWarp}>
                                            <Image source={{ uri: item.service.banner_image }} style={styles.listWarpImage} />
                                        </View>
                                        <View style={styles.listWarpTextWarp}>
                                            <View style={styles.flexDirectionRow}>
                                                <Text>{item.service.name}</Text>
                                            </View>
                                            <View style={styles.flexDirectionRow}>
                                                <Text style={{ fontSize: 14 }}> {item.job.postedDate } </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.listWarpPriceUp}>{this.state.currency} {item.job.price}</Text>
                                            <Text style={styles.listWarpPriceDown}>4 hours</Text>
                                        </View>
                                    </View>
                                </ListItem>
                            }
                        />
                        ):(
                            <View>
                                <Text>No data found</Text>
                            </View>
                        )
                        }
                    </Tab>
                    <Tab heading="STATS" tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Text>Tab1</Text>
                    </Tab>
                </Tabs>
                <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
            </Container>
        );
        }
        else{
            return (
                <Container >
                    <FSpinner visible={true} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        availablejobs: (id) => dispatch(availablejobs(id)), 
        setNewData: (data) => dispatch(setNewData(data)),
        acceptJob: (jobId, workerId) => dispatch(acceptJob(jobId, workerId)),
        declineJob: (jobId, workerId, serviceId) => dispatch(declineJob(jobId, workerId, serviceId )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableJobs);
