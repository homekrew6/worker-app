import React, { Component } from "react";
import { Image, View, StatusBar,Dimensions } from "react-native";

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
				<Image source={launchscreenBg} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
						<Text> shdgf </Text>
						</View>
				</Image>
			</Container>
		);
	}
}

export default Signup;
