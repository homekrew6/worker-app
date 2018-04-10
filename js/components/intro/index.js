import React, { Component } from "react";
import { Image, View, StatusBar, Dimensions, StyleSheet, ImageBackground } from "react-native";
import { Container, Button, H3, Text, Header, Title, Body, Left, Right,Grid } from "native-base";
// import ImageSlider from 'react-native-image-slider';
import AppIntroSlider from './AppIntroSlider';
import styles from './styles';
import api from '../../api';
import FSpinner from 'react-native-loading-spinner-overlay';

import Swiper from 'react-native-swiper';



const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const img1 = require('../../../img/splash-bg2.png');
const launchscreenBg = require("../../../img/splash.png");
const imageht = ( deviceHeight - 88 );
const test = { uri: 'https://s3.eu-central-1.amazonaws.com/files.homekrew.com/1519816388650_splash-bg2.png' };

const slides = [];
const logo = require("../../../img/logo22.png");
class Intro extends Component {
	constructor(props) {
        super(props);
		this.props
        this.state = {
            position: 1,
						interval: null,
						loader: true,
						sliderArray: [],
						slidFlag: false
        };
	}

    componentWillMount() {
		this.setState({
			interval: setInterval(() => {
            this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
			}, 2000)
		});
		api.post('IntroSliders/getSliders', { type: 'Worker' }).then(res => {
			// console.log("sliders",res);
			// var sliderList = res.response;
			// for (let i = 0; i < sliderList.length; i++) {

			// 	let rowData = {
			// 		key: sliderList[i].id,
			// 		title: sliderList[i].name,
			// 		text: sliderList[i].description,
			// 		icon: 'ios-images-outline',
			// 		image: sliderList[i].image_url
			// 	}
			// 	slides.push(rowData);
			// }
			// console.log(slides);
			this.setState({
				sliderArray: res.response,
				slidFlag: true
			});

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

	renderSlides() {

		const { slides } = this.state

		return (
			<Swiper
				showsButtons={false}
				loop={true}
			 	autoplay={true}
				autoplayTimeout={2.5}
				index={0}
			>
				{this.state.sliderArray.map((slide, index) => {
					return (
						<View key={slide.id}>
							<Image source={logo} style={styles.imageLogo} />
							<Text style={styles.title}>data</Text>
							<Text style={styles.text}>data</Text>
						</View>
					)
				})}
			</Swiper>
		)
	}

	// render() {


	// 	return (
	// 		<Container>
	// 			<FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
	// 				<AppIntroSlider
	// 					slides={slides}
	// 				dotColor={'#81cdc7'}
	// 					activeDotColor = {'#1e3768'}
	// 					hideDoneButton
	// 					hideNextButton
	// 				/>
	// 				<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 0,
	// 				paddingBottom: 10 }}>

	// 				<Button full style={{ backgroundColor: '#81cdc7', marginTop: 0 }} onPress={() => this.props.navigation.navigate('Login')} ><Text>LOGIN</Text></Button>
	// 				</View>
	// 		</Container>

	// 	);
	// }

	render() {
		if (this.state.sliderArray.length == 0) {

			return (
				<Container>
					<Image source={launchscreenBg} style={styles.slide}>
					</Image>
				</Container>
			)
		}
		else {
			return (
			<Container>
					<Swiper
						style={styles.wrapper}
						loop={true}
						//autoplay={true}
						//autoplayTimeout={5}
						dotColor={'#81cdc7'}
						activeDotColor={'#1e3768'}
					>
						{
							this.state.sliderArray.map((item, key) => {
								return (
									<ImageBackground key={key} source={{ uri: item.image_url }} style={styles.slide}>
										<Image source={logo} style={styles.imageLogo} />
										<Text style={styles.title}>{item.name}</Text>
										<Text style={styles.text}>{item.description}</Text>
									</ImageBackground>
								)
							})
						}

					</Swiper>
					<View style={{
						paddingLeft: 10, paddingRight: 10, paddingTop: 10,
						paddingBottom: 10
					}}>
					<Button full style={{ backgroundColor: '#81cdc7', marginTop: 0 }} onPress={() => this.props.navigation.navigate('Login')} ><Text>LOGIN</Text></Button>
					</View>

			</Container>
		);
	}

}
}

export default Intro;
