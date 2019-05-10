import React, { Component } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";

export default class index extends Component {
  static navigationOptions = () => ({
    header: null
  });

  componentDidMount() {
    this.verifyLogin();
  }

  verifyLogin = async () => {
    const doLogin = await AsyncStorage.getItem("@doLogin");

    doLogin
      ? this.props.navigation.navigate("Mapa")
      : this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View>
        <ActivityIndicator style={{ marginTop: 250 }} size={26} />
      </View>
    );
  }
}
