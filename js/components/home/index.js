import React, { Component } from "react";
import { Image, View, StatusBar, ImageBackground } from "react-native";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkAuth, getUserDetail } from '../accounts/elements/authActions'
import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";
import { NavigationActions } from "react-navigation";

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
	}
	componentWillMount() {
		this.props.checkAuth(res => {
			setTimeout(() => {
				console.log(res);
				if (res) {
					this.props.getUserDetail(res.userId, res.id).then(userRes => {
						console.log(userRes)
						//this.props.navigation.navigate("Menu");
						this.props.navigation.dispatch(resetAction);
					}).catch(err => {
						//Alert.alert('Please login');
						this.props.navigation.navigate("Login");
					})
					//this.props.navigation.navigate("Menu")
				} else {
					//this.props.navigation.navigate("Intro");
					this.props.navigation.dispatch(resetActionIntro);
				}
			})
		}, 4000);	

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
