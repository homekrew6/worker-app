import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../api/index';
import { View, StatusBar, Alert, TouchableOpacity, FlatList, Text } from "react-native";
import { Container, Header, Button, Content, Body, Card, CardItem, Title } from "native-base";
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import FSpinner from 'react-native-loading-spinner-overlay';
import I18n from '../../i18n/i18n';
import { NavigationActions } from "react-navigation";

class FollowUpDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minDate: '',
            satStartDate: '',
            setStartWeek: '',
            setStartTime: '',
            colectionData: [],
            months: []
        }
    }
    componentDidMount() {
        var today = new Date();

        var dy = parseInt(today.getMonth() + 1);
        var dm = today.getDate();
        if (dy < 10) {
            dy = '0' + dy;
        }
        if (dm < 10) {
            dm = '0' + dm;
        }
        let date = today.getFullYear() + "-" + dy + "-" + dm;
        this.setState({
            minDate: this.props.navigation.state.params.jobDetails.postedDate ? this.props.navigation.state.params.jobDetails.postedDate : [date],
            daYSelected: this.props.navigation.state.params.jobDetails.postedDate ? this.props.navigation.state.params.jobDetails.postedDate : [date],
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
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        });
    }
    doneDateAndTime() {
        this.setState({ visible: true });
        if (this.state.satStartDate == '') {
            this.setState({ visible: false });
            Alert.alert(I18n.t('please_enter_start_date'));
        } else if (this.state.setStartTime == '') {
            this.setState({ visible: false });
            Alert.alert(I18n.t('please_enter_start_time'));
        }
        else {
            this.setState({ visible: false });
            const saveDateDB = this.state.daYSelected + " " + this.state.setStartTime.slice(0, -2) + this.state.setStartTime.slice(5).toLowerCase();
            
            // this.props.navigation.navigate('FollowUpList',  { 
            //     saveDateDB: saveDateDB, jobDetails: 
            //     this.props.navigation.state.params.jobDetails 
            // });
            this.props.navigation.dispatch(
                NavigationActions.reset({
                    index: 3,
                    actions: [
                    NavigationActions.navigate({ routeName: 'Menu' }),
                    NavigationActions.navigate({ routeName: 'AvailableJobs' }),
                    NavigationActions.navigate({ routeName: 'JobDetails', params: { jobDetails: this.props.navigation.state.params.jobDetails  } }),
                    NavigationActions.navigate({ routeName: 'FollowUpList', params: {
                        saveDateDB: saveDateDB,
                        jobDetails: this.props.navigation.state.params.jobDetails
                    } }),
                    ],
                })
            );
        }
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
    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7" />

                <Header style={styles.appHdr2} androidStatusBarColor="#cbf0ed">
                    <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} activeOpacity={0.5} style={{ width: 60, justifyContent: 'center' }} >
                        <Text>{I18n.t('cancel')}</Text>
                    </TouchableOpacity>
                    <Body style={styles.headBody}>
                        <Title style={styles.hdClr}>{I18n.t('my_timing')}</Title>
                    </Body>
                    <TouchableOpacity transparent onPress={() => this.doneDateAndTime()} activeOpacity={0.5} style={{ width: 60, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text>{I18n.t('done')}</Text>
                    </TouchableOpacity>
                </Header>

                <Content>
                    <FSpinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
                    <View style={{ paddingLeft: 15, paddingRight: 15, }}>
                        <Card style={{ backgroundColor: 'transparent', marginBottom: 20 }}>
                            <CardItem style={{ marginBottom: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <FontAwesome name='calendar' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }} />
                                <Text>{I18n.t('start_day')}</Text>
                            </CardItem>
                            <CardItem style={{ justifyContent: 'center' }}>
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
                                        showsHorizontalScrollIndicator={false}
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

                    </View>
                </Content>
            </Container>
        );
    }
}


export default FollowUpDate;