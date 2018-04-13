import React, { Component } from 'react';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import { Footer, FooterTab, Thumbnail, Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, CardItem, Right, Card, Left, Body, Title, ActionSheet } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FSpinner from 'react-native-loading-spinner-overlay';
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
            // statusColor: [ true, false, false, false ]
        }
    }
    componentDidMount(){
        api.post('jobTrackerStatuses/getJobTrackingDetailsById', { "jobId": this.props.navigation.state.params.Jobid }).then((res) => {           
            this.setState({
                trackerData: res.response.message,
                loader: false,
            })                        
        }).catch((error) => {
            this.setState({
                loader: false,
            })  
        })
       
        console.log(this.state.trackerData)
        
    }

    render() {

        let statusColor = [ '', '', '', '', '' ];
        if (this.state.trackerData){

            console.log(this.state.trackerData);

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
            
            console.log(statusColor);
            // let newArray = this.state.statusColor;  
            // for (i = 0; i >= this.state.trackerData.length; i++){
            //     if (this.state.trackerData[i] == 'ONMYWAY' ){
            //         newArray[1] == true;
            //     }
            //     if (this.state.trackerData[i] == 'JOBSTARTED') {
            //         newArray[2] == true;
            //     }
            //     if (this.state.trackerData[i] == 'FOLLOWEDUP') {
            //         newArray[3] == true;
            //     }
            // }            
        }
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Header style={styles.appHdr2} noShadow androidStatusBarColor="#81cdc7">
                    <Button transparent onPress={() => this.props.navigation.goBack()} style={{ width: 30 }}>
                        <EvilIcons name="close" style={[styles.headIcon, { color: '#fff'}]} />
                    </Button>
                    <Body style={styles.headBody}>
                        <Title>{I18n.t('job_tracker')}</Title>
                    </Body>
                    <Button transparent style={{ width: 30, backgroundColor: 'transparent', }} disabled={true} />
                </Header>
                <Content>
                    <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />                    
                    <View style={{ backgroundColor: '#fff', paddingTop: 20, paddingBottom: 20, marginBottom: 10 }}>
                        <Text style={{ width: '100%', textAlign: 'center', paddingBottom: 15 }}>Job Status</Text>
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

                        <Text style={styles.trackmetterHeader}>Job Tracking</Text>

                        <View style={styles.trackmetterMainWarp}>

                        {
                            statusColor[0] ? (
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>Job Assigned</Text>
                                            <Text style={styles.trackmetterItemDate}>{statusColor[0]}</Text>
                                            <View style={styles.crcl}></View>
                                            {
                                                statusColor[1] ? (
                                                    
                                                    <View style={styles.line}></View>
                                                ):(
                                                    <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                )
                                            }
                                            
                                        </View>
                                    </View>
                            ) : (
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>Job Assigned</Text>
                                            <Text style={styles.trackmetterItemDate}></Text>                                            
                                            <View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>
                                                <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                        </View>
                                    </View>
                            )
                        }

                            {
                                statusColor[1] ? (
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>On the way</Text>
                                            <Text style={styles.trackmetterItemDate}>{statusColor[1]}</Text>
                                            <View style={styles.crcl}></View>
                                            {
                                                statusColor[2] ? (

                                                    <View style={styles.line}></View>
                                                ) : (
                                                        <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                    )
                                            }
                                        </View>
                                    </View>
                                ) : (
                                        <View style={styles.trackmetterItem}>
                                            <View style={styles.trackmetterItemInner}>
                                                <Text>On the way</Text>
                                                <Text style={styles.trackmetterItemDate}></Text>
                                                <View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>
                                                <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                            </View>
                                        </View>
                                    )
                            }

                            {
                                statusColor[2] ? (
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>Job Started</Text>
                                            <Text style={styles.trackmetterItemDate}>{statusColor[2]}</Text>
                                            <View style={styles.crcl}></View>
                                            {
                                                statusColor[3] ? (

                                                    <View style={styles.line}></View>
                                                ) : (
                                                        <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                    )
                                            }
                                        </View>
                                    </View>
                                ) : (
                                        <View style={styles.trackmetterItem}>
                                            <View style={styles.trackmetterItemInner}>
                                                <Text>Job Started</Text>
                                                <Text style={styles.trackmetterItemDate}></Text>
                                                <View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>
                                                <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                            </View>
                                        </View>
                                    )
                            }

                            {
                                statusColor[3] ? (
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>Follow Up</Text>
                                            <Text style={styles.trackmetterItemDate}>{statusColor[3]}</Text>
                                            <View style={styles.crcl}></View>
                                            {
                                                statusColor[4] ? (

                                                    <View style={styles.line}></View>
                                                ) : (
                                                        <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                                    )
                                            }
                                        </View>
                                    </View>
                                ) : (
                                        <View style={styles.trackmetterItem}>
                                            <View style={styles.trackmetterItemInner}>
                                                <Text>Follow Up</Text>
                                                <Text style={styles.trackmetterItemDate}></Text>
                                                <View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>
                                                <View style={[styles.line, { backgroundColor: '#ccc' }]}></View>
                                            </View>
                                        </View>
                                    )
                            }
                            {
                                statusColor[4] ? (
                                    <View style={styles.trackmetterItem}>
                                        <View style={styles.trackmetterItemInner}>
                                            <Text>Job Completed</Text>
                                            <Text style={styles.trackmetterItemDate}>{statusColor[5]}</Text>
                                            <View style={styles.crcl}></View>
                                        </View>
                                    </View>
                                ) : (
                                        <View style={styles.trackmetterItem}>
                                            <View style={styles.trackmetterItemInner}>
                                                <Text>Job Completed</Text>
                                                <Text style={styles.trackmetterItemDate}></Text>
                                                <View style={[styles.crcl, { backgroundColor: '#ccc' }]}></View>
                                            </View>
                                        </View>
                                    )
                            }
                        </View>
                    </View>
                   
                </Content>
            </Container>
        );
    }
}

export default JobTracker;
