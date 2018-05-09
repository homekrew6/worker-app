import React, { Component } from "react";
import { View, StatusBar, ImageBackground, AsyncStorage, Alert } from "react-native";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FCM, { FCMEvent } from "react-native-fcm";
import { checkAuth, getUserDetail } from '../accounts/elements/authActions'
import { Container, Text } from "native-base";
import { NavigationActions } from "react-navigation";
import api from '../../api';
import I18n from '../../i18n/i18n';
import styles from "./styles";

//const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenBg = require("../../../img/splash.png");

const resetActionIntro = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'Intro' })],
});
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'Menu' })],
});
const resetActionCategory = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
const resetActionForSkill = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'EditProfile' })],
});

const resetActionForTiming = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'myTiming' })],
});
class Home extends Component {
	// eslint-disable-line
	constructor(params) {
		super(params)
		this.state={
			
		}
	}
	componentWillMount() {
		

		FCM.requestPermissions();
		//update fcm token
		FCM.getFCMToken().then(token => {
			AsyncStorage.getItem("userToken").then((userToken) => {
				if (userToken) {
					const userToken1 = JSON.parse(userToken);
					api.put(`Workers/editWorker/${userToken1.userId}?access_token=${userToken1.id}`, { deviceToken: token }).then((resEdit) => {
					}).catch((err) => {
					});
				}
			})
		});
		//called on initial
		FCM.getInitialNotification().then(notif => {
			setTimeout(() => {
				AsyncStorage.getItem("userToken").then((userToken) => {
					if (userToken) {
						const userToken1 = JSON.parse(userToken);
						this.props.getUserDetail(userToken1.userId, userToken1.id).then(userRes => {
							//this.props.navigation.dispatch(resetAction);
							if(notif.screenType){
								if(notif.screenType == 'JobDetails'){
									api.post('Jobs/getJobDetailsById', { 
										"id": Number(notif.jobId),
										"workerId": this.props.auth.data.id
									}).then((resJob)=>{
										this.props.navigation.dispatch(
											NavigationActions.reset({
												index: 1,
												actions: [
												NavigationActions.navigate({ routeName: 'Menu' }),
												NavigationActions.navigate({ routeName: 'JobDetails', params: {
													jobId: notif.jobId, 
													jobDetails: resJob.response.message[0]
												} }),
												],
											})
										);
									}).catch((err) => {
										connect.log('err', err);
									})
								}else if(notif.screenType == 'AvailableJobs'){
									this.props.navigation.dispatch(
										NavigationActions.reset({
											index: 1,
											actions: [
												NavigationActions.navigate({ routeName: 'Menu' }),
												NavigationActions.navigate({ routeName: 'AvailableJobs' }),
											],
										})
									);
								}
							}else{
								let filter = '{"where":{"workerId":' + userToken1.userId + '}}';
								api.get('WorkerSkills?filter=' + filter + '&access_token=' + userToken1.id).then((skills)=>{
									if (skills.length && skills.length > 0) {
										//this.props.navigation.dispatch(resetAction);
										const WorkerAvailabilitiesUrl = `Workeravailabletimings?filter={"where":{"workerId":"${userToken1.userId}"}}`;
										api.get(WorkerAvailabilitiesUrl).then((timings) => {
											if (timings.length && timings.length > 0) {
												this.props.navigation.dispatch(resetAction);
											}
											else {
												this.props.navigation.dispatch(resetActionForTiming);
											}
										}).catch((erro4) => {
											this.props.navigation.dispatch(resetAction);
										});
									}
									else {
										this.props.navigation.dispatch(resetActionForSkill);
									}
								}).catch((error1)=>{
									this.props.navigation.dispatch(resetAction);
								});
							}
							
						}).catch(err => {
							Alert.alert(I18n.t('please_login'));
							this.props.navigation.navigate("Login")
						})
					} else {
						//this.props.navigation.dispatch(resetActionIntro);
						AsyncStorage.getItem('IsSliderShown').then((res) => {
							if (res) {
								this.props.navigation.dispatch(resetActionCategory);
							}else {
								this.props.navigation.dispatch(resetActionIntro);
							}
						}).catch((err) => {
							this.props.navigation.dispatch(resetActionIntro);
						})
					}
				}).catch((err)=>{
					this.props.navigation.navigate("Login");
				})
			}, 4000);

			// if (notif.screenType && notif.screenType == 'JobDetails') {
			// 	api.post('Jobs/getJobDetailsById', { 
			// 		"id": Number(notif.jobId),
			// 		"workerId": this.props.auth.data.id
			// 	}).then((resJob)=>{
			// 		this.props.navigation.dispatch(
			// 			NavigationActions.reset({
			// 				index: 1,
			// 				actions: [
			// 				NavigationActions.navigate({ routeName: 'Menu' }),
			// 				NavigationActions.navigate({ routeName: 'JobDetails', params: {
			// 					jobId: notif.jobId, 
			// 					jobDetails: resJob.response.message[0]
			// 				} }),
			// 				],
			// 			})
			// 		);
			// 	}).catch((err) => {
			// 		connect.log('err', err);
			// 	})
			// 	this.setState({ isPush: true, jobId: notif.jobId });
			// }else if(notif.screenType == 'AvailableJobs'){
			// 	this.props.navigation.dispatch(
			// 		NavigationActions.reset({
			// 			index: 1,
			// 			actions: [
			// 				NavigationActions.navigate({ routeName: 'Menu' }),
			// 				NavigationActions.navigate({ routeName: 'AvailableJobs' }),
			// 			],
			// 		})
			// 	);
			// }
		});
		//
		this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
			if (notif && notif.local_notification) {
				if (notif.screenType && notif.screenType == 'JobDetails') {
					api.post('Jobs/getJobDetailsById', { 
						"id": Number(notif.jobId),
            			"workerId": this.props.auth.data.id
					}).then((resJob)=>{
						this.props.navigation.navigate('JobDetails', {
							jobId: notif.jobId, 
							jobDetails: resJob.response.message[0]
						});
					}).catch((err) => {
						connect.log('err', err);
					})
					this.setState({ isPush: true, jobId: notif.jobId });
				}else if(notif.screenType == 'AvailableJobs'){
					this.props.navigation.dispatch(
						NavigationActions.reset({
							index: 1,
							actions: [
								NavigationActions.navigate({ routeName: 'Menu' }),
								NavigationActions.navigate({ routeName: 'AvailableJobs' }),
							],
						})
					);
				}
				//return;
			}
			//call to only send notification
			this.sendRemote(notif);
		});
		//update fcm token if token change
		this.refreshUnsubscribe = FCM.on(FCMEvent.Notification, token => {
			FCM.getFCMToken().then(token => {
				AsyncStorage.getItem("userToken").then((userToken) => {
					if (userToken) {
						const userToken1 = JSON.parse(userToken);
						api.put(`Workers/editWorker/${userToken1.userId}?access_token=${userToken1.id}`, { deviceToken: token }).then((resEdit) => {
						}).catch((err) => {
						});
					}
				})
			});
		});
		// this.props.checkAuth(res => {
		// 	setTimeout(() => {
		// 		if (res) {
		// 			this.props.getUserDetail(res.userId, res.id).then(userRes => {
		// 				//this.props.navigation.navigate("Menu");
		// 				this.props.navigation.dispatch(resetAction);
		// 			}).catch(err => {
		// 				//Alert.alert('Please login');
		// 				this.props.navigation.navigate("Login");
		// 			})
		// 			//this.props.navigation.navigate("Menu")
		// 		} else {
		// 			//this.props.navigation.navigate("Intro");
		// 			this.props.navigation.dispatch(resetActionIntro);
		// 		}
		// 	})
		// }, 4000);	

	}
	sendRemote(notif) {
		FCM.presentLocalNotification({
			id: new Date().valueOf().toString(),
			title: notif.fcm.body,
			body: notif.fcm.body,
			ticker: notif.fcm.body,
			priority: "high",
			click_action: notif.click_action,
			show_in_foreground: true,
			local: true,
			vibrate: 300,
			wake_screen: true,
			lights: true,
			auto_cancel: true,
			group: "group",
			icon: "ic_launcher",
			large_icon: "ic_launcher",
			screenType: notif.screenType,
			jobId: notif.jobId
			//picture: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg", 
			// android_actions: JSON.stringify([{
			//   id: "view",
			//   title: 'view'
			// },{
			//   id: "dismiss",
			//   title: 'dismiss'
			// }])
		});


	}
	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<ImageBackground source={launchscreenBg} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
						{/* <Image source={launchscreenLogo} style={styles.logo} /> */}
					</View>
					<View
						style={{
							alignItems: "center",
							marginBottom: 50,
							backgroundColor: "transparent",
						}}
					>
						{/* <H3 style={styles.text}>App to showcase</H3> */}
						<View style={{ marginTop: 8 }} />
						{/* <H3 style={styles.text}>NativeBase components</H3> */}
						<View style={{ marginTop: 8 }} />
					</View>

					<View style={styles.btmView}>
						<Text style={styles.btmText}>Copyright © 2018 homekrew. All Rights Reserved.</Text>
					</View>

				</ImageBackground>
			</Container>
		);
	}
}

Home.propTypes = {
	auth: PropTypes.object.isRequired,
	checkAuth: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		checkAuth: (cb) => dispatch(checkAuth(cb)),
		getUserDetail: (id, auth) => dispatch(getUserDetail(id, auth))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
