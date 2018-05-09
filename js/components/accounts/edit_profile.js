import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, BackHandler, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FSpinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import { RNS3 } from 'react-native-aws3';
import api from '../../api';
import { Footer, FooterTab, Thumbnail, Container, Header, Button, Content, Input, Body, ActionSheet, Switch } from 'native-base';
import { NavigationActions } from "react-navigation";
import I18n from '../../i18n/i18n';
import styles from './styles';'react-navigation'
import config from '../../config'
import { checkAuth, getUserDetail } from './elements/authActions';

const deviceWidth = Dimensions.get('window').width;
const profileImage = require('../../../img/atul.png');
const carveImage = require('../../../img/bg-1.png');
// const BUTTONS = [
//     { text: 'Camera', icon: 'ios-camera', iconColor: '#2c8ef4' },
//     { text: 'File', icon: 'ios-images', iconColor: '#f42ced' }
// ];

var BUTTONS = [

];
AsyncStorage.getItem("language").then((value) => {
    if (value) {
        const value1 = JSON.parse(value);
        I18n.locale = value1.Code;
        BUTTONS = [
            { text: I18n.t('camera'), icon: "ios-camera", iconColor: "#2c8ef4" },
            { text: I18n.t('file'), icon: "ios-images", iconColor: "#f42ced" }
        ]
    }
});
const resetActionForTiming = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'myTiming' })],
});
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.auth.data.email,
            name: props.auth.data.name,
            phone: props.auth.data.phone,
            image: props.auth.data.image,
            commission: props.auth.data.commission,
            id: props.auth.data.id,
            visible: false,
            uploadButton: true,
            uploaded: false,
            cameraButton: true,
            cameraUploaded: false,
            filecat: 3,
            serviceList: [],
            zoneList: []
        };
        this.actionSheet = null;

    }
    renderBackButton() {
        if (this.props.currentRoute === "EditProfile" && !this.props.prevRoute) {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
                if (this.props.currentRoute === 'EditProfile') {
                    Alert.alert(
                        'Confirm',
                        'Are you sure to exit the app?',
                        [
                            { text: 'Cancel', onPress: () => '', style: 'cancel' },
                            { text: 'OK', onPress: () => BackHandler.exitApp() },
                        ],
                        { cancelable: false }
                    );
                    return true;
                } else {
                    this.props.navigation.goBack(null);
                    return true;
                }

            }.bind(this));
        }
    }
    showActionSheet() {
        if (this.actionSheet !== null) {
            // Call as you would ActionSheet.show(config, callback)
            this.actionSheet._root.showActionSheet({
                options: BUTTONS,
            },
                (buttonIndex) => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                    // this.setState({ filecat: buttonIndex });
                    // this.setState({ filecat: buttonIndex});
                    this.fileUploadType(buttonIndex);
                });
        }

    }


    componentWillMount() {
        api.get('Zones/getParentZone').then((res) => {
            if (res.zone.length > 0) {
                this.setState({ zoneList: res.zone, selectedZoneDetails: res.zone[0], selected1: res.zone[0].id })

                api.post('serviceZones/getZoneRelatedService', { zone: res.zone[0].id }).then((resService) => {
                    if (resService.response.length > 0) {
                        this.setState({ serviceList: resService.response })
                        this.state.serviceList.map((data) => {
                            data.selected = false;
                        });
                        this.props.checkAuth((res) => {
                            this.props.getUserDetail(res.userId, res.id).then((userRes) => {
                                let filter = '{"where":{"workerId":' + res.userId + '}}';
                                api.get('WorkerSkills?filter=' + filter + '&access_token=' + res.id).then((skills) => {
                                    let serviceIds = [];
                                    skills.map((item) => {
                                        serviceIds.push(item.serviceId);
                                    });
                                    resService.response.map((data1) => {
                                        if (data1.service) {
                                            if (serviceIds.includes(data1.service.id)) {
                                                data1.selected = true;
                                            }
                                        }

                                    });
                                    this.setState({ serviceList: resService.response });

                                }).catch((err) => {
                                    this.setState({ visible: false });
                                })
                            }).catch((err) => {
                                this.setState({ visible: false });
                                Alert.alert(I18n.t('data_not_saved_try_again'));
                            });
                        })
                        //this.setState({ visible: false })
                    }
                }).catch((err) => {
                    this.setState({ visible: false })
                });

            }
        }).catch((err) => {
            this.setState({ visible: false })
        });
    }
    attachFile() {
        //this.setState({ uploadButton: false });

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
                if (response.status !== 201) {
                    this.setState({ uploadButton: true });

                    this.setState({ visible: false });
                    throw new Error('Failed to upload image to S3');
                }


                if (response.status == 201) {
                    this.setState({ uploadButton: true });
                    this.setState({ uploaded: true });
                    //this.props.setProfilePic(response.body.postResponse.location);

                    this.setState({ image: response.body.postResponse.location })
                    this.setState({ visible: false });
                    Alert.alert(I18n.t('press_the_save_button_to_save_image'));
                }
            }).catch((err) => {
                this.setState({ visible: false });
            });
        }).catch((err) => {
            this.setState({ visible: false });
            //this.setState({ uploadButton: true });
        });
    }

    captureFile() {
        this.setState({ cameraButton: false });

        ImagePicker.openCamera({
            width: 400,
            height: 300,
            cropping: true
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
                if (response.status !== 201) {
                    this.setState({ cameraButton: true });
                    this.setState({ visible: true });
                    throw new Error('Failed to upload image to S3');
                }


                if (response.status == 201) {
                    this.setState({ cameraButton: true });
                    this.setState({ cameraUploaded: true });
                    this.setState({ image: response.body.postResponse.location });
                    this.setState({ visible: false });
                    Alert.alert(I18n.t('press_the_save_button_to_save_image'));
                }
            }).catch((err) => {
                this.setState({ visible: false });
            });
        }).catch((err) => {
            this.setState({ visible: false });
            this.setState({ cameraButton: true });
        });
    }

    pressSave() {

        if (!this.state.email) {
            Alert.alert(I18n.t('enter_email'));
            return false;
        }
        if (!this.state.name) {
            Alert.alert(I18n.t('enter_name'));
            return false;
        }
        if (!this.state.phone) {
            Alert.alert(I18n.t('enter_phone'));
            return false;
        }
        this.setState({ visible: true });
        this.props.checkAuth((res) => {
            if (res) {
                api.put(`Workers/editWorker/${res.userId}?access_token=${res.id}`, { name: this.state.name, phone: this.state.phone, image: this.state.image }).then((resEdit) => {
                    let data = {};
                    let serviceIds = [];
                    this.state.serviceList.map((item) => {
                        if (item.selected && item.service) {
                            serviceIds.push(item.service.id);
                        }
                    });
                    if (serviceIds.length > 0) {
                        data.serviceIds = serviceIds;
                        data.workerId = res.userId;
                        api.post(`WorkerSkills/insertWorkerSkill?access_token=${res.id}`, data).then((skillRes) => {
                            const WorkerAvailabilitiesUrl = `Workeravailabletimings?filter={"where":{"workerId":"${res.userId}"}}`;
                            api.get(WorkerAvailabilitiesUrl).then((timings) => {
                                if (timings.length && timings.length > 0) {
                                    this.props.getUserDetail(res.userId, res.id).then((userRes) => {
                                        this.setState({ visible: false });
                                        this.props.navigation.navigate('Menu');
                                    }).catch((err) => {
                                        this.setState({ visible: false });
                                        Alert.alert(I18n.t('data_not_saved_try_again'));
                                    });
                                }
                                else {
                                    this.props.getUserDetail(res.userId, res.id).then((userRes) => {
                                        this.setState({ visible: false });
                                        this.props.navigation.dispatch(resetActionForTiming);
                                    }).catch((err) => {
                                        this.setState({ visible: false });
                                        Alert.alert(I18n.t('data_not_saved_try_again'));
                                    });
                                }
                            });

                        }).catch((err) => {
                            this.setState({ visible: false });
                            Alert.alert(I18n.t('please_try_again_later'));
                        })
                    }
                    else {
                        this.setState({ visible: false });
                        Alert.alert(I18n.t('please_select_atleast_one_skill'));
                    }
                }).catch((err) => {
                    this.setState({ visible: false });
                    Alert.alert(I18n.t('data_not_saved_try_again'));
                });
            } else {
                this.setState({ visible: false });
                this.props.navigation.navigate('Login');
            }
        });
    }

    fileUploadType(buttonIndex) {
        if (buttonIndex == 0) {
            this.captureFile();
        }
        if (buttonIndex == 1) {
            this.attachFile();
        }
    }



    switchChange(value, data) {


        let itemList = [];
        this.state.serviceList.map((item) => {
            itemList.push(item);
        });
        itemList.map((item1) => {
            if (item1.id == data.id) {
                item1.selected = value;
            }
        });
        this.setState({ serviceList: itemList });
    }
    render() {
        let serviceListing;
        if (this.state.serviceList.length > 0) {

            serviceListing = (
                this.state.serviceList.map((data, key) => {
                    if (!data.service) return;
                    return (
                        <View key={data.id} style={{ flexDirection: 'row', paddingTop: 7, paddingBottom: 7, alignItems: 'center' }}>
                            <View style={styles.catIten_img_view}>
                                <Switch value={data.selected} onValueChange={(value) => this.switchChange(value, data)} />
                            </View>
                            <Text style={{ flex: 1, paddingLeft: 10 }}>{data.service.name || null}</Text>
                        </View>
                    )
                })
            )
        }
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Content>
                    <FSpinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
                    <Header style={styles.appHdr2} noShadow>
                        <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} activeOpacity={0.5} style={{ width: 40, justifyContent: 'center' }}>
                            <Icon name="chevron-left" style={{ fontSize: 18, color: '#71beb8' }} />
                        </TouchableOpacity>
                        <Body style={styles.appHdrtitleWarp}>
                            <Text style={{ color: '#1e3768' }}> {I18n.t('edit_my_profile')}</Text>
                        </Body>
                        <TouchableOpacity activeOpacity={1} style={{ width: 40, justifyContent: 'center', alignItems:'flex-end'  }}/>
                    </Header>

                    <View style={styles.editPflHdr}>
                        <View style={styles.editPflHdrWrap}>
                            {
                                this.state.image ? (
                                    <Thumbnail source={{ uri: this.state.image }} style={styles.editPflHdrThumbnail} />
                                ) : (
                                        <Thumbnail source={profileImage} style={styles.editPflHdrThumbnail} />
                                    )
                            }

                            <Button
                                primary noShadow small
                                style={styles.editPflHdrBtn}
                                onPress={() =>
                                    this.showActionSheet()}
                            >
                                <Text style={{ color: '#fff' }}>{I18n.t('change_photo')}</Text>
                            </Button>
                            <ActionSheet ref={(c) => { this.actionSheet = c; }} />
                        </View>
                    </View>

                    <View style={{ paddingBottom: 0, marginBottom: 0 }}>
                        <Image source={carveImage} style={{ width: deviceWidth }} />
                    </View>

                    <View>
                        <View style={styles.editprofileLst}>
                            <View style={styles.editprofileWarp}>
                                <Text>{I18n.t('name')}</Text>
                                <Text style={styles.starRed}>*</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Input style={styles.editprofileInput} onChangeText={text => this.setState({ name: text })} value={this.state.name} />
                            </View>
                        </View>
                        <View style={styles.editprofileLst}>
                            <View style={styles.editprofileWarp}>
                                <Text>{I18n.t('email_id')}</Text>
                                <Text style={styles.starRed}>*</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Input editable={false} style={styles.editprofileInput} onChangeText={text => this.setState({ email: text })} value={this.state.email} />
                            </View>
                        </View>

                        <View style={styles.editprofileLst}>
                            <View style={styles.editprofileWarp}>
                                <Text>{I18n.t('phone_no')}</Text>
                                <Text style={styles.starRed}>*</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Input style={styles.editprofileInput} onChangeText={text => this.setState({ phone: text })} value={this.state.phone} keyboardType={'numeric'} />
                            </View>
                        </View>

                        <View style={styles.editprofileLst}>
                            <View style={styles.editprofileWarp}>
                                <Text>{I18n.t('password_small_case')}</Text>
                                <Text style={styles.starRed}>*</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Input style={styles.editprofileInput} value={I18n.t('password_small_case')} secureTextEntry editable={false} />
                            </View>
                        </View>

                         <View style={styles.editprofileLstComission}>
                            <View style={styles.editprofileWarp}>
                                <Text>{I18n.t('commission')}</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Text >{this.state.commission ? this.state.commission : ''}</Text>
                            </View>
                        </View>

                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={{ paddingBottom: 5, paddingLeft: 5 }}>{I18n.t('skills')}</Text>
                                <Text style={styles.starRedSkill}>*</Text>
                            </View>

                            <View>{serviceListing}</View>
                        </View>
                       
                    </View>

                    <Footer>
                        <FooterTab>
                            <TouchableOpacity full style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#81cdc7' }} onPress={() => this.pressSave()} >
                                <Text style={{ color: '#fff', fontSize: 16 }}>{I18n.t('save')}</Text>
                            </TouchableOpacity>
                        </FooterTab>
                    </Footer>
                </Content>
            </Container>
        );
    }
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    currentRoute: state.RouterOwn.currentRoute,
    prevRoute: state.RouterOwn.prevRoute
});

const mapDispatchToProps = dispatch => ({
    checkAuth: cb => dispatch(checkAuth(cb)),
    getUserDetail: (id, auth) => dispatch(getUserDetail(id, auth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
