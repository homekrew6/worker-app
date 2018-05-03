import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, getUserDetail, checkAuth } from './elements/authActions';
import { NavigationActions } from "react-navigation";
import { Image, ImageBackground, View, StatusBar, Dimensions, Alert, TouchableOpacity } from "react-native";
import FCM, { FCMEvent, NotificationType } from "react-native-fcm";
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
const resetActionForSkill = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'EditProfile' })],
});

const resetActionForTiming = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'myTiming' })],
});


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			deviceToken: '',
			IsVisible: false
		}
	}

	componentDidMount() {
		FCM.getFCMToken().then(token => {
			this.setState({ deviceToken: token });
		});
	}

	pressForgotPassword() {
		this.props.navigation.navigate("ForgotPassword");
	}
	pressLogin() {
		if (!this.state.email) {
			Alert.alert('Please enter email');
			return false;
		}
		let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!regEmail.test(this.state.email)) {
			Alert.alert('Please enter a valid email');
			return false;
		}
		if (!this.state.password) {
			Alert.alert('Please enter password');
			return false;
		}
		const email = this.state.email;
		const password = this.state.password;
		api.post('Workers/approveChecking', { email: this.state.email }).then(resEdit => {
			if (resEdit.response.is_active) {

				this.props.login(email, password).then(res => {
					if (res.type == 'success') {
						this.props.getUserDetail(res.userId);

						//.then(userRes => {
						//this.props.checkAuth((res) => {

						// if (userRes) {
						this.setState({ IsVisible: true });
						api.put(`Workers/editWorker/${res.userId}?access_token=${res.id}`, { deviceToken: this.state.deviceToken }).then((resEdit) => {

							let filter = '{"where":{"workerId":' + res.userId + '}}';
							api.get('WorkerSkills?filter=' + filter + '&access_token=' + res.id).then((skills) => {
								if (skills.length && skills.length > 0) {
									const WorkerAvailabilitiesUrl = `Workeravailabletimings?filter={"where":{"workerId":"${res.userId }"}}`;
									api.get(WorkerAvailabilitiesUrl).then((timings)=>{
									 if(timings.length && timings.length>0)
									 {
										 this.setState({ IsVisible: false });
										 this.props.navigation.dispatch(resetAction);
										 
									 }
									 else
									 {
										 this.setState({ IsVisible: false });
										 this.props.navigation.dispatch(resetActionForTiming);
									 }
									}).catch((erro4)=>{
										this.setState({ IsVisible: false });
										this.props.navigation.dispatch(resetAction);
									});
								}
								else {
									this.setState({ IsVisible: false });
									this.props.navigation.dispatch(resetActionForSkill);
								}
							}).catch((err1) => {
								this.setState({ IsVisible: false });
								this.props.navigation.dispatch(resetAction);
							});   
							//this.props.navigation.dispatch(resetAction);
						}).catch((err) => {
						});
						// }

						//}, (err) => {
						//});
						//this.props.navigation.dispatch(resetAction);
						// }).catch(err => {
						// 	Alert.alert('Login failed, please try again');
						// })
					} else {
						Alert.alert('Login failed, please try again');
					}
				}).catch(err => {
					Alert.alert('Login failed, please try again');
				})
			} else {
				Alert.alert('','Your account is not activated.Please contact Admin.');
			}
		}).catch(err => {
			Alert.alert('User Not Found');
		})





	}

	render() {
		return (
			<Container >
				<StatusBar
					backgroundColor="#81cdc7"
				/>
				<ImageBackground source={launchscreenBg} style={styles.imageContainer}>
					<Content>
						<FSpinner visible={this.props.auth.busy || this.state.IsVisible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
						<View style={styles.logoContainer}>
							<Image source={launchscreenLogo} style={styles.logo} />
						</View>

						<View style={{ padding: 20 }}>
							<Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
								<Input onChangeText={(text) => this.setState({ email: text })} placeholder={I18n.t('email')} keyboardType={'email-address'} value={this.state.email} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
							</Item>
							<Item regular style={{ borderColor: '#29416f', marginTop: 10, borderWidth: 1, borderRadius: 2, height: 45 }}>
								<Input placeholder={I18n.t('password')} secureTextEntry={true} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
							</Item>
						</View>

						<TouchableOpacity transparent style={{ flex: 1, flexDirection: 'row', marginTop: 15, paddingLeft: 15, paddingRight: 15 }} onPress={() => this.pressLogin()} >
							<ImageBackground source={buttonImage} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 55 }} >
								<Text style={{ color: '#fff', fontSize: 20, marginTop: -10, height: 30 }}>{I18n.t('login')}</Text>
							</ImageBackground>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.pressForgotPassword()}>
							<View>
								<Text style={{ textAlign: 'right', color: '#1e3768', fontSize: 12, paddingBottom: 20, textDecorationStyle: 'solid', paddingLeft: 15, paddingRight: 15, textDecorationLine: 'underline', textDecorationColor: '#1e3768' }}>
									{I18n.t('forgot_password_q_mark')}
								</Text>
							</View>
						</TouchableOpacity>

						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
							<Text style={{ color: '#252525' }}>{I18n.t('not_a_register_member')} </Text>
							<TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
								<Text style={{ color: '#29416f' }}>{I18n.t('accept_button')}</Text>
							</TouchableOpacity>
						</View>

					</Content>
				</ImageBackground>
			</Container>
		);
	}
}

Login.propTypes = {
	auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(login(email, password)),
		getUserDetail: (id) => dispatch(getUserDetail(id)),
		checkAuth: (id) => dispatch(checkAuth(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
