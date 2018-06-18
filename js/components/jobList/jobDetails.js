import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, ImageBackground, ScrollView, AsyncStorage, Text } from "react-native";
import { Container, Header, Button, Content, Body, Title } from "native-base";

import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import * as firebase from 'firebase';
import 'moment-timezone';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Communications from 'react-native-communications';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import StarRating from 'react-native-star-rating';
import { availablejobs, acceptJob, declineJob } from './elements/jobActions'
import FSpinner from 'react-native-loading-spinner-overlay';
import I18n from '../../i18n/i18n';
import api from '../../api/index';
import Modal from "react-native-modal";

const win = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const height = parseInt(Dimensions.get('window').height / 20);

import styles from "./styles";


class JobDetails extends Component {
    constructor(props) {

        super(props);
        this.state = {
            loader: false,
            detailsData: 'abc',
            starCount: 0,
            isModalVisible: false,
            bottomButtonStatus: 'way',
            jobCancelModal: false,
            jobCancelbuttonStatus: false,
            jobCompletedbuttonStatus: false,
            mapTrackingStatus: 'map',
            latitudeUser: '',
            longitudeUser: '',
            errorLocationUser: '',
            markerStatus: true,
            scrollStatus: 0,
            waypointStart: { latitude: '', longitude: '' },
            waypointEnd: { latitude: '', longitude: '' },
            waypointMid: { latitude: '', longitude: '' },
            trDistance: '',
            trTime: '',
            startAngle: Math.PI * 10 / 6,
            angleLength: Math.PI * 7 / 6,
            workProgressTime: 0,
            workHourDB: 2,
            job_start_time: '',
            job_end_time: '',
            remoteJobDetails: '',
            currency: 'AED',
            itemsRef: '',
            jobTrackingStatus: '',
            progressInterval: '',
            callChat: true,
            reasonList: '',
            reasonName: '',
            reasonId: '',
            navId: '',
            IsProfileDisabled: false,
            IsCallModule: false
        }

    }
    getLocalTimeFormat(gmtTime) {
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
    }

    clickDisable() {
        this.setState({ IsProfileDisabled: true });
        setTimeout(() => {
            this.setState({ IsProfileDisabled: false });
        }, 3000);
    }

