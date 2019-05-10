import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import Details from "../Details";
import { metrics } from "../../../../styles";

const GOOGLE_MAPS_APIKEY = "...";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.mapView = null;
  }

  render() {
    const { region, destination } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          initialRegion={region}
          style={StyleSheet.absoluteFill}
          showsUserLocation={true}
          loadingEnabled={true}
          ref={c => (this.mapView = c)}
        >
          <MapView.Marker key={`coordinate_${0}`} coordinate={destination} />

          <MapViewDirections
            origin={region}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={0}
            // strokeColor="#222"
            resetOnChange={true}
            optimizeWaypoints={true}
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
        </MapView>

        <Details carro={this.props.carro} />
      </View>
    );
  }
}
