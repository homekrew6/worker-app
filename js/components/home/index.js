import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";

import styles from "./styles";

//const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenBg = require("../../../img/splash.png");
const launchscreenLogo = require("../../../img/logo-kitchen-sink.png");

class Home extends Component {
	// eslint-disable-line
	constructor(params){
		super(params)
	}
	componentWillMount(){
		setTimeout(() => {
			this.props.navigation.navigate("Intro")
		}, 4000)

	}
	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<Image source={launchscreenBg} style={styles.imageContainer}>
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

				</Image>
			</Container>
		);
	}
}

export default Home;
