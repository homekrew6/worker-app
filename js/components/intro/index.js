import React, { Component } from "react";
import { Image, View, StatusBar,Dimensions } from "react-native";

import { Container, Button, H3, Text, Header, Title, Body, Left, Right,Grid } from "native-base";
import ImageSlider from 'react-native-image-slider';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Intro extends Component {
	constructor(props) {
        super(props);

        this.state = {
            position: 1,
            interval: null
        };
    }

    componentWillMount() {
        this.setState({interval: setInterval(() => {
            this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
        }, 2000)});
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

	render() {
		return (
			<Container >
				<ImageSlider images={[
					require('../../../img/splash.png'),
					require('../../../img/splash-bg.png'),
					require('../../../img/petizen_bg.png')
				]}
					height= {deviceHeight/1.3}
					position={this.state.position}
					onPositionChanged={position => this.setState({position})}
				/>
				<View style={{top:50,alignItems:'center'}}>
					<Button block rounded info><Text>Book Now</Text></Button>
				</View>
			</Container>
		);
	}
}

export default Intro;
