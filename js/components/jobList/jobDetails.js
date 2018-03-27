import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, ImageBackground, TouchableHighlight } from "react-native";
import { Container, Header, Button, Content, Form, Left, Right, Body, Title, Item, Icon, Frame, Input, Label, Text } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';

import Modal from "react-native-modal";

const win = Dimensions.get('window').width;

import styles from "./styles";
class JObDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            isModalVisible: false
        }
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Header style={styles.headerWarp} noShadow androidStatusBarColor="#81cdc7">
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" style={styles.headIcon2} />
                    </Button>
                    <Body style={styles.headBody}>
                        <Title>Job Details</Title>
                    </Body>
                    <Button transparent />
                </Header>
                <Content style={{ backgroundColor: '#ccc' }}>
                    <ImageBackground source={require('../../../img/bg-6.png')} style={{ alignItems: 'center', paddingTop: 30, width: win, height: (win * 0.62) }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: '700', fontSize: 18 }}>Home Cleaning</Text>
                            <Text>ARD 100</Text>
                        </View>
                    </ImageBackground>
                    <Image source={require('../../../img/icon17.png')} style={{ width: win, height: (win * 0.1), marginTop: -(win * 0.1) }} />
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <Ionicons name="ios-man-outline" style={styles.jobItemIconIonicons} />
                        </View>
                        <Text style={styles.jobItemName}>Job Tracker</Text>
                        <Text style={styles.jobItemValue}>Job Completed</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center'  }}>
                            <EvilIcons name="location" style={{ color: '#81cdc7', fontSize: 24 }} />
                        </View>
                        <Text style={styles.jobItemName}>304, 3rd Flr, sultan Group Investment Building Deira, Dubai(near nissan showroom)</Text>
                        <TouchableOpacity style={{ paddingLeft: 10 }}>
                            <Feather name="log-out" style={{ color: '#81cdc7', fontSize: 20 }} /> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View>
                            <Image source={require('../../../img/atul_bk.png')} style={{ height: 50, width: 50, borderRadius: 45, }} />
                        </View>
                        <View style={{ paddingLeft: 10, flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: '700' }}>Service Provider</Text>
                            <Text style={{ fontSize: 12 }}>James Harden</Text>
                            <TouchableOpacity style={{ width: 90 }} onPress={this._toggleModal}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize ={14}
                                    halfStarEnabled ={true}
                                    rating={this.state.starCount}
                                    fullStarColor='#81cdc7'
                                    selectedStar={this._toggleModal}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <Image source={require('../../../img/icon/chat-support.png')} style={{ height: 25, width: 25 }} />
                            <Text style={{ fontSize: 12 }}>Chat/Call</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center'  }}>
                            <MaterialIcons name="date-range" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>Date & Time</Text>
                        <Text style={[styles.jobItemValue, styles.jobItemValueDateandTime]}>Monday, 08 May 2017, 2:00pm</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center'  }}>
                            <MaterialIcons name="location-on" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>Location</Text>
                        <Text style={styles.jobItemValue}>Home</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center'  }}>
                            <SimpleLineIcons name="docs" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>Job Summary</Text>
                        <Text style={styles.jobItemValue}>AED 360.00</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center'  }}>
                            <Ionicons name="ios-flag-outline" style={styles.jobItemIconIonicons} />
                        </View>
                        <Text style={styles.jobItemName}>Quote/Follow</Text>
                        <Text style={styles.jobItemValue}>Yes</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <MaterialIcons name="payment" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>Payment</Text>
                        <Text style={styles.jobItemValue}>Credit Card</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <Entypo name="text-document-inverted" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>Total Bill</Text>
                        <Text style={styles.jobItemValue}>AED 200.00</Text>
                    </View>
                </Content>

                <Modal isVisible={this.state.isModalVisible}>
                    <View  style={{ flex: 1 , justifyContent: 'center'}}>

                        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 99999, }} onPress={this._toggleModal}>
                            <Ionicons style={{ color: 'rgba(255,255,255,0.5)', fontSize: 36 }} name='md-close-circle' />
                        </TouchableOpacity>

                        <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10, alignItems: 'center', position: 'relative' }}>
                            <Ionicons name='md-person' style={{ fontSize: 50, color: '#81cdc7'}}/>
                            <Text style={{ paddingTop: 5, paddingBottom: 10, fontSize: 18 }}>Give me a Rate</Text>
                            <View style={{width: 200}}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={30}
                                    halfStarEnabled ={true}
                                    rating={this.state.starCount}
                                    fullStarColor='#81cdc7'
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                            </View>
                        </View>
                        
                    </View>
                </Modal>

            </Container>
        );
    }
}

export default JObDetails;
