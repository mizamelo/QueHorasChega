import React, { Component } from "react";
import { View, Text, ActivityIndicator, ImageBackground } from "react-native";

import { metrics } from "../../styles";

const ASPECT_RATIO = metrics.width / metrics.height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import Map from "./components/Map";
import api from "../../services/api";
import backgroundMapa from "../../assets/background.jpg";

import styles from "./styles";

export default class Mapa extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    region: {
      latitude: -27.210753,
      longitude: -49.644183,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134
    },
    destination: {
      latitude: 37.3317876,
      longitude: -122.0054812
    },
    loading: false
  };

  getLocation = async () => {
    const { data } = await api.get("/2508");
    console.log(data);
    this.setState({
      loading: true,
      destination: {
        latitude: Number(data[0].lat),
        longitude: Number(data[0].lng)
      }
    });
  };

  async componentDidMount() {
    this.getLocation();
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
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
    const { loading, region, destination } = this.state;

    return (
      <View style={styles.geral}>
        {!loading ? (
          <ImageBackground
            source={backgroundMapa}
            style={styles.background}
            blurRadius={3}
          >
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color="#222"
            />
            <Text style={styles.info}>Calculando rota...</Text>
          </ImageBackground>
        ) : (
          <Map region={region} destination={destination} />
        )}
      </View>
    );
  }
}
