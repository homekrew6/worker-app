import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login,getUserDetail } from './elements/authActions';
import { NavigationActions } from "react-navigation";
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity } from "react-native";

import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text } from "native-base";
import FSpinner from 'react-native-loading-spinner-overlay';
import api from '../../api';
import I18n from '../../i18n/i18n';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const launchscreenBg = require("../../../img/bg-login.png");
const launchscreenLogo = require("../../../img/logo.png");
const buttonImage = require("../../../img/bg-button.png");
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'Menu' })],
});

class Login extends Component {
	constructor(props) {
        super(props);
				this.state = {
				email: '',
				password: ''
	      }
    }

		pressForgotPassword() {
			this.props.navigation.navigate("ForgotPassword");
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
			api.post('Workers/approveChecking', { email: this.state.email }).then(resEdit => {
				if (resEdit.response.is_active){

					this.props.login(email, password).then(res => {
						console.log(res);
						if (res.type == 'success') {
							this.props.getUserDetail(res.userId).then(userRes => {
								console.log(userRes)
								this.props.navigation.dispatch(resetAction);
							}).catch(err => {
								Alert.alert('Login failed, please try again');
							})
						} else {
							Alert.alert('Login failed, please try again');
						}
					}).catch(err => {
						console.log(err);
						Alert.alert('Login failed,please try again');
					})
				}else{
					Alert.alert('Your account is not activated yet, Please contact admin.');
				}
			}).catch(err => {
				Alert.alert('Please enter a valied email ID');
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
						<FSpinner visible={this.props.auth.busy} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
						<View style={styles.logoContainer}>
							<Image source={launchscreenLogo} style={styles.logo} />
						</View>

						<View style={{ padding: 20 }}>
							<Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
								<Input onChangeText={(text) => this.setState({ email: text })} placeholder={I18n.t('email')} keyboardType={'email-address'} value={this.state.email} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
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
						<TouchableOpacity onPress={() => this.pressForgotPassword()}>
							<View>
								<Text style={{ textAlign: 'right', color: '#1e3768', fontSize: 12, paddingBottom: 20, textDecorationStyle: 'solid', paddingLeft: 15, paddingRight: 15, textDecorationLine: 'underline', textDecorationColor: '#1e3768' }}>Forgot password?</Text>
							</View>
						</TouchableOpacity>

						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
							<Text style={{ color: '#252525' }}>{I18n.t('not_a_register_member')} </Text>
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
