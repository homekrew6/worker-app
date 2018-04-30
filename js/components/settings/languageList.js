import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem, AsyncStorage } from "react-native";
import Ico from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title, Footer, FooterTab } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';
import api from '../../api';
import FSpinner from 'react-native-loading-spinner-overlay';
import { getAllLanguagesList } from '../accounts/elements/authActions';
import {  navigateAndSaveCurrentScreen } from '../accounts/elements/authActions';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class LanguageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LanguageList: [],
            visible: false,
            languageId: '',
            languageValue: ''
        }
    }

    componentDidMount() {
        this.setState({ visible: true });
        this.props.getAllLanguagesList().then((res) => {
            let newArray = [];
            res.map((item) => {
                if (item.is_active) {
                    let data = {
                        id: item.id,
                        name: item.name,
                        status: false
                    }
                    newArray.push(item);
                }
            });
            AsyncStorage.getItem("language").then((languageVal) => {
                if (languageVal) {
                    const languageValue = JSON.parse(languageVal);
                    newArray.map((item) => {
                        if (item.id == languageValue.langId) {
                            item.status = true;
                        }
                    });
                    this.setState({ LanguageList: newArray });
                    this.setState({ visible: false });
                }
                else {
                    this.setState({ LanguageList: newArray });
                    this.setState({ visible: false });
                }
            }).catch((err) => {
                this.setState({ LanguageList: newArray });
                this.setState({ visible: false });
            })

        }).catch((err) => {
            this.setState({ visible: false });
            Alert.alert("Please try again later.");
        })
        
    }
    selectActive(data) {
        this.setState({ languageId: data.id });
        let index;
        for (let i = 0; i < this.state.LanguageList.length; i++) {
            if (this.state.LanguageList[i].id == data.id) {
                index = i;
                break;
            }
        }
        if (index || index == 0) {
            var newArray = [];
            this.state.LanguageList.map((home) => {
                newArray.push(home);
            });
            newArray.map((item) => {
                item.status = false;
            })
            newArray[index].status = !newArray[index].status;

            this.setState({
                languageValue: newArray[index].name,
            })
            this.setState({ languageList: newArray });
        }

    }
    languageDone() {
        this.setState({ visible: true });
        let loc;
        this.state.LanguageList.map((loc1) => {
            if (loc1.status == true) {
                loc = loc1;
            }
        })
        if (loc) {
            //const data = { langId: loc.id, language: loc.name };
            const data = { langId: loc.id, language: loc.name, Code: loc.Code };
            AsyncStorage.setItem("language", JSON.stringify(data)).then((res) => {
                this.setState({ visible: false });
                const data = this.props.auth.data;
                data.activeScreen = 'Settings';
                data.previousScreen = "";
                this.props.navigateAndSaveCurrentScreen(data);
                this.props.navigation.navigate('Settings');
            }).catch((err) => {
                this.setState({ visible: false });
                this.props.navigation.navigate('Settings');
            })

        }
        else {
            this.setState({ visible: false });
            this.props.navigation.navigate('Settings');
        }

    }
    render() {

        let languageList = (
            this.state.LanguageList.map((data, key) => (
                <TouchableOpacity key={data.id} style={[{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#ccc", alignItems: 'center', justifyContent: 'center', padding: 15 }, [
                    data.status == true ?
                        { backgroundColor: '#ccc' } : { backgroundColor: 'white' }
                ]]} onPress={() => this.selectActive(data)}>
                    <Entypo name='language' style={{ fontSize: 20, marginRight: 8, color: '#1e3768' }} />
                    <View style={{ flex: 1 }}>
                        <Text style={data.status == true ?
                            { color: '#fff' } : {}}>{data.name}</Text>
                    </View>
                </TouchableOpacity>
            ))
        )
        return (
            <Container >

                <FSpinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />

                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <Header style={styles.appHdr2} androidStatusBarColor="#81cdc7" noShadow>
                    <Button transparent onPress={() => this.languageDone()} style={{ width: 70 }}><Text>{I18n.t('cancel')}</Text></Button>
                    <Body style={{ alignItems: 'center' }}>
                        <Title style={styles.appHdr2Txt}>{I18n.t('my_language')}</Title>
                    </Body>
                    <Button transparent onPress={() => this.languageDone()} style={{ width: 70 }}><Text>{I18n.t('done')}</Text></Button>
                </Header>

                <Content style={styles.bgWhite} >

                    {languageList}

                </Content>
            </Container>
        );
    }
}

// export default Expect;

const mapStateToProps = state => ({
    auth: state.auth
});
const mapDispatchToProps = dispatch => ({
    getAllLanguagesList: () => dispatch(getAllLanguagesList()),
    navigateAndSaveCurrentScreen:(data)=>dispatch(navigateAndSaveCurrentScreen(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageList);
