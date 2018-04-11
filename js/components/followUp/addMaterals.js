import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Image, AsyncStorage, View, StatusBar, Dimensions, Alert, TouchableOpacity, List, ListItem, BackHandler, ScrollView, ImageBackground } from "react-native";
import { Container, Header, Button, Content, Form, Item, Frame, Input, Label, Text, Body, Title, Footer, FooterTab, Card, CardItem } from "native-base";
import FSpinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../i18n/i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../../api/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const icon2 = require("../../../img/icon2.png");
const toolBoxIcon = require("../../../img/Toolbox-Image.jpg");
const win = Dimensions.get('window').width;
class AddMaterial extends Component {
    // static renderFilm(film) {
    //     const { title, director, opening_crawl, episode_id } = film;
    //     const roman = episode_id < ROMAN.length ? ROMAN[episode_id] : episode_id;

    //     return (
    //         <View>
    //             <Text style={styles.titleText}>{roman}. {title}</Text>
    //             <Text style={styles.directorText}>({director})</Text>
    //             <Text style={styles.openingText}>{opening_crawl}</Text>
    //         </View>
    //     );
    // }


    constructor(props) {
        super(props);
        this.state = {
            films: [],
            query: '',
            materialsList: [],
            loader: false,
            addedMaterialsList: [],
            currency: 'USD',
            renderMaterialsList: [],
            IsAutoComplete: false,
            IsModalVisible: false,
            name: '',
            price: '',
            totalPrice: ''
        };
    }
    addMaterial() {
        this.setState({ loader: true });
        const data = { name: this.state.name, price: this.state.price, image: '' };
        api.post('Materials', data).then((res) => {
            if (res.id) {
                let addedItemArray = this.state.addedMaterialsList;
                addedItemArray.push({ id: res.id, name: this.state.name, price: this.state.price, image: '', count: 1, actualPrice: this.state.price });
                this.setState({ addedMaterialsList: addedItemArray, loader: false, IsModalVisible: false });
            }
            else {
                this.setState({ loader: false });
                Alert.alert("Please try again later.");
            }

        }).catch((err) => {
            this.setState({ loader: false });
            Alert.alert("Please try again later.");
        })
    }
    addItems(id, name, image, price) {
        let addedItemArray = this.state.addedMaterialsList;
        addedItemArray.push({ id: id, name: name, price: price, image: image, count: 1, actualPrice: price });
        let totalPrice = 0;
        addedItemArray.map((item) => {
            totalPrice = totalPrice + Number(item.price);
        });
        totalPrice = totalPrice.toFixed(2);

        this.setState({ addedMaterialsList: addedItemArray, totalPrice: totalPrice });
    }
    componentDidMount() {
        fetch(`${API}/films/`).then(res => res.json()).then((json) => {
            const { results: films } = json;
            this.setState({ films });
        });
        this.setState({ loader: true });
        api.get('Materials').then((res) => {

            if (this.props.navigation.state.params.jobId) {
                api.post("jobMaterials/getJobMaterialByJobId", { "jobId": this.props.navigation.state.params.jobId }).then((addedList) => {
                    if (addedList.type != "Error") {
                        let addedItemsList = [];
                        addedList.response.message.map((item) => {
                            let item1 = { id: item.id, name: item.materials ? item.materials.name : '', price: item.price, image: item.materials ? (item.materials.image ? item.materials.image : '') : '', count: item.count, actualPrice: item.materials ? item.materials.price : '' };
                            addedItemsList.push(item1);
                        });
                        if (addedItemsList.length > 0) {
                            let totalPrice = 0;
                            addedItemsList.map((item) => {
                                totalPrice = totalPrice + Number(item.price);
                            });
                            totalPrice = totalPrice.toFixed(2);
                            this.setState({ materialsList: res, loader: false, addedMaterialsList: addedItemsList, totalPrice: totalPrice });
                        }
                        else {
                            this.setState({ loader: false, materialsList: res });
                        }
                    }
                }).catch((err) => {
                    this.setState({ loader: false });
                })
            }
            else {
                this.setState({ materialsList: res, loader: false });
            }
        }).catch((Err) => {
            this.setState({ loader: true });
            Alert.alert('Please try again later.');
        })

        AsyncStorage.getItem("currency").then((value) => {
            if (value) {
                const value1 = JSON.parse(value);
                this.setState({ currency: value1.language })
            }
        });
        const { query } = this.state;
        const materialsList = this.findMaterial(query);
        this.setState({ renderMaterialsList: materialsList });


    }

    findFilm(query) {
        if (query === '') {
            return [];
        }

        const { films } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return films.filter(film => film.title.search(regex) >= 0);
    }

