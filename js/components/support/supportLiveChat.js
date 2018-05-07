import React, { Component } from "react";
import { Image, View, StatusBar, TouchableOpacity, Text, TextInput, ScrollView } from "react-native"; 
import { Container, Header, Body, Title, Footer, FooterTab, Button } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import I18n from '../../i18n/i18n';
import styles from "./styles";


class SupportLiveChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeMessage: ''
        }
    }

    render() {
        return (
            <Container >

                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <Header style={styles.headerMain} androidStatusBarColor="#81cdc7" noShadow >
                    <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} style={[styles.buttonIconWarp]} activeOpacity={0.5}>
                        <Ionicons style={styles.headerIconClose} name='ios-arrow-back' />
                    </TouchableOpacity>
                    <Body style={styles.headerBody}>
                        <Title style={{ fontSize: 14 }}>{I18n.t('typicallyRepliesInAFewMinutes')}</Title>
                    </Body>
                    <TouchableOpacity transparent style={styles.buttonIconWarp} activeOpacity={0.5}>
                        <Ionicons style={styles.headerIconClose} name='ios-close' />
                    </TouchableOpacity>
                </Header>

                

                <View style={styles.scrollWarp}>
                
                    <View style={styles.chatterHeaderWarp}>
                        <View style={styles.chatterHeaderWarpInner}>
                            <View style={styles.chatterHeaderImageWarp}>
                                <Image source={require('../../../img/atul.png')} style={styles.chatterHeaderImage} />
                            </View>
                            <View style={styles.chatterHeadertextWarp}>
                                <Text>Leo</Text>
                                <Text style={styles.chatterHeaderTime}>Active in the last 15m</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.sortMassage}> Hi! Need help with a booking or have some feedback about the app? Let me know! I'm here to help. </Text>
                        </View>
                    </View>

                    <ScrollView
                        style={styles.scrollChat}
                    >
                        <View style={styles.chatWarp}>
                            
                            <View style={styles.person1Warp}>
                                <View style={styles.person1TextWarp}>
                                    <Text style={styles.personText}>Hey there, I just wanted to let you know that during this Eid holiday, there will be limited availability on Friday, 1 Sept. and Saturday, 2 Sept. for all services. however, our support team will be available throughout the long weekend to assist you with anything you may meed. so fell free to send us a message here! Eid Mubarak and have a wonderful weekend</Text>
                                </View>
                                <Image source={require('../../../img/icon/chats2.png')} style={styles.person1Arrow} />
                            </View>

                            <View style={styles.person1ImageWarp} >
                                <Image source={require('../../../img/atul.png')} style={styles.person1Image} />
                            </View>
                        </View>
                        <View style={styles.chatWarp}>
                            <View style={styles.person2ImageWarp}>
                                <Image source={require('../../../img/atul.png')} style={styles.person2Image} />
                            </View>
                            <View style={styles.person2Warp}>
                                <View style={styles.person2TextWarp}>
                                    <Text style={styles.personText}>Hey there, I just wanted to let you know that during this Eid holiday, there will be limited availability on Friday, 1 Sept. and Saturday, 2 Sept. for all services. however, our support team will be available throughout the long weekend to assist you with anything you may meed. so fell free to send us a message here! Eid Mubarak and have a wonderful weekend</Text>
                                </View>
                                <Image source={require('../../../img/icon/chats.png')} style={ styles.person2Arrow } />
                            </View>
                        </View>

                    </ScrollView>
                </View>

                <Footer>
                    <FooterTab>
                        <View style={styles.chatfooterWarp}>
                            <TouchableOpacity style={styles.chatIcon}>
                                <Entypo name="camera" style={styles.chatCameraIcon} />
                            </TouchableOpacity>
                            <View style={styles.chatMiddleInputWarp}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.chatMiddleInput}
                                    onChangeText={(text) => this.setState({ typeMessage: text })}
                                    value={this.state.typeMessage}
                                />
                            </View>
                            <TouchableOpacity style={styles.chatIcon}>
                                <Ionicons name="md-send" style={styles.sendIcon} />
                            </TouchableOpacity>
                        </View>
                    </FooterTab>
                </Footer>
                
            </Container>
        );
    }
}

export default SupportLiveChat;
