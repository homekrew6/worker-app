import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem, ListView } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title, CheckBox } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


class selectLocation extends Component {
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
                            <Ionicons name="ios-arrow-back" style={{ fontSize: 28, color: "#71beb8" }} />
                        </Button>
                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>My Timings</Text>
                        </Body>
                        <Button transparent />
                        
                    </Header>
                    
                    <View>

                        <View style={styles.mainItem}>
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
                        </View>
                    </View>
                    
                    
                </Content>
            </Container>
        );
    }
}

export default selectLocation;