    findMaterial(query) {
        if (query === '') {
            return [];
        }
        const { materialsList } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        let items = materialsList.filter(material => material.name.search(regex) >= 0);
        console.log(items);
        this.setState({ renderMaterialsList: items, IsAutoComplete: true });
        //return items;
    }
    subtractPrice(id, count) {
        if (count != 1 && count!=0) {
            let addedMaterialsList = this.state.addedMaterialsList;
            let item;
            this.state.addedMaterialsList.map((item1) => {
                if (item1.id == id) {
                    item = item1;
                }
            });
            if (item) {
                item.count = count - 1;
                item.price = (item.count * item.actualPrice).toFixed(2);
                addedMaterialsList.map((item1) => {
                    if (item1.id == item.id) {
                        item1.count = item.count;
                        item1.price = item.price;
                    }
                });

                let totalPrice = 0;
                addedMaterialsList.map((item) => {
                    totalPrice = totalPrice + Number(item.price);
                });
                totalPrice = totalPrice.toFixed(2);
                this.setState({ addedMaterialsList: addedMaterialsList, totalPrice: totalPrice });
            }
        }
        else {
            if(count!=0)
            {
                let addedMaterialsList = this.state.addedMaterialsList;
                let item;
                this.state.addedMaterialsList.map((item1) => {
                    if (item1.id == id) {
                        item = item1;
                    }
                });
                if (item) {
                    item.count = 0;
                    item.price = "0.0";
                    addedMaterialsList.map((item1) => {
                        if (item1.id == item.id) {
                            item1.count = item.count;
                            item1.price = item.price;
                        }
                    });

                    let totalPrice = 0;
                    addedMaterialsList.map((item) => {
                        totalPrice = totalPrice + Number(item.price);
                    });
                    totalPrice = totalPrice.toFixed(2);
                    this.setState({ addedMaterialsList: addedMaterialsList, totalPrice: totalPrice });
                }
            }
            
        }

    }
    addPrice(id, count) {
        let addedMaterialsList = this.state.addedMaterialsList;
        let item;
        this.state.addedMaterialsList.map((item1) => {
            if (item1.id == id) {
                item = item1;
            }
        });
        if (item) {
            item.count = count + 1;
            item.price = (item.count * item.actualPrice).toFixed(2);
            addedMaterialsList.map((item1) => {
                if (item1.id == item.id) {
                    item1.count = item.count;
                    item1.price = item.price;
                }
            });
            let totalPrice = 0;
            addedMaterialsList.map((item) => {
                totalPrice = totalPrice + Number(item.price);
            });
            totalPrice = totalPrice.toFixed(2);
            this.setState({ addedMaterialsList: addedMaterialsList, totalPrice: totalPrice });
        }

    }
    saveMaterials() {
        const jobId = this.props.navigation.state.params.jobId ? this.props.navigation.state.params.jobId : '';
        if (jobId) {
            this.setState({ loader: true });

            let toSendData = [];
            this.state.addedMaterialsList.map((item) => {
                if(item.count!=0)
                {
                    let insertData = { "count": item.count, "price": item.price, "materialsId": item.id };
                    toSendData.push(insertData);
                }
               
            });
            const data = { "materials": toSendData, "jobId": jobId };
            api.post('jobMaterials/insertJobMaterial', data).then((res) => {
                this.setState({ loader: false });
                if (res.response.type == "error") {
                    Alert.alert(res.response.message);
                }
                else {
                    debugger;
                    Alert.alert("Materials added successfully.");
                    this.props.navigation.navigate('FollowUpList', { totalPrice: this.state.totalPrice, materialsId: res.response.message[0].id });
                }

            }).catch((err) => {
                this.setState({ loader: false });
                Alert.alert("Please try again later.");
            })
        }
        else {
            Alert.alert("Please select a job to add materials.");
        }

    }

