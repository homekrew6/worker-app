import React, { Component } from "react";
import { Image, View, StatusBar, TouchableOpacity, Text, TextInput, Alert, ListView } from "react-native";
import { Container, Header, Content, Body, Title, Footer, FooterTab, Button, List, ListItem, Icon } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
            loader: false
        }
    }

    componentDidMount() {
        this.notificationListData();
        
    }

    notificationListData(){
        let workerId = this.props.navigation.state.params.workerId? this.props.navigation.state.params.workerId : '';
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

        let workerId = this.props.navigation.state.params.workerId? this.props.navigation.state.params.workerId : '';   

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

        if(data.notificationType == "NewJob"){
            this.props.navigation.navigate('AvailableJobs');            
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
                        <View style={{ marginTop: 10, paddingLeft: 15, marginBottom: 10 }}>
                            <Text>{I18n.t('new')}</Text>
                        </View> : null
                    }

                    {
                        this.state.NotificationListUnread.length ?
                            <List
                                dataSource={this.ds.cloneWithRows(this.state.NotificationListUnread)}
                                disableRightSwipe={true}
                                renderRow={data =>
                                <ListItem style={styles.listHeadingWarp}>
                                    <TouchableOpacity style={styles.listWarp} onPress={()=> this.gotoDetails(data)}>
                                         <View style={styles.listWarpInner}>
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
                                <Button></Button>}
                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <View onPress={() => this.deleteNotification(data)} style={styles.deleteWarp}>
                                    <TouchableOpacity onPress={() => this.deleteNotification(data)} style={ styles.deleteWarpInner }>
                                        <Icon active name="trash" style={styles.deleteWarpText}/>
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
                                        <Text numberOfLines={1} style={data.listTextsecend}>{data.notificationDate}</Text>
                                        {/* <Text style={styles.listTextthird}>Home</Text> */}
                                    </View>
                                    <View>
                                        <Text>{data.notificationType}</Text>
                                    </View>
                                </TouchableOpacity>
                            </ListItem>}
                            renderLeftHiddenRow={data =>
                                <Button></Button>}
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <View onPress={() => this.deleteNotification(data)} style={styles.deleteWarp}>
                                <TouchableOpacity onPress={() => this.deleteNotification(data)} style={ styles.deleteWarpInner }>
                                    <Icon active name="trash" style={styles.deleteWarpText}/>
                                </TouchableOpacity>
                            </View>}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />: null
                    }

                    {
                        !(this.state.NotificationListRead.length  && this.state.NotificationListUnread.length)? null: <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 15 }}><Text> {I18n.t('nodatafound')} </Text></View>
                    }

                </Content>
            </Container>
        );
    }
}



export default NotificationList;