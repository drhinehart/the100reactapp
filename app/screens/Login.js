import React, { Component, PropTypes } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";
import PreSplash from "../components/PreSplash/PreSplash";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { connectAlert } from "../components/Alert";

import { fetchToken } from "../actions/authentication";
import { decodeToken } from "../actions/authentication";

import Navigator from "../config/routes";

import { colors, fontSizes, fontStyles } from "../styles";
const { height, width } = Dimensions.get("window");
import { Font } from "expo";

class Login extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      isLoaded: false,
      fontLoaded: false
    };
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.authenticationError
      // && nextProps.authenticationError !== this.props.authenticationError
    ) {
      this.props.alertWithType("error", "Error", nextProps.authenticationError);
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("id_token").then(token => {
      this.props.dispatch(decodeToken(token));
      this.setState({ isLoaded: true });
    });
    Font.loadAsync({
      Nunito: require("../../app/assets/fonts/Nunito-Bold.ttf")
    }).then(result => {
      this.setState({ fontLoaded: true });
    });
  }

  userLogin() {
    if (!this.state.username || !this.state.password) return;
    this.props.dispatch(fetchToken(this.state.username, this.state.password));
  }

  userLogout() {
    try {
      AsyncStorage.removeItem("id_token");
    } catch (error) {
      console.log("AsyncStorage error: " + error.message);
    }
    this.props.dispatch(removeToken());
  }

  static navigationOptions = {
    title: "Welcome"
  };

  render() {
    if (
      !this.state.isLoaded ||
      !this.state.fontLoaded ||
      this.props.authentication.isLoading
    ) {
      return <PreSplash />;
    }

    if (this.props.authentication.isAuthed === true) {
      return <Navigator onNavigationStateChange={null} />;
    }

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        extraHeight={100}
        keyboardOpeningTime={10}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={require("../images/logo.png")} />

          <TextInput
            onChangeText={username => this.setState({ username })}
            placeholder="Username"
            ref="username"
            returnKeyType="next"
            style={styles.input}
            value={this.state.username}
          />

          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            ref="password"
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
          />
          <TouchableOpacity style={{}} onPress={this.userLogin.bind(this)}>
            <Text
              style={{
                textAlign: "center",
                padding: 15,
                fontFamily: fontStyles.primaryFont,
                fontSize: fontSizes.primary,
                height: 50,
                width: 300,
                marginBottom: 15
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 40
  },
  slogan: {
    fontSize: 40,
    margin: 20,
    textAlign: "center"
  },
  image: {
    padding: 5,
    resizeMode: "contain",
    height: 150 //height * 0.4 > 300 ? 300 : height * 0.4
  },
  loginContainer: {
    padding: 30,
    alignItems: "center",
    flex: 1
  },
  assuranceText: {
    textAlign: "center"
  },
  buttonStyle: {
    fontFamily: fontStyles.primaryFont,
    fontSize: fontSizes.primary,
    height: 100,
    width: 200,
    backgroundColor: colors.grey,
    marginBottom: 15
  },
  input: {
    margin: 15,
    padding: 5,
    fontFamily: fontStyles.primaryFont,
    fontSize: fontSizes.primary,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    height: 50,
    width: 300,
    flexDirection: "row"
  }
});

const mapStateToProps = state => {
  const authentication = state.authentication;
  // const onAuthChange = state.authentication.onAuthChange(token);

  return {
    authentication,
    authenticationError: state.authentication.error
  };
};

export default connect(mapStateToProps)(connectAlert(Login));
