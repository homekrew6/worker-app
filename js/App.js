/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
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

const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        Intro: {screen: Intro},
        Demo: {screen: Demo},
        Signup: {screen: Signup},
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
        Settings: { screen: Settings},
        LanguageList:{screen:LanguageList},
        CurrencyList:{screen:CurrencyList}
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
