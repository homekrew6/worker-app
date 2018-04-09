import React, { Component } from "react";
import { Image, View, StatusBar, ImageBackground, AsyncStorage } from "react-native";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from "react-native-fcm";
import { checkAuth, getUserDetail } from '../accounts/elements/authActions'
import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";
import { NavigationActions } from "react-navigation";
import api from '../../api';
import styles from "./styles";

//const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenBg = require("../../../img/splash.png");
const launchscreenLogo = require("../../../img/logo-kitchen-sink.png");
const resetActionIntro = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'Intro' })],
});
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'Menu' })],
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
		FCM.getInitialNotification().then(notif => {
			if (notif.screenType && notif.screenType == 'JobDetails') {
				// this.props.navigation.navigate('JobDetails', { jobDetails: notif.jobId });
				this.setState({ isPush: true, jobId: notif.jobId });
			}

		});
		this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
			console.log("a", notif);
			if (notif && notif.local_notification) {
				return;
			}

			this.sendRemote(notif);
		});
		this.refreshUnsubscribe = FCM.on(FCMEvent.Notification, token => {
			console.log("TOKEN (refreshUnsubscribe)", token);
			FCM.getFCMToken().then(token => {
				console.log("TOKEN (getFCMToken)", token);
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

		setTimeout(() => {
			AsyncStorage.getItem("userToken").then((userToken) => {
				if (userToken) {
					const userToken1 = JSON.parse(userToken);
					this.props.getUserDetail(userToken1.userId, userToken1.id).then(userRes => {
						this.props.navigation.dispatch(resetAction);

					}).catch(err => {
						Alert.alert('Please login');
						this.props.navigation.navigate("Login")
					})
				} else {
					this.props.navigation.dispatch(resetActionIntro);

				}
			}).catch((err)=>{
				this.props.navigation.navigate("Login");
			})
		}, 4000);

	}
	sendRemote(notif) {
		console.log('notify sent', notif);
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
			data: { screenType: 'cleaner' },
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
