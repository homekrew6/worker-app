import React, { Component } from "react";
import { View, ImageBackground } from "react-native";

import { Container, Text } from "native-base";
import styles from "./styles";

const launchscreenBg = require("../../../img/splash.png");

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
