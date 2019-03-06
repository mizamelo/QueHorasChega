  import React from 'react';
import MapViewDirecion from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirecion
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyC6iaLSc7Ca0PqG3Us9WzxiVow-56VQZb0"
    strokeWidth={3}
    strokeColor="#6ADC00"
  />
);

export default Directions;
