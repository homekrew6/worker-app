import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from "react-navigation";
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, ListView, } from "react-native";
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, List, ListItem, Icon, Tab, Tabs, ScrollableTab, Body } from "native-base";
import FSpinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { availablejobs, setNewData, acceptJob, declineJob } from './elements/jobActions'
const imageIcon1 = require('../../../img/icon/home.png');



const datas = [
    { name: '12345', email: 'abc' },
    { name: '1254', email: 'abc' },
    { name: '1254', email: 'abc' }
];

class AvailableJobs extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            finalJobData: [],
            listItemFlag: false,
            loader: false,
            listViewData: [
                { name: '12345' },
                { name: '1254' },
                { name: '1254' }
            ]
        };
    }

    getTimeDiffLocal(gmtTime){
        
        const gmtToDeiveTimeObj = moment.tz(gmtTime, "Europe/London");
        const timezoneDevice = DeviceInfo.getTimezone();
        const gmtToDeiveTime = gmtToDeiveTimeObj.clone().tz(timezoneDevice).format();
        console.log(gmtToDeiveTime);
        //const timeDiffNow = moment(gmtToDeiveTime, "YYYY-MM-DD hh:mm:ss a").fromNow();
        const now = new Date();
        const timeDur = moment.duration({ from: now, to: gmtToDeiveTime });
        console.log('getTimeDiffLocal', gmtTime, 'timDur', timeDur);
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

    // getStartTime(){
    //     if(Math.sign(timeDur._data.hours) === 1){
    //         //positive
    //         const hourDiff = Math.abs(timeDur._data.hours);
    //         return hourDiff;
    //     }else{
    //         //negative
    //         const checkHour = Math.abs(timeDur._data.hours);
    //         if( checkHour === 1){
    //             const hourDiff = Math.abs(timeDur._data.hours) + " hour";
    //             return hourDiff;
    //         }else{
    //             const hourDiff = Math.abs(timeDur._data.hours) + " hours";
    //             return hourDiff;
    //         } 
    //     }
    // }


    componentDidMount(){
        const postedTime = "2018-03-23 11:00:00 am";
        const timeDiffNowRet = this.getTimeDiffLocal(postedTime)
        console.log('gmtToDeiveTime', timeDiffNowRet );
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

    declineJob(data){
        this.setState({
            loader: true
        })
        let jobId = data.id;
        let workerId = this.props.auth.data.id;
        console.log(jobId, workerId);
        this.props.declineJob(jobId, workerId).then(res => {
            this.jobdata();
        }).catch(err => {
            console.log(err);
            this.setState({
                loader: false
            })
        })
    }
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
                dateList.push(data.postedDate);
                let dataCheck = new Date(data.postedDate);
            }) 
            console.log('dateList' + dateList); 
            const uniqueList = dateList.filter( this.onlyUnique );    
            console.log('uniqueList');                   
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
                if(dateOne === dataNew.postedDate){
                    dataNew.startTime = timeDiffNowRet;
                    finalObject.data.push(dataNew);
                    
                }
            })
            finalArray.push(finalObject);
        })

        // upcoming jobs

            const dateList2 = [];
            this.props.availableJobs.data.response.message.acceptedJobs.map((data, key) => {
                dateList2.push(data.postedDate);
                let dataCheck = new Date(data.postedDate);
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
                    if (dateOne === dataNew.postedDate) {
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
                    <Button transparent onPress={() => this.getTimeDiffLocal("2018-03-28 03:00:00")}>
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
                    renderTabBar={() => <ScrollableTab />}
                >
                    <Tab heading="AVAILABLE JOBS" tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Content>
                            {finalArray.map((dataQ, key) => {
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
                                                <View style={styles.listWarp}>
                                                    <View style={styles.listWarpImageWarp}>
                                                        <Image source={imageIcon1} style={styles.listWarpImage} />
                                                    </View>
                                                    <View style={styles.listWarpTextWarp}>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>{item.service.name}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text style={[styles.fontWeight700, { fontSize: 14 }]}> 
                                                                {/* {item.postedDate}  */}
                                                                Tuesday
                                                            </Text>
                                                            <Text style={{ fontSize: 14 }}> 10:00 AM</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>Deira, Dubai</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text style={{ color: '#81cdc7' }}>{item.startTime.startTime}</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.listWarpPriceUp}>AED {item.price}</Text>
                                                        <Text style={styles.listWarpPriceDown}>4 hours</Text>
                                                    </View>
                                                </View>
                                            </ListItem>
                                        }
                                        renderLeftHiddenRow={data =>
                                            data.startTime.timeInt === true ?
                                            <TouchableOpacity style={styles.leftAction} onPress={() => this.declineJob(data)}>
                                                <MaterialIcons name="close" style={styles.leftActionIcon} />
                                                <Text style={styles.leftActionText}>DECLINE</Text>
                                            </TouchableOpacity>
                                                : <View style={styles.leftAction}>
                                                </View>}

                                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                            data.startTime.timeInt === true ?
                                                <TouchableOpacity style={styles.rightAction} onPress={() => this.acceptJob(data)}>
                                                <MaterialIcons name="done" style={styles.leftActionIcon} />
                                                <Text style={styles.leftActionText}>ACCEPT</Text>
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
                            {finalArray2.map((dataQ, key) => {
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
                                                        <Image source={imageIcon1} style={styles.listWarpImage} />
                                                    </View>
                                                    <View style={styles.listWarpTextWarp}>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>{item.service.name}</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text style={[styles.fontWeight700, { fontSize: 14 }]}>Tuesday </Text>
                                                            <Text style={{ fontSize: 14 }}> 10:00 AM</Text>
                                                        </View>
                                                        <View style={styles.flexDirectionRow}>
                                                            <Text>Deira, Dubai</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <Text style={{ color: '#81cdc7', fontSize: 10 }}>Starts in 6 hours</Text>
                                                        <Text style={styles.listWarpPriceUp}>AED 100</Text>
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
                        <List
                            dataArray={this.props.availableJobs.data.response.message.declinedJobs}
                            style={styles.jobList}
                            renderRow={(item) =>
                                    <ListItem style={styles.jobListItem}>
                                        <View style={styles.listWarp}>
                                            <View style={styles.listWarpImageWarp}>
                                                <Image source={imageIcon1} style={styles.listWarpImage} />
                                            </View>
                                            <View style={styles.listWarpTextWarp}>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text>{item.service.name}</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text style={[styles.fontWeight700, { fontSize: 14 }]}>Tuesday </Text>
                                                    <Text style={{ fontSize: 14 }}> 10:00 AM</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text>Deira, Dubai</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={styles.listWarpPriceUp}>AED 100</Text>
                                                <Text style={styles.listWarpPriceDown}>4 hours</Text>
                                            </View>
                                        </View>
                                    </ListItem>
                            }
                        />
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
        declineJob: (jobId, workerId) => dispatch(declineJob(jobId, workerId )),
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableJobs);
