import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform } from 'react-native';
import imgLogo from '../../../img/logo.png'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const imageht = (deviceHeight - 88);


export default class DefaultSlide extends React.PureComponent {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <Image source={{ uri: this.props.image }} style={styles.imgt} >
          <Image source={imgLogo} style={{ height: 120, width: 91, marginBottom: 30 }}/>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.text}>{this.props.text}</Text>
        </Image>
    );
  }
}

const styles = StyleSheet.create({

  mainContent: {  justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'transparent'},

  text: { color: '#1e3768', fontSize: 14, textAlign: 'center', fontWeight: '300', paddingHorizontal: 16, },

  title: { fontSize: 22, color: '#1e3768', fontWeight: '300', paddingHorizontal: 16, marginBottom: 25, textAlign: 'center' },
  imgt:{
        paddingTop: 40,
        width: deviceWidth,
        height: imageht,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 999
  }
});
