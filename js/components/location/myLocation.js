import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem, ListView } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { allLocation } from './elements/locationAction';

import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

 

class myLocation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container >
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Content>

                    <Header style={styles.appHdr2} androidStatusBarColor= "#cbf0ed">
                        <Button transparent >
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </Button>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>My Location</Text>
                        </Body>
                        <Button transparent onPress={() => this.props.navigation.navigate("SelectLocation")}>
                            <Ico name='edit' style={styles.editIcon} />
                            <Text style={styles.editIconTxt}>Edit</Text>
                        </Button>
                    </Header>
                    
                    <View>

                        <View style={styles.mainItem}>
                            <View style={styles.mainItemIcon}>
                                <View>
                                    <Entypo name='location-pin' style={styles.mainItemIconIcon} />
                                </View>
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.locName}>Deira</Text>
                                <Text style={styles.locName2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.mainItemIcon}>
                                <View>
                                    <Entypo name='location-pin' style={styles.mainItemIconIcon} />
                                </View>
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.locName}>Deira</Text>
                                <Text style={styles.locName2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.mainItemIcon}>
                                <View>
                                    <Entypo name='location-pin' style={styles.mainItemIconIcon} />
                                </View>
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.locName}>Deira</Text>
                                <Text style={styles.locName2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.mainItemIcon}>
                                <View>
                                    <Entypo name='location-pin' style={styles.mainItemIconIcon} />
                                </View>
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.locName}>Deira</Text>
                                <Text style={styles.locName2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.mainItemIcon}>
                                <View>
                                    <Entypo name='location-pin' style={styles.mainItemIconIcon} />
                                </View>
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.locName}>Deira</Text>
                                <Text style={styles.locName2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.mainItemIcon}>
                                <View>
                                    <Entypo name='location-pin' style={styles.mainItemIconIcon} />
                                </View>
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.locName}>Deira</Text>
                                <Text style={styles.locName2}>Port Saeed</Text>
                            </View>
                        </View>

                    </View>
                    
                    
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        allLocation: () => dispatch(allLocation())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(myLocation);