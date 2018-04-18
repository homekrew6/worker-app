import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, AsyncStorage } from 'react-native';
import { Container, Header, Button, Content, Body } from "native-base";
import { connect } from 'react-redux';
import styles from '../location/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from './CheckBox';
import { ChangeData } from '../../actions/ActionWeek';
import api from '../../api';
import I18n from '../../i18n/i18n';

class WeekCalendar extends Component {
  state = { dataRemote: '', ScrollWidth: 10 }


  componentDidMount(){
    const workerId = this.props.workerId;
    AsyncStorage.removeItem('StoreData', (err) => console.log('finished', err));
    const data =  {
    	"workerId": workerId,
    	"data": [{
    			"id": 1,
    			"time": "8 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 2,
    			"time": "9 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 3,
    			"time": "10 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 4,
    			"time": "11 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 5,
    			"time": "12 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 6,
    			"time": "1 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 7,
    			"time": "2 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 8,
    			"time": "3 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 9,
    			"time": "4 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 10,
    			"time": "5 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 11,
    			"time": "6 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 12,
    			"time": "7 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 13,
    			"time": "8 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 14,
    			"time": "9 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 15,
    			"time": "10 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 16,
    			"time": "11 pm",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 17,
    			"time": "12 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 18,
    			"time": "1 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 19,
    			"time": "2 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 20,
    			"time": "3 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 21,
    			"time": "4 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 22,
    			"time": "5 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 23,
    			"time": "6 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		},
    		{
    			"id": 24,
    			"time": "7 am",
    			"sun": false,
    			"mon": false,
    			"tue": false,
    			"wed": false,
    			"thu": false,
    			"fri": false,
    			"sat": false
    		}
    	]
    };

    const timimgData = this.props.navigation.state.params.timimgData;
    if (timimgData.length === 0) {
      this.setState({ dataRemote: data.data });
      const dataRemoteString = JSON.stringify(data.data);

      AsyncStorage.setItem('StoreData', dataRemoteString, (res) => {
       })

    }else {
      this.setState({ dataRemote: timimgData });
      const dataRemoteString = JSON.stringify(timimgData);
      AsyncStorage.setItem('StoreData', dataRemoteString);
    }
    this.props.ChangeData(this.state.dataRemote);

  }

  ScrollRight(){
     const EffectWidth = Number(this.state.ScrollWidth) + 67;
     this.setState({ ScrollWidth: EffectWidth });
     this.flatList.scrollToOffset({ offset: EffectWidth });
   }
   ScrollLeft(){
       const EffectWidth = Number(this.state.ScrollWidth) - 67;
       this.setState({ ScrollWidth: EffectWidth });
       this.flatList.scrollToOffset({ offset: EffectWidth });
   }
    renderWeekData(item) {
        return(
            <View style={{ flex: 5 }}>
                <View style={{ justifyContent: 'center', alignSelf: 'center', width: 50, height: 28, alignItems: 'center' }} >
                    <Text style={{ fontSize: 16 }}>{item.time}</Text>
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
      const timimgDataCheck = this.props.navigation.state.params.timimgData;
      const tableRowId = this.props.navigation.state.params.tableRowId;
      const workerId = this.props.workerId;
      AsyncStorage.getItem("StoreData").then((value) => {
        const JSONdata = JSON.parse(value);

        if (timimgDataCheck === '') {
          //api to hit adding Timing
          api.post('Workeravailabletimings',{"timings": JSONdata, "workerId": workerId}).then(res => {
			  this.props.navigation.navigate('Menu');
			  
          }).catch((err) => {
          });
        }else {
          //API hiting editiing
          const patchUrl = `Workeravailabletimings/${tableRowId}`;
          api.put(patchUrl, {"timings": JSONdata,"id": tableRowId,"workerId": workerId}).then(res => {
			  this.props.navigation.navigate('myTiming');
          }).catch((err) => {
			  
          });
        }



      }).catch(res => {
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
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Text style={styleSelf.backBt} >{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                        </Button>
                        <Body style={styleSelf.tac}>
                            <Text style={styleSelf.hdClr}>{I18n.t('add_timing')}</Text>
                        </Body>
                        <Button transparent >
                            <TouchableOpacity onPress={this.onDonePress.bind(this)}>
                              <Text style={styleSelf.backBt} >{I18n.t('done')}</Text>
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
                            <TouchableOpacity onPress={this.ScrollLeft.bind(this)} style={{height: 30, width: 30, alignItems: 'center'}}>
                                <View >
                                    <Image source={require('./left-arrow.png')} style={{ width: 24, height: 24 }} />
                                </View>
                            </TouchableOpacity>
                          </View>
                          <FlatList
                              ref={ref => this.flatList = ref}
                              data={this.state.dataRemote}
                              renderItem={({ item }) => this.renderWeekData(item)}
                              horizontal={true}
                              keyExtractor={(item, index) => index}
                          />
                          <View>
                              <TouchableOpacity onPress={this.ScrollRight.bind(this)} style={{height: 30, width: 30, alignItems: 'center'}}>
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
      height: 60,
      justifyContent: 'center',
  },
  TimingContainerFirst: {
      width: 50,
      height: 60,
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
  return {
    loading: state.CheckBox.loading,
    workerId: state.auth.data.id
  }
}

export default connect(mapStateToProps, {ChangeData})(WeekCalendar);
