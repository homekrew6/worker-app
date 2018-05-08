import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, TouchableOpacity } from 'react-native';
import { View, StatusBar, Alert, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../api/index';
import FSpinner from 'react-native-loading-spinner-overlay';
import { allLocation, checkUncheck, clearMyLocation, selectedLocation } from './elements/locationAction';

import { Container, Header, Button, Content, Body, CheckBox } from "native-base";

import I18n from '../../i18n/i18n';
import styles from './styles';
//this.props.navigation.dispatch(resetAction);

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
            this.setState({
                locationFlag: true
            })

        }).catch(err => {
         
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
                            if (i === newSelectedItemIds.length) {
                                this.setState({
                                    locationFlag: false
                                })
                                this.setState({
                                    loader: false,
                                });                            }

                        }).catch((err) => {
                            //reject(err);
                        }); 
                    }
                    this.props.navigation.navigate("MyLocation");                    
                })
            } else {
                //reject(err);
            }

        })
        }else{
            Alert.alert(I18n.t('please_select_one_zone'));
        }
        
    }
    

    render() {
        let locationList
        if(this.state.locationFlag){
            let locationListItm = this.props.location.data;
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

                        <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} activeOpacity={0.5} style={{ width: 50, justifyContent: 'center' }}>
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </TouchableOpacity>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>{I18n.t('my_location')}</Text>
                        </Body>
                        <TouchableOpacity transparent onPress={() => this.save_select_location()} activeOpacity={0.5} style={{ width: 50, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text>{I18n.t('save')}</Text>
                        </TouchableOpacity>
                        
                    </Header>
                    
                    <View>

                        {locationList}

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
