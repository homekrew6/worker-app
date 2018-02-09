import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login,getUserDetail } from './elements/authActions';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity } from "react-native";

import { Container, Header, Button, Content, Form, Item, Icon, Frame, Input, Label, Text } from "native-base";

import I18n from '../../i18n/i18n';
import styles from './styles';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const launchscreenBg = require("../../../img/bg-login.png");
const launchscreenLogo = require("../../../img/logo.png");
const buttonImage = require("../../../img/bg-button.png");

class Login extends Component {
	constructor(props) {
        super(props);
				this.state = {
				email: '',
				password: ''
	      }
    }

		pressLogin(){
			if (!this.state.email) {
				Alert.alert('Please enter email');
				return false;
			}
			if (!this.state.password) {
				Alert.alert('Please enter password');
				return false;
			}
			const email = this.state.email;
			const password = this.state.password;
			this.props.login(email, password).then(res => {
				console.log('testter2');
				console.log(res);
				if (res.type == 'success') {
					this.props.getUserDetail(res.userId).then(userRes => {
						console.log(userRes)
						this.props.navigation.navigate("Menu");
					}).catch(err => {
						Alert.alert('Login failed, please try again1');
					})
				} else {
					Alert.alert('Login failed, please try again2');
				}
			}).catch(err => {
				console.log(err);
				Alert.alert('Login fail,please try again3');
			})
		}

	render() {
		return (
			<Container > 
				<StatusBar
					backgroundColor="#81cdc7"
				/>
				<Image source={launchscreenBg} style={styles.imageContainer}>
					<Content>
					
						<View style={styles.logoContainer}>
							<Image source={launchscreenLogo} style={styles.logo} />
						</View>

						<View style={{ padding: 20 }}>
							<Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
								<Input onChangeText={(text) => this.setState({ email: text })} placeholder={I18n.t('username_or_email')} value={this.state.email} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
							</Item>
							<Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
								<Input placeholder={I18n.t('password')} secureTextEntry={true} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} onChangeText={(text) => this.setState({ password: text })} value={this.state.password}/>
							</Item>
						</View>

						<TouchableOpacity transparent style={{ flex: 1, flexDirection: 'row', marginTop: 15, paddingLeft: 15, paddingRight: 15 }} onPress={() => this.pressLogin()} >
							<Image source={buttonImage} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 55 }} >
								<Text style={{ color: '#fff', fontSize: 20, marginTop: -10, height: 30 }}>{I18n.t('login')}</Text>
							</Image>
						</TouchableOpacity>
						<View>
							<Text style={{ textAlign: 'center', color: 'red', fontSize: 16, paddingBottom: 20 }}>Forgot your password</Text>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -13 }}>
							<Text>- {I18n.t('or')} -</Text>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5, paddingLeft: 15, paddingRight: 15 }}>
							<Button block transparent style={{ borderWidth: 1, borderColor: '#29416f', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
								<Text style={{ color: '#29416f' }}>{I18n.t('via_facebook')}</Text>
							</Button>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5, paddingLeft: 15, paddingRight: 15 }}>
							<Button block transparent style={{
								borderWidth: 1, borderColor: '#29416f', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
								<Text style={{ color: '#29416f' }}>{I18n.t('via_gmail')}</Text>
							</Button>
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
							<Text style={{ color: '#252525' }}>{I18n.t('not_a_register_member')}? </Text>
							<TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
								<Text style={{ color: '#29416f' }}>{I18n.t('signup')}</Text>
							</TouchableOpacity>
						</View>
						
					</Content>
				</Image>
			</Container>
		);
	}
}

Login.propTypes = {
	auth : PropTypes.object.isRequired
}
const mapStateToProps = (state)=>{
	return {
		auth:state.auth
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		login:(email,password)=>dispatch(login(email,password)),
		getUserDetail: (id) => dispatch(getUserDetail(id))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
