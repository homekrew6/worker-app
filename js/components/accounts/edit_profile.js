import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity } from "react-native";
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, CardItem, Right, Card, Left, Body, Title, Thumbnail, Footer, FooterTab } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

import I18n from '../../i18n/i18n';
import styles from "./styles";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const profileImage = require("../../../img/atul.png");
const carveImage = require("../../../img/bg-1.png");
const icon1 = require("../../../img/icon1.png");
const icon2 = require("../../../img/icon2.png");
const icon3 = require("../../../img/icon3.png");
const icon4 = require("../../../img/icon4.png");
const icon5 = require("../../../img/icon5.png");
const icon6 = require("../../../img/icon6.png");
const icon7 = require("../../../img/icon7.png");
const back_arow = require("../../../img/arrow_back.png");
const logo_hdr = require("../../../img/logo2.png");

class EditProfile extends Component {
    constructor(props) {
        super(props);
    };


    render() {
        return (
            <Container style={styles.bg_white}>
                <StatusBar
                    backgroundColor="#cbf0ed"
                />

                <Content>
                    <Header style={styles.appHdr} noShadow>
                        <Button transparent >
                            <Icon name="chevron-left" style={{ fontSize: 18, color: "#71beb8" }}/>
                        </Button>
                        <Body style={styles.appHdrtitleWarp}>
                            <Text style={{ color:'#1e3768'}}>Edit My Profile</Text>
                        </Body>
                        <Button transparent />
                    </Header>

                    <View style={ styles.editPflHdr }>
                        <View style={styles.editPflHdrWrap}>
                            <Thumbnail source={profileImage} style={styles.editPflHdrThumbnail}/>
                            <Button primary noShadow small style={styles.editPflHdrBtn}><Text> Change Photo </Text></Button>
                        </View>
                    </View>

                    <View style={{ paddingBottom:0, marginBottom:0 }}>
                        <Image source={carveImage} style={{ width: deviceWidth }} />
                    </View>

                    <View>
                        <View style={styles.editprofileLst}>
                            <View style={styles.editprofileWarp}>
                                <Text>Name</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Input style={styles.editprofileInput} value={'Saikat Bala'} />
                            </View>
                        </View>
                        <View style={styles.editprofileLst}>
                            <View style={styles.editprofileWarp}>
                                <Text>Email Id</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Input style={styles.editprofileInput} value={'abc@example.com'} />
                            </View>
                        </View>

                        <View style={styles.editprofileLst}>
                            <View style={styles.editprofileWarp}>
                                <Text>Phone No</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Input style={styles.editprofileInput} value={'8989 898 898'} />
                            </View>
                        </View>

                        <View style={styles.editprofileLst}>
                            <View style={styles.editprofileWarp}>
                                <Text>Password</Text>
                            </View>
                            <View style={styles.editprofileInputwrap}>
                                <Input style={styles.editprofileInput} value={'password'} secureTextEntry />
                            </View>
                        </View>
                        <View style={{padding: 10}}>
                            <Text>Skills</Text>
                            <View></View>
                        </View>
                    </View>

                    <Footer>
                        <FooterTab>
                            <Button full style={{ backgroundColor: '#81cdc7'}}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>Save</Text>
                            </Button>
                        </FooterTab>
                    </Footer>

                </Content>
            </Container>
        );
    };
}; 

export default connect()(EditProfile);