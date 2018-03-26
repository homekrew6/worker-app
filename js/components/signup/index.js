import React, { Component } from "react";
import { Image, View, StatusBar,Dimensions, ImageBackground } from "react-native";

import { Container,Text } from "native-base";
import styles from "./styles";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const launchscreenBg = require("../../../img/splash.png");
const launchscreenLogo = require("../../../img/krew.png");

class Signup extends Component {
	constructor(props) {
      super(props);
  }

	render() {
		return (
			<Container >
				<ImageBackground source={launchscreenBg} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
						<Text> shdgf </Text>
						</View>
				</ImageBackground>
			</Container>
		);
	}
}

export default Signup;