    cancelJob() {
        if (this.state.reasonId !== '') {
            const ToSendData = {
                jobId: this.state.remoteJobDetails.id,
                status: "CANCELLED",
                "reason": this.state.reasonId,
                "workerId": this.state.remoteJobDetails.worker.id,
                "serviceId": this.state.remoteJobDetails.service.id
            };
            this.setState({ loader: true });
   
            api.post('Jobs/cancelJob', ToSendData).then((res) => {
                // debugger;
                if (res.response.type === "Error") {
                    this.setState({ loader: false });
                    Alert.alert(I18n.t('please_try_again_later'));
                }
                else {
                    // debugger;
                    let jobDetails = this.state.remoteJobDetails;
                    jobDetails.status = 'CANCELLED';
                    this.setState({ remoteJobDetails: jobDetails, loader: false, jobCancelModal: false });
                    this.props.navigation.navigate('AvailableJobs');
                }
            }).catch((error) => {
                this.setState({ loader: false });
                Alert.alert(I18n.t('please_try_again_later'));
            })
        }
        else {
            Alert.alert(I18n.t('please_select_reason_to_cancel'));
        }

    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    onStarRatingPress(rating) {
        this.setState({ starCount: rating });
        let dateToday_1 = new Date();
        api.post('ratings', {
            "IsWorkerSender": true,
            "ratingDate": dateToday_1,
            "rating": `${rating}`,
            "customerId": this.props.navigation.state.params.jobDetails.customerId,
            "workerId": this.props.auth.data.id
        }).then((response) => {
            Alert.alert(I18n.t('rating_given_successfully'));
        }).catch((err) => {

        })
    }

    onMyWayPress() {
        this.setState({ bottomButtonStatus: 'start', loader: true });
        //navigator watch location start
        let navId = navigator.geolocation.watchPosition((position) => {
            this.setState({
                latitudeUser: position.coords.latitude,
                longitudeUser: position.coords.longitude,
                errorLocationUser: null,
                jobTrackingStatus: 'Krew On The Way',
                loader: false
            });
            let workerId = this.props.auth.data.id;
            let jobIdTr = this.props.navigation.state.params.jobDetails.id;
            this.state.itemsRef = firebase.database().ref().child('tracking');
            jobIdTr = jobIdTr.toString();
            this.state.itemsRef.orderByChild('jobId').equalTo(jobIdTr).once('value').then((snapshot) => {
                if (snapshot && snapshot.val()) {
                    const key = Object.keys(snapshot.val())[0];
                    const ref = this.state.itemsRef.child(key);
                    const onMyWayTime = new Date().toUTCString();
                    const data = {
                        "jobId": this.props.navigation.state.params.jobDetails.id,
                        "customerId": this.props.navigation.state.params.jobDetails.customerId,
                        "workerId": workerId,
                        "lat": position.coords.latitude,
                        "lng": position.coords.longitude,
                        "status": "ONMYWAY"
                    }
                    ref.update(data).then((err) => {
                        //Alert.alert('in then update onmyway');
                        //Change job status in DB
                        api.post('Jobs/changeJobStatusByWorker', {
                            "id": this.props.navigation.state.params.jobDetails.id,
                            "status": 'ONMYWAY',
                            "customerId": this.props.navigation.state.params.jobDetails.customerId,
                            "onMyWayTime":onMyWayTime
                        }).then((response) => {
                            //get job latest details and update state
                            api.post('Jobs/getJobDetailsById', {
                                "id": this.props.navigation.state.params.jobDetails.id,
                                "workerId": this.props.auth.data.id
                            }).then((response) => {
                                if (response.response.message.length && response.response.message.length > 0 && response.response.message[0].price) {
                                    response.response.message[0].price = parseFloat(response.response.message[0].price).toFixed(2);
                                }
                                this.setState({ remoteJobDetails: response.response.message[0], loader: false, });
                                setTimeout(() => {
                                    if (this.refs && this.refs.ScrollViewStart)
                                        this.refs.ScrollViewStart.scrollToEnd();
                                }, 50);
                            }).catch((err) => {

                            })
                            //update lastest job details end
                        }).catch((err) => {

                        })
                        //Change job status in DB end
                    });
                } else {
                    const onMyWayTime = new Date().toUTCString();
                    this.state.itemsRef.push({
                        "jobId": this.props.navigation.state.params.jobDetails.id,
                        "customerId": this.props.navigation.state.params.jobDetails.customerId,
                        "workerId": workerId,
                        "lat": position.coords.latitude,
                        "lng": position.coords.longitude,
                        "status": "ONMYWAY"
                    }).then((theRes) => {
                        //Alert.alert('in then push onmyway')
                        //Change job status in DB
                        api.post('Jobs/changeJobStatusByWorker', {
                            "id": this.props.navigation.state.params.jobDetails.id,
                            "status": 'ONMYWAY',
                            "customerId": this.props.navigation.state.params.jobDetails.customerId,
                            "onMyWayTime": onMyWayTime
                        }).then((response) => {
                            //get job latest details and update state
                            api.post('Jobs/getJobDetailsById', {
                                "id": this.props.navigation.state.params.jobDetails.id,
                                "workerId": this.props.auth.data.id,
                                "onMyWayTime": onMyWayTime
                            }).then((response) => {
                                this.setState({ remoteJobDetails: response.response.message[0], loader: false });
                                setTimeout(() => {
                                    if (this.refs && this.refs.ScrollViewStart)
                                        this.refs.ScrollViewStart.scrollToEnd();
                                }, 50);
                            }).catch((err) => {

                            })
                            //update lastest job details end
                        }).catch((err) => {

                        })
                        //Change job status in DB end
                    })
                }
                setTimeout(() => {
                    if (this.state.loader === true) {
                        this.state.itemsRef.off();
                        Alert.alert(I18n.t('internal_error_try_again'));
                        this.setState({ loader: false });
                    }
                }, 5000);
            }).catch((err) => {
            })

        },
            (error) => this.setState({ errorLocation: error.message }),
            //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
        );
        //navigator end
        this.setState({ navId: navId });

    }

    StartJobSlide() {
        this.setState({ jobCompletedbuttonStatus: true });
    }
    renewJob() {
        this.setState({ mapTrackingStatus: 'timing', bottomButtonStatus: 'complete', loader: true });
        const time_interval = this.state.remoteJobDetails.expectedTimeInterval;
        let timeNowWork = new Date();
        let timeNowConvert = moment(timeNowWork).format('LT');
        let momentConvert = moment(timeNowWork).add(time_interval, 'minutes').format('LT');
        const progressSpeed = (time_interval / 100) * 60000;

        let saveEndTime = moment(timeNowWork).add(time_interval, 'minute').format();
        let newNowTime = moment(timeNowWork).format();
        this.setState({ workProgressTime: 0.2 });
        const progressInterval = setInterval(() => {
            this.setState({ workProgressTime: this.state.workProgressTime + 1 });
        }, progressSpeed);
        this.setState({ progressInterval: progressInterval });

        //update firebase database on job start

        let jobIdTr = `${this.props.navigation.state.params.jobDetails.id}`;
        let refStartFirebase = firebase.database().ref().child('tracking').orderByChild('jobId');
        refStartFirebase.equalTo(jobIdTr).once('value').then((snapshot) => {
            this.onStartFirebaseCall(saveEndTime, newNowTime, snapshot);
            setTimeout(() => {
                if (this.state.loader === true) {
                    this.onStartFirebaseCall(saveEndTime, newNowTime, snapshot);
                    setTimeout(() => {
                        refStartFirebase.off();
                        Alert.alert(I18n.t('internal_error_try_again'));
                        this.setState({ loader: false });
                    }, 5000);
                }
            }, 5000);
        })

        setTimeout(() => {
            if (this.state.loader === true) {
                refStartFirebase.off();
            }
        }, 5000);
        //update firebase on job start ** //

        this.setState({ job_start_time: timeNowConvert, job_end_time: momentConvert, start_time_full: timeNowWork });
    }

    onStartFirebaseCall(saveEndTime, newNowTime, snapshot) {
        if (snapshot && snapshot.val()) {
            const key = Object.keys(snapshot.val())[0];
            const ref = firebase.database().ref().child('tracking').child(key);
            const data = {
                "jobId": `${this.props.navigation.state.params.jobDetails.id}`,
                "customerId": `${this.props.navigation.state.params.jobDetails.customerId}`,
                "workerId": `${this.props.auth.data.id}`,
                "lat": snapshot.val()[key].lat,
                "lng": snapshot.val()[key].lng,
                "status": "JOBSTARTED",
                "endTime": saveEndTime,
                "startTime": newNowTime,
            }
            ref.update(data).then((thenRes) => {
                //change job status for job started
                api.post('Jobs/changeJobStatusByWorker', {
                    "id": this.props.navigation.state.params.jobDetails.id,
                    "status": 'JOBSTARTED',
                    "customerId": this.props.navigation.state.params.jobDetails.customerId,
                    "endTime": saveEndTime,
                    "startTime": newNowTime,
                }).then((response) => {
                    api.post('Jobs/getJobDetailsById', {
                        "id": this.props.navigation.state.params.jobDetails.id,
                        "workerId": this.props.auth.data.id
                    }).then((response) => {
                        this.setState({ remoteJobDetails: response.response.message[0], loader: false, jobTrackingStatus: 'Job Started' });
                        setTimeout(() => {
                            if (this.refs && this.refs.ScrollViewComplete)
                                this.refs.ScrollViewComplete.scrollToEnd();
                        }, 50);
                    }).catch((err) => {

                    })
                }).catch((err) => {

                })
                //job status change end //
            })
        }
    }
    onStartPress() {
        navigator.geolocation.clearWatch(this.state.navId);
        this.setState({ mapTrackingStatus: 'timing', bottomButtonStatus: 'complete', loader: true });
        const time_interval = this.props.navigation.state.params.jobDetails.service.time_interval;
        let timeNowWork = new Date();
        let timeNowConvert = moment(timeNowWork).format('LT');
        let momentConvert = moment(timeNowWork).add(time_interval, 'minutes').format('LT');
        const progressSpeed = (time_interval / 100) * 60000;

        let saveEndTime = moment(timeNowWork).add(time_interval, 'minute').format();
        let newNowTime = moment(timeNowWork).format();
        this.setState({ workProgressTime: 0.2 });
        const progressInterval = setInterval(() => {
            this.setState({ workProgressTime: this.state.workProgressTime + 1 });
        }, progressSpeed);
        this.setState({ progressInterval: progressInterval });

        //update firebase database on job start

        let jobIdTr = this.props.navigation.state.params.jobDetails.id;
        let refStartFirebase = firebase.database().ref().child('tracking').orderByChild('jobId');
        refStartFirebase.equalTo(jobIdTr).once('value').then((snapshot) => {
            this.onStartFirebaseCall(saveEndTime, newNowTime, snapshot);
            setTimeout(() => {
                if (this.state.loader === true) {
                    this.onStartFirebaseCall(saveEndTime, newNowTime, snapshot);
                    setTimeout(() => {
                        refStartFirebase.off();
                        if (this.state.loader) {
                            Alert.alert(I18n.t('internal_error_try_again'));
                            this.setState({ loader: false });
                        }
                    }, 5000);
                }
            }, 5000);
        })

        setTimeout(() => {
            if (this.state.loader === true) {
                refStartFirebase.off();
            }
        }, 5000);
        //update firebase on job start ** //

        this.setState({ job_start_time: timeNowConvert, job_end_time: momentConvert, start_time_full: timeNowWork });
    }
    CompleteJobSlide() {
        this.setState({ bottomButtonStatus: 'complete' });
    }
    onCompleteFirebaseCall(snapshot) {
        if (snapshot && snapshot.val()) {
            const key = Object.keys(snapshot.val())[0];
            const ref = firebase.database().ref().child('tracking').child(key);
            console.warn(key);

            const data = {
                "jobId": `${this.props.navigation.state.params.jobDetails.id}`,
                "customerId": `${this.props.navigation.state.params.jobDetails.customerId}`,
                "workerId": `${this.props.auth.data.id}`,
                "lat": snapshot.val()[key].lat,
                "lng": snapshot.val()[key].lng,
                "status": "PAYPENDING",
            }
            ref.update(data).then((thenRes) => {
                //complete job DB update
                //let start_time = moment(new Date(this.state.start_time_full));
                let start_time = moment(new Date(this.state.remoteJobDetails.jobStartTime));
                let end_time = moment(new Date());
                let minuteDiff = end_time.diff(start_time, 'minute');
                let price = this.props.navigation.state.params.jobDetails.price;
                const jobId = this.props.navigation.state.params.jobDetails.id;
                const customerId = this.props.navigation.state.params.jobDetails.customerId;
                const language = this.props.navigation.state.params.jobDetails.customer && this.props.navigation.state.params.jobDetails.customer.language ? this.props.navigation.state.params.jobDetails.customer.language :'en';
                api.post('Jobs/completeJob', {
                    "id": jobId, "status": "PAYPENDING", "customerId": customerId, "actualTime": minuteDiff,
                    price: price,
                    "serviceId": this.props.navigation.state.params.jobDetails.serviceId,
                    "language": language
                }).then(responseJson => {
                    api.post('Jobs/getJobDetailsById', {
                        "id": this.props.navigation.state.params.jobDetails.id,
                        "workerId": this.props.auth.data.id
                    }).then((response) => {
                        this.setState({ remoteJobDetails: response.response.message[0], loader: false, jobTrackingStatus: 'Payment Pending' });
                    }).catch((err) => {

                    })
                }).catch(err => {

                })
                //end complete job DB update //
            })
        }
    }
    onCompletePress() {
        this.setState({ loader: true });
        //update firebase on complete job
        let jobIdTr = `${this.props.navigation.state.params.jobDetails.id}`;
        let refCompleteFirebase = firebase.database().ref().child('tracking');
        refCompleteFirebase.orderByChild('jobId').equalTo(jobIdTr).once('value').then((snapshot) => {
           // this.onCompleteFirebaseCall(snapshot);
            setTimeout(() => {
                if (this.state.loader === true) {
                    this.onCompleteFirebaseCall(snapshot);
                    // setTimeout(() => {
                    //     refCompleteFirebase.off();
                    //     Alert.alert(I18n.t('internal_error_try_again'));
                    //     this.setState({ loader: false });
                    // }, 9000);
                }
            }, 5000);
        })
        //end firebase status on complete job // 
    }

    MyChat(JobDetailsData) {
        this.clickDisable();
        this.props.navigation.navigate('Chat', { workerDetails: JobDetailsData });
        this.setState({ callChat: true })

    }

    componentDidMount() {

        this.setState({ currency: this.props.navigation.state.params.jobDetails.currency.name });
       
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitudeUser: position.coords.latitude,
                longitudeUser: position.coords.longitude,
                errorLocationUser: null,
            });
        },
            (error) => this.setState({ errorLocation: error.message })
        );
        this.state.itemsRef = firebase.database().ref().child('tracking');
        this.state.itemsRef.on('child_changed', (snapshot) => {
            const snapShotVal = snapshot.val();
            if (snapShotVal.status == 'COMPLETED') {
                let jobDetails = this.state.remoteJobDetails;
                jobDetails.status = snapShotVal.status;
                this.setState({ job_start_time: '', remoteJobDetails: jobDetails, job_end_time: '', jobTrackingStatus: 'Job Completed' });
            }
        })
        AsyncStorage.getItem("currency").then((value) => {
            if (value) {
                const value1 = JSON.parse(value);
                this.setState({ currency: value1.language })
            }
        })

        let jobIdDump = `key@${this.props.navigation.state.params.jobDetails.id}`;
        AsyncStorage.removeItem(jobIdDump, (err) => console.log('finished', err));
        AsyncStorage.getItem(jobIdDump).then((value) => {

            if (value) {
                const value1 = JSON.parse(value);
                this.setState({
                    mapTrackingStatus: value1.buttonStatus,
                    bottomButtonStatus: 'timing',
                    job_start_time: value1.job_start_time,
                    start_time_full: value1.start_time_full,
                })

                let start_time = moment(new Date(value1.start_time_full));
                let end_time = moment(new Date());
                let minuteDiff = end_time.diff(start_time, 'millisecond');

                const progressSpeed = (this.props.navigation.state.params.jobDetails.service.time_interval / 100) * 60000;
                let earlierPercent = Number(minuteDiff / progressSpeed) - 1;
                this.setState({ workProgressTime: earlierPercent })
                const progressInterval = setInterval(() => {
                    ;
                    this.setState({ workProgressTime: this.state.workProgressTime + 1 });
                }, progressSpeed);
                this.setState({ progressInterval: progressInterval });
                if (this.refs && this.refs.ScrollViewComplete);
                this.refs.ScrollViewComplete.scrollToEnd();
            } else {
                if (this.props.navigation.state.params.jobDetails.status === 'ACCEPTED') {
                    if (this.refs && this.refs.ScrollViewEnd);
                    this.refs.ScrollViewEnd.scrollToEnd();
                } else if (this.props.navigation.state.params.jobDetails.status === 'ONMYWAY') {
                    if (this.refs && this.refs.ScrollViewStart);
                    this.refs.ScrollViewStart.scrollToEnd();
                    this.setState({ markerStatus: false });
                } else if (this.props.navigation.state.params.jobDetails.status === 'JOBSTARTED') {
                    if (this.refs && this.refs.ScrollViewComplete);
                    this.refs.ScrollViewComplete.scrollToEnd();

                    api.post('Jobs/getJobDetailsById', {
                        "id": this.props.navigation.state.params.jobDetails.id,
                        "workerId": this.props.auth.data.id
                    }).then((response) => {
                        this.setState({ remoteJobDetails: response.response.message[0] });

                        let start_time1 = moment(this.state.remoteJobDetails.jobStartTime);
                        let start_time_full1 = moment(this.state.remoteJobDetails.jobEndTime).format('LT');
                        let job_start_time1 = moment(this.state.remoteJobDetails.jobStartTime).format('LT');
                        let end_time1 = moment(new Date());
                        let minuteDiff = end_time1.diff(start_time1, 'millisecond');

                        const progressSpeed = (this.props.navigation.state.params.jobDetails.service.time_interval / 100) * 60000;
                        let earlierPercent = Number(minuteDiff / progressSpeed) - 1;
                        this.setState({
                            workProgressTime: earlierPercent,
                            job_start_time: job_start_time1,
                            job_end_time: start_time_full1,
                        });
                        const progressInterval = setInterval(() => {
                            this.setState({ workProgressTime: this.state.workProgressTime + 1 });
                        }, progressSpeed);
                        this.setState({ progressInterval: progressInterval });
                    }).catch((err) => {

                    })
                }
                // if (this.refs && this.refs.ScrollViewEnd) {
                //     this.swipeButtonReady();
                // }
            }
        }).catch((err) => {

        })

        if (this.state.bottomButtonStatus === 'way') {
            if (this.refs && this.refs.ScrollViewEnd) {
                // this.swipeButtonReady();
                // //this.refs.ScrollViewEnd.scrollToEnd();
                // setTimeout(() => {
                //     this.refs.ScrollViewComplete.scrollToEnd();
                //     //this.refs.ScrollViewEnd.scrollToEnd();
                // }, 10);
            }
        }

        api.post('Jobs/getJobDetailsById', {
            "id": this.props.navigation.state.params.jobDetails.id,
            "workerId": this.props.auth.data.id
        }).then((response) => {
            if (response.response.message.length && response.response.message.length > 0 && response.response.message[0].price) {
                if (response.response.message[0].status == 'FOLLOWEDUP') {
                    api.post('jobMaterials/getJobMaterialByJobId', { "jobId": this.props.navigation.state.params.jobDetails.id }).then((materialAns) => {
                        let materialList = materialAns.response.message;
                        materialTotalPrice = 0;
                        materialList.map((materialItem) => {
                            if (materialItem.materials) {
                                materialTotalPrice = Number(materialTotalPrice) + Number(materialItem.price);
                            }
                        })
                        materialTotalPrice = Number(materialTotalPrice) + Number(response.response.message[0].price) + 50;
                        materialTotalPrice = materialTotalPrice.toFixed(2);
                        response.response.message[0].price = materialTotalPrice;
                        this.setState({ remoteJobDetails: response.response.message[0], jobTrackingStatus: response.response.message[0].status });
                        if (this.state.remoteJobDetails.status === 'ONMYWAY') {
                            if (this.refs && this.refs.ScrollViewStart);
                            this.refs.ScrollViewStart.scrollToEnd();
                            this.setState({ jobTrackingStatus: 'Krew On The Way' });
                        } else if (this.state.remoteJobDetails.status === 'JOBSTARTED') {
                            if (this.refs && this.refs.ScrollViewComplete);
                            this.refs.ScrollViewComplete.scrollToEnd();
                            this.setState({ jobTrackingStatus: 'Job Started' });
                        } else if (this.state.remoteJobDetails.status === 'ACCEPTED') {
                            this.setState({ jobTrackingStatus: 'Krew Assigned' });
                        } else if (this.state.remoteJobDetails.status === 'STARTED') {
                            this.setState({ jobTrackingStatus: 'Job Requested' });
                        }
                        else if (this.state.remoteJobDetails.status === 'FOLLOWEDUP') {
                            if (this.refs && this.refs.ScrollViewComplete);
                            this.refs.ScrollViewComplete.scrollToEnd();
                            this.setState({ jobTrackingStatus: 'Job Followed Up' });
                        }
                        else if (this.state.remoteJobDetails.status === 'PAYPENDING') {
                            this.setState({ jobTrackingStatus: 'Payment Pending' });
                        }
                    }).catch((err5) => {

                    })
                }
                else {
                    response.response.message[0].price = parseFloat(response.response.message[0].price).toFixed(2);
                    let jobCancelbuttonStatus = false;
                    if (response.response.message[0].status == 'ACCEPTED') {
                        if (response.response.message[0].worker && response.response.message[0].worker.isDedicated) {

                        }
                        else {
                            jobCancelbuttonStatus = true;
                        }
                    }
                    this.setState({ jobCancelbuttonStatus: jobCancelbuttonStatus, remoteJobDetails: response.response.message[0], jobTrackingStatus: response.response.message[0].status });

                    if (this.state.remoteJobDetails.status === 'ONMYWAY') {
                        if (this.refs && this.refs.ScrollViewStart);
                        this.refs.ScrollViewStart.scrollToEnd();
                        this.setState({ jobTrackingStatus: 'Krew On The Way' });
                    } else if (this.state.remoteJobDetails.status === 'JOBSTARTED') {
                        if (this.refs && this.refs.ScrollViewComplete);
                        this.refs.ScrollViewComplete.scrollToEnd();
                        this.setState({ jobTrackingStatus: 'Job Started' });
                    } else if (this.state.remoteJobDetails.status === 'ACCEPTED') {
                        this.setState({ jobTrackingStatus: 'Krew Assigned' });
                    } else if (this.state.remoteJobDetails.status === 'STARTED') {
                        this.setState({ jobTrackingStatus: 'Job Requested' });
                    }
                    else if (this.state.remoteJobDetails.status === 'PAYPENDING') {
                        this.setState({ jobTrackingStatus: 'Payment Pending' });
                    }
                    else if (this.state.remoteJobDetails.status === 'FOLLOWEDUP') {
                        if (this.refs && this.refs.ScrollViewRenew);
                        this.refs.ScrollViewRenew.scrollToEnd();
                        this.setState({ jobTrackingStatus: 'Job Followed Up' });
                    }
                }
            }
        }).catch((err) => {

        })

        api.get('cancelReasons').then((reason) => {
            let reasonsList = [];
            reason.map((item) => {
                if (item.is_active) {
                    item.IsSelected = false;
                    reasonsList.push(item);
                }
            })
            this.setState({ reasonList: reasonsList });
        }).catch((errReason) => {

        })

        //this.updateProgressTime();
    }

    swipeButtonReady() {
        setTimeout(() => {
            this.setState({ scrollStatus: 1 });
            if (this.refs && this.refs.ScrollViewEnd);
            this.refs.ScrollViewEnd.scrollToEnd();
        }, 50);
    }

    IgnoreJob() {
        this.setState({
            loader: true
        })
        let jobId = this.props.navigation.state.params.jobDetails.id;
        let workerId = this.props.auth.data.id;
        let serviceId = this.props.navigation.state.params.jobDetails.serviceId;
        api.post('Jobs/ignoreJob', { "id": jobId, "workerId": workerId, "serviceId": serviceId, 'currencyId': this.props.navigation.state.params.jobDetails.currencyId }).then((resIgnore) => {
            this.props.navigation.navigate('AvailableJobs');
            this.setState({ loader: false });
        }).catch((errCatch) => {
            Alert.alert(I18n.t('failed_please_try_again'));
        })
    }

    declineJob() {
        this.setState({
            loader: true
        })
        let jobId = this.props.navigation.state.params.jobDetails.id;
        let workerId = this.props.auth.data.id;
        let serviceId = this.props.navigation.state.params.jobDetails.serviceId;
        let language = this.props.auth.data.language ? this.props.auth.data.language : 'en';
        this.props.declineJob(jobId, workerId, serviceId, language).then(res => {
            //this.jobdata();
            if (res.response.type == "Error") {
                Alert.alert('', responseJson.response.message);
                this.setState({ loader: false });
            } else {
                api.post('Jobs/getJobDetailsById', {
                    "id": this.props.navigation.state.params.jobDetails.id,
                    "workerId": this.props.auth.data.id
                }).then((response) => {
                    this.setState({ remoteJobDetails: response.response.message[0], loader: false });
                }).catch((err) => {

                })
            }

        }).catch(err => {

            this.setState({
                loader: false
            })
        })
        let newJobDetails = this.props.navigation.state.params.jobDetails;
        newJobDetails.status = "DECLINED"
        this.props.navigation.setParams({ jobDetails: newJobDetails });
    }
    acceptJob() {
        this.setState({ loader: true, bottomButtonStatus: 'way' })
        let jobId = this.props.navigation.state.params.jobDetails.id;
        let workerId = this.props.auth.data.id;
        let customerId = this.state.remoteJobDetails.customerId;
        var language = this.props.auth.data.language ? this.props.auth.data.language : 'en';
        this.props.acceptJob(jobId, workerId, customerId, language).then(res => {
            
            if (res.response.type == "Error") {
                Alert.alert('', res.response.message);
                this.setState({ loader: false });
            } else {
                api.post('Jobs/getJobDetailsById', {
                    "id": this.props.navigation.state.params.jobDetails.id,
                    "workerId": this.props.auth.data.id
                }).then((response) => {
                    this.setState({ remoteJobDetails: response.response.message[0], loader: false, jobTrackingStatus: 'Krew Assigned' });
                    this.swipeButtonReady();
                }).catch((err) => {
                })
            }

        }).catch(err => {
            this.setState({
                loader: false
            })
        })
        let newJobDetails = this.props.navigation.state.params.jobDetails;
        newJobDetails.status = "ACCEPTED"
        this.props.navigation.setParams({ jobDetails: newJobDetails });
    }

    renderTracking() {
        this.setState({ markerStatus: false, jobCancelbuttonStatus: false });
        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.setState({
        //         latitudeUser: position.coords.latitude,
        //         longitudeUser: position.coords.longitude,
        //         errorLocationUser: null,
        //     });
        //     },
        //     (error) => this.setState({ errorLocation: error.message }),
        //     //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
        // );

    }

    onReasonSelect(reasonData) {
        let reasonsList = this.state.reasonList;
        reasonsList.map((item) => {
            if (item.id == reasonData.id) {
                item.IsSelected = true;
            }
            else {
                item.IsSelected = false;
            }
        })
        this.setState({ reasonName: reasonData.name, reasonId: reasonData.id, reasonList: reasonsList });
    }

    startFollowUp() {
        this.clickDisable();
        clearInterval(this.state.progressInterval);
        this.props.navigation.navigate('FollowUpList', { jobDetails: this.state.remoteJobDetails });

    }
    componentWillMount() {
        // console.log(this.props.navigation.state.params.jobDetails);
    }

    render() {
        let JobDetailsData;
        if (this.state.remoteJobDetails !== '') {
            JobDetailsData = this.state.remoteJobDetails;
        } else {
            JobDetailsData = this.props.navigation.state.params.jobDetails;
        }


        let region = {
            latitude: this.props.navigation.state.params.jobDetails.userLocation.latitude ? Number(this.props.navigation.state.params.jobDetails.userLocation.latitude) : 37.78825,
            longitude: this.props.navigation.state.params.jobDetails.userLocation.longitude ? Number(this.props.navigation.state.params.jobDetails.userLocation.longitude) : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        let origin = { latitude: region.latitude, longitude: region.longitude };
        let destination = { latitude: this.state.latitudeUser, longitude: this.state.longitudeUser };
        let GOOGLE_MAPS_APIKEY = 'AIzaSyCya136InrAdTM3EkhM9hryzbCcfTUu7UU';
        return (
            <Container style={{ backgroundColor: '#fff' }}>

                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <Header style={[styles.headerWarp, { alignItems: 'center', justifyContent: 'center' }]} noShadow androidStatusBarColor="#81cdc7" >
                    <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} style={[{ justifyContent: 'center' }, JobDetailsData.status == 'JOBSTARTED' ? { width: 90 } : { width: 40 }]}>
                        <Ionicons name="ios-arrow-back" style={styles.headIcon2} />
                    </TouchableOpacity>
                    <Body style={styles.headBody}>
                        <Title><Text>{I18n.t('jobDetails')}</Text></Title>
                    </Body>

                    {

                        JobDetailsData.status == 'JOBSTARTED' ? (
                            <TouchableOpacity transparent
                                onPress={() => this.startFollowUp()}
                                activeOpacity={0.5}
                                style={{ width: 90, justifyContent: 'center', alignItems: 'flex-end' }}
                                disabled={this.state.IsProfileDisabled}
                            ><Text style={{ fontWeight: '100' }}>{I18n.t('followUp')}</Text></TouchableOpacity>
                        ) : (<TouchableOpacity activeOpacity={1} style={{ width: 40, justifyContent: 'center', alignItems: 'flex-end' }} />)
                    }
                </Header>

                <Content style={{ backgroundColor: '#ccc' }}>
                    {/* <View style={{ backgroundColor: 'orange', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../img/bg-6.png')} style={{ height: 30, width: 30 }}/>
                        <Text style={{ color: '#fff', paddingLeft: 8 }}>{JobDetailsData.service ? JobDetailsData.service.name : ''}</Text>
                    </View> */}

                    {/* 
                        Time tracking start 
                        time tracking commented to test other feature
                        
                    */}
                    {
                        (JobDetailsData.status === 'ACCEPTED' || JobDetailsData.status === 'ONMYWAY') ?

                            /* Time tracking end */
                            <View>
                                <MapView
                                    ref={c => this.mapView = c}
                                    style={{ width: win, height: 250 }}
                                    zoomEnabled
                                    zoomControlEnabled
                                    maxZoomLevel={20}
                                    //minZoomLevel={14}
                                    region={region}
                                    onRegionChangeComplete={this.onRegionChange}
                                    onRegionChange={this.onLocationChange}
                                >

                                    {
                                        (this.state.longitudeUser !== '' && JobDetailsData.status === 'ONMYWAY') ?
                                            <MapViewDirections
                                                origin={origin}
                                                destination={destination}
                                                apikey={GOOGLE_MAPS_APIKEY}
                                                mode={'driving'}
                                                strokeWidth={3}
                                                strokeColor="hotpink"
                                                onReady={(result) => {

                                                    let lastCount = result.coordinates.length - 1;
                                                    let midCount = parseInt(result.coordinates.length / 2);
                                                    let trDistance = parseFloat(result.distance).toFixed(1);
                                                    let trDuration = parseInt(result.duration);
                                                    if (trDuration > 60) {
                                                        trHour = parseInt(trDuration / 60);
                                                        trMinute = parseInt(trDuration % 60);
                                                        trDuration = trHour + "Hour " + trMinute + "min";
                                                    }
                                                    this.setState({
                                                        waypointStart: {
                                                            latitude: result.coordinates[0].latitude,
                                                            longitude: result.coordinates[0].longitude
                                                        },
                                                        waypointEnd: {
                                                            latitude: result.coordinates[lastCount].latitude,
                                                            longitude: result.coordinates[lastCount].longitude
                                                        },
                                                        waypointMid: {
                                                            latitude: result.coordinates[midCount].latitude,
                                                            longitude: result.coordinates[midCount].longitude
                                                        },
                                                        trDistance: trDistance,
                                                        trTime: trDuration,
                                                    })

                                                    this.mapView.fitToCoordinates(result.coordinates, {
                                                        edgePadding: {
                                                            right: (width / 20),
                                                            bottom: height,
                                                            left: (width / 20),
                                                            top: height,
                                                        }
                                                    });
                                                }}
                                            /> : console.log('onready end outside', this.state)

                                    }
                                    {
                                        this.state.markerStatus === true ?
                                            //worker location
                                            <Marker
                                                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                                                title={this.props.navigation.state.params.jobDetails.userLocation.name}
                                            />
                                            :
                                            this.state.waypointEnd.latitude !== '' ?
                                                //customer location
                                                <Marker
                                                    coordinate={this.state.waypointEnd}
                                                    title={this.props.navigation.state.params.jobDetails.userLocation.name}
                                                />
                                                : console.log('waypointEnd', this.state.waypointEnd)
                                    }
                                    {
                                        this.state.markerStatus === false ?
                                            <Marker
                                                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                                                title={this.props.navigation.state.params.jobDetails.userLocation.name}
                                            />
                                            : console.log()
                                    }
                                    {
                                        this.state.markerStatus === true ? console.log()
                                            : this.state.waypointMid.latitude !== '' ?
                                                <MapView.Marker coordinate={this.state.waypointMid}>
                                                    <View style={{
                                                        backgroundColor: 'transparent'
                                                    }}>
                                                        <View style={{ backgroundColor: 'white', padding: 5, alignItems: 'center' }}>
                                                            <Text style={{ fontSize: 12 }} >{this.state.trDistance} km</Text>
                                                            <Text style={{ fontSize: 12 }} >{this.state.trTime}</Text>
                                                        </View>
                                                        <View style={{ width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: -5 }}>
                                                            <Image source={require("../../../img/icon/arrowDown.png")} style={{ height: 20, width: 20 }} />
                                                        </View>
                                                    </View>
                                                </MapView.Marker>
                                                : console.log()
                                    }
                                </MapView>
                            </View>
                            /* Time tracking map end */
                            :
                            JobDetailsData.status === 'JOBSTARTED' ?
                                <View style={{ flex: 1, flexDirection: 'row', padding: 30 }}>
                                    <View style={{ flex: 2, flexDirection: 'column' }}>
                                        <View style={{ flex: 2 }}>
                                            <Text>{I18n.t('start_time')}</Text>
                                            <Text>{this.state.job_start_time}</Text>
                                        </View>
                                        <View style={{ flex: 2 }} >
                                            <Text>{I18n.t('end_time')}</Text>
                                            <Text>{this.state.job_end_time}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 4 }}>
                                        <AnimatedCircularProgress
                                            size={120}
                                            width={15}
                                            fill={this.state.workProgressTime}
                                            tintColor="#00e0ff"
                                            onAnimationComplete={() => console.log('none')}
                                            backgroundColor="#3d5875"
                                        />
                                    </View>
                                </View>
                                :
                                JobDetailsData.status === 'COMPLETED' ?
                                    <View>
                                        <ImageBackground source={{ uri: JobDetailsData.service?JobDetailsData.service.cover_image:'' }} style={{ alignItems: 'center', justifyContent: 'flex-start', width: win, height: (win * 0.62), paddingTop: 25 }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text>{I18n.t('rate_your_customer')}</Text>
                                            </View>
                                        </ImageBackground>
                                        <Image source={require('../../../img/icon17.png')} style={{ width: win, height: (win * 0.1), marginTop: -(win * 0.1) }} />
                                    </View>
                                    :
                                    JobDetailsData.status === 'STARTED' || JobDetailsData.status === 'FOLLOWEDUP' || JobDetailsData.status === 'PAYPENDING' ?

                                        JobDetailsData.service && JobDetailsData.service.banner_image ?
                                            <View>
                                                <ImageBackground source={{ uri: JobDetailsData.service.cover_image }} style={{ alignItems: 'center', justifyContent: 'flex-start', width: win, height: (win * 0.62), paddingTop: 25 }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontWeight: '700', fontSize: 18 }}>{JobDetailsData.service.name}</Text>
                                                        <Text>{this.state.currency} {JobDetailsData.price}</Text>
                                                    </View>
                                                </ImageBackground>
                                                <Image source={require('../../../img/icon17.png')} style={{ width: win, height: (win * 0.1), marginTop: -(win * 0.1) }} />
                                            </View>
                                            :
                                            <View>
                                                <ImageBackground source={require('../../../img/bg-6.png')} style={{ alignItems: 'center', justifyContent: 'flex-start', width: win, height: (win * 0.62), paddingTop: 25 }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontWeight: '700', fontSize: 18 }}>{JobDetailsData.service?JobDetailsData.service.name:''}</Text>
                                                        <Text>{this.state.currency} {JobDetailsData.price}</Text>
                                                    </View>
                                                </ImageBackground>
                                                <Image source={require('../../../img/icon17.png')} style={{ width: win, height: (win * 0.1), marginTop: -(win * 0.1) }} />
                                            </View>
                                        : console.log()
                    }
                    <View style={{ backgroundColor: 'orange', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                        {
                            JobDetailsData.service && JobDetailsData.service.banner_image ?
                                <Image source={{ uri: JobDetailsData.service.banner_image }} style={{ height: 30, width: 30 }} /> :
                                <Image source={require('../../../img/bg-6.png')} style={{ height: 30, width: 30 }} />
                        }
                        <Text style={{ color: '#fff', paddingLeft: 8 }}>{JobDetailsData.service ? JobDetailsData.service.name : ''}</Text>
                    </View>

                    <TouchableOpacity style={styles.jobItemWarp} onPress={() => {
                        this.clickDisable();
                        this.props.navigation.navigate('JobTracker', { Jobid: JobDetailsData.id });
                    }
                    }
                        disabled={this.state.IsProfileDisabled}
                    >
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <Ionicons name="ios-man-outline" style={styles.jobItemIconIonicons} />
                        </View>
                        <Text style={styles.jobItemName}>{I18n.t('job_tracker')}</Text>
                        <Text style={styles.jobItemValue}>{this.state.jobTrackingStatus}</Text>
                    </TouchableOpacity>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <EvilIcons name="location" style={{ color: '#1e3768', fontSize: 24 }} />
                        </View>
                        {
                            JobDetailsData.userLocation.buildingName ? (
                                <Text style={styles.jobItemName}>{JobDetailsData.userLocation.buildingName}, {JobDetailsData.userLocation.name}, {JobDetailsData.userLocation.villa}</Text>
                            ) : null
                        }
                    </View>
                    {
                        JobDetailsData.status != 'STARTED' ? (
                            this.state.callChat ? (
                                <View style={styles.jobItemWarp}>
                                    <View>
                                        {
                                            JobDetailsData.customer ?
                                                JobDetailsData.customer.image ? (
                                                    <Image source={{ uri: JobDetailsData.customer.image }} style={{ height: 50, width: 50, borderRadius: 45, }} />

                                                ) : (
                                                        <Image source={require('../../../img/avatar.png')} style={{ height: 50, width: 50, borderRadius: 45, }} />
                                                    )
                                                : console.log()
                                        }

                                    </View>
                                    {
                                        JobDetailsData.status=='PAYPENDING' || JobDetailsData.status=='COMPLETED'?(
                                            <View style={{ paddingLeft: 10, flex: 1 }}>
                                                <Text style={{ fontSize: 16, fontWeight: '700' }}>{JobDetailsData.customer ? JobDetailsData.customer.name : console.log()}</Text>
                                                <TouchableOpacity style={{ width: 90 }} onPress={this._toggleModal}>
                                                    {/* <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                starSize={14}
                                                halfStarEnabled={true}
                                                rating={Number(JobDetailsData.customerRating) === 0 ? this.state.starCount : Number(JobDetailsData.customerRating)}
                                                fullStarColor='#81cdc7'
                                                selectedStar={this._toggleModal}
                                            /> */}
                                                    <TouchableOpacity style={{ backgroundColor: '#81cdc7', borderRadius: 10, padding: 10 }} onPress={() => this._toggleModal()}>
                                                        <Text style={{ color: 'white' }}>{I18n.t('rate_now')}</Text></TouchableOpacity>
                                                </TouchableOpacity>
                                            </View>
                                        ):(
                                            console.log(null)
                                        )
                                    }
                                   
                                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.setState({ callChat: false })}>
                                        <Image source={require('../../../img/icon/chat-support.png')} style={{ height: 25, width: 25 }} />
                                        <Text style={{ fontSize: 12 }}>{I18n.t('chat_call')}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                    <View style={[styles.jobItemWarp, { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }]}>
                                        <TouchableOpacity style={{ flex: 1, backgroundColor: '#81cdc7', height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} onPress={() => this.MyChat(JobDetailsData)} disabled={this.state.IsProfileDisabled}>
                                            <MaterialIcons name="chat" style={{ fontSize: 18, color: '#fff' }} />
                                            <Text style={{ color: '#fff' }}>  {I18n.t('chat')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flex: 1, backgroundColor: '#1e3768', height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                                            onPress={() => this.setState({ IsCallModule: true })}
                                        >
                                            <MaterialIcons name="call" style={{ fontSize: 18, color: '#fff' }} />
                                            <Text style={{ color: '#fff' }}>{I18n.t('call')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                        ) : null

                    }
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <MaterialIcons name="date-range" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>{I18n.t('date_timing')}</Text>
                        <Text style={[styles.jobItemValue, styles.jobItemValueDateandTime]}>{this.getLocalTimeFormat(JobDetailsData.postedDate)}</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <MaterialIcons name="location-on" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>{I18n.t('location')}</Text>
                        {
                            JobDetailsData.userLocation.name ? (<Text style={styles.jobItemValue}>{JobDetailsData.userLocation.name}</Text>) : null
                        }

                    </View>
                    {
                        JobDetailsData.status != 'STARTED' ? (
                            <TouchableOpacity
                                style={styles.jobItemWarp}
                                disabled={this.state.IsProfileDisabled}
                                onPress={() => {
                                    this.clickDisable();
                                    this.props.navigation.navigate('jobSummary', { jobDetails: JobDetailsData })
                                }
                                }
                            >
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <SimpleLineIcons name="docs" style={styles.jobItemIcon} />
                                </View>
                                <Text style={styles.jobItemName}>{I18n.t('job_summary')}</Text>
                                <Text style={styles.jobItemValue}>{this.state.currency} {JobDetailsData.price}</Text>
                            </TouchableOpacity>
                        ) : (
                                <View></View>
                            )
                    }

                    {

                        JobDetailsData.status === 'JOBSTARTED' || JobDetailsData.status === 'FOLLOWEDUP' ? (
                            <TouchableOpacity style={styles.jobItemWarp} onPress={() => {
                                this.clickDisable();
                                this.props.navigation.navigate('Quote', { jobId: JobDetailsData.id })
                            }
                            }
                                disabled={this.state.IsProfileDisabled}

                            >
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <Ionicons name="ios-flag-outline" style={styles.jobItemIconIonicons} />
                                </View>
                                <Text style={styles.jobItemName}>{I18n.t('quote_follow')}</Text>
                                <Text style={styles.jobItemValue}>Yes</Text>
                            </TouchableOpacity>
                        ) : (console.log(''))
                    }

                    {/* {

                        JobDetailsData.status === 'PAYPENDING'  ? (

                            <TouchableOpacity style={styles.jobItemWarp}>
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <MaterialIcons name="payment" style={styles.jobItemIcon} />
                                </View>
                                <Text style={styles.jobItemName}>{I18n.t('payment')}</Text>
                                <Text style={styles.jobItemValue}>{JobDetailsData.payment}</Text>
                            </TouchableOpacity>
                        ) : null
                    } */}

                    {/*
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <MaterialIcons name="payment" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>{I18n.t('payment')}</Text>
                        <Text style={styles.jobItemValue}>{JobDetailsData.payment}</Text>
                    </View>
                     {
                        JobDetailsData.status==='FOLLOWEDUP'?
                        <View>
                                <ScrollView
                                    ref='ScrollViewRenew'
                                    pagingEnabled={true}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={400}
                                    onScrollEndDrag={() => this.StartJobSlide()}
                                    style={{ width: '100%' }}>
                                    <View style={{ width: win, backgroundColor: 'white', paddingLeft: 10, paddingRight: 10 }}>
                                        <TouchableOpacity
                                            style={{ flex: 1, alignItems: 'center', backgroundColor: '#81cdc7', justifyContent: 'center', marginTop: 3, borderRadius: 5 }}
                                            activeOpacity={1}
                                            onPress={() => this.renewJob()}
                                        >
                                            <Text style={{ color: '#fff' }}>{I18n.t('renew_job')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: win, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                        <View style={{ backgroundColor: '#81cdc7', paddingLeft: 10, paddingRight: 10 }}>
                                            <FontAwesome name="angle-right" style={{ color: '#fff', fontSize: 40 }} />
                                        </View>
                                        <View style={{ flex: 1, paddingLeft: 15 }}>
                                            <Text>{I18n.t('slide_to_click_renew_job')}</Text>
                                        </View>
                                    </View>

                                </ScrollView>
                            </View>:
                        <View></View>
                    } */}
                    {
                        JobDetailsData.status === 'COMPLETED' ?
                            <TouchableOpacity style={styles.jobItemWarp} onPress={() => {
                                this.clickDisable();
                                this.props.navigation.navigate('TotalBill', { jobDetails: JobDetailsData });
                            }
                            }
                                disabled={this.state.IsProfileDisabled}
                            >
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <FontAwesome name="money" style={styles.jobItemIcon} />
                                </View>
                                <Text style={styles.jobItemName}>{I18n.t('total_bill')}</Text>
                                <Text style={styles.jobItemValue}>{this.state.currency} {JobDetailsData.price}</Text>
                            </TouchableOpacity>
                            : console.log()
                    }


                    {/* bala  : start*/}
                    {
                        JobDetailsData.status == 'STARTED' ? (
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', height: 50, justifyContent: 'center' }} onPress={() => this.IgnoreJob()}>
                                    <Text style={{ color: '#fff' }}>
                                        {I18n.t('ignore_button')}
                                    </Text></TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: '#81cdc7', alignItems: 'center', height: 50, justifyContent: 'center' }} onPress={() => this.acceptJob()}>
                                    <Text style={{ color: '#fff' }}>
                                        {I18n.t('accept_button')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (<View>

                        </View>)
                    }
                    {
                        JobDetailsData.status == 'DECLINED' ?
                            <View style={{ alignSelf: 'center', flex: 1 }}>
                                <Button style={{ backgroundColor: '#E86F49', flex: 1 }} >
                                    <Text>You have declined this job</Text>
                                </Button>
                            </View>
                            : console.log()
                    }
                    {
                        JobDetailsData.status === 'ONMYWAY' ?
                            <View>
                                <View>
                                    {/* on click to start job */}
                                    <ScrollView
                                        ref='ScrollViewStart'
                                        pagingEnabled={true}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        scrollEventThrottle={400}
                                        onScrollEndDrag={() => this.StartJobSlide()}
                                        style={{ width: '100%' }}>
                                        <View style={{ width: win, backgroundColor: 'white', paddingLeft: 10, paddingRight: 10 }}>
                                            <TouchableOpacity
                                                style={{ flex: 1, alignItems: 'center', backgroundColor: '#81cdc7', justifyContent: 'center', marginTop: 3, borderRadius: 5 }}
                                                activeOpacity={1}
                                                onPress={() => this.onStartPress()}
                                            >
                                                <Text style={{ color: '#fff' }}>{I18n.t('start_job')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: win, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                            <View style={{ backgroundColor: '#81cdc7', paddingLeft: 10, paddingRight: 10 }}>
                                                <FontAwesome name="angle-right" style={{ color: '#fff', fontSize: 40 }} />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 15 }}>
                                                <Text>{I18n.t('slide_to_click_start_job')}</Text>
                                            </View>
                                        </View>

                                    </ScrollView>
                                    {/* on click to start job end */}
                                </View>
                            </View>
                            : console.log()
                    }
                    {
                        JobDetailsData.status === 'JOBSTARTED' ?
                            <View>
                                <View>
                                    {/* on click to start */}
                                    <ScrollView
                                        ref='ScrollViewComplete'
                                        pagingEnabled={true}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        scrollEventThrottle={400}
                                        onScrollEndDrag={() => this.CompleteJobSlide()}
                                        style={{ width: '100%' }}>
                                        <View style={{ width: win, backgroundColor: 'white', paddingLeft: 10, paddingRight: 10 }}>
                                            <TouchableOpacity
                                                style={{ flex: 1, alignItems: 'center', backgroundColor: '#81cdc7', justifyContent: 'center', marginTop: 3, borderRadius: 5 }}
                                                activeOpacity={1}
                                                onPress={() => this.onCompletePress()}
                                            >
                                                <Text style={{ color: '#fff' }}>{I18n.t('job_completed')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: win, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                            <View style={{ backgroundColor: '#81cdc7', paddingLeft: 10, paddingRight: 10 }}>
                                                <FontAwesome name="angle-right" style={{ color: '#fff', fontSize: 40 }} />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 15 }}>
                                                <Text>{I18n.t('slide_to_click_compelte_job')}</Text>
                                            </View>
                                        </View>

                                    </ScrollView>
                                    {/* on click to end */}
                                </View>
                            </View>
                            : console.log()
                    }
                    {
                        JobDetailsData.status == 'ACCEPTED' ?

                            this.props.auth.data.id === JobDetailsData.workerId ?
                                (
                                    <View>
                                        {
                                            //this.state.bottomButtonStatus === 'way' ?
                                            <View>
                                                {
                                                    console.log('re rendered call', this.state)
                                                }
                                                <View>
                                                    {/* on my way slider start */}
                                                    <ScrollView
                                                        ref='ScrollViewEnd'
                                                        pagingEnabled={true}
                                                        horizontal={true}
                                                        showsHorizontalScrollIndicator={false}
                                                        scrollEventThrottle={400}
                                                        onScrollEndDrag={() => this.renderTracking()}
                                                        style={{ width: '100%' }}>
                                                        <View style={{ width: win, backgroundColor: 'white', paddingLeft: 10, paddingRight: 10 }}>
                                                            <TouchableOpacity
                                                                style={{ flex: 1, alignItems: 'center', backgroundColor: '#81cdc7', justifyContent: 'center', marginTop: 3, borderRadius: 5 }}
                                                                activeOpacity={1}
                                                                onPress={() => this.onMyWayPress()}
                                                            >
                                                                <Text style={{ color: '#fff' }}>{I18n.t('on_my_way')}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ width: win, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                                            <View style={{ backgroundColor: '#81cdc7', paddingLeft: 10, paddingRight: 10 }}>
                                                                <FontAwesome name="angle-right" style={{ color: '#fff', fontSize: 40 }} />
                                                            </View>
                                                            <View style={{ flex: 1, paddingLeft: 15 }}>
                                                                <Text>{I18n.t('slide_to_click_on_my_way')}</Text>
                                                            </View>
                                                        </View>

                                                    </ScrollView>
                                                    {/* on my way slider end */}
                                                </View>
                                                {/* cancel button start */}
                                                <View style={styles.jobItemWarp}>
                                                    {this.state.jobCancelbuttonStatus === true ?
                                                        <TouchableOpacity
                                                            style={{ flex: 1, backgroundColor: '#81cdc7', alignItems: 'center', paddingTop: 10, paddingBottom: 10, borderRadius: 4 }}
                                                            onPress={() => this.setState({ jobCancelModal: true })}
                                                        >
                                                            <Text style={{ color: '#fff' }}>{I18n.t('cancel_job_button')}</Text>
                                                        </TouchableOpacity>
                                                        : null}
                                                </View>
                                                {/* cancel button end */}
                                            </View>

                                        }

                                    </View>
                                )
                                : (<View style={{ alignSelf: 'center', flex: 1 }}>
                                    <Button style={{ backgroundColor: '#E86F49', flex: 1 }} >
                                        <Text>This job is accepted</Text>
                                    </Button>
                                </View>)
                            : console.log()

                    }
                    {/* bala  : end*/}
                </Content>

                {/* Modal Job Cancel start */}
                <Modal isVisible={this.state.jobCancelModal}>
                    <TouchableOpacity
                        transparent style={{ flex: 1, justifyContent: 'center', display: 'flex', width: '100%' }}
                        onPress={() => this.setState({ jobCancelModal: false })}
                        activeOpacity={1}
                    >

                        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 99999, }} onPress={() => this.setState({ jobCancelModal: false })}>
                            <Ionicons style={{ color: 'rgba(255,255,255,0.5)', fontSize: 36 }} name='md-close-circle' />
                        </TouchableOpacity>

                        <View style={{ padding: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
                            <Text style={{ width: '100%', textAlign: 'center', color: '#fff', fontSize: 25, marginBottom: 15 }}> Choose Reason </Text>
                            <View style={{ width: '100%', backgroundColor: '#fff', borderRadius: 10 }}>
                                {
                                    console.log('reasonList', this.state.reasonList)
                                }
                                {
                                    this.state.reasonList.length > 0 ?
                                        this.state.reasonList.map((reasonData, key) => {
                                            return (
                                                <View key={key}>
                                                    {
                                                        reasonData.IsSelected ? <TouchableOpacity
                                                            style={{ backgroundColor: '#81cdc7', flexDirection: 'row', borderRadius: 10, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}
                                                            onPress={() => this.onReasonSelect(reasonData)}
                                                        >
                                                            <Text style={{ color: '#000' }}>{reasonData.name}</Text>
                                                        </TouchableOpacity> :
                                                            <TouchableOpacity
                                                                style={{ backgroundColor: '#fff', flexDirection: 'row', borderRadius: 10, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}
                                                                onPress={() => this.onReasonSelect(reasonData)}
                                                            >
                                                                <Text style={{ color: '#000' }}>{reasonData.name}</Text>
                                                            </TouchableOpacity>
                                                    }

                                                </View>
                                            )
                                        })
                                        : console.log('outer')
                                }
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', padding: 15 }}>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: '#81cdc7', height: 40, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ jobCancelModal: false })}>
                                    <Text style={{ fontSize: 14, color: '#fff' }}>{I18n.t('go_back')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: 'red', height: 40, borderBottomRightRadius: 10, borderTopRightRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.cancelJob()}>
                                    <Text style={{ fontSize: 14, color: '#fff' }}>{I18n.t('yes_cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableOpacity>
                </Modal>
                {/* Modal Job Cancel end */}
                {/* Modal rating start */}
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 99999, }} onPress={this._toggleModal}>
                            <Ionicons style={{ color: 'rgba(255,255,255,0.5)', fontSize: 36 }} name='md-close-circle' />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10, alignItems: 'center', position: 'relative' }}>
                            <Ionicons name='md-person' style={{ fontSize: 50, color: '#81cdc7' }} />
                            <Text style={{ paddingTop: 5, paddingBottom: 10, fontSize: 18 }}>{I18n.t('give_me_a_rate')}</Text>
                            <View style={{ width: 200 }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={30}
                                    halfStarEnabled={true}
                                    rating={Number(JobDetailsData.customerRating) === 0 ? this.state.starCount : Number(JobDetailsData.customerRating)}
                                    fullStarColor='#81cdc7'
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>



                <Modal isVisible={this.state.IsCallModule}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    hideModalContentWhileAnimating={true}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressOut={() => this.setState({ IsCallModule: false })}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                    >


                        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' }}>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                {
                                    this.state.remoteJobDetails && this.state.remoteJobDetails.customer ? (
                                        <Text style={{ paddingTop: 10, fontSize: 20 }}>{this.state.remoteJobDetails.customer.phone}</Text>
                                    ) : (
                                            <Text></Text>
                                        )
                                }

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', height: 40 }}
                                    onPressOut={() => this.setState({ IsCallModule: false })}
                                ><Text style={{ color: '#fff' }}>{I18n.t('cancel')}</Text></TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#81cdc7', height: 40 }} onPress={() => Communications.phonecall(this.state.remoteJobDetails.customer.phone, true)}><Text style={{ color: '#fff' }}>{I18n.t('call')}</Text></TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                {/* Modal rating end */}

                <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
            </Container>
        );
    }
}

JobDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    availableJobs: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        availableJobs: state.availableJobs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        availablejobs: (id) => dispatch(availablejobs(id)),
        acceptJob: (jobId, workerId, customerId, language) => dispatch(acceptJob(jobId, workerId, customerId, language)),
        declineJob: (jobId, workerId, serviceId, language) => dispatch(declineJob(jobId, workerId, serviceId, language)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
