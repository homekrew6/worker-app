import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, AsyncStorage } from 'react-native';
import { Container, Header, Button, Content, Body } from "native-base";
import { connect } from 'react-redux';
import styles from '../location/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from './CheckBox';
import { ChangeData } from '../../actions/ActionWeek';
import api from '../../api';

class WeekCalendar extends Component {
  state = { dataRemote: {}, ScrollWidth: 10 }
  componentWillMount(){
    const data = [
        {
            "id": 1,
            "date": "8-03-2018",
            "time": "8 am",
            "sun": true,
            "mon": false,
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
            "mon": false,
            "tue": false,
            "wed": false,
            "thu": false,
            "fri": false,
            "sat": true
        }
    ];
    this.setState({ dataRemote: data });
    const dataRemote = this.state.dataRemote;
    this.props.ChangeData(data);
    AsyncStorage.removeItem('StoreData', (err) => console.log('finished', err));
    dataRemoteString = JSON.stringify(data);
    AsyncStorage.setItem('StoreData', dataRemoteString);
  }
  ScrollRight(){
     this.setState({ ScrollWidth: EffectWidth });
     const EffectWidth = Number(this.state.ScrollWidth) + 67;
     this.flatList.scrollToOffset({ offset: EffectWidth });
 }
 ScrollLeft(){
     this.setState({ ScrollWidth: EffectWidth });
     const EffectWidth = Number(this.state.ScrollWidth) - 67;
     this.flatList.scrollToOffset({ offset: EffectWidth });
 }
    renderWeekData(item) {
      console.log('item', item);
        return(
            <View style={{ flex: 5 }}>
                <View style={{ justifyContent: 'center', alignSelf: 'center', width: 50, alignItems: 'center' }} >
                    <Text style={{ fontSize: 18 }}>{item.time}</Text>
                </View>
                <CheckBox status={item.sun} date={item.date} day="sun" time={item.time} id={item.id} />
                <CheckBox status={item.mon} date={item.date} day="mon" time={item.time} id={item.id}/>
                <CheckBox status={item.tue} date={item.date} day="tue" time={item.time} id={item.id}/>
                <CheckBox status={item.wed} date={item.date} day="wed" time={item.time} id={item.id}/>
                <CheckBox status={item.thu} date={item.date} day="thu" time={item.time} id={item.id}/>
                <CheckBox status={item.fri} date={item.date} day="fri" time={item.time} id={item.id}/>
                <CheckBox status={item.sat} date={item.date} day="sat" time={item.time} id={item.id}/>
            </View>
        );
    }
    onDonePress(){
      const workerId = this.props.workerId;
      AsyncStorage.getItem("StoreData").then((value) => {
        const JSONdata = JSON.parse(value);
        //api to hit Timing
        const finalData = { };
        console.log('finalData', finalData);
        console.log()
        api.post('worker-available-timings',{"timings": JSONdata, "workerId": workerId}).then(res => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
      }).then(res => {
          AsyncStorage.setItem('StoreData', dataRemoteString);
      });
    }

    render() {

        return(
            <Container >
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Content>
                    <Header style={styleSelf.appHdr2} androidStatusBarColor= "#cbf0ed">
                        <Button transparent >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Menu")}>
                                <Text style={styleSelf.backBt} >Cancel</Text>
                            </TouchableOpacity>
                        </Button>
                        <Body style={styleSelf.tac}>
                            <Text style={styleSelf.hdClr}>Add Timing</Text>
                        </Body>
                        <Button transparent >
                            <TouchableOpacity onPress={this.onDonePress.bind(this)}>
                              <Text style={styleSelf.backBt} >Done</Text>
                            </TouchableOpacity>
                        </Button>
                    </Header>
                    <View style={{ paddingLeft: 20, paddingTop: 10, paddingRight: 5, flexDirection: 'row' }}>
                        <View style={{ paddingTop: 25 }}>
                            <View style={styleSelf.TimingContainerFirst} >
                                <Text style={styleSelf.TimingText} >Sun</Text>
                            </View>
                            <View style={styleSelf.TimingContainer} >
                                <Text style={styleSelf.TimingText} >Mon</Text>
                            </View>
                            <View style={styleSelf.TimingContainer} >
                                <Text style={styleSelf.TimingText} >Tue</Text>
                            </View>
                            <View style={styleSelf.TimingContainer} >
                                <Text style={styleSelf.TimingText} >Wed</Text>
                            </View>
                            <View style={styleSelf.TimingContainer} >
                                <Text style={styleSelf.TimingText} >Thu</Text>
                            </View>
                            <View style={styleSelf.TimingContainer} >
                                <Text style={styleSelf.TimingText} >Fri</Text>
                            </View>
                            <View style={styleSelf.TimingContainer} >
                                <Text style={styleSelf.TimingText} >Sat</Text>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity onPress={this.ScrollLeft.bind(this)}>
                                <View>
                                    <Image source={require('./left-arrow.png')} style={{ width: 24, height: 24 }} />
                                </View>
                            </TouchableOpacity>
                          </View>
                          <FlatList
                              ref={ref => this.flatList = ref}
                              data={this.state.dataRemote}
                              renderItem={({ item }) => this.renderWeekData(item)}
                              horizontal={true}
                          />
                          <View>
                              <TouchableOpacity onPress={this.ScrollRight.bind(this)}>
                                  <View><Image source={require('./right-arrow.png')} style={{ width: 24, height: 24 }} /></View>
                              </TouchableOpacity>
                          </View>

                    </View>
                </Content>
            </Container>
        );
    }
}

styleSelf = {
  TimingText: {
    fontSize: 20,
  },
  TimingContainer: {
      width: 50,
      height: 50,
      justifyContent: 'center',
  },
  TimingContainerFirst: {
      width: 50,
      height: 50,
      justifyContent: 'center'
  },
  hdClr:{
      color: '#1e3768',
      fontSize: 22
  },
  appHdr2: {
      backgroundColor: '#cbf0ed',
  },
  backBt: {
      fontSize: 16,
      color: "#71beb8"
  },
  tac:{
      alignItems: 'center'
  },
}

function mapStateToProps(state) {
  console.log('WeekCalendar', state); // state
  return {
    loading: state.CheckBox.loading,
    workerId: state.auth.data.id
  }
}

export default connect(mapStateToProps, {ChangeData})(WeekCalendar);
