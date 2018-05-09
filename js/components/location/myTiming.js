import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Image, View, StatusBar, Alert, TouchableOpacity, BackHandler, Text } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Header, Button, Content, Body, } from "native-base";

import I18n from '../../i18n/i18n';
import styles from './styles';
const buttonImage = require("../../../img/lgo2.png");
import api from '../../api';
import { navigateAndSaveCurrentScreen } from '../accounts/elements/authActions';


class myTiming extends Component {
    state = { timimgData: '', weekOffStatus: true, unavailableTiming: '', tableRowId: '', unAvailId: '', IsProfileDisabled: false };
    componentDidMount(){
      const workerId = this.props.auth.data.id;
      const WorkerAvailabilitiesUrl = `Workeravailabletimings?filter={"where":{"workerId":"${workerId}"}}`;
      api.get(WorkerAvailabilitiesUrl).then(res => {
          this.setState({ timimgData: res[0].timings, tableRowId: res[0].id });
      }).catch((err) => {
          //console.log(err);
      });

      const WorkerUnavailabilitiesUrl = `WorkerUnavailabilities?filter={"where":{"workerId":"${workerId}"}}`;
      api.get(WorkerUnavailabilitiesUrl).then(res => {
        this.setState({ unavailableTiming: res });
        if(res.length && res.length>0)
        {
            this.setState({unAvailId:this.state.unavailableTiming[0].id});
        }

      }).catch((err) => {
      })

    }


    renderBackButton()
    {
        if (this.props.currentRoute === "myTiming" && !this.props.prevRoute) {
         this.backHandler=   BackHandler.addEventListener('hardwareBackPress', function () {
                console.log('hardwareBackPress', this.props);
                if (this.props.currentRoute === 'myTiming') {
                    Alert.alert(
                        'Confirm',
                        'Are you sure to exit the app?',
                        [
                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            { text: 'OK', onPress: () => BackHandler.exitApp() },
                        ],
                        { cancelable: false }
                    );
                    return true;
                } else {
                    this.props.navigation.goBack(null);
                    return true;
                }

            }.bind(this));
        }
    }
    clickDisable() {
        this.setState({ IsProfileDisabled: true });
        setTimeout(() => {
            this.setState({ IsProfileDisabled: false });
        }, 3000);
    }
    navigate(screen) {
        this.clickDisable();
        const data = this.props.auth.data;
        data.activeScreen = screen;
        data.previousScreen = "Settings";
        this.props.navigateAndSaveCurrentScreen(data);
        if(screen==='WeekCalendar')
        {
            this.props.navigation.navigate(screen, { timimgData: this.state.timimgData,
                tableRowId: this.state.tableRowId})
        }
      else
      {
        this.props.navigation.navigate(screen, {  unAvailId: this.state.unAvailId,
            unAvailTiming:this.state.unavailableTiming})
      }
        
      }
getWeekOff(day, data){
  const VarAr = [];
    data.map((OffCheck, key) => {
      const day_status = OffCheck[day];
      if (day_status === true) {
        VarAr.push(day_status);
      }
    })
    if (VarAr.length === 0) {
      return(
        <Text key={1} style={{ color: '#828282', fontSize: 13, paddingLeft: 5, paddingRight: 5}}>{I18n.t('week_off')} </Text>
      );
    }
}

getTimeAmPm(day, DataWeek, key){
    const day_status = DataWeek[day];
    if (key !== 24) {
      var CommaValue = ",";
    }else {
      var CommaValue = "";
    }

    const timing = DataWeek.time + CommaValue;
    if(day_status === true){
      return(
        <Text key={DataWeek.id} style={{ color: '#828282', fontSize: 13, paddingLeft: 5, paddingRight: 5}}>
          {timing}
        </Text>
     );
   }
}

render

renderUnavalData(UnAvData, key){
  Moment.locale('en');
  const start_date = UnAvData.start_date;
  const end_date = UnAvData.end_date;
  return(
    <View style={styles.mainItemSec} key={key}>
        <Image source={buttonImage} style={styles.dotImg}/>
        <View style={styles.flexOne}>
            <View style={styles.startTime}>
                <View style={styles.wkDay}>
                    <Text style={styles.wkDayd}> {I18n.t('start_date')} </Text>
                </View>
                <View>
                    <Text style={styles.timedata}> {Moment(start_date).format('ddd, D MMM YYYY')} {UnAvData.start_time} </Text>
                </View>
            </View>
            <View style={styles.endTime}>
                <View style={styles.wkDay}>
                    <Text style={styles.wkDayd}> {I18n.t('end_date')} </Text>
                </View>
                <View>
                    <Text style={styles.timedata}> {Moment(end_date).format('ddd, D MMM YYYY')} {UnAvData.end_time} </Text>
                </View>
            </View>
        </View>
    </View>
  );
}

