import React, { Component } from "react";
import { Image, View, StatusBar, Dimensions, StyleSheet } from "react-native";
import { Container, Button, H3, Text, Header, Title, Body, Left, Right,Grid } from "native-base";
// import ImageSlider from 'react-native-image-slider';
import AppIntroSlider from './AppIntroSlider';
import styles from './styles';




const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const img1 = require('../../../img/splash-bg2.png'); 
const launchscreenBg = require("../../../img/bg-login.png");
const imageht = ( deviceHeight - 88 );

const slides = [
	{
		key: 'somethun',
		title: 'Your Place of Mind - Our Prioroty',
		text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry! .',
		icon: 'ios-images-outline',
		image: img1,
		imageStyle: styles.image
	},
	{
		key: 'somethun1',
		title: 'Lorem Ipsum is simply dummy',
		text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry .',
		icon: 'ios-options-outline',
		backgroundColor: '#81cdc7',
		image: img1,
		imageStyle: styles.image
	},
	{
		key: 'somethun2',
		title: 'Lorem Ipsum is simply dummy',
		text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry. ',
		icon: 'ios-options-outline',
		backgroundColor: '#81cdc7',
		image: img1,
		imageStyle: styles.image
	},
	{
		key: 'somethun3',
		title: 'Lorem Ipsum',
		text: 'The component is also super customizable, so you can adapt it to cover your needs and wants.',
		icon: 'ios-options-outline',
		backgroundColor: '#81cdc7',
		image: img1,
		imageStyle: styles.image
	}
];


class Intro extends Component {
	constructor(props) {
        super(props);
		this.props
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
			<Container>
					<AppIntroSlider
						slides={slides}
					dotColor={'#81cdc7'}
						activeDotColor = {'#1e3768'}
						hideDoneButton
						hideNextButton
					/>
					<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 0,
					paddingBottom: 10 }}>
					<Button full style={{ backgroundColor: '#81cdc7', marginTop: 0 }} onPress={() => this.props.navigation.navigate('Login')} ><Text>LOGIN</Text></Button>
					</View>
			</Container>
			
		);
	}
}

export default Intro;
