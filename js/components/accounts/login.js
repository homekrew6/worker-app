import React, { Component } from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {login} from './elements/authActions'
import { Image, View, StatusBar,Dimensions,Alert } from "react-native";

import { Container, Header, Button, Content, Form, Item, Input, Label,Text } from "native-base";

import I18n from '../../i18n/i18n';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Login extends Component {
	constructor(props) {
        super(props);
				this.state = {
	        email: '',
	        password: ''
	      }
    }

		pressLogin(){
	    if(!this.state.email){
	      Alert.alert('Please enter email');
	      return false;
	    }
	    if(!this.state.password){
	      Alert.alert('Please enter password');
	      return false;
	    }
	    const email = this.state.email;
	    const password = this.state.password;
	    this.props.login(email,password).then(res=>{
				console.log(res);
				if(res.status === 200){
					console.log(res.json())
				}else{
					Alert.alert('Login fail,please try again');
				}

	      // if(res.status!=='success'){
	      //
	      //   this.setState({email:'',password:''});
	      // }else{
				// 	Alert.alert('Login success');
	      //   //this.props.navigation.navigate("Home");
	      // }
	    }).catch(err=>{
	     Alert.alert('Login fail,please try again');
	      //return err
	    })
		}


	render() {
		return (
			<Container >
				<Content>
					<Form>
            <Item inlineLabel>
              <Label>{I18n.t('username')}</Label>
              <Input keyboardType="email-address" onChangeText={(text) => this.setState({email:text})} value={this.state.email} />
            </Item>
            <Item inlineLabel last>
              <Label>{I18n.t('password')}</Label>
              <Input secureTextEntry onChangeText={(text) => this.setState({password:text})} value={this.state.password} />
            </Item>
						<Button block onPress={() =>this.pressLogin()}>
							<Text>{I18n.t('submit')}</Text>
						</Button>
          </Form>
				</Content>
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
		login:(email,password)=>dispatch(login(email,password))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