    render() {
        // const { query } = this.state;
        // const materialsList = this.findMaterial(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Container >
                <FSpinner visible={this.state.loader} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Header style={styles.headerWarp} noShadow androidStatusBarColor="#81cdc7" >
                    <Button transparent onPress={() => this.props.navigation.goBack()} >
                        <Text>{I18n.t('cancel')}</Text>
                    </Button>
                    <Body style={styles.headBody}>
                        <Title>{I18n.t('add_materials')}</Title>
                    </Body>
                    <Button transparent onPress={() => this.saveMaterials()}>
                        <Text>Save</Text>
                    </Button>
                </Header>

                <Content style={styles.bgWhite} >

                    <Modal isVisible={this.state.IsModalVisible}>
                        <TouchableOpacity
                            transparent style={{ flex: 1, justifyContent: 'center', display: 'flex', width: '100%' }}
                            onPress={() => this.setState({ IsModalVisible: false })}
                            activeOpacity={1}
                        >

                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 99999, }} onPress={() => this.setState({ IsModalVisible: false })}>
                                <Ionicons style={{ color: 'rgba(255,255,255,0.5)', fontSize: 36 }} name='md-close-circle' />
                            </TouchableOpacity>

                            <View style={{ backgroundColor: 'white' }}>
                                <View>
                                    <Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
                                        <Input onChangeText={(text) => this.setState({ name: text })} placeholder={I18n.t('enter_name_of_material')} value={this.state.name} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                                    </Item>
                                </View>
                                <View>
                                    <Item regular style={{ borderColor: '#29416f', borderWidth: 1, borderRadius: 2, height: 45 }}>
                                        <Input onChangeText={(price) => this.setState({ price: price })} placeholder={I18n.t('enter_price_of_material')} keyboardType={'numeric'} value={this.state.price} style={{ textAlign: 'center', color: '#29416f', fontSize: 14 }} />
                                    </Item>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.setState({ IsModalVisible: false })}>
                                        <Text>{I18n.t('cancel')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.addMaterial()}>
                                        <Text>{I18n.t('add')}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </TouchableOpacity>
                    </Modal>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        data={this.state.renderMaterialsList}
                        containerStyle={styles.autocompleteContainer}
                        defaultValue={this.state.query}
                        onChangeText={text => this.findMaterial(text)}
                        placeholder="Search"
                        renderItem={({ name, image, price, id }) => (
                            <View>
                                <TouchableOpacity onPress={() => this.addItems(id, name, image, price)}>
                                    <Card>
                                        <CardItem>
                                            <View>
                                                <Image source={{ uri: image }} style={styles.menuCardIcon} />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 15 }}>
                                                <Text style={styles.itemText}>
                                                    {name}
                                                </Text>
                                                <Text style={styles.itemText}>
                                                    {this.state.currency} {price}
                                                </Text>
                                            </View>
                                            <TouchableOpacity >
                                                <FontAwesome name="plus" style={{ fontSize: 20 }} />
                                                <Text>Add</Text>
                                            </TouchableOpacity>
                                        </CardItem>

                                    </Card>
                                </TouchableOpacity>
                            </View>

                        )}


                    />
                    <View>
                        {
                            this.state.IsAutoComplete == true && this.state.renderMaterialsList.length == 0 ? (
                                <View>
                                    <Text>N/A</Text>
                                    <Text>{I18n.t('click_here_to_add_in_list')}</Text>
                                    <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: '#81cdc7', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ IsModalVisible: true, name: '', price: '' })}>
                                        <FontAwesome name='plus' style={{ fontSize: 14, color: '#fff' }} />

                                    </TouchableOpacity>

                                </View>
                            ) : (
                                    <View></View>
                                )
                        }
                    </View>
                    <View>
                        {
                            this.state.addedMaterialsList.length > 0 ? (

                                <View>

                                    {
                                        <Text>{I18n.t('added_materials')}</Text>
                                    }
                                    {
                                        this.state.addedMaterialsList.map((item, key) => {
                                            return (
                                                <View key={key}>

                                                    <Card>
                                                        <CardItem>
                                                            <View>
                                                                {
                                                                    item.image?
                                                                        <Image source={{ uri: item.image }} style={styles.menuCardIcon} />:
                                                                        <View></View>
                                                                }
                                                               
                                                            </View>
                                                            <View style={{ flex: 1, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                                                                <View>
                                                                    <Text style={styles.itemText}>
                                                                        {item.name}
                                                                    </Text>
                                                                    <Text style={styles.itemText}>
                                                                        {this.state.currency}{item.price}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                                                    <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: '#81cdc7', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.subtractPrice(item.id, item.count)}>
                                                                        <FontAwesome name='minus' style={{ fontSize: 14, color: '#fff' }} />

                                                                    </TouchableOpacity>
                                                                    <View style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Text>
                                                                            {item.count}
                                                                        </Text>
                                                                    </View>

                                                                    <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: '#81cdc7', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.addPrice(item.id, item.count)}>
                                                                        <FontAwesome name="plus" style={{ fontSize: 14, color: '#fff' }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                                <View>
                                                                    <Text style={{ textAlign: 'right' }}>
                                                                        {this.state.currency}{item.price}
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                        </CardItem>

                                                    </Card>
                                                </View>
                                            )
                                        })
                                    }
                                    {
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ flex: 1 }}>
                                                {I18n.t('price')}
                                            </Text>
                                            <Text >
                                                {this.state.currency} {this.state.totalPrice}
                                            </Text>
                                        </View>
                                    }
                                </View>

                            ) : (
                                    <View>
                                        <Text>{I18n.t('added_materials')}</Text>
                                        <Image source={toolBoxIcon} style={{ alignItems: 'center', justifyContent: 'flex-start', width: win, height: (win * 0.62), }} />

                                    </View>
                                )
                        }
                    </View>

                </Content>


            </Container>
        );


    }
}



export default AddMaterial;