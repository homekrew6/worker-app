/* @flow */

import React, { Component } from "react";

import { Easing, Animated, I18nManager } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { ChangeRoute } from './actions/routerAction';

import Drawer from "./Drawer";
import Home from "./components/home/";
import Intro  from "./components/intro";
import Demo  from "./components/intro/demo";
import Signup from "./components/accounts/signup";
import Login from "./components/accounts/login";
import ForgotPassword from "./components/accounts/forget_password";
import ResetPassword from "./components/accounts/reset_password";
import Menu from "./components/accounts/menu";
import EditProfile from "./components/accounts/edit_profile";
import MyLocation from "./components/location/myLocation";
import SelectLocation from "./components/location/selectLocation";
import MyTiming from "./components/location/myTiming";
import UnavailableDate from "./components/location/unavailableDate";
import WeekCalendar from './components/calendar/WeekCalendar';
import myTiming from './components/location/myTiming';
import TestLocation from "./components/location/TestLocation";
import MyPaymentList from './components/payment/payment-list';
import AvailableJobs from './components/jobList/availableJobs';
import JobDetails from './components/jobList/jobDetails';
import Settings from './components/settings/settings';
import LanguageList from './components/settings/languageList';
import CurrencyList from './components/settings/currencyList';
import TotalBill from './components/jobList/totalBill';
import FollowUpList from './components/followUp/followUpList';
import AddMaterial from './components/followUp/addMaterals';
import FollowUpDate from './components/followUp/followUpDate';
import Chat from './components/jobList/chat';
import JobTracker from './components/jobList/jobTracker';
import Quote from './components/followUp/quote';
import jobSummary from './components/jobList/jobSummary';
import NotificationList from './components/notification/notificationList';
import Support from './components/support/supportList';
import commissionList from './components/accounts/commissionList';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';


const customTextProps = {
  style: {
    color: '#1e3768',
    fontFamily: 'Lato-Regular',
    textAlign: 'left', 
  }
}

const customTextInputProps = {
  style: {
    color: '#1e3768',
    fontFamily: 'Lato-Regular'
  }
}



setCustomText(customTextProps);
setCustomTextInput(customTextInputProps);

const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {      
        const { layout, position, scene } = sceneProps
  
        const thisSceneIndex = scene.index
        const width = layout.initWidth
  
        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        })
  
        return { transform: [ { translateX } ] }
      },
    }
  }
const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        Home: { screen: Home },
        Intro: { screen: Intro },
        Demo: { screen: Demo },
        Signup: { screen: Signup },
        Login: { screen: Login },
        ForgotPassword: { screen: ForgotPassword },
        ResetPassword: { screen: ResetPassword },
        Menu: { screen: Menu },
        EditProfile: { screen: EditProfile },
        MyLocation: { screen: MyLocation },
        MyTiming: { screen: MyTiming },
        SelectLocation: { screen: SelectLocation },
        UnavailableDate: { screen: UnavailableDate },
        WeekCalendar: { screen: WeekCalendar },
        myTiming: { screen: myTiming },
        TestLocation: { screen: TestLocation },
        MyPaymentList: { screen: MyPaymentList },
        AvailableJobs: { screen: AvailableJobs },
        JobDetails: { screen: JobDetails },
        Settings: { screen: Settings },
        LanguageList:{ screen: LanguageList },
        CurrencyList:{ screen: CurrencyList },
        TotalBill:{ screen: TotalBill },
        FollowUpList: { screen: FollowUpList },
        AddMaterial: { screen: AddMaterial },
        FollowUpDate: { screen: FollowUpDate },
        Chat: { screen: Chat }, 
        JobTracker: { screen: JobTracker },
        Quote: { screen: Quote },
        jobSummary: { screen: jobSummary },
        NotificationList: { screen: NotificationList },
        Support: { screen: Support },
        commissionList: { screen: commissionList }
    },
    {
        initialRouteName: "Home",
        headerMode: "none",
        transitionConfig
    }
);

class App extends Component{
  updateRedux(prevState, newState){
    this.props.ChangeRoute(prevState, newState)
  }
  render() {
    return (
      <Root>
          <AppNavigator
            onNavigationStateChange={(prevState, newState) => this.updateRedux(prevState, newState)}
          />
      </Root>
    );
    
  }
}

function mapStateToProps(state) {
  return {
      currentRoute: state.newState,
      prevRoute: state.prevRoute
  }
}

export default connect(mapStateToProps, { ChangeRoute })(App);
     
