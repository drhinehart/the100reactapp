import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";

import { colors, fontSizes, fontStyles } from "../../styles";

import ICPlaystation from "../../assets/images/ic-playstation.png";
import ICSbox from "../../assets/images/ic-sbox.png";
import ICWindows from "../../assets/images/ic-windows.png"

const { width, height } = Dimensions.get("window");
class ChoosePlatform extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.contentText}>
          Welcome to the 100.io! To get started we will need to know a couple of things about you to match you with the perfect group
        </Text>
        <Text style={styles.quote}>
          First, choose the platform you most frequently will be gaming on
        </Text>
        <View style={styles.osButtonGroup}>
          <TouchableOpacity style={styles.psBtn}>
            <Image source={ICPlaystation} style={styles.btnImage}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sboxBtn}>
            <Image source={ICSbox} style={styles.btnImage}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.windowsBtn}>
            <Image source={ICWindows} style={styles.btnImage}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: width * 0.1,
    backgroundColor: colors.strongBlack,
    paddingTop: 40
  },
  title: {
    fontSize: fontSizes.h1,
    color: colors.onboardingTitle,
    textAlign: 'left'
  },
  contentText: {
    fontSize: fontSizes.secondary,
    color: colors.onboardingText,
    paddingVertical: 25
  },
  quote: {
    fontSize: fontSizes.secondary,
    fontFamily: fontStyles.primaryFont,
    fontWeight: 'bold',
    color: colors.onboardingTitle
  },
  osButtonGroup: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  psBtn: {
    backgroundColor: "#3763c1",
    width: 90,
    alignItems: 'center',
    borderRadius: 5
  },
  sboxBtn: {
    backgroundColor: "#5dc21e",
    width: 90,
    alignItems: 'center',
    borderRadius: 5
  },
  windowsBtn: {
    backgroundColor: "#00adef",
    width: 90,
    alignItems: 'center',
    borderRadius: 5
  },
  btnImage: {
    width: 60,
    height: 60
  }
};
export default ChoosePlatform;