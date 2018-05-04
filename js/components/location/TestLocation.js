import React, { Component } from "react";
import { View, } from 'react-native';
import MapView from 'react-native-maps';

class TestLocation extends Component {
    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
    }
    onRegionChange(region) {
        this.setState({ region });
    }

      
    render(){
        return(
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ width: 320, height: 400 }}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                />
            </View>
        );
    }
}

export default TestLocation;