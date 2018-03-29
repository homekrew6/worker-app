import React, { Component } from "react";
import { Image, View, StatusBar, ImageBackground, TouchableOpacity } from "react-native";
import { Container, Button, H3, Text, Header, Title, Body, Left, Right, Content, Item, Footer,FooterTab } from "native-base";
import styles from './styles';
const carve = require("../../../img/icon17.png");
class Settings extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     dateTime: props.service.data.serviceTime ? props.service.data.serviceTime : '',
        //     saveDateDB: props.service.data.saveDateDB ? props.service.data.saveDateDB : '',
        //     serviceName: props.service.data.serviceLocation ? props.service.data.serviceLocation : '',

        //     // homeValuearray: props.service.data.serviceLocation,            
        //     loader: false,
        //     continueButtonDesable: false,
        //     //homeValuearray: props.service.data.homeArray,
        //     // homeValue: 'Home'
        // }

    }


  

    render() {
        return (
            <Container >
               
                <Header style={styles.appHdr2} androidStatusBarColor="#cbf0ed" noShadow>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                       
                    </Button>
                    <Body style={{ alignItems: 'center' }}>
                        <Title>Settings</Title>
                    </Body>
                    <Button transparent />
                </Header>

                <Content style={styles.bgWhite} >
            

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: -50 }}>
                        <Image source={carve} style={{ flex: 1, height: 50 }}></Image>
                    </View>
                    <View>

                        <TouchableOpacity style={[styles.confirmationItem]} onPress={() => this.navigate('DateAndTime')}>
                            <View style={styles.confirmationIconView}>
                              
                            </View>
                            <Text style={styles.confirmationMainTxt}>Language</Text>
                            <Text style={styles.confirmationDateTime}>25th</Text>
                            <View style={styles.confirmationArwNxt}>
                               
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmationItem} onPress={() => this.navigate('LocationList')}>
                            <View style={styles.confirmationIconView}>
                               
                            </View>
                            <Text style={styles.confirmationMainTxt}>Currency</Text>
                            <Text style={styles.confirmationDateTime}>Cleaning</Text>
                            <View style={styles.confirmationArwNxt}>
                               
                            </View>
                        </TouchableOpacity>


                    </View>
                  
                    
                </Content>
                <Footer>
                    <FooterTab>
                        <TouchableOpacity style={styles.confirmationServicefooterItem} onPress={() => this.confirmationContinue()} ><Text style={styles.confirmationServicefooterItmTxt}>CONTINUE</Text></TouchableOpacity>
                       
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}


export default Settings;
