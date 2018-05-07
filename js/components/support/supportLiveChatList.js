import React, { Component } from "react";
import { Image, View, StatusBar, TouchableOpacity, Text, } from "react-native";
import { Container, Header, Content, Body, Title, Button } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18n from '../../i18n/i18n';
import styles from "./styles";

const icon1 = require('../../../img/chatIcon3.png');
const icon2 = require('../../../img/chatIcon1.png');
const icon3 = require('../../../img/chatIcon2.png');


class SupportLiveChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Container >

                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <Header style={styles.headerMain} androidStatusBarColor="#81cdc7" noShadow >
                    <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()} style={styles.buttonIconWarp} activeOpacity={0.5}>
                        <FontAwesome style={[styles.headerIconClose, { fontSize: 18 }]} name='edit' />
                    </TouchableOpacity>
                    <Body style={styles.headerBody}>
                        <Title style={styles.headerTitle}>{I18n.t('liveChat')}</Title>
                    </Body>
                    <TouchableOpacity transparent style={styles.buttonIconWarp} activeOpacity={0.5}>
                        <Ionicons style={styles.headerIconClose} name='ios-close' />
                    </TouchableOpacity>
                </Header>

                <Content>

                    <TouchableOpacity style={styles.liveChatWarp} onPress={() => this.props.navigation.navigate('SupportLiveChat')}>
                        <View style={styles.grayCointenner}>
                            <View style={styles.ImageContnr}></View>
                            <View style={styles.textWarp}>
                                <Text style={styles.liveChartTitle}>Tiffany</Text>
                                <Text numberOfLines={1}>Hey thtre, I just want to let Hey thtre, I just want to let</Text>
                            </View>
                            <View>
                                <Text style={styles.timeWarp}>4d ago</Text>
                            </View>
                        </View>
                        <View style={styles.absoluteImageWarp}>
                            <Image source={icon1} style={styles.absoluteImage} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.liveChatWarp}>
                        <View style={styles.grayCointenner}>
                            <View style={styles.ImageContnr}></View>
                            <View style={styles.textWarp}>
                                <Text style={styles.liveChartTitle}>Tiffany</Text>
                                <Text numberOfLines={1}>Hey thtre, I just want to let Hey thtre, I just want to let</Text>
                            </View>
                            <View>
                                <Text style={styles.timeWarp}>4d ago</Text>
                            </View>
                        </View>
                        <View style={styles.absoluteImageWarp}>
                            <Image source={icon2} style={styles.absoluteImage} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.liveChatWarp}>
                        <View style={styles.grayCointenner}>
                            <View style={styles.ImageContnr}></View>
                            <View style={styles.textWarp}>
                                <Text style={styles.liveChartTitle}>Tiffany</Text>
                                <Text numberOfLines={1}>Hey thtre, I just want to let Hey thtre, I just want to let</Text>
                            </View>
                            <View>
                                <Text style={styles.timeWarp}>4d ago</Text>
                            </View>
                        </View>
                        <View style={styles.absoluteImageWarp}>
                            <Image source={icon3} style={styles.absoluteImage} />
                        </View>
                    </TouchableOpacity>

                </Content>
            </Container>
        );
    }
}

export default SupportLiveChatList;