    render() {
        this.renderBackButton();
      const data = [
        {
            "id": 1,
            "date": "8-03-2018",
            "time": "8 am",
            "sun": false,
            "mon": true,
            "tue": false,
            "wed": false,
            "thu": false,
            "fri": false,
            "sat": true
        },
        {
            "id": 2,
            "date": "8-03-2018",
            "time": "9 am",
            "sun": true,
            "mon": true,
            "tue": false,
            "wed": true,
            "thu": false,
            "fri": false,
            "sat": true
        },
        {
            "id": 3,
            "date": "8-03-2018",
            "time": "10 am",
            "sun": true,
            "mon": true,
            "tue": false,
            "wed": false,
            "thu": false,
            "fri": false,
            "sat": true
        }
    ];

        return (
            <Container >
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Content>
                    <Header style={styles.appHdr2} androidStatusBarColor="#cbf0ed">
                        <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} activeOpacity={0.5} style={{ width: 40, justifyContent: 'center' }}>
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </TouchableOpacity>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>{I18n.t('my_timing')} </Text>
                        </Body>
                        <TouchableOpacity activeOpacity={1} style={{ width: 40, justifyContent: 'center', alignItems: 'flex-end' }} />  
                    </Header>
                   <View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.flexOne}>
                                <Text style={styles.listHdr}>{I18n.t('available_timing')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.navigate("WeekCalendar")} disabled={this.state.IsProfileDisabled}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Ico name='edit' style={styles.listHdrEdtIcn} />
                                  <Text style={styles.listHdrEdt}>{I18n.t('add_edit')}</Text>
                              </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}>Sunday</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              { this.state.timimgData !== '' ?
                                this.state.timimgData.map((DataWeek, key) => (
                                this.getTimeAmPm('sun', DataWeek, key)
                              )) : console.log(null) }
                              { this.state.timimgData !== '' ? this.getWeekOff('sun', this.state.timimgData) : console.log('null')}
                            </View>
                        </View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}>Monday</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                              { this.state.timimgData !== '' ?
                                this.state.timimgData.map((DataWeek, key) => (
                                this.getTimeAmPm('mon', DataWeek, key)
                              )) : console.log(null) }
                              { this.state.timimgData !== '' ? this.getWeekOff('mon', this.state.timimgData) : console.log('null')}
                            </View>
                        </View>

                        <View style={styles.mainItemSec}>
                            <View style={ styles.wkDay }>
                                <Text style={styles.wkDayd}> Tuesday </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              { this.state.timimgData !== '' ?
                                this.state.timimgData.map((DataWeek, key) => (
                                this.getTimeAmPm('tue', DataWeek, key)
                              )) : console.log(null) }
                              { this.state.timimgData !== '' ? this.getWeekOff('tue', this.state.timimgData) : console.log('null')}
                            </View>

                        </View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}> Wednesday </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              { this.state.timimgData !== '' ?
                                this.state.timimgData.map((DataWeek, key) => (
                                this.getTimeAmPm('wed', DataWeek, key)
                              )) : console.log(null) }
                              { this.state.timimgData !== '' ? this.getWeekOff('wed', this.state.timimgData) : console.log('null')}
                            </View>

                        </View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}> Thursday </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              { this.state.timimgData !== '' ?
                                this.state.timimgData.map((DataWeek, key) => (
                                this.getTimeAmPm('thu', DataWeek, key)
                              )) : console.log(null) }
                              { this.state.timimgData !== '' ? this.getWeekOff('thu', this.state.timimgData) : console.log('null')}
                            </View>

                        </View>
                        <View style={styles.mainItemSec}>
                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}> Friday </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              { this.state.timimgData !== '' ?
                                this.state.timimgData.map((DataWeek, key) => (
                                this.getTimeAmPm('fri', DataWeek, key)
                              )) : console.log(null) }
                              { this.state.timimgData !== '' ? this.getWeekOff('fri', this.state.timimgData) : console.log('null')}
                            </View>
                        </View>
                        <View style={styles.mainItemSec}>
                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}> Saturday </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              { this.state.timimgData !== '' ?
                                this.state.timimgData.map((DataWeek, key) => (
                                this.getTimeAmPm('sat', DataWeek, key)
                              )) : console.log(null) }
                              { this.state.timimgData !== '' ? this.getWeekOff('sat', this.state.timimgData) : console.log('null')}
                            </View>
                        </View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.flexOne}>
                                <Text style={styles.listHdr}>{I18n.t('unavailable_timing')}</Text>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.navigate('UnavailableDate')} disabled={this.state.IsProfileDisabled}>
                                <Ico name='add-circle' style={styles.listHdrEdtIcn} />
                                <Text style={styles.listHdrEdt}>{I18n.t('add_edit')}</Text>
                            </TouchableOpacity>
                        </View>
                          {
                            this.state.unavailableTiming !== '' ?
                            this.state.unavailableTiming.map((UnAvData, key) => {
                            return( this.renderUnavalData(UnAvData, key))
                            }) : console.log("null")
                          }

                   </View>
                </Content>
            </Container>
        );
    }
}

myTiming.propTypes = {
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        auth: state.auth,
        currentRoute: state.RouterOwn.currentRoute,
        prevRoute: state.RouterOwn.prevRoute
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateAndSaveCurrentScreen: (data) => dispatch(navigateAndSaveCurrentScreen(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(myTiming);
