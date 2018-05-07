import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { View, StatusBar, Alert, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FSpinner from 'react-native-loading-spinner-overlay';
import { myPaymentList, checkUncheck } from './elements/paymentAction';

import { Container, Header, Button, Content, Body, CheckBox } from "native-base";
import I18n from '../../i18n/i18n';
import styles from './styles';


const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SelectLocation' })]
});


class MyPaymentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentList: [],
            loader: false,
        }
    }


    componentWillMount() {
        this.setState({
            loader: true,
        })
        this.props.myPaymentList(this.props.auth.data.id).then((allLst) => {
            this.setState({
                paymentList: allLst,
                loader: false,
            });
        }).catch(err => {
            this.setState({
                loader: false
            });
            Alert.alert(I18n.t('please_try_again_later'));
        })
    }

    chkbox_check(e) {
        this.props.checkUncheck(e, this.state.paymentList);
    }
    render() {

        let myPaymentList
        console.log(this.state.myPaymentList, "My payment List");
        if (this.state.paymentList && this.state.paymentList.length > 0) {
            myPaymentList = (
                this.state.paymentList.map((data, key) => (
                    <View style={styles.mainItem} key={data.id}>
                        <View style={styles.checkBoxWarp}>
                            <CheckBox color='#29416f' checked={data.selected} id={data.id} onPress={() => this.chkbox_check(data.id)} />
                        </View>
                        <View style={styles.mainItemText}>
                            <Text style={styles.lstHeader}>{data.bank_name}</Text>
                            <Text style={styles.lstHeader2}>{data.account_number}</Text>
                        </View>
                    </View>
                ))
            )
        }

        return (
            <Container >
                <StatusBar
                    backgroundColor="#cbf0ed"
                />
                <Content>
                    <FSpinner visible={this.state.loader} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    <Header style={styles.appHdr2} androidStatusBarColor="#cbf0ed">

                        <TouchableOpacity transparent onPress={() => this.props.navigation.goBack()}
                            activeOpacity={0.5} style={{ width: 50, justifyContent: 'center' }}>
                            <Ionicons name="ios-arrow-back" style={styles.backBt} />
                        </TouchableOpacity>

                        <Body style={styles.tac}>
                            <Text style={styles.hdClr}>{I18n.t('my_payment_method')}</Text>
                        </Body>
                        <TouchableOpacity transparent onPress={() => this.save_select_location()} activeOpacity={0.5} style={{ width: 50, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text>{I18n.t('add')}</Text>
                        </TouchableOpacity>

                    </Header>

                    <View>
                        <Text style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Payment method cannot be edited, you can only add.</Text>
                        {myPaymentList}
                    </View>


                </Content>
            </Container>
        );
    }
}

MyPaymentList.propTypes = {
    payment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        payment: state.payment,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        myPaymentList: (id) => dispatch(myPaymentList(id)),
        checkUncheck: (a, b) => dispatch(checkUncheck(a, b)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPaymentList);
