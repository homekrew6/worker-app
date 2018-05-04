import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { View, StatusBar, Dimensions, ListView, Text } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FSpinner from 'react-native-loading-spinner-overlay';
import { selectedLocation } from './elements/locationAction';
import { navigateAndSaveCurrentScreen } from '../accounts/elements/authActions';
import { Container, Header, Button, Content, Text, Body } from "native-base";

import I18n from '../../i18n/i18n';
import styles from './styles';


const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SelectLocation' })]
});

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
];

class myLocation extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            locationFlag: false,
            loader: false,
            basic: true,
            listViewData: datas,
        }
    }
    navigate(screen) {
        const data = this.props.auth.data;
        data.activeScreen = screen;
        data.previousScreen = "MyLocation";
        this.props.navigateAndSaveCurrentScreen(data);
       this.props.navigation.navigate(screen);
        
      }
    componentWillMount() {
        this.setState({
            loader: true,
        })
        
        this.props.selectedLocation(this.props.auth.data.id).then((allLst) => {
            this.setState({
                locationFlag: true,
                loader: false,
            })


            //console.log(locationListState)
        }).catch(err => {
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

    myLocationlist(){
        if (this.state.locationFlag) {
                if(this.props.location.selectedData.length === 0 ){
                    return(
                    <View style={{ alignSelf: 'center', padding: 20 }}>
                        <Text>{I18n.t('no_location_found')}</Text>
                    </View>
                    )
                }else{
                    return(
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
        }
    }

    render() {

        return (
            <Container >
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Content>
                    <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

                    <Header style={styles.appHdr2} androidStatusBarColor= "#cbf0ed">
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </Button>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>{I18n.t('my_location')}</Text>
                        </Body>
                        <Button transparent 
                            onPress={() => this.navigate('SelectLocation')}
                            >
                            <Ico name='edit' style={styles.editIcon} />
                            <Text style={styles.editIconTxt}>{I18n.t('edit')}</Text>
                        </Button>
                    </Header>
                    
                    <View>
                        {this.myLocationlist()}
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
        selectedLocation: (id) => dispatch(selectedLocation(id)),
        navigateAndSaveCurrentScreen: (data) => dispatch(navigateAndSaveCurrentScreen(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(myLocation);
