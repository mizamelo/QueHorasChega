import React, { Component } from "react";
import { StyleSheet, Text, Fragment } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import api from "../../../../services/api";
import { metrics } from "../../../../styles";
import ImageMarker from "../../../../assets/marker.png";

const ASPECT_RATIO = metrics.width / metrics.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "...";

export default class Map extends Component {
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
  };

  async componentDidMount() {
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
    this.mapView = null;
  }

  render() {
    const { region, destination, loading } = this.state;

    return (
      <MapView
        initialRegion={region}
        style={StyleSheet.absoluteFill}
        ref={c => (this.mapView = c)}
      >
        {/* <MapView.Marker key={`coordinate_${0}`} coordinate={region} /> */}
        {/* <Fragment> */}
        {!loading ? (
          <Fragment>
            <MapView.Marker
              // key={`coordinate_${1}`}
              coordinate={destination}
              image={ImageMarker}
            />

            <MapViewDirections
              origin={region}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#222"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${
                    params.destination
                  }"`
                );
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: metrics.width / 20,
                    bottom: metrics.height / 20,
                    left: metrics.width / 20,
                    top: metrics.height / 20
                  }
                });
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />
          </Fragment>
        ) : (
          console.log("carregando")
        )}{" "}
        }
      </MapView>
    );
  }
}
