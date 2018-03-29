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
import { availablejobs, setNewData } from './elements/jobActions'
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
            listItemFlag: false,
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
        const timeDiffNow = moment(gmtToDeiveTime, "YYYY-MM-DD hh:mm:ss a").fromNow();
        const now = new Date();
        const timeDur = moment.duration({ from: now, to: gmtToDeiveTime });
        console.log(timeDiffNow);
        console.log(this.state.listItemFlag);
        if(Math.sign(timeDur._data.hours) === 1){
            //positive
            const hourDiff = Math.abs(timeDur._data.hours);
            return hourDiff;
        }else{
            //negative
            const checkHour = Math.abs(timeDur._data.hours);
            if( checkHour === 1){
                const hourDiff = Math.abs(timeDur._data.hours) + " hour";
                return hourDiff;
            }else{
                const hourDiff = Math.abs(timeDur._data.hours) + " hours";
                return hourDiff;
            }
            
        }
    }
    goDetails(item){
        // console.log(this.props.availableJobs.data);
        // let data = this.props.availableJobs.data
        // data.detailsShow = item.data; 
        // setNewData(data);
        // console.log(this.props.availableJobs.data);

        this.props.navigation.navigate('JobDetails',{jobDetails:item});
    }

    componentDidMount(){
        const postedTime = "2018-03-23 11:00:00 am";
        const timeDiffNowRet = this.getTimeDiffLocal(postedTime)

        

        console.log('gmtToDeiveTime', timeDiffNowRet );
        
   
    }

    componentWillMount(){
        let id = this.props.auth.id;
        this.props.availablejobs(id).then(res => {
            this.setState({ listItemFlag: true });
        }).catch(err => {
            console.log(err);
        })  
    }

    render() {
        let items;
        if (this.props.availableJobs.data) {
            items = this.props.availableJobs.data.response.message.upcomingJobs
        }
        if (this.props.availableJobs.data){

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
                            <View style={styles.dayHeading}>
                                <Text>Today</Text>
                            </View>
                            <List 
                                dataSource={this.ds.cloneWithRows(items)}
                                dataArray={items}
                                renderRow={( item, data ) =>
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
                                                    <Text style={{ color: '#81cdc7' }}>Starts in 6 hours</Text>
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
                                    <TouchableOpacity style={styles.leftAction} onPress={() => console.log(data)}>
                                        <MaterialIcons name="close" style={styles.leftActionIcon} />
                                        <Text style={styles.leftActionText}>DELETE</Text>
                                    </TouchableOpacity>}


                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                    <TouchableOpacity style={styles.rightAction} onPress={() => console.log(data)}>
                                        <MaterialIcons name="done" style={styles.leftActionIcon} />
                                        <Text style={styles.leftActionText}>ACCEPT</Text>
                                    </TouchableOpacity>}
                                leftOpenValue={75}
                                rightOpenValue={-75}
                            
                            />
                            {/* <View style={styles.dayHeading}>
                                <Text>Tomorrow</Text>
                            </View>
                            <List
                                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                style={styles.jobList}
                                renderRow={data =>
                                    <ListItem style={styles.jobListItem}>
                                        <View style={styles.listWarp}>
                                            <View style={styles.listWarpImageWarp}>
                                                <Image source={imageIcon1} style={styles.listWarpImage} />
                                            </View>
                                            <View style={styles.listWarpTextWarp}>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text>name</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text style={styles.fontWeight700}>Tuesday </Text>
                                                    <Text> 10:00 AM</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text>Deira, Dubai</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </ListItem>}


                                renderLeftHiddenRow={data =>
                                    <TouchableOpacity style={styles.leftAction} >
                                        <MaterialIcons name="close" style={styles.leftActionIcon} />
                                        <Text style={styles.leftActionText}>DELETE</Text>
                                    </TouchableOpacity>}


                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                    <TouchableOpacity style={styles.rightAction} >
                                        <MaterialIcons name="done" style={styles.leftActionIcon} />
                                        <Text style={styles.leftActionText}>ACCEPT</Text>
                                    </TouchableOpacity>}
                                leftOpenValue={75}
                                rightOpenValue={-75}
                            />
                            <List dataArray={items}
                                renderRow={(item) =>
                                    <ListItem>
                                        <Text>{item.price}</Text>
                                    </ListItem>
                                }>
                            </List> */}
                        </Content>
                    </Tab>
                    <Tab heading="UPCOMING JOBS" tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <List
                            dataArray={this.props.availableJobs.data.response.message.acceptedJobs}
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
        setNewData: (data) => dispatch(setNewData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableJobs);
