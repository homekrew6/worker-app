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
          console.log(day, id, status,);
          console.log('JSONdata E', JSONdata);
          var index;
          for(var i = 0; i < JSONdata.length; i++ ){
            if (id === JSONdata[i].id){
              index=i;
              break;
            }
          }

          if(index !== null){
            console.log('index', index);
            if (status === true) {
              JSONdata[index][day] = false;
            }else {
              JSONdata[index][day] = true;
            }
            dataRemoteString = JSON.stringify(JSONdata);
            AsyncStorage.setItem('StoreData', dataRemoteString);
            console.log('JSONdata changed', JSONdata, dataRemoteString);
          }else{}

        }).then(res => {
            AsyncStorage.setItem('StoreData', dataRemoteString);
        });
    }

    render() {
        return(
            <View style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}>
                <TouchableOpacity onPress={this.onCheckBoxPress.bind(this)}>
                    {this.state.status === true ?
                    <Image source={require('./checked.png')} style={styles.ImageCheckBox} />
                    :
                    <Image source={require('./unchecked.png')} style={styles.ImageCheckBox} />
                    }
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    ImageCheckBox: {
        width: 48,
        height: 48
    }
}
function mapStateToProps(state) {
  console.log('CheckBox', state); // state
  return {
    dataRemote: state.WeekData.dataManu
  }
}

export default connect(mapStateToProps, {ChangeCheckBox})(CheckBox);
