import React, { Component } from "react";
import { View, StatusBar, TouchableOpacity, Text, TextInput, Dimensions } from "react-native";
import { Container, Header, Content, Body, Title, Button  } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FSpinner from 'react-native-loading-spinner-overlay';
import HTML from 'react-native-render-html';
import I18n from '../../i18n/i18n';
import api from '../../api/index';
import styles from "./styles";

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supportList: [],
            isModalVisible: false,
            findText: '',
            loader: false,
            allSupportList:[]
        }
    }

    componentDidMount(){
        let newsupportList = [];
        this.setState({ loader: true });
        api.get('Faqs').then((res) => {
            let listResponce = res;
            listResponce.map((item)=>{
                let i = item;
                i.is_active_item = false;
                if (item.is_active){
                    newsupportList.push(i);
                }
            })
            this.setState({
                supportList: newsupportList,
                loader: false,
                allSupportList:newsupportList
            });
        }).catch((error) => {
            console.log(error);
            this.setState({ loader: false });
        })
    }

    faqFunction(key){
        let newsupportList = this.state.supportList;
        if (newsupportList[key].is_active_item == true){
            newsupportList[key].is_active_item = false;            
        }
        else{
            newsupportList.map((item1) => {
                item1.is_active_item = false;
            })
            newsupportList[key].is_active_item = true;                        
        }
        this.setState({ supportList: newsupportList });                    
    }


    supportSearch(text){
        if(text){
            const regex = new RegExp(`${text.trim()}`, 'i');

            let items = this.state.allSupportList.filter(

            item => item.title.search(regex) >= 0 || item.question.search(regex) >= 0);
            this.setState({ supportList:items});

        }
        else{
            const allSupportList=this.state.allSupportList;
            this.setState({supportList:allSupportList});

        }
        
    }

    render() {
        return (
            <Container >

                <StatusBar
                    backgroundColor="#81cdc7"
                />

                <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />                

                <Header style={styles.headerMain} androidStatusBarColor="#81cdc7" noShadow >
                    <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.buttonIconWarp}>
                        <Ionicons style={styles.headerIconClose} name='ios-arrow-back' />
                    </Button>
                    <Body style={styles.headerBody}>
                        <Title style={styles.headerTitle}>{I18n.t('faq')}</Title>
                    </Body>
                    <Button transparent style={styles.buttonIconWarp} disabled />
                </Header>

                <View style={styles.afterHeaderSearch}>
                    <TextInput
                        underlineColorAndroid={'white'}
                        style={styles.afterHeaderSearchInput}
                        placeholder='Search'
                        value={this.state.query}
                        onChangeText={text => this.supportSearch(text)} 
                    />
                </View>
                {
                    this.state.supportList.length ?

                <Content>
                    
                    <View style={[ this.state.supportList.length ? styles.bgWhite: '', { marginBottom: 20 } ]}>
                        {
                             this.state.supportList.map((item, key)=>{
                                return(
                                    <View style={styles.chatListWarp} key={key}>
                                        <TouchableOpacity style={styles.chatListTouchWarp} onPress={()=> this.faqFunction(key)}>
                                            <View style={styles.chatListTextWarp}>
                                                <Text style={styles.chatListTextName}>{item.title}</Text>
                                                <Text style={styles.chatListTextQuestion}>{item.question}</Text>
                                            </View>
                                            <View>
                                                {
                                                    item.is_active_item ? <Ionicons name='ios-arrow-down-outline' style={styles.chatListTextIcon} /> : <Ionicons name='ios-arrow-forward-outline' style={styles.chatListTextIcon} />
                                                }
                                                
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            item.is_active_item ? <View style={{ paddingBottom: 15 }}>
                                                <HTML 
                                                    style={styles.chatListTime} html={item.answer} 
                                                    imagesMaxWidth={Dimensions.get('window').width} 
                                                />
                                                {/* <Text style={styles.chatListTime}>{item.answer}</Text> */}
                                            </View>: null
                                        }
                                    </View>
                                )
                            }) 
                        }
                    </View>
                </Content>
                    : <View style={[styles.noDataFound,{ flex: 1, alignItems: 'center', justifyContent: 'center' } ]}><Text> {I18n.t('nodatafound')} </Text></View>
                }
            </Container>
        );
    }
}

export default Support;
