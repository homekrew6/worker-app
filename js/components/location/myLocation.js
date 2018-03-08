import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem, ListView } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { selectedLocation, allLocation } from './elements/locationAction';

import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SelectLocation' })]
});

 

class myLocation extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            locationFlag: false,
        }
    }

    componentWillMount() {
        
        
        this.props.selectedLocation(this.props.auth.data.id).then((allLst) => {
            console.log(this.props.location);
            console.log(this.props.auth.data.name);
            this.setState({
                locationFlag: true
            })


            //console.log(locationListState)
        }).catch(err => {
            console.log(err);
        })
    }
    
    // test(){
    //     console.log(this.props.auth.data);
    //     this.props.selectedLocation(this.props.auth.data.id).then((allLst) => {
    //         console.log(allLst)
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    render() {

        let myLocationlist
        if (this.state.locationFlag && this.props.location.selectedData != "") {
            myLocationlist = (
                this.props.location.selectedData.map((data, key) => (
                    <View style={styles.mainItem} key={data.id}>
                        <View style={styles.mainItemIcon}>
                            <View>
                                <Entypo name='location-pin' style={styles.mainItemIconIcon} />
                            </View>
                        </View>
                        <View style={styles.mainItemText}>
                            <Text style={styles.locName}>{data.zone.name}</Text>
                            <Text style={styles.locName2}>{data.zone.description}</Text>
                        </View>
                    </View>
                ))
            )
        }

        return (
            <Container >
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Content>

                    <Header style={styles.appHdr2} androidStatusBarColor= "#cbf0ed">
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </Button>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>My Location</Text>
                        </Body>
                        <Button transparent 
                            onPress={() => this.props.navigation.navigate('SelectLocation')}
                            >
                            <Ico name='edit' style={styles.editIcon} />
                            <Text style={styles.editIconTxt}>Edit</Text>
                        </Button>
                    </Header>
                    
                    <View>
                        {myLocationlist}
                        {/* <View style={styles.mainItem}>
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
                        </View> */}

                    </View>
                    
                    
                </Content>
            </Container>
        );
    }
}

myLocation.propTypes = {
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
        selectedLocation: (id) => dispatch(selectedLocation(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(myLocation);
