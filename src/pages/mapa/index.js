import React from "react";
import { View } from "react-native";

import Map from "./components/Map";

// import styles from './styles';

const Mapa = () => <Map />;

Mapa.navigationOptions = () => ({
  header: null
});

export default Mapa;
