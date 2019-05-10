import React, { Component } from "react";
import { View, Text, ActivityIndicator, ImageBackground } from "react-native";
import { metrics } from "../../styles";
import TimerMixin from "react-timer-mixin";

const ASPECT_RATIO = metrics.width / metrics.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import Map from "./components/Map";
import api from "../../services/api";
import backgroundMapa from "../../assets/background.jpg";

import styles from "./styles";
mixins: [TimerMixin];
export default class Mapa extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    region: {
      latitude: -27.210753,
      longitude: -49.644183,
      // latitude,
      // longitude,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134
    },
    destination: {
      latitude: 37.3317876,
      longitude: -122.0054812
    },
    loading: false,
    data: []
  };

  getLocation = async () => {
    const { data } = await api.get("/2508");

    this.setState({
      loading: true,
      destination: {
        latitude: Number(data[0].lat),
        longitude: Number(data[0].lng)
      },
      data
    });
  };

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      error => console.log(error),
      { enableHighAccuracy: false, timeout: 50000 }
    );

    this.interval = setInterval(() => {
      this.getLocation();
    }, 60000); // 1 minuto
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
            <Text style={styles.info}>Localizando veículo...</Text>
          </ImageBackground>
        ) : (
          <Map
            region={region}
            destination={destination}
            carro={this.state.data}
          />
        )}
      </View>
    );
  }
}
