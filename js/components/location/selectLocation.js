import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from "react-navigation";
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem, ListView } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import api from '../../api/index';
import FSpinner from 'react-native-loading-spinner-overlay';
import { allLocation, checkUncheck, clearMyLocation, selectedLocation } from './elements/locationAction';

import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title, CheckBox } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';
//this.props.navigation.dispatch(resetAction);
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
// const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName: 'MyLocation' })]
// })


class selectLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationFlag: false,
            locationListState: [],
            checkboxes: [],
            filter: 'ALL',
            loader: false
        }
    }
    componentWillMount() {
        
        this.props.allLocation().then((allLst) => {            
            console.log(this.props.location.data);
            console.log(allLst); 
            this.setState({
                locationFlag: true
            })

        }).catch(err => {
            console.log(err);
        })
    }


    chkbox_check(e) {
        this.props.checkUncheck(e, this.props.location.data);
    }

    save_select_location(){
        
        let newSelectedItemIds = [];
        let flagSelectItem = false;
        for ( var i = 0; i < this.props.location.data.length; i++ ){
            if (this.props.location.data[i].selected) {
                newSelectedItemIds.push(this.props.location.data[i].id);
                //console.log(newSelectedItemIds);
            }
        }
        console.log(newSelectedItemIds);
        if (newSelectedItemIds.length > 0){
            this.setState({
                loader: true,
            });
            let i;
            AsyncStorage.getItem('userToken', (err, result) => {
            if (!err) {
                api.delete('Workers/' + this.props.auth.data.id + '/workerLocations?' + 'access_token=' + JSON.parse(result).id).then((res) => {
                    for ( i = 0; i < newSelectedItemIds.length; i++) {
                        api.post('WorkerLocations?' + 'access_token=' + JSON.parse(result).id, { workerId: this.props.auth.data.id, zoneId: newSelectedItemIds[i] }).then((res1) => {
                            //console.log((newSelectedItemIds.length - 1),i);
                            if (i === newSelectedItemIds.length) {
                                //console.log('a')
                                //this.props.navigation.navigate('MyLocation');
                                this.setState({
                                    locationFlag: false
                                })
                                this.setState({
                                    loader: false,
                                });
                                this.props.navigation.navigate("MyLocation");
                            }

                        }).catch((err) => {
                            //reject(err);

                        });
                        
                    }
                })
                


            } else {
                //reject(err);
            }

        })
        }else{
            Alert.alert('Please select atleast one zone')
        }
        // console.log('newSelectedItemIds' + newSelectedItemIds);
        // AsyncStorage.getItem('userToken', (err, result) => {
        //     if (!err) {
        //         api.delete('Workers/' + this.props.auth.data.id + '/workerLocations?' + 'access_token=' + JSON.parse(result).id).then((res) => {
        //             //resolve(res)
        //         })
        //         for (var i = 0; i < newSelectedItemIds.length; i++ ){
        //             api.post('/workerLocations?' + 'access_token=' + JSON.parse(result).id, { workerId: this.props.auth.data.id, zoneId: newSelectedItemIds[i] }).then((res) => {
        //                 console.log(res);
                            
        //             }).catch((err) => {
        //                 //reject(err);
                        
        //             });
        //             //if (i == newSelectedItemIds.length - 1){
        //                 this.props.navigation.dispatch(resetAction);
        //             //}
        //         }
                
            
        //     } else {
        //         //reject(err);
        //     }

        // })
        
    }
    

    render() {
        let locationList
        if(this.state.locationFlag){
            let locationListItm = this.props.location.data;
            // locationListItm[2].is_active = false;
            locationList = (
                locationListItm.map((data, key) => (
                    <View style={styles.mainItem} key={data.id}>
                    <View style={styles.checkBoxWarp}>
                            <CheckBox color='#29416f' checked={data.selected} id={data.id} onPress={() => this.chkbox_check(data.id)} />
                    </View>
                    <View style={styles.mainItemText}>
                        <Text style={styles.lstHeader}>{data.name}</Text>
                        <Text style={styles.lstHeader2}>{data.description}</Text>
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
                    <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    <Header style={styles.appHdr2} androidStatusBarColor= "#cbf0ed">

                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </Button>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>My Locations</Text>
                        </Body>
                        <Button transparent onPress={() => this.save_select_location()}>
                            <Text>Save</Text>
                        </Button>
                        
                    </Header>
                    
                    <View>
                        {locationList}

                        {/* <View style={styles.mainItem}>
                            <View style={styles.checkBoxWarp}>
                                <CheckBox color='#29416f' checked={true} onPress={() => this.chkbox_check(1)} />
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.lstHeader}>Deira</Text>
                                <Text style={styles.lstHeader2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.checkBoxWarp}>
                                <CheckBox color='#29416f' checked={false} />
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.lstHeader}>Deira</Text>
                                <Text style={styles.lstHeader2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.checkBoxWarp}>
                                <CheckBox color='#29416f' checked={false} />
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.lstHeader}>Deira</Text>
                                <Text style={styles.lstHeader2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.checkBoxWarp}>
                                <CheckBox color='#29416f' checked={false} />
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.lstHeader}>Deira</Text>
                                <Text style={styles.lstHeader2}>Port Saeed</Text>
                            </View>
                        </View>

                        <View style={styles.mainItem}>
                            <View style={styles.checkBoxWarp}>
                                <CheckBox color='#29416f' checked={false} />
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.lstHeader}>Deira</Text>
                                <Text style={styles.lstHeader2}>Port Saeed</Text>
                            </View>
                        </View>
                        
                        <View style={styles.mainItem}>
                            <View style={styles.checkBoxWarp}>
                                <CheckBox color='#29416f' checked={false} />
                            </View>
                            <View style={styles.mainItemText}>
                                <Text style={styles.lstHeader}>Deira</Text>
                                <Text style={styles.lstHeader2}>Port Saeed</Text>
                            </View>
                        </View> */}
                    </View>
                    
                    
                </Content>
            </Container>
        );
    }
}

selectLocation.propTypes = {
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
        allLocation: () => dispatch(allLocation()),
        checkUncheck: (a, b) => dispatch(checkUncheck(a, b)),
        clearMyLocation: (a) => dispatch(clearMyLocation(a)),
        selectedLocation: (id) => dispatch(selectedLocation(id))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(selectLocation);
