import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';
import imgLogo from '../../../img/logo.png'


export default class DefaultSlide extends React.PureComponent {
  render() {
    return (
      <View style={[styles.mainContent]}>
        <Image source={this.props.image} style={this.props.imageStyle} >
          <Image source={imgLogo} style={{ height: 120, width: 91, marginBottom: 30 }}/>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.text}>{this.props.text}</Text>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  mainContent: {  justifyContent: 'space-around', alignItems: 'center', },

  text: { color: '#1e3768', fontSize: 14, textAlign: 'center', fontWeight: '300', paddingHorizontal: 16, },

  title: { fontSize: 22, color: '#1e3768', fontWeight: '300', paddingHorizontal: 16, marginBottom: 25, textAlign: 'center' }

});
