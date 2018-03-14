import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    state = {timimgData: {}};
    componentDidMount(){
      api.get('worker-available-timings?{"where":{"workerId":"6"}}').then(res => {
          console.log(res[0]);
          this.setState({ timimgData: res[0] });
      }).catch((err) => {
          console.log(err);
      })
    }

    

    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Content>
                    <Header style={styles.appHdr2} androidStatusBarColor="#cbf0ed">
                        <Button transparent >
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </Button>
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("WeekCalendar")}>
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
                                <Text style={{ color: '#828282', fontSize: 13}}>8.00 am, 10.00 am, 1.00 pm, 2.00 pm</Text>
                            </View>
                        </View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}>Monday</Text>
                            </View>
                            <View>
                                <Text style={styles.timedata}>8.00 am, 10.00 am, 1.00 pm, 2.00 pm</Text>
                            </View>
                        </View>

                        <View style={styles.mainItemSec}>

                            <View style={ styles.wkDay }>
                                <Text style={styles.wkDayd}> Tuesday </Text>
                            </View>

                            <View>
                                <Text style={styles.timedata}> 8.00 am, 10.00 am, 1.00 pm, 2.00 pm </Text>
                            </View>

                        </View>

                        <View style={styles.mainItemSec}>

                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}> Wednesday </Text>
                            </View>

                            <View>
                                <Text style={styles.timedata}> 8.00 am, 10.00 am, 1.00 pm, 2.00 pm </Text>
                            </View>

                        </View>

                        <View style={styles.mainItemSec}>

                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}> Thursday </Text>
                            </View>

                            <View>
                                <Text style={styles.timedata}> 8.00 am, 10.00 am, 1.00 pm, 2.00 pm </Text>
                            </View>

                        </View>
                        <View style={styles.mainItemSec}>

                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}> Friday </Text>
                            </View>

                            <View>
                                <Text style={styles.timedata}> 8.00 am, 10.00 am, 1.00 pm, 2.00 pm </Text>
                            </View>

                        </View>
                        <View style={styles.mainItemSec}>

                            <View style={styles.wkDay}>
                                <Text style={styles.wkDayd}> Saturday </Text>
                            </View>

                            <View>
                                <Text style={styles.timedata}> 8.00 am, 10.00 am, 1.00 pm, 2.00 pm </Text>
                            </View>

                        </View>

                        <View style={styles.mainItemSec}>
                            <View style={styles.flexOne}>
                                <Text style={styles.listHdr}>Unavailable Timing</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Ico name='add-circle' style={styles.listHdrEdtIcn} />
                                <Text style={styles.listHdrEdt}>Add</Text>
                            </View>
                        </View>

                        <View style={styles.mainItemSec}>
                            <Image source={buttonImage} style={styles.dotImg}/>
                            <View style={styles.flexOne}>
                                <View style={styles.startTime}>
                                    <View style={styles.wkDay}>
                                        <Text style={styles.wkDayd}> Start Date </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.timedata}> Wed, 7 june 2017 8.00 am </Text>
                                    </View>
                                </View>
                                <View style={styles.endTime}>
                                    <View style={styles.wkDay}>
                                        <Text style={styles.wkDayd}> End Date </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.timedata}> Wed, 8 june 2017 8.00 am </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.mainItemSec}>
                            <Image source={buttonImage} style={styles.dotImg}/>
                            <View style={styles.flexOne}>
                                <View style={styles.startTime}>
                                    <View style={styles.wkDay}>
                                        <Text style={styles.wkDayd}> Start Date </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.timedata}> Wed, 7 june 2017 8.00 am </Text>
                                    </View>
                                </View>
                                <View style={styles.endTime}>
                                    <View style={styles.wkDay}>
                                        <Text style={styles.wkDayd}> End Date </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.timedata}> Wed, 8 june 2017 8.00 am </Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                   </View>


                </Content>
            </Container>
        );
    }
}

export default myTiming;
