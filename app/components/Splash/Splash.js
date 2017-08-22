import React, { PropTypes } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text
} from "react-native";
import { colors, fontSizes } from "../../styles";
const { height, width } = Dimensions.get("window");

Splash.propTypes = {
  // onLoginFinished: PropTypes.func.isRequired,
};

export default function Splash(props) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require("../../images/logo.png")} />
      </View>
      <View style={styles.loginContainer}>
        {/* <Button
          style={{
            height: 30,
            width: 180,
            marginBottom: 15
          }}
          onPress={props.handeLoginFinished}
          title="Login"
        /> */}
        <Text style={styles.assuranceText}>Forgot password?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 40
  },
  slogan: {
    color: colors.blue,
    fontSize: 40,
    margin: 20,
    textAlign: "center"
  },
  image: {
    resizeMode: "contain",
    height: height * 0.4 > 300 ? 300 : height * 0.4
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center"
  },
  assuranceText: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
    textAlign: "center"
  }
});
