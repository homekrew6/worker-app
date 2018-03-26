import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, ListView } from "react-native";
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, List, ListItem, Icon, Tab, Tabs, ScrollableTab, Body } from "native-base";
import FSpinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
const imageIcon1 = require('../../../img/icon/home.png');



const datas = [
    { name: '12345' },
    { name: '1254' },
    { name: '1254' }
];

class availableJobs extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
        };
    }


    render() {

        return (
            <Container >
                <StatusBar
                    backgroundColor="#f3f3f3"
                />
                <Header style={styles.headerWarp} noShadow androidStatusBarColor="#f3f3f3">
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <MaterialIcons name="menu" style={styles.headIcon} />
                    </Button>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <MaterialIcons name="notifications" style={styles.headIcon} />
                    </Button>
                    <Body style={styles.headBody}>
                        <Image source={require('../../../img/logo2.png')} style={{ height: 20, width: 115 }}/>
                    </Body>
                    <Button transparent />
                    <Button transparent>
                        <MaterialIcons name="search" style={styles.headIcon} />
                    </Button>
                </Header>
                <Tabs
                    tabBarUnderlineStyle={styles.Tabs}
                    locked={true}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTab />}
                >
                    <Tab heading="AVAILABLE JOBS" tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Content>
                            <View style={styles.dayHeading}>
                                <Text>Today</Text>
                            </View>
                            <List
                                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                style={styles.jobList}
                                renderRow={data =>
                                    <ListItem style={styles.jobListItem}>
                                        <View style={styles.listWarp}>
                                            <View style={styles.listWarpImageWarp}>
                                                <Image source={imageIcon1} style={styles.listWarpImage} />
                                            </View>
                                            <View style={styles.listWarpTextWarp}>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text>Home</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text style={[styles.fontWeight700, {fontSize: 14}]}>Tuesday </Text>
                                                    <Text style={{ fontSize: 14 }}> 10:00 AM</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text>Deira, Dubai</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text style={{ color: '#81cdc7' }}>Starts in 6 hours</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={styles.listWarpPriceUp}>AED 290.00</Text>
                                                <Text style={styles.listWarpPriceDown}>4 hours</Text>
                                            </View>
                                        </View>
                                    </ListItem>}


                                renderLeftHiddenRow={data =>
                                    <TouchableOpacity style={styles.leftAction} >
                                        <MaterialIcons name="close" style={styles.leftActionIcon} />
                                        <Text style={styles.leftActionText}>DELETE</Text>
                                    </TouchableOpacity>}


                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                    <TouchableOpacity style={styles.rightAction} >
                                        <MaterialIcons name="done" style={styles.leftActionIcon} />
                                        <Text style={styles.leftActionText}>ACCEPT</Text>
                                    </TouchableOpacity>}
                                leftOpenValue={75}
                                rightOpenValue={-75}
                            />
                            <View style={styles.dayHeading}>
                                <Text>Tomorrow</Text>
                            </View>
                            <List
                                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                style={styles.jobList}
                                renderRow={data =>
                                    <ListItem style={styles.jobListItem}>
                                        <View style={styles.listWarp}>
                                            <View style={styles.listWarpImageWarp}>
                                                <Image source={imageIcon1} style={styles.listWarpImage} />
                                            </View>
                                            <View style={styles.listWarpTextWarp}>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text>Home</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text style={styles.fontWeight700}>Tuesday </Text>
                                                    <Text> 10:00 AM</Text>
                                                </View>
                                                <View style={styles.flexDirectionRow}>
                                                    <Text>Deira, Dubai</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </ListItem>}


                                renderLeftHiddenRow={data =>
                                    <TouchableOpacity style={styles.leftAction} >
                                        <MaterialIcons name="close" style={styles.leftActionIcon} />
                                        <Text style={styles.leftActionText}>DELETE</Text>
                                    </TouchableOpacity>}


                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                    <TouchableOpacity style={styles.rightAction} >
                                        <MaterialIcons name="done" style={styles.leftActionIcon} />
                                        <Text style={styles.leftActionText}>ACCEPT</Text>
                                    </TouchableOpacity>}
                                leftOpenValue={75}
                                rightOpenValue={-75}
                            />
                        </Content>
                    </Tab>
                    <Tab heading="UPCOMING JOBS" tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Text>Tab1</Text>
                    </Tab>
                    <Tab heading="STATS" tabStyle={{ backgroundColor: '#81cdc7' }} textStyle={{ color: '#b1fff5' }} activeTabStyle={{ backgroundColor: '#81cdc7' }} activeTextStyle={{ color: '#1e3768' }}>
                        <Text>Tab1</Text>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

availableJobs.propTypes = {
    //auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        //auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(availableJobs);
