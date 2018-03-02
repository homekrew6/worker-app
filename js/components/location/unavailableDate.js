import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body,Card, CardItem  } from "native-base";
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import HorizontalPicker from 'react-native-horizontal-picker';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width; 
class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };
    

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text style={{ color: textColor }}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}


class UnavailableDate extends Component {
    constructor(props) {
        super(props);
        var today = new Date();
        var dy = parseInt(today.getMonth() + 1);
        var dm = today.getDate();
        if (dy < 10){
            dy = '0' + dy;
        }
        if (dm < 10) {
            dm = '0' + dm;
        }

        date = today.getFullYear() + "-" + dy + "-" + dm;
        this.state = {
            daYSelected: [date],
            daYSelected2: [date],
            colectionData :[
                { key: '1', time: '9: 30 am', isActive: false  },
                { key: '2', time: '9: 30 am', isActive: true },
                { key: '3', time: '9: 30 am', isActive: false  },
                { key: '4', time: '9: 30 am', isActive: false  },
                { key: '5', time: '9: 30 am', isActive: false  },
                { key: '6', time: '9: 30 am', isActive: false  },
                { key: '7', time: '9: 30 am', isActive: false },
                { key: '8', time: '9: 30 am', isActive: false  }    
            ],                            
        colectionData2 : [
            { key: '1', time: '9: 30 am', isActive: true },
            { key: '2', time: '9: 30 am', isActive: false },
            { key: '3', time: '9: 30 am', isActive: false },
            { key: '4', time: '9: 30 am', isActive: false },
            { key: '5', time: '9: 30 am', isActive: false },
            { key: '6', time: '9: 30 am', isActive: false },
            { key: '7', time: '9: 30 am', isActive: false },
            { key: '8', time: '9: 30 am', isActive: false }
        ]
    }
    }
    onDaySelect(day){
        this.setState({ daYSelected: day.dateString })
    }
    onDaySelect2(day) { 
        this.setState({ daYSelected2: day.dateString })
    }
    pressOnCircle(index){
        let newColectionData = this.state.colectionData;
       
        for (var i = 0; i < (newColectionData.length ); i++){
            newColectionData[i].isActive = false;
            if (newColectionData[i].key == index){
                newColectionData[i].isActive = true;
            }

        }
        this.setState({
            ColectionData: newColectionData,
        })
        console.log(newColectionData)
    }
    pressOnCircle2(index) {
        let newColectionData = this.state.colectionData2;

        for (var i = 0; i < (newColectionData.length); i++) {
            newColectionData[i].isActive = false;
            if (newColectionData[i].key == index) {
                newColectionData[i].isActive = true;
            }

        }
        this.setState({
            ColectionData2: newColectionData,
        })
        console.log(newColectionData)
    }
    componentWillMount() {
        //console.log(colectionData);
    }

    
    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#81cdc7"/>  

                    <Header style={styles.appHdr2} androidStatusBarColor="#cbf0ed">
                        <Button transparent >
                            <Text>Cancle</Text>
                        </Button>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>My Timings</Text>
                        </Body>
                        <Button transparent >
                            <Text>Done</Text>
                        </Button>
                    </Header>

                    <Content>
                        
                        <View style={{ paddingLeft: 15, paddingRight: 15, }}>
                        <Card style={{ backgroundColor: 'transparent', marginBottom: 20 }}>
                            <CardItem style={{marginBottom: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                <FontAwesome name='calendar' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }}/>
                                <Text>Start Day</Text>
                            </CardItem>
                            <CardItem>
                            <Calendar
                                onDayPress={(day) => this.onDaySelect(day)}
                                monthFormat={ 'MMM yyyy'} 
                                hideArrows={false}
                                hideExtraDays={true}
                                disableMonthChange={false}
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
                        </Card>
                        <Card style={{ backgroundColor: 'transparent', marginBottom: 20 }}>
                            <CardItem style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <FontAwesome name='clock-o' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }} />
                                <Text>Start Time</Text>
                            </CardItem>
                            <CardItem>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <FlatList
                                        data={
                                            this.state.colectionData
                                        }
                                        renderItem={({ item }) =>
                                            <TouchableOpacity onPress={() => this.pressOnCircle(item.key)} id={item.key} >
                                                <Text style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 8, paddingLeft: 8, borderRadius: 4, borderWidth: 1, borderColor: '#ccc', backgroundColor: (item.isActive ? '#81cdc7' : '#ffffff'), color: (item.isActive ? '#ffffff' : '#81cdc7'), marginRight: 5 } }>
                                                    {item.time}
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                        style={{ paddingTop: 10, paddingBottom: 10 }}
                                        horizontal = {true}
                                    />
                                </View>
                            </CardItem>
                        </Card>
                        <Card style={{ backgroundColor: 'transparent' }}>
                            <CardItem style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <FontAwesome name='calendar' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }} />
                                <Text>End Day</Text>
                            </CardItem>
                            <CardItem>
                                <Calendar
                                    onDayPress={(day) => this.onDaySelect2(day)}
                                    monthFormat={'MMM yyyy'}
                                    hideArrows={false}
                                    hideExtraDays={true}
                                    disableMonthChange={false}
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
                        </Card>
                        <Card style={{ backgroundColor: 'transparent', marginBottom: 20 }}>
                            <CardItem style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <FontAwesome name='clock-o' style={{ color: '#81cdc7', fontSize: 20, marginRight: 5 }} />
                                <Text>End Time</Text>
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


export default UnavailableDate;
