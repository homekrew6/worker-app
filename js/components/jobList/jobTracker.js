import React, { Component } from 'react';
import { Image, View, StatusBar, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Content, Body, Title, } from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FSpinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import styles from './styles';
import I18n from '../../i18n/i18n';
import api from '../../api/index';

class JobTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackerData: [],
            loader: true, 
            progessArray: [4],
            jobcomplited: false,
            jobcomplitedDate: ''
            // statusColor: [ true, false, false, false ]
        }
    }

    getLocalTimeFormat(gmtTime) {
        if (gmtTime) {
            let dateNow = new Date();
            var nUTC_diff = dateNow.getTimezoneOffset();
            let slicedDate = gmtTime.slice(0, -4);
            let timeToMan = Math.abs(nUTC_diff);
            let utc_check = Math.sign(nUTC_diff);
            let localTime;
            if (utc_check === 1 || utc_check === 0) {
                localTime = moment(slicedDate).subtract(timeToMan, 'minutes').format('ddd DD-MMM-YYYY hh:mm A');
            } else {
                localTime = moment(slicedDate).add(timeToMan, 'minutes').format('ddd DD-MMM-YYYY hh:mm A');
            }
            return localTime;
        } else {
            return null;
        }

    }

    componentDidMount(){
      
        api.post('jobTrackerStatuses/getJobTrackingDetailsById', { "jobId": this.props.navigation.state.params.Jobid }).then((res) => {           
            let statusArray = [];
            if (res.response.message.length <= 3) {
                for (i = 0; i < 3; i++) {
                    res.response.message[i] ? statusArray.push(res.response.message[i]) : statusArray.push('');
                }
            }
            else {
                statusArray = res.response.message;
            }

            statusArray.map((newdata) => {
                if (newdata.status == 'JOBCOMPLITED') {
                    this.setState({
                        jobcomplited: true,
                        jobcomplitedDate: newdata.statusChangeddate,
                    })
                }
            })
            
            this.setState({
                trackerData: statusArray,
                loader: false,
            })  

        }).catch((error) => {
            this.setState({
                loader: false,
            })  
        })
        
    }

    render() {

        let statusColor = [ '', '', '', '', '' ];
        if (this.state.trackerData){

            this.state.trackerData.map((data, key) => {
                if (data.status == 'ACCEPTED'){
                    statusColor[0] = data.statusChangeddate;
                }
                if (data.status == 'ONMYWAY') {
                    statusColor[1] = data.statusChangeddate;
                }
                if (data.status == 'JOBSTARTED') {
                    statusColor[2] = data.statusChangeddate;
                }
                if (data.status == 'FOLLOWEDUP') {
                    statusColor[3] = data.statusChangeddate;
                }
                if (data.status == 'JOBCOMPLITED') {
                    statusColor[4] = data.statusChangeddate;
                }
            })           
        }
        return (
            <Container >

                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <Header style={styles.appHdr2} noShadow androidStatusBarColor="#81cdc7">
                    <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} activeOpacity={0.5} style={{ width: 40, justifyContent: 'center' }}>
                        <EvilIcons name="close" style={[styles.headIcon, { color: '#fff'}]} />
                    </TouchableOpacity>
                    <Body style={styles.headBody}>
                        <Title><Text>{I18n.t('job_tracker')}</Text></Title>
                    </Body>
                    <TouchableOpacity activeOpacity={1} style={{ width: 40, justifyContent: 'center', alignItems: 'flex-end' }} /> 
                </Header>

                <Content>
                    <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />                    
                    <View style={styles.trackmetterWarp}>
                        <Text style={styles.trackmetterHeader}>{I18n.t('jobStatus')}</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <View style={[styles.trackLogo, statusColor[0] ? { backgroundColor: '#ffd228' } : {}]}>
                                <Image source={require('../../../img/icon/home.png')} style={styles.trackLogoImg} />
                            </View>
                            <View style={styles.trackArrowWarp}>
                                <Image source={require('../../../img/icon/move-to-the-next-page-symbol.png')} style={styles.trackArrow} />
                            </View>
                            <View style={[styles.trackLogo, statusColor[1] ? { backgroundColor: '#ffd228' } : {}]}>
                                <Image source={require('../../../img/icon/man-walking-directions-button.png')} style={styles.trackLogoImg} />
                            </View>
                            <View style={styles.trackArrowWarp}>
                                <Image source={require('../../../img/icon/move-to-the-next-page-symbol.png')} style={styles.trackArrow} />
                            </View>
                            <View style={[styles.trackLogo, statusColor[2] ? { backgroundColor: '#ffd228' } : {}]}>
                                <Image source={require('../../../img/icon/people-time.png')} style={styles.trackLogoImg} />
                            </View>
                            <View style={styles.trackArrowWarp}>
                                <Image source={require('../../../img/icon/move-to-the-next-page-symbol.png')} style={styles.trackArrow} />
                            </View>
                            <View style={[styles.trackLogo, statusColor[3] ? { backgroundColor: '#ffd228' } : {}]}>
                                <Image source={require('../../../img/icon/followers.png')} style={styles.trackLogoImg} />
                            </View>
                            <View style={styles.trackArrowWarp}>
                                <Image source={require('../../../img/icon/move-to-the-next-page-symbol.png')} style={styles.trackArrow} />
                            </View>
                            <View style={[styles.trackLogo, statusColor[4] ? { backgroundColor: '#ffd228' } : {}]}>
                                <Image source={require('../../../img/icon/home_ok.png')} style={styles.trackLogoImg} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.trackmetterWarp}>

                        <Text style={styles.trackmetterHeader}>{I18n.t('jobStatus')}</Text>

                        <View style={styles.trackmetterMainWarp}>
                            {
                                this.state.trackerData.length < 4 ?
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>{I18n.t('jobAssigned')}</Text>
                                            <Text style={styles.trackmetterItemDate}>
                                                {
                                                    this.state.trackerData[0] ?
                                                        this.getLocalTimeFormat(this.state.trackerData[0].statusChangeddate)
                                                        : null
                                                }
                                            </Text>

                                            {
                                                this.state.trackerData[0] ?
                                                    <View style={[styles.crcl]}></View>
                                                    : <View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>
                                            }

                                            {
                                                this.state.trackerData[1] ? (

                                                    <View style={styles.line}></View>
                                                ) : (
                                                        <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                    )
                                            }
                                            
                                        </View>
                                    </View> : null
                            }

                            {
                                this.state.trackerData.length < 4 ?
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>{I18n.t('onTheWay')}</Text>
                                            <Text style={styles.trackmetterItemDate}>
                                                {
                                                    this.state.trackerData[1] ?
                                                        this.getLocalTimeFormat(this.state.trackerData[1].statusChangeddate)
                                                        : null
                                                }
                                            </Text>
                                            {
                                                this.state.trackerData[1] ?
                                                    <View style={[styles.crcl]}></View>
                                                    : <View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>
                                            }
                                            {
                                                this.state.trackerData[2] != '' ? (

                                                    <View style={styles.line}></View>
                                                ) : (
                                                        <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                    )
                                            }
                                        </View>
                                    </View> : null
                            }

                            {
                                this.state.trackerData.length < 4 ?
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>{I18n.t('jobStarted')}</Text>
                                            <Text style={styles.trackmetterItemDate}>
                                                {
                                                    this.state.trackerData[2] ?
                                                        this.getLocalTimeFormat(this.state.trackerData[2].statusChangeddate)
                                                        : null
                                                }
                                            </Text>
                                            {
                                                this.state.trackerData[2] ?
                                                    <View style={[styles.crcl]}></View>
                                                    : <View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>
                                            }
                                            {
                                                this.state.trackerData[3] ? (

                                                    <View style={styles.line}></View>
                                                ) : (
                                                        <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                    )
                                            }
                                        </View>
                                    </View> : null
                            }

                            {
                                this.state.trackerData.length >= 4 ?
                                    this.state.trackerData.map((trackStatus, key) => {
                                        return(
                                            trackStatus.status === 'ACCEPTED' ?
                                            <View style={styles.trackmetterItem} key={key}>
                                                <View style={styles.trackmetterItemInner}>
                                                        <Text>{I18n.t('jobAssigned')}</Text>
                                                    <Text style={styles.trackmetterItemDate}>{this.getLocalTimeFormat(trackStatus.statusChangeddate)}</Text>
                                                    <View style={styles.crcl}></View>
                                                    {
                                                        this.state.trackerData[key + 1] != undefined ? (

                                                            <View style={styles.line}></View>
                                                        ) : (
                                                                <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                            )
                                                    }
                                                </View>
                                                </View> : trackStatus.status === 'ONMYWAY' ?
                                                    <View style={styles.trackmetterItem} key={key}>
                                                        <View style={styles.trackmetterItemInner}>
                                                            <Text>{I18n.t('onTheWay')}</Text>
                                                            <Text style={styles.trackmetterItemDate}>{this.getLocalTimeFormat(trackStatus.statusChangeddate)}</Text>
                                                            <View style={styles.crcl}></View>
                                                            {
                                                                this.state.trackerData[key + 1] != undefined ? (

                                                                    <View style={styles.line}></View>
                                                                ) : (
                                                                        <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                                    )
                                                            }
                                                    </View>
                                                    </View> : trackStatus.status === 'JOBSTARTED' ?
                                                        <View style={styles.trackmetterItem} key={key}>
                                                            <View style={styles.trackmetterItemInner}>
                                                                <Text>{I18n.t('jobStarted')}</Text>
                                                                <Text style={styles.trackmetterItemDate}>{this.getLocalTimeFormat(trackStatus.statusChangeddate)}</Text>
                                                                <View style={styles.crcl}></View>
                                                                {
                                                                    this.state.trackerData[key + 1] != undefined ? (

                                                                        <View style={styles.line}></View>
                                                                    ) : (
                                                                            <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                                        )
                                                                }
                                                            </View>
                                                    </View> : trackStatus.status === 'FOLLOWEDUP' ?
                                                    <View style={styles.trackmetterItem} key={key}>
                                                        <View style={styles.trackmetterItemInner}>
                                                            <Text>{I18n.t('followUp')}</Text>
                                                            <Text style={styles.trackmetterItemDate}>{this.getLocalTimeFormat(trackStatus.statusChangeddate)}</Text>
                                                            <View style={styles.crcl}></View>
                                                            {
                                                                this.state.trackerData[key + 1] != undefined ? (

                                                                    <View style={styles.line}></View>
                                                                ) : (
                                                                        <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                                    )
                                                            }
                                                        </View>
                                                        </View> : trackStatus.status === 'PAYPENDING' ?
                                                        <View style={styles.trackmetterItem} key={key}>
                                                            <View style={styles.trackmetterItemInner}>
                                                                    <Text>{I18n.t('pay_pending')}</Text>
                                                                <Text style={styles.trackmetterItemDate}>{this.getLocalTimeFormat(trackStatus.statusChangeddate)}</Text>
                                                                <View style={styles.crcl}></View>
                                                                {
                                                                    this.state.trackerData[key + 1] != undefined ? (

                                                                        <View style={styles.line}></View>
                                                                    ) : (
                                                                            <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                                        )
                                                                }
                                                        </View>
                                                    </View>: null
                                        )
                                    })
                                    : null
                            }

                            {

                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>{I18n.t('jobCompleted')}</Text>
                                            
                                            
                                            <Text style={styles.trackmetterItemDate}>
                                                {
                                                this.state.jobcomplited ?
                                                    this.getLocalTimeFormat(this.state.jobcomplitedDate)
                                                        : null
                                                }
                                            </Text>
                                            {
                                                this.state.jobcomplited ? (<View style={[styles.crcl]}></View>) : (<View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>)

                                            }
                                        </View>
                                    </View>
                            }
                        </View>
                    </View>
                   
                </Content>

            </Container>
        );
    }
}

export default JobTracker;
