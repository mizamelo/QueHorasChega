import React, { Component } from "react";
import MapView from "react-native-maps";

import { View } from "react-native";

export default class Map extends Component {
  state = {
    region: {
      latitude: -27.210753,
      longitude: -49.644183,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134
    }
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      }, // Sucesso
      () => {}, // Error
      {
        timeout: 2000, // Tempo que fica tentando buscar a localização do usuario
        enableHighAccuracy: true, // Localização via GPS
        maximumAge: 1000 // Guarda a localização | cache
      }
    );
  }

  render() {
    const { region } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation={true}
          loadingEnabled={true}
        />
      </View>
    );
  }
}
