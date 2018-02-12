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
			<Container style={{ backgroundColor: '#e1f5f6' }}>
				<ImageSlider images={[
					require('../../../img/splash.png'),
					require('../../../img/splash-bg.png'),
					require('../../../img/petizen_bg.png')
				]}
					height= {deviceHeight/1.3}
					position={this.state.position}
					onPositionChanged={position => this.setState({position})}
				/>
				<View style={{ padding: 10 }}>
					<Button block info flat style={{ marginTop: 40, backgroundColor: '#72cfc7', borderRadius: 10, shadowColor: 'transparent', shadowOffset: { width: 0, height: 0 }, shadowRadius: 0, shadowOpacity: 0, borderWidth: 0 }}><Text>Book Now</Text></Button>
				</View>
			</Container>
		);
	}
}

export default Intro;
