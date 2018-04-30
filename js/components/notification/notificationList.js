import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, View, StatusBar, TouchableOpacity, Text, TextInput, Alert, ListView, BackHandler } from "react-native";
import { Container, Header, Content, Body, Title, Footer, FooterTab, Button, List, ListItem, Icon } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';
import I18n from '../../i18n/i18n';
import FSpinner from 'react-native-loading-spinner-overlay';
import styles from "./styles";
import api from '../../api/index';

const icon1 = require('../../../img/chatIcon3.png');
const icon2 = require('../../../img/chatIcon1.png');
const icon3 = require('../../../img/chatIcon2.png');


class NotificationList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            NotificationListRead: [],
            NotificationListUnread: [],
            loader: false,
            backReturn: false,
        }
    }

    componentDidMount() {
        this.notificationListData();
        // this.backhandler = BackHandler.addEventListener('hardwareBackPress', function () {
        //     if(this.state.backReturn === true){
        //         Alert.alert(
        //             'Confirm',
        //             'Are you sure to exit the app?',
        //             [
        //                 { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        //                 { text: 'OK', onPress: () => BackHandler.exitApp() },
        //             ],
        //             { cancelable: false }
        //         )
        //         return true;
        //     }else{
        //         this.setState({ backReturn: true });
        //         this.props.navigation.goBack(null);
        //         return true;
        //     }
            
        // }.bind(this));

    }

    notificationListData(){
        let workerId = this.props.auth.data.id ? this.props.auth.data.id : '';
        console.log('cuId', workerId);       
        if(workerId){
        let notiDataread = [], notiDataunread = [], notiData;
        this.setState({
            loader: true,
        })
        api.post('Notifications/getNotificationListByIdForWorker', { "workerId":  workerId }).then((res) => {
            notiData = res.response.message;
            notiData.map((item) => {
                let i = item
                item.IsRead ? notiDataread.push(i) : notiDataunread.push(i);
            })
            this.setState({
                NotificationListRead: notiDataread,
                NotificationListUnread: notiDataunread,
                loader: false
            })
            console.log('notiData', res);
        }).catch((err) => {
            console.log(err);
            this.setState({
                loader: false
            })
        });
    }
    else{
        Alert.alert('Please login');
    }
    }

    deleteNotification(data){
        this.setState({
            loader: true
        })
        console.log(data.id);
        api.delete( 'Notifications/'+ data.id  ).then((res) => {
            this.setState({
                loader: false
            })
            this.notificationListData()
          
        }).catch((err) => {
            console.log(err);
            this.setState({
                loader: false
            })
        });
    }

    clearAll(){

        this.setState({
            loader: true
        })

        let workerId = this.props.auth.data.id ? this.props.auth.data.id : '';   

        api.post( 'Notifications/clearAllNotificationByWorkerId', { "workerId":  workerId }  ).then((res) => {
            this.setState({
                loader: false
            })
            this.notificationListData()
        }).catch((err) => {
            console.log(err);
            this.setState({
                loader: false
            })
        });

    }

    gotoDetails(data){
        let jobDetails = 'abc';

        if(!data.IsRead){
            this.setState({
                loader: true
            })
            api.post( 'Notifications/updateWorkerUnReadNot', { "id":  data.id }  ).then((res) => {
                this.setState({
                    loader: false
                })
                this.notificationListData();                
            }).catch((err) => {
                console.log(err);
                this.setState({
                    loader: false
                })
            });                              
        }

        if (data.notificationType == "NewJob") {
            this.props.navigation.navigate('AvailableJobs');
        } else if (data.notificationType == "JobFollowUp") {
            this.setState({
                loader: true
            });
            api.post('Jobs/getJobDetailsById', {
                "id": data.jobId,
                "workerId": this.props.auth.data.id
            }).then((res) => {
                jobDetails = res.response.message[0];
                this.props.navigation.navigate('JobDetails', { jobDetails: jobDetails }); 
                this.setState({
                    loader: false,
                });               
            }).catch((err) => {
                console.log(err);
                this.setState({
                    loader: false,
                });
            })
        }
    }

    render() {
        return (
            <Container >

				<FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{color: '#FFF'}} />  

                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <Header style={styles.headerMain} androidStatusBarColor="#81cdc7" noShadow >
                    <Button transparent onPress={() => this.props.navigation.goBack()} style={{ width: 70, justifyContent: 'flex-start' }}>
                        <Ionicons style={styles.headerIconClose} name='ios-arrow-back-outline' />
                    </Button>
                    <Body style={styles.headerBody}>
                        <Title style={styles.headerTitle}>{I18n.t('notification')}</Title>
                    </Body>
                    <Button transparent style={{ width: 70 }} onPress={()=>this.clearAll()}>
                        <Text style={{ color: '#fff' }}>{I18n.t('clearAll')}</Text>
                    </Button>
                </Header>

                <Content>

                    {
                        this.state.NotificationListUnread.length ?
                            <View style={styles.listHeadingWarp}>
                            <Text>{I18n.t('new')}</Text>
                        </View> : null
                    }

                    {
                        this.state.NotificationListUnread.length ?
                            <List
                                dataSource={this.ds.cloneWithRows(this.state.NotificationListUnread)}
                                disableRightSwipe={true}
                                renderRow={data =>
                                    <ListItem style={styles.listWarp}>
                                        <TouchableOpacity style={styles.listWarpInner} onPress={()=> this.gotoDetails(data)}>
                                            <View style={styles.listImageWarp}>
                                             <Image source={require('../../../img/icon/notificationIcon1.png')} style={styles.listImage} />
                                         </View>
                                         <View style={styles.listTextWarp}>
                                             <Text>{data.title}</Text>
                                             <Text numberOfLines={1} style={styles.listTextsecend}>{data.notificationDate}</Text>
                                             {/* <Text style={styles.listTextthird}>Home</Text> */}
                                         </View>
                                         <View>
                                             <Text>{data.notificationType}</Text>
                                         </View>
                                     </TouchableOpacity>
                                </ListItem>}
                                renderLeftHiddenRow={data =>
                                <View></View>}
                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                    <View onPress={() => this.deleteNotification(data)} style={styles.deleteWarp}>
                                        <TouchableOpacity onPress={() => this.deleteNotification(data)} style={styles.deleteWarpInner}>
                                            <EvilIcons name="close" style={styles.deleteWarpIcon} />
                                            <Text style={styles.deleteWarpText}>DELETE</Text>
                                        </TouchableOpacity>
                                    </View>}
                                leftOpenValue={75}
                                rightOpenValue={-75}
                            />
                            : null
                    }

                    {
                        this.state.NotificationListRead.length ?
                            <View style={styles.listHeadingWarp}>
                                <Text>{I18n.t('earlier')}</Text>
                            </View> : null
                    }

                    {
                        this.state.NotificationListRead.length ?

                        <List
                            dataSource={this.ds.cloneWithRows(this.state.NotificationListRead)}
                            disableRightSwipe={true}
                            renderRow={data =>
                            <ListItem style={styles.listWarp}>
                                <TouchableOpacity style={styles.listWarpInner} onPress={()=> this.gotoDetails(data)} >
                                    <View style={styles.listImageWarp}>
                                        <Image source={require('../../../img/icon/notificationIcon1.png')} style={styles.listImage} />
                                    </View>
                                    <View style={styles.listTextWarp}>
                                        <Text>{data.title}</Text>
                                            <Text numberOfLines={1} style={styles.listTextsecend}>{data.notificationDate}</Text>
                                        {/* <Text style={styles.listTextthird}>Home</Text> */}
                                    </View>
                                    <View>
                                        <Text>{data.notificationType}</Text>
                                    </View>
                                </TouchableOpacity>
                            </ListItem>}
                            renderLeftHiddenRow={data =>
                                <View></View>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <View onPress={() => this.deleteNotification(data)} style={styles.deleteWarp}>
                                <TouchableOpacity onPress={() => this.deleteNotification(data)} style={ styles.deleteWarpInner }>
                                    <EvilIcons name="close" style={styles.deleteWarpIcon} />
                                    <Text style={styles.deleteWarpText} >DELETE</Text>
                                </TouchableOpacity>
                            </View>}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />: null
                    }

                    {
                        !(this.state.NotificationListRead.length==0  && this.state.NotificationListUnread.length==0)? null: <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 15 }}><Text> {I18n.t('nodatafound')} </Text></View>
                    }

                </Content>
            </Container>
        );
    }
}


NotificationList.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}


// export default NotificationList;
export default connect(mapStateToProps)(NotificationList);