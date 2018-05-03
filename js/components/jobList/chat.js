import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, AsyncStorage, TextInput, ScrollView } from 'react-native';
import { Footer, FooterTab, Thumbnail, Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, CardItem, Right, Card, Left, Body, Title, ActionSheet } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FSpinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import I18n from '../../i18n/i18n';
import config from '../../config';
import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCnS3M8ZZBYRH4QubDH3OJPKSgk-03Nm9w",
    authDomain: "krew-user-app.firebaseapp.com",
    databaseURL: "https://krew-user-app.firebaseio.com",
    storageBucket: "krew-user-app.appspot.com"
};
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import { RNS3 } from 'react-native-aws3';
var BUTTONS = [
    { text: "Camera", icon: "ios-camera", iconColor: "#2c8ef4" },
    { text: "File", icon: "ios-images", iconColor: "#f42ced" }
];


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatRef: '',
            customerId: this.props.navigation.state.params.workerDetails.customer.id ? this.props.navigation.state.params.workerDetails.customer.id : '',
            workerId: this.props.navigation.state.params.workerDetails.worker ? this.props.navigation.state.params.workerDetails.worker.id : '',
            message: '',
            chatRoomId: '',
            typeMessage: '',
            chatList: [],
            visible: false
        }
        if (!firebase.apps.length) {
            firebase.initializeApp({});
        }
        else {
            this.state.chatRef = firebase.apps[0].database().ref().child('messages');
        }


        this.state.chatRef.on('child_added', (snapshot) => {
            const snapShotVal = snapshot.val();
            if ( snapShotVal.chatRoomId == this.state.chatRoomId ){
                let chatList = this.state.chatList;
                const item = snapShotVal;
                chatList.push(item);
                this.setState({ typeMessage: '', chatList: chatList });
            }
            setTimeout(() => {
                this.refs.ScrollViewStart.scrollToEnd(true);
            }, 400);

        })




    }
    componentDidMount() {

        setTimeout(() => {
            this.refs.ScrollViewStart.scrollToEnd();
        }, 50);

        if (this.state.customerId && this.state.workerId) {
            const chatRoomId = this.state.customerId + "_" + this.state.workerId;
            this.setState({ chatRoomId: chatRoomId });

        }
        let chatRoomId = this.state.customerId + '_' + this.state.workerId;
        this.state.chatRef.orderByChild('chatRoomId').equalTo(chatRoomId).once('value').then((snapshot) => {
            console.log(snapshot);
            if (snapshot.val()) {
                var listMesage = [];
                for (let key in snapshot.val()) {
                    listMesage.push(snapshot.val()[key]);
                }
                this.setState({ chatList: listMesage });
                debugger;
                console.log(this.state.chatList);
            }
        }).catch((Err) => {
            console.log(Err);
        })
    }
    sendMessage() {
        if (this.state.typeMessage) {
            console.log(this.state.typeMessage);
            this.state.chatRef.push({ "customerId": this.state.customerId, "workerId": this.state.workerId, "chatRoomId": this.state.chatRoomId, "IsCustomerSender": false, "Message": this.state.typeMessage });
        }
        else {
            Alert.alert("Please type your message to send.")
        }
    }

    uploadPhoto() {
        ActionSheet.show(
            {
                options: BUTTONS,
            },
            (buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
                this.fileUploadType(buttonIndex);
            },
        )

    }

    fileUploadType(buttonIndex) {
        if (buttonIndex == 0) {
            this.captureFile();
        }
        if (buttonIndex == 1) {
            this.attachFile();
        }
    }


    captureFile(data) {
        this.setState({ visible: true });
        ImagePicker.openCamera({
            width: 400,
            height: 300,
            cropping: true
        }).then((response) => {
            let uri;
            if (!response.path) {
                uri = response.uri;
            } else {
                uri = response.path;
            }
            const file = {
                uri,
                name: `${Math.floor((Math.random() * 100000000) + 1)}_.png`,
                type: response.mime || 'image/png',
            };
            const options = config.s3;
            RNS3.put(file, config.s3).then((response) => {
                if (response.status !== 201) {
                    this.setState({ visible: false });
                    throw new Error('Failed to upload image to S3');
                }

                if (response.status == 201) {

                    this.state.chatRef.push({ "customerId": this.state.customerId, "workerId": this.state.workerId, "chatRoomId": this.state.chatRoomId, "IsCustomerSender": false, "MessageImage": response.body.postResponse.location });
                    // let chatList = this.state.chatList;
                    // const item = { "customerId": this.state.customerId, "workerId": this.state.workerId, "chatRoomId": this.state.chatRoomId, "IsCustomerSender": false, "MessageImage": response.body.postResponse.location };
                    // chatList.push(item);
                    this.setState({
                        visible: false
                    });

                }
            }).catch((err) => {
                this.setState({ visible: false });
                console.log(err);
            });
        }).catch((err) => {
            this.setState({ visible: false });
            console.log(err);
        });
    }

    attachFile() {
        ImagePicker.openPicker({
            width: 400,
            height: 300,
            cropping: true,
        }).then((response) => {
            this.setState({ visible: true });
            let uri;
            if (!response.path) {
                uri = response.uri;
            } else {
                uri = response.path;
            }
            const file = {
                uri,
                name: `${Math.floor((Math.random() * 100000000) + 1)}_.png`,
                type: response.mime || 'image/png',
            };
            const options = config.s3;
            RNS3.put(file, config.s3).then((response) => {
                console.log("myImageCapture");
                console.log(response);
                if (response.status !== 201) {
                    this.setState({ visible: false });
                    throw new Error('Failed to upload image to S3');
                }
                if (response.status == 201) {
                    this.state.chatRef.push({ "customerId": this.state.customerId, "workerId": this.state.workerId, "chatRoomId": this.state.chatRoomId, "IsCustomerSender": false, "MessageImage": response.body.postResponse.location });
                    // let chatList = this.state.chatList;
                    // const item = { "customerId": this.state.customerId, "workerId": this.state.workerId, "chatRoomId": this.state.chatRoomId, "IsCustomerSender": false, "MessageImage": response.body.postResponse.location };
                    // chatList.push(item);
                    this.setState({
                        visible: false
                    });
                }
            }).catch((err) => {
                console.log(err);
                this.setState({ visible: false });
            });
        }).catch((err) => {
            this.setState({ visible: false });
        });
    }



    render() {
        return (

            <Container >
                <FSpinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Header style={styles.appHdr2} noShadow androidStatusBarColor="#81cdc7">
                    <Button transparent style={{ width: 30 }}>
                        <Ionicons name="ios-arrow-back" style={styles.headIcon2} />
                    </Button>
                    <Body style={styles.headBody}>
                        <Title style={{ fontSize: 14 }}>Typically replies in a few minutes</Title>
                    </Body>
                    <Button transparent onPress={() => this.props.navigation.goBack()} style={{ width: 30 }}>
                        <EvilIcons name="close" style={styles.headIcon2} />
                    </Button>
                </Header>
                <View style={{flex: 1}}>
                    
                        <View style={{ backgroundColor: '#cccccc', padding: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ marginBottom: 10 }}>
                                    {
                                        this.props.navigation.state.params.workerDetails.customer.image ? (
                                            <Image source={{ uri: this.props.navigation.state.params.workerDetails.customer.image }} style={{ height: 50, width: 50, borderRadius: 70 }} />
                                        ) : (<Image source={require('../../../img/atul.png')} style={{ height: 50, width: 50, borderRadius: 70 }} />)
                                    }

                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text>{this.props.navigation.state.params.workerDetails.customer.name}</Text>
                                    {/* <Text style={{ fontSize: 12 }}>Active in the last 15m</Text> */}
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, textAlign: 'center', width: '100%' }}> Hi! Need help with a booking or have some feedback about the app? Let me know! I'm here to help. </Text>
                            </View>
                        </View>

                    <ScrollView
                        
                        ref='ScrollViewStart'
                        style={{ padding: 10 }}
                        >
                            {
                                this.state.chatList.map((data, key) => (
                                    data.IsCustomerSender ? (
                                        <View style={{ flexDirection: 'row', marginBottom: 15 }} key={key}>
                                            <View style={{ marginRight: 15, justifyContent: 'flex-end' }}>
                                                {
                                                    this.props.navigation.state.params.workerDetails.customer.image ? (
                                                        <Image source={{ uri: this.props.navigation.state.params.workerDetails.customer.image }} style={{ height: 30, width: 30, borderRadius: 70 }} />
                                                    ) : (<Image source={require('../../../img/atul.png')} style={{ height: 30, width: 30, borderRadius: 70 }} />)
                                                }
                                            </View>
                                            <View style={{ marginBottom: 10, overflow: 'visible', position: 'relative', maxWidth: '80%' }}>
                                                <View style={{ padding: 8, borderRadius: 5, backgroundColor: '#fff', position: 'relative', overflow: 'visible' }}>
                                                    {
                                                        data.Message ? (
                                                            <Text style={{ fontSize: 14 }}> {data.Message} </Text>
                                                        ) : (<Image source={{ uri: data.MessageImage }} style={{ height: 100, width: 100, borderRadius: 3 }} />)
                                                    }
                                                    {/* <Text style={{ fontSize: 14 }}>{this.props.auth.data.name}</Text> */}
                                                </View>
                                                <Image source={require('../../../img/icon/chats.png')} style={{ height: 12, width: 12, position: 'absolute', left: -3, bottom: -3, zIndex: 999 }} />
                                            </View>
                                        </View>
                                    ) : (
                                            <View style={{ flexDirection: 'row', marginBottom: 15 }} key={key}>
                                                <View style={{ flex: 1, marginBottom: 10, overflow: 'visible', position: 'relative', alignItems: 'flex-end' }}>
                                                    <View style={{ maxWidth: '80%', padding: 8, borderRadius: 5, backgroundColor: '#fff', position: 'relative', overflow: 'visible' }}>
                                                        {
                                                            data.Message ? (
                                                                <Text style={{ fontSize: 14 }}> {data.Message} </Text>
                                                            ) : (<Image source={{ uri: data.MessageImage }} style={{ height: 100, width: 100, borderRadius: 3 }} />)
                                                        }
                                                    </View>
                                                    <Image source={require('../../../img/icon/chats2.png')} style={{ height: 12, width: 12, position: 'absolute', right: -3, bottom: -3, zIndex: 999 }} />
                                                </View>
                                                <TouchableOpacity style={{ marginLeft: 15, justifyContent: 'flex-end' }} onPress={() => console.log('test 1')} >
                                                    {
                                                        this.props.auth.data.image ? (
                                                            <Image source={{ uri: this.props.auth.data.image }} style={{ height: 30, width: 30, borderRadius: 70 }} />
                                                        ) : (<Image source={require('../../../img/atul.png')} style={{ height: 30, width: 30, borderRadius: 70 }} />)
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        )
                                ))
                            }
                    </ScrollView>
                </View>
                <Footer>
                    <FooterTab>
                        <View style={{ backgroundColor: '#81cdc7', flexDirection: 'row', flex: 1, alignItems: 'center', }}>
                            <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => this.uploadPhoto()}>
                                <Entypo name="camera" style={{ fontSize: 24, color: '#fff' }} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, overflow: 'hidden' }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={{ backgroundColor: '#fff', borderRadius: 40, paddingLeft: 10, paddingRight: 10, height: 36 }}
                                    onChangeText={(text) => this.setState({ typeMessage: text })}
                                    value={this.state.typeMessage}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.sendMessage()} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                <Ionicons name="md-send" style={{ fontSize: 24, color: '#fff' }} />
                            </TouchableOpacity>
                        </View>
                    </FooterTab>
                </Footer>
            </Container>
        );

    }
}


Chat.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default Chat;
