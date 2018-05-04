import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../api/index';
//import { NavigationActions } from "react-navigation";

import { View, StatusBar, Alert, TouchableOpacity, FlatList, Text } from "react-native";
import { Container, Header, Button, Content, Body, Card, CardItem } from "native-base";

import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
//import { setAvilableDate } from './elements/locationAction';
import FSpinner from 'react-native-loading-spinner-overlay';
import I18n from '../../i18n/i18n';
//const deviceHeight = Dimensions.get('window').height;
//const deviceWidth = Dimensions.get('window').width;

// class MyListItem extends React.PureComponent {
//     _onPress = () => {
//         this.props.onPressItem(this.props.id);
//     };


//     render() {
//         const textColor = this.props.selected ? "red" : "black";
//         return (
//             <TouchableOpacity onPress={this._onPress}>
//                 <View>
//                     <Text style={{ color: textColor }}>
//                         {this.props.title}
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     }
// }


class UnavailableDate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            daYSelected: '',
            daYSelected2: '',
            satStartDate: '',
            setStartWeek: '',
            satEndDate: '',
            setEndWeek: '',
            setStartTimeKey: '',
            setStartTime: '',
            setEndTime: '',
            setEndTimeKey: '',
            startDay: '',
            visible: false,
            endDay: '',
            minDate: '',
            colectionData: '',
            colectionData2: '',
            weekday: '',
            months: '',
        }
    }
    onDaySelect(day) {
        let d = new Date(day.dateString);
        let weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        let n = weekday[d.getDay()];
        this.setState({
            daYSelected: day.dateString,
            satStartDate: day.day + '-' + this.state.months[day.month - 1] + '-' + day.year,
            setStartWeek: n
        })

    }
    onDaySelect2(day) {
        let d = new Date(day.dateString);
        let weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        let n = weekday[d.getDay()];
        this.setState({
            daYSelected2: day.dateString,
            satEndDate: day.day + '-' + this.state.months[day.month - 1] + '-' + day.year,
            setEndWeek: n
        })
    }
    pressOnCircle(index) {
        let newColectionData = this.state.colectionData;

        for (var i = 0; i < (newColectionData.length); i++) {
            newColectionData[i].isActive = false;
            if (newColectionData[i].key == index) {
                newColectionData[i].isActive = true;
                this.setState({
                    setStartTimeKey: newColectionData[i].key,
                    setStartTime: newColectionData[i].time
                })
            }
        }
        this.setState({
            ColectionData: newColectionData,
        })
    }
    pressOnCircle2(index) {
        let newColectionData = this.state.colectionData2;

        for (var i = 0; i < (newColectionData.length); i++) {
            newColectionData[i].isActive = false;
            if (newColectionData[i].key == index) {
                newColectionData[i].isActive = true;
                this.setState({
                    setEndTimeKey: newColectionData[i].key,
                    setEndTime: newColectionData[i].time
                })
            }

        }
        this.setState({
            ColectionData2: newColectionData,
        })
    }

    componentDidMount() {
        this.setState({ visible: true });
        var today = new Date();
        var dy = parseInt(today.getMonth() + 1);
        var dm = today.getDate();
        if (dy < 10) {
            dy = '0' + dy;
        }
        if (dm < 10) {
            dm = '0' + dm;
        }

        date = today.getFullYear() + "-" + dy + "-" + dm;

        this.setState({ 
            weekday: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            minDate: [today],
            daYSelected: [date],
            daYSelected2: [date],
            colectionData: [
                { key: '1', time: '00:00 AM', isActive: false },
                { key: '2', time: '01:00 AM', isActive: false },
                { key: '3', time: '02:00 AM', isActive: false },
                { key: '4', time: '03:00 AM', isActive: false },
                { key: '5', time: '04:00 AM', isActive: false },
                { key: '6', time: '05:00 AM', isActive: false },
                { key: '7', time: '06:00 AM', isActive: false },
                { key: '8', time: '07:00 AM', isActive: false },
                { key: '9', time: '08:00 AM', isActive: false },
                { key: '10', time: '09:00 AM', isActive: false },
                { key: '11', time: '10:00 AM', isActive: false },
                { key: '12', time: '11:00 AM', isActive: false },
                { key: '13', time: '12:00 AM', isActive: false },
                { key: '14', time: '01:00 PM', isActive: false },
                { key: '15', time: '02:00 PM', isActive: false },
                { key: '16', time: '03:00 PM', isActive: false },
                { key: '17', time: '04:00 PM', isActive: false },
                { key: '18', time: '05:00 PM', isActive: false },
                { key: '19', time: '06:00 PM', isActive: false },
                { key: '20', time: '07:00 PM', isActive: false },
                { key: '21', time: '08:00 PM', isActive: false },
                { key: '22', time: '09:00 PM', isActive: false },
                { key: '23', time: '10:00 PM', isActive: false },
                { key: '24', time: '11:00 PM', isActive: false }
            ],
            colectionData2: [
                { key: '1', time: '00:00 AM', isActive: false },
                { key: '2', time: '01:00 AM', isActive: false },
                { key: '3', time: '02:00 AM', isActive: false },
                { key: '4', time: '03:00 AM', isActive: false },
                { key: '5', time: '04:00 AM', isActive: false },
                { key: '6', time: '05:00 AM', isActive: false },
                { key: '7', time: '06:00 AM', isActive: false },
                { key: '8', time: '07:00 AM', isActive: false },
                { key: '9', time: '08:00 AM', isActive: false },
                { key: '10', time: '09:00 AM', isActive: false },
                { key: '11', time: '10:00 AM', isActive: false },
                { key: '12', time: '11:00 AM', isActive: false },
                { key: '13', time: '12:00 AM', isActive: false },
                { key: '14', time: '01:00 PM', isActive: false },
                { key: '15', time: '02:00 PM', isActive: false },
                { key: '16', time: '03:00 PM', isActive: false },
                { key: '17', time: '04:00 PM', isActive: false },
                { key: '18', time: '05:00 PM', isActive: false },
                { key: '19', time: '06:00 PM', isActive: false },
                { key: '20', time: '07:00 PM', isActive: false },
                { key: '21', time: '08:00 PM', isActive: false },
                { key: '22', time: '09:00 PM', isActive: false },
                { key: '23', time: '10:00 PM', isActive: false },
                { key: '24', time: '11:00 PM', isActive: false },
            ],
         });
        if (this.props.navigation.state.params.unAvailTiming) {
            
           if(this.props.navigation.state.params.unAvailTiming[0] && this.state.colectionData !== '')
           {
            this.state.colectionData.map((item) => {
                if (item.time == this.props.navigation.state.params.unAvailTiming[0].start_time) {
                    item.isActive = true;
                }
            });
           }

           if(this.props.navigation.state.params.unAvailTiming[0] && this.state.colectionData !== '')
           {
            this.state.colectionData2.map((item) => {
                if (item.time == this.props.navigation.state.params.unAvailTiming[0].end_time) {
                    item.isActive = true;
                }
            });
           }
           if(this.props.navigation.state.params.unAvailTiming[0])
           {
            var startDate = new Date(this.props.navigation.state.params.unAvailTiming[0].start_date);
            var dy = parseInt(startDate.getMonth() + 1);
            var dm = startDate.getDate();
            if (dy < 10) {
                dy = '0' + dy;
            }
            if (dm < 10) {
                dm = '0' + dm;
            }

            var stdate = startDate.getFullYear() + "-" + dy + "-" + dm;
            this.setState({ daYSelected: stdate });

            var endtDate = new Date(this.props.navigation.state.params.unAvailTiming[0].end_date);
            var dy = parseInt(endtDate.getMonth() + 1);
            var dm = endtDate.getDate();
            if (dy < 10) {
                dy = '0' + dy;
            }
            if (dm < 10) {
                dm = '0' + dm;
            }

            var enddate = endtDate.getFullYear() + "-" + dy + "-" + dm;
            this.setState({ daYSelected2: enddate });
           }
            //this.state.daYSelected2=new Date(this.props.navigation.state.params.unAvailTiming[0].end_date);
            this.setState({ visible: false });
        }
    }

    doneDateAndTime() {
        this.setState({ visible: true });
        if (this.state.satStartDate == '') {
            this.setState({ visible: false });
            Alert.alert(I18n.t('please_enter_start_date'));
        } else if (this.state.setStartTime == '') { 
            this.setState({ visible: false });
            Alert.alert(I18n.t('please_enter_start_time'));
        } else if (this.state.satEndDate == '') {
            this.setState({ visible: false });
            Alert.alert(I18n.t('please_enter_end_date'));
        } else if (this.state.setEndTime == '') {
            this.setState({ visible: false });
            Alert.alert(I18n.t('please_enter_end_time'));
        } //else if (this.state.setStartTime < this.state.setEndTime) {
        //      Alert.alert('End time will be getter than start time');
        //  } else if (this.state.setStartTime < this.state.setEndTime){
        //     Alert.alert('End time will be getter than start time');
        // }
        else {

            let d1 = new Date(this.state.satStartDate);
            let d2 = new Date(this.state.satEndDate);
            if (d1 <= d2) {
                if (!(d1 < d2)) {
                    if (this.state.setStartTimeKey > this.state.setEndTimeKey) {
                        Alert.alert(I18n.t('end_time_will_greater_than_start'));
                    } else {
                        if (this.props.navigation.state.params.unAvailId) {
                            const patchUrl = `WorkerUnavailabilities/${this.props.navigation.state.params.unAvailId}`;
                            api.put(patchUrl, {
                                "start_time": this.state.setStartTime,
                                "end_time": this.state.setEndTime,
                                "status": "NA",
                                "start_date": this.state.daYSelected,
                                "end_date": this.state.daYSelected2,
                                "workerId": this.props.auth.data.id,
                            }).then(res => {
                                this.setState({ visible: false });
                                this.props.navigation.navigate('myTiming');
                            }).catch((err) => {
                                this.setState({ visible: false });
                                Alert.alert(I18n.t('please_try_again_later'));
                            });
                        }
                        else {
                            api.post('WorkerUnavailabilities/', {
                                "start_time": this.state.setStartTime,
                                "end_time": this.state.setEndTime,
                                "status": "NA",
                                "start_date": this.state.daYSelected,
                                "end_date": this.state.daYSelected2,
                                "workerId": this.props.auth.data.id
                            }
                            ).then((res) => {
                                this.setState({ visible: false });
                                this.props.navigation.navigate('myTiming');
                            }).catch((err) => {
                                this.setState({ visible: false });
                                Alert.alert(I18n.t('please_try_again_later'));
                            });
                        }

                    }
                } else {
                    if (this.props.navigation.state.params.unAvailId) {
                        const patchUrl = `WorkerUnavailabilities/${this.props.navigation.state.params.unAvailId}`;
                        api.put(patchUrl, {
                            "start_time": this.state.setStartTime,
                            "end_time": this.state.setEndTime,
                            "status": "NA",
                            "start_date": this.state.daYSelected,
                            "end_date": this.state.daYSelected2,
                            "workerId": this.props.auth.data.id,
                        }).then(res => {
                            this.setState({ visible: false });
                            this.props.navigation.navigate('myTiming');
                        }).catch((err) => {
                            this.setState({ visible: false });
                            Alert.alert(I18n.t('please_try_again_later'));
                        });
                    }
                    else {
                        api.post('WorkerUnavailabilities/', {
                            "start_time": this.state.setStartTime,
                            "end_time": this.state.setEndTime,
                            "status": "NA",
                            "start_date": this.state.daYSelected,
                            "end_date": this.state.daYSelected2,
                            "workerId": this.props.auth.data.id
                        }
                        ).then((res) => {
                            this.setState({ visible: false });
                            this.props.navigation.navigate('myTiming');
                        }).catch((err) => {
                            this.setState({ visible: false });
                            Alert.alert(I18n.t('please_try_again_later'));
                        });
                    }

                }
            }
            else {
                this.setState({ visible: false })
                Alert.alert(I18n.t('start_date_less_than_end_date'));
            }


        }
    }

    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7" />

                <Header style={styles.appHdr2} androidStatusBarColor="#cbf0ed">
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Text>{I18n.t('cancel')}</Text>
                    </Button>
                    <Body style={styles.tac}>
                        <Text style={styles.hdClr}>{I18n.t('my_timing')}</Text>
                    </Body>
                    <Button transparent onPress={() => this.doneDateAndTime()}>
                        <Text>{I18n.t('done')}</Text>
                    </Button>
                </Header>

                <Content>
                    <FSpinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
                    <View style={{ paddingLeft: 15, paddingRight: 15, }}>
                        <Card style={{ backgroundColor: 'transparent', marginBottom: 20 }}>
                            <CardItem style={{ marginBottom: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <FontAwesome name='calendar' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }} />
                                <Text>{I18n.t('start_day')}</Text>
                            </CardItem>
                            <CardItem>
                                <Calendar
                                    onDayPress={(day) => this.onDaySelect(day)}
                                    monthFormat={'MMM yyyy'}
                                    hideArrows={false}
                                    hideExtraDays={true}
                                    disableMonthChange={false}
                                    minDate={this.state.minDate}
                                    markedDates={{
                                        [this.state.daYSelected]: { selected: true, selectedColor: '#81cdc7' }
                                    }}
                                    theme={{
                                        backgroundColor: '#ffffff',
                                        calendarBackground: '#ffffff',
                                        textSectionTitleColor: '#2d4150',
                                        selectedDayBackgroundColor: '#2d4150',
                                        selectedDayTextColor: '#ffffff',
                                        todayTextColor: '#81cdc7',
                                        dayTextColor: '#2d4150',
                                        weekTextColor: '#000',
                                        textDisabledColor: '#ccc',
                                        arrowColor: '#81cdc7',
                                        textDayFontSize: 14,
                                        textMonthFontSize: 16,
                                        textDayHeaderFontSize: 16,

                                    }}
                                />
                            </CardItem>

                            <CardItem style={{ marginTop: 2, marginBottom: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <FontAwesome name='clock-o' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }} />
                                <Text>{I18n.t('start_time')}</Text>
                            </CardItem>
                            <CardItem>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <FlatList
                                        data={
                                            this.state.colectionData
                                        }
                                        renderItem={({ item }) =>
                                            <TouchableOpacity onPress={() => this.pressOnCircle(item.key)} id={item.key} >
                                                <Text style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 8, paddingLeft: 8, borderRadius: 4, borderWidth: 1, borderColor: '#ccc', backgroundColor: (item.isActive ? '#81cdc7' : '#ffffff'), color: (item.isActive ? '#ffffff' : '#81cdc7'), marginRight: 5 }}>
                                                    {item.time}
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                        style={{ paddingTop: 10, paddingBottom: 10 }}
                                        horizontal={true}
                                    />
                                </View>
                            </CardItem>

                        </Card>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <CardItem style={{ marginBottom: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <FontAwesome name='calendar' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }} />
                                <Text>{I18n.t('end_day')}</Text>
                            </CardItem>
                            <CardItem>
                                <Calendar
                                    onDayPress={(day) => this.onDaySelect2(day)}
                                    monthFormat={'MMM yyyy'}
                                    hideArrows={false}
                                    hideExtraDays={true}
                                    disableMonthChange={false}
                                    minDate={this.state.minDate}
                                    markedDates={{
                                        [this.state.daYSelected2]: { selected: true, selectedColor: '#81cdc7' }
                                    }}
                                    theme={{
                                        backgroundColor: '#ffffff',
                                        calendarBackground: '#ffffff',
                                        textSectionTitleColor: '#2d4150',
                                        selectedDayBackgroundColor: '#2d4150',
                                        selectedDayTextColor: '#ffffff',
                                        todayTextColor: '#81cdc7',
                                        dayTextColor: '#2d4150',
                                        weekTextColor: '#000',
                                        textDisabledColor: '#ccc',
                                        arrowColor: '#81cdc7',
                                        textDayFontSize: 14,
                                        textMonthFontSize: 16,
                                        textDayHeaderFontSize: 16,

                                    }}
                                />
                            </CardItem>
                            <CardItem style={{ marginBottom: 2, marginTop: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <FontAwesome name='clock-o' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }} />
                                <Text>{I18n.t('end_time')}</Text>
                            </CardItem>
                            <CardItem>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <FlatList
                                        data={
                                            this.state.colectionData2
                                        }
                                        renderItem={({ item }) =>
                                            <TouchableOpacity onPress={() => this.pressOnCircle2(item.key)} id={item.key} >
                                                <Text style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 8, paddingLeft: 8, borderRadius: 4, borderWidth: 1, borderColor: '#ccc', backgroundColor: (item.isActive ? '#81cdc7' : '#ffffff'), color: (item.isActive ? '#ffffff' : '#81cdc7'), marginRight: 5 }}>
                                                    {item.time}
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                        style={{ paddingTop: 10, paddingBottom: 10 }}
                                        horizontal={true}
                                    />
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
            </Container>
        );
    }
}


UnavailableDate.propTypes = {
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

export default connect(mapStateToProps, {})(UnavailableDate);
