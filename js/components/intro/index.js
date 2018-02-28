import React, { Component } from "react";
import { Image, View, StatusBar, Dimensions, StyleSheet } from "react-native";
import { Container, Button, H3, Text, Header, Title, Body, Left, Right,Grid } from "native-base";
// import ImageSlider from 'react-native-image-slider';
import AppIntroSlider from './AppIntroSlider';
import styles from './styles';
import api from '../../api';
import FSpinner from 'react-native-loading-spinner-overlay';





const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const img1 = require('../../../img/splash-bg2.png'); 
const launchscreenBg = require("../../../img/bg-login.png");
const imageht = ( deviceHeight - 88 );
const test = { uri: 'https://s3.eu-central-1.amazonaws.com/files.homekrew.com/1519816388650_splash-bg2.png' };

const slides = [];

class Intro extends Component {
	constructor(props) {
        super(props);
		this.props
        this.state = {
            position: 1,
			interval: null,
			loader: true,
        };
	}

    componentWillMount() {
        this.setState({interval: setInterval(() => {
            this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
		}, 2000)});
		api.post('IntroSliders/getSliders', { type: 'Worker' }).then(res => {
			console.log(res);
			var sliderList = res.response;

			for (let i = 0; i < sliderList.length; i++) {
				
				let rowData = {
					key: sliderList[i].id,
					title: sliderList[i].name,
					text: sliderList[i].description,
					icon: 'ios-images-outline',
					image: sliderList[i].image_url
				}
				slides.push(rowData);
			}
			console.log(slides);

		}).catch((err) => {
			this.setState({ loader: false })
			// this.setState({ loader: false })			
			Alert.alert('Wrong OTP.')
		})
		this.setState({ loader: false })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
	}

	render() {
		

		return (
			<Container>
				<FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
					<AppIntroSlider
						slides={slides}
					dotColor={'#81cdc7'}
						activeDotColor = {'#1e3768'}
						hideDoneButton
						hideNextButton
					/>
					<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 0,
					paddingBottom: 10 }}>
					
					<Button full style={{ backgroundColor: '#81cdc7', marginTop: 0 }} ><Text>LOGIN</Text></Button>
					</View>
			</Container>
			
		);
	}
}

export default Intro;
