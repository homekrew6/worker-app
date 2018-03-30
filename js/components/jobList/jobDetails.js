import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, ImageBackground, TouchableHighlight, ScrollView } from "react-native";
import { Container, Header, Button, Content, Form, Left, Right, Body, Title, Item, Icon, Frame, Input, Label, Text } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MapViewDirections from 'react-native-maps-directions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import MapView, { Marker } from 'react-native-maps';
import { availablejobs, setNewData, acceptJob, declineJob } from './elements/jobActions'
import FSpinner from 'react-native-loading-spinner-overlay';

import Modal from "react-native-modal";

const win = Dimensions.get('window').width;

import styles from "./styles";
class JobDetails extends Component {
    constructor(props) {
       
        super(props);
        this.state = {
            loader: false,
            detailsData: 'abc',
            starCount: 0,
            isModalVisible: false,
            jobCancelModal: false,
            latitudeUser: '',
            longitudeUser: '',
            errorLocationUser: '',
            markerStatus: true,
            scrollStatus : 0,
            jobTracker: this.props.navigation.state.params.jobDetails ? this.props.navigation.state.params.jobDetails.status =='ACCEPTED'?'Assigned Job':'On My Way':''
        }
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    componentDidMount() {
        if (this.refs && this.refs.ScrollViewEnd) {
                this.swipeButtonReady();
        }
    }
    swipeButtonReady(){
        setTimeout(() => {
            this.setState({ scrollStatus: 1 });
            this.refs.ScrollViewEnd.scrollToEnd();
        }, 50);
    }

    // jobdata() {
    //     let id = this.props.auth.data.id;
    //     this.props.availablejobs(id).then(res => {
    //         this.setState({
    //             listItemFlag: true,
    //             loader: false
    //         });
    //     }).catch(err => {
    //         console.log(err);
    //         this.setState({
    //             loader: false
    //         })
    //     })
    // }

    declineJob() {
        this.setState({
            loader: true
        })
        let jobId = this.props.navigation.state.params.jobDetails.id;
        let workerId = this.props.auth.data.id;
        let serviceId = this.props.navigation.state.params.jobDetails.serviceId;
        this.props.declineJob(jobId, workerId, serviceId).then(res => {
            //this.jobdata();
            this.setState({
                loader: false
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                loader: false
            })
        })
        let newJobDetails = this.props.navigation.state.params.jobDetails;
        newJobDetails.status = "DECLINED"
        this.props.navigation.setParams({ jobDetails: newJobDetails });
    }
    acceptJob() {
        this.setState({
            loader: true
        })
        let jobId = this.props.navigation.state.params.jobDetails.id;
        let workerId = this.props.auth.data.id;
        this.props.acceptJob(jobId, workerId).then(res => {
            //this.jobdata();
            this.setState({
                loader: false
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                loader: false
            })
        })
        let newJobDetails = this.props.navigation.state.params.jobDetails;
        newJobDetails.status = "ACCEPTED"
        this.props.navigation.setParams({ jobDetails: newJobDetails });
        this.swipeButtonReady();
    }

    renderTracking(){
        this.setState({ markerStatus: false });
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitudeUser: position.coords.latitude,
                longitudeUser: position.coords.longitude,
                errorLocationUser: null,
            });
            },
            (error) => this.setState({ errorLocation: error.message }),
            //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
        );
       
    }
    componentWillMount(){
        // console.log(this.props.navigation.state.params.jobDetails);
    }

    render() {
        let JobDetailsData = this.props.navigation.state.params.jobDetails;
        let region = {
            latitude: this.props.navigation.state.params.jobDetails.userLocation.latitude ? Number(this.props.navigation.state.params.jobDetails.userLocation.latitude) : 37.78825,
            longitude: this.props.navigation.state.params.jobDetails.userLocation.longitude ? Number(this.props.navigation.state.params.jobDetails.userLocation.longitude) : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        let origin = {latitude: region.latitude, longitude: region.longitude};
        let destination = {latitude: this.state.latitudeUser, longitude: this.state.longitudeUser};
        let GOOGLE_MAPS_APIKEY = 'AIzaSyCya136InrAdTM3EkhM9hryzbCcfTUu7UU';
        console.log(JobDetailsData)
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <StatusBar
                    backgroundColor="#81cdc7"
                />
                <Header style={styles.headerWarp} noShadow androidStatusBarColor="#81cdc7" >
                    <Button transparent onPress={() => this.props.navigation.goBack()} style={{ width: 30 }}>
                        <Ionicons name="ios-arrow-back" style={styles.headIcon2} />
                    </Button>
                    <Body style={styles.headBody}>
                        <Title>Job Details</Title>
                    </Body>
                    <Button transparent style={{ width: 30 }}/>
                </Header>
                <Content style={{ backgroundColor: '#ccc' }}>

                    <View>
                        <MapView
                            style={{ width: win, height: 250 }}
                            zoomEnabled
                            zoomControlEnabled
                            maxZoomLevel={20}
                            minZoomLevel={14}
                            region={ region }
                            onRegionChangeComplete={this.onRegionChange}
                            onRegionChange={this.onLocationChange}
                        >   
                        {
                            this.state.longitudeUser !== '' ? <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={GOOGLE_MAPS_APIKEY}
                                mode={'driving'}
                                strokeWidth={3}
                                strokeColor="hotpink"
                            /> : console.log()
                        }
                        {
                            this.state.markerStatus === true ?
                            <Marker
                                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                                title={this.props.navigation.state.params.jobDetails.userLocation.name}
                            />: console.log()
                        }
                            
                            
                        </MapView>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center' }}>
                            <Ionicons name="ios-man-outline" style={styles.jobItemIconIonicons} />
                        </View>
                        <Text style={styles.jobItemName}>Job Tracker</Text>
                        <Text style={styles.jobItemValue}>{this.state.jobTracker}</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center'  }}>
                            <EvilIcons name="location" style={{ color: '#81cdc7', fontSize: 24 }} />
                        </View>
                        <Text style={styles.jobItemName}>{JobDetailsData.userLocation.buildingName}, {JobDetailsData.userLocation.name}, {JobDetailsData.userLocation.villa}</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View>
                        {
                            JobDetailsData.customer.image == "" ? (
                                    <Image source={require('../../../img/avatar.png')} style={{ height: 50, width: 50, borderRadius: 45, }} />
                                ) : (<Image source={{ uri: JobDetailsData.customer.image}} style={{ height: 50, width: 50, borderRadius: 45, }} />)

                        }
                        
                           
                        </View>
                        <View style={{ paddingLeft: 10, flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>{JobDetailsData.customer.name}</Text>
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
                        <Text style={[styles.jobItemValue, styles.jobItemValueDateandTime]}>{JobDetailsData.postedDate}</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center'  }}>
                            <MaterialIcons name="location-on" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>Location</Text>
                        <Text style={styles.jobItemValue}>{ JobDetailsData.userLocation.name }</Text>
                    </View>
                    <View style={styles.jobItemWarp}>
                        <View style={{ width: 30, alignItems: 'center'  }}>
                            <SimpleLineIcons name="docs" style={styles.jobItemIcon} />
                        </View>
                        <Text style={styles.jobItemName}>Job Summary</Text>
                        <Text style={styles.jobItemValue}>AED {JobDetailsData.price}</Text>
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
                        <Text style={styles.jobItemValue}>{JobDetailsData.payment}</Text>
                    </View>
                    {/* bala  : start*/}
                    {
                        JobDetailsData.status == 'STARTED' ? (
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', height: 50, justifyContent: 'center' }} onPress={() => this.declineJob()}><Text style={{ color: '#fff' }}>DECLINE</Text></TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: '#81cdc7', alignItems: 'center', height: 50, justifyContent: 'center' }} onPress={() => this.acceptJob()}><Text style={{ color: '#fff' }}>ACCEPT</Text></TouchableOpacity>
                            </View>
                        ) : (<View></View>)
                    }
                    
                    {
                        JobDetailsData.status=='ACCEPTED' ? 
                            (<View>
                                <View>
                                    <ScrollView
                                        ref='ScrollViewEnd'
                                        pagingEnabled={true}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        scrollEventThrottle={400}
                                        onScrollEndDrag={() => this.renderTracking()}
                                        style={{ width: '100%' }}>
                                        <View style={{ width: win, backgroundColor: 'white', paddingLeft: 10, paddingRight: 10 }}>
                                            <TouchableOpacity
                                                style={{ flex: 1, alignItems: 'center', backgroundColor: '#81cdc7', justifyContent: 'center', marginTop: 3, borderRadius: 5 }}
                                                activeOpacity={1}
                                            >
                                                <Text style={{ color: '#fff' }}>On My Way</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: win, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                            <View style={{ backgroundColor: '#81cdc7', paddingLeft: 10, paddingRight: 10 }}>
                                                <FontAwesome name="angle-right" style={{ color: '#fff', fontSize: 40 }} />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 15 }}>
                                                <Text>Slide To Click On My Way</Text>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            
                        <View style={styles.jobItemWarp}>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: '#81cdc7', alignItems: 'center', paddingTop: 10, paddingBottom: 10, borderRadius: 4 }} onPress={() => this.setState({ jobCancelModal: true })} >
                                <Text style={{ color: '#fff' }}>CANCEL JOB</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        ): (<View></View>)
                       
                }
                    {/* bala  : end*/}
                </Content>


                <Modal isVisible={this.state.jobCancelModal}>
                    <TouchableOpacity 
                        transparent style={{ flex: 1, justifyContent: 'center', display: 'flex', width: '100%' }} 
                        onPress={() => this.setState({ jobCancelModal: false })}
                        activeOpacity={1}
                        >

                        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 99999, }} onPress={() => this.setState({ jobCancelModal: false })}>
                            <Ionicons style={{ color: 'rgba(255,255,255,0.5)', fontSize: 36 }} name='md-close-circle' />
                        </TouchableOpacity>

                        <View style={{ padding: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
                            <Text style={{ width: '100%', textAlign: 'center', color: '#fff', fontSize: 25, marginBottom: 15 }}> Choose Reason </Text>
                            <View style={{width: '100%', backgroundColor: '#fff', borderRadius: 10 }}>
                                <TouchableOpacity style={{ backgroundColor: '#fff', flexDirection: 'row', borderRadius: 10, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}>
                                    <Text style={{ color: '#000' }}>Customer not around</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', flexDirection: 'row', borderRadius: 10, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}>
                                    <Text style={{ color: '#000' }}>Wrong job</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', flexDirection: 'row', borderRadius: 10, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}>
                                    <Text style={{ color: '#000' }}>Reason3</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', flexDirection: 'row', borderRadius: 10, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}>
                                    <Text style={{ color: '#000' }}>Reason4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', flexDirection: 'row', borderRadius: 10, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'center' }}>
                                    <Text style={{ color: '#000' }}>Reason5</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', padding: 15 }}>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: '#81cdc7', height: 40, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ jobCancelModal: false })}>
                                    <Text style={{ fontSize: 14, color: '#fff' }}>Go Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: 'red', height: 40, borderBottomRightRadius: 10, borderTopRightRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#fff' }}>Yes, Cancel</Text>                                    
                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableOpacity>
                </Modal>

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
                <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
            </Container>
        );
    }
}

JobDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    availableJobs: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        availableJobs: state.availableJobs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        availablejobs: (id) => dispatch(availablejobs(id)), 
        acceptJob: (jobId, workerId) => dispatch(acceptJob(jobId, workerId)),
        declineJob: (jobId, workerId, serviceId) => dispatch(declineJob(jobId, workerId, serviceId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
