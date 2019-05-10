import React, { Component } from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default class index extends Component {
  render() {
    const dados = this.props.carro;
    console.log(this.props.carro);
    return (
      <View style={styles.container}>
        <Text style={styles.marca}> {dados[0].marca} </Text>
        <Text style={styles.endereco}> {dados[0].endereco} </Text>
        <Text style={styles.data}>
          Última atualização: {dados[0].datastatus}
        </Text>
      </View>
    );
  }
}
