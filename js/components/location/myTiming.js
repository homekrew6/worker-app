import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem, ListView } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Ionicons';
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';
const buttonImage = require("../../../img/lgo2.png");
import api from '../../api';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class myTiming extends Component {
    state = {timimgData: '', weekOffStatus: true, unavailableTiming: '', tableRowId: ''};
    componentDidMount(){
      const workerId = this.props.auth.data.id;
      const WorkerAvailabilitiesUrl = `worker-available-timings?{"where":{"workerId":"${workerId}"}}`;
      api.get(WorkerAvailabilitiesUrl).then(res => {
          console.log('timimgData', res);
          this.setState({ timimgData: res[0].timings, tableRowId: res[0].id });
      }).catch((err) => {
          //console.log(err);
      });

      const WorkerUnavailabilitiesUrl = `WorkerUnavailabilities?{"where":{"workerId":"${workerId}"}}`;
      api.get(WorkerUnavailabilitiesUrl).then(res => {
        this.setState({ unavailableTiming: res });
        console.log('unavailableTiming', this.state.unavailableTiming);

      }).catch((err) => {
          console.log(err);
      })

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
        <Text key={1} style={{ color: '#828282', fontSize: 13, paddingLeft: 5, paddingRight: 5}}>Week Off</Text>
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
    console.log('CommaValue', CommaValue, timing);
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
  console.log('UnAvData', UnAvData, key);
  Moment.locale('en');
  const start_date = UnAvData.start_date;
  const end_date = UnAvData.end_date;
  return(
    <View style={styles.mainItemSec} key={key}>
        <Image source={buttonImage} style={styles.dotImg}/>
        <View style={styles.flexOne}>
            <View style={styles.startTime}>
                <View style={styles.wkDay}>
                    <Text style={styles.wkDayd}> Start Date </Text>
                </View>
                <View>
                    <Text style={styles.timedata}> {Moment(start_date).format('ddd, D MMM YYYY')} {UnAvData.start_time} </Text>
                </View>
            </View>
            <View style={styles.endTime}>
                <View style={styles.wkDay}>
                    <Text style={styles.wkDayd}> End Date </Text>
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
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                          <Button transparent >
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                          </Button>
                        </TouchableOpacity>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>My Timings</Text>
                        </Body>
                        <Button transparent />
                    </Header>
                   <View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.flexOne}>
                                <Text style={styles.listHdr}>Available Timing</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("WeekCalendar", {
                               timimgData: this.state.timimgData,
                               tableRowId: this.state.tableRowId
                             })}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Ico name='edit' style={styles.listHdrEdtIcn} />
                                  <Text style={styles.listHdrEdt}>Edit</Text>
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
                                <Text style={styles.listHdr}>Unavailable Timing</Text>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('UnavailableDate')}>
                                <Ico name='add-circle' style={styles.listHdrEdtIcn} />
                                <Text style={styles.listHdrEdt}>Add</Text>
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
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(myTiming);
