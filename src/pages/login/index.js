import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import {
  View,
  TextInput,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";
import logo from "../../assets/logo.png";
import BackgroundExitvs from "../../assets/background.jpg";

export default class Login extends Component {
  state = {
    showIcon: true,
    icon: "eye",
    passwordValue: "",
    cpflValue: "",
    credentials: {
      cpf: "111.111.111-111",
      password: "123456"
    },
    error: "",
    disabledBtn: false
  };

  static navigationOptions = () => ({
    header: null
  });

  secureText = () => {
    const { showIcon } = this.state;

    showIcon
      ? this.setState({ showIcon: false, icon: "eye-slash" })
      : this.setState({ showIcon: true, icon: "eye" });
  };

  doLogin = async () => {
    const { emailValue, passwordValue, credentials } = this.state;

    if (
      emailValue === credentials.email &&
      passwordValue === credentials.password
    ) {
      await AsyncStorage.setItem("@doLogin", "login-is-true");
      this.props.navigation.navigate("Mapa");
    } else {
      this.setState({ error: "CPF e/ou senha incorreta" });
    }
  };

  render() {
    const { showIcon, icon, error, disabledBtn, cpfValue } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground
          style={styles.content}
          blurRadius={3}
          source={BackgroundExitvs}
        >
          <View style={styles.box}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.alertError}>{error}</Text>
            <TextInputMask
              type={"cpf"}
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu CPF"
              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              onChangeText={cpfValue => this.setState({ cpfValue })}
              value={cpfValue}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Informe sua senha"
                placeholderTextColor="#999"
                underlineColorAndroid="transparent"
                secureTextEntry={showIcon}
                onChangeText={passwordValue => this.setState({ passwordValue })}
              />
              <TouchableOpacity
                style={styles.passIcon}
                onPress={this.secureText}
              >
                <Icon name={icon} color="#FFF" size={14} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={disabledBtn ? styles.disabledButton : styles.btnLogin}
              disabled={disabledBtn}
              onPress={this.doLogin}
            >
              <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.forgotPassword}>Esquece sua senha?</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
