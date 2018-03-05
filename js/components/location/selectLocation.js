import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem, ListView } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { allLocation } from './elements/locationAction';

import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title, CheckBox } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


class selectLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationFlag: false
        }
    }
    componentWillMount() {
        
        this.props.allLocation().then((allLst) => {
            console.log(allLst);
            this.setState({
                locationFlag: true,
            })

            console.log(this.props)
        }).catch(err => {
            console.log(err);
        })
    }
    

    render() {
        let locationList
        if(this.state.locationFlag){
            locationList = (
                this.props.location.data.map((data, key) => (
                    <View style={styles.mainItem}>
                    <View style={styles.checkBoxWarp}>
                        <CheckBox color='#29416f' checked={false} />
                    </View>
                    <View style={styles.mainItemText} key={data.id}>
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

                    <Header style={styles.appHdr2} androidStatusBarColor= "#cbf0ed">

                        <Button transparent >
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </Button>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>My Timings</Text>
                        </Body>
                        <Button transparent />
                        
                    </Header>
                    
                    <View>
                        {locationList}

                        {/* <View style={styles.mainItem}>
                            <View style={styles.checkBoxWarp}>
                                <CheckBox color='#29416f' checked={true} />
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
    location: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(selectLocation);
