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
import ImageSlider from 'react-native-image-slider';



const datas = [
    { name: '12345' },
    { name: '1254' },
    { name: '1254' }
];

class SliderCheck extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
        };
    }


    render() {
        const images = [
            'https://placeimg.com/640/640/nature',
            'https://placeimg.com/640/640/people',
            'https://placeimg.com/640/640/animals',
            'https://placeimg.com/640/640/beer',
        ];

        return (
            <Container style={styles.container}>
                <ImageSlider
                    loopBothSides
                    autoPlayWithInterval={3000}
                    images={images}
                    customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={[style, styles.customSlide]}>
                            <Image source={{ uri: item }} style={styles.customImage} >
                                <Text style={{ color: '#fff' }}>hi</Text>
                            </Image>
                        </View>
                    )}
                    customButtons={(position, move) => (
                        <View style={styles.buttons}>
                            {images.map((image, index) => {
                                return (
                                    <TouchableHighlight
                                        key={index}
                                        underlayColor="#ccc"
                                        onPress={() => move(index)}
                                        style={styles.button}
                                    >
                                        <Text style={position === index && styles.buttonSelected}>
                                            {index + 1}
                                        </Text>
                                    </TouchableHighlight>
                                );
                            })}
                        </View>
                    )}
                />
            </Container>
        );
    }
}

SliderCheck.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SliderCheck);
