import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { ChangeCheckBox } from '../../actions/ActionCheckBox';

class CheckBox extends Component {
    state = { status: false }
    componentDidMount() {
        this.setState({ status: this.props.status });
        const dataRemote = this.props.dataRemote;

    }
    onCheckBoxPress() {
        if(this.state.status){
            this.setState({ status: false });
        }else{
            this.setState({ status: true });
        }
        const { time, day, id, dataRemote } = this.props;
        const status = this.state.status;

        //this.props.ChangeCheckBox(time, day, id);
        dataRemoteString = JSON.stringify(dataRemote);

        AsyncStorage.getItem("StoreData").then((value) => {
          const JSONdata = JSON.parse(value);
          var index;
          for(var i = 0; i < JSONdata.length; i++ ){
            if (id === JSONdata[i].id){
              index=i;
              break;
            }
          }

          if(index !== null){
            if (status === true) {
              JSONdata[index][day] = false;
            }else {
              JSONdata[index][day] = true;
            }
            dataRemoteString = JSON.stringify(JSONdata);
            AsyncStorage.setItem('StoreData', dataRemoteString);
          }else{}

        }).then(res => {
            AsyncStorage.setItem('StoreData', dataRemoteString);
        });
    }

    render() {
        return(
            <View style={{ height: 60, width: 50, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this.onCheckBoxPress.bind(this)}>
                    {this.state.status === true ?
                        <Image source={require('../../../img/check-box.png')} style={styles.ImageCheckBox} />
                    :
                        <Image source={require('../../../img/check-box-empty.png')} style={styles.ImageCheckBox} />
                    }
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    ImageCheckBox: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginRight: 10,
    }
}
function mapStateToProps(state) {
  return {
    dataRemote: state.WeekData.dataManu
  }
}

export default connect(mapStateToProps, {ChangeCheckBox})(CheckBox);
