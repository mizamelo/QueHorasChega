import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { debounce } from "lodash";

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
import logo from "./logo.png";
import BackgroundExitvs from "./background.jpg";

export default class Login extends Component {
  state = {
    showIcon: true,
    icon: "eye",
    passwordValue: "",
    emailValue: "",
    credentials: {
      email: "admin@admin.com",
      password: "123456"
    },
    error: "",
    disabledBtn: false
  };
  componentDidMount() {
    AsyncStorage.getItem("@doLogin") !== "" &&
      this.props.navigation.navigate("Mapa");
  }

  constructor(props) {
    super(props);
    console.tron.log(AsyncStorage.getItem("@doLogin"));
    this.emailValid = debounce(this.validationEmail, 500);
  }

  secureText = () => {
    const { showIcon } = this.state;

    showIcon
      ? this.setState({ showIcon: false, icon: "eye-slash" })
      : this.setState({ showIcon: true, icon: "eye" });
  };

  validationEmail = text => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    !regex.test(text)
      ? this.setState({ error: "Informe um e-mail válido", disabledBtn: true })
      : this.setState({ error: "", disabledBtn: false, emailValue: text });
    console.tron.log(text, regex.test(text));
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
      this.setState({ error: "Usuário e/ou senha incorreta" });
    }
  };

  render() {
    const { showIcon, icon, error, disabledBtn, passwordValue } = this.state;
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
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu E-mail"
              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              onChangeText={this.emailValid}
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
