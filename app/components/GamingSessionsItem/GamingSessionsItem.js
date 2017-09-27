import React, { Component, PropTypes } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ListView,
  TouchableHighlight,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { StackNavigator } from "react-navigation";

import PreSplash from "../../components/PreSplash/PreSplash";
import { colors, fontSizes, fontStyles } from "../../styles";
import Moment from "../../../node_modules/react-moment";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

Moment.globalFormat = "h:mm";
Moment.globalLocale = "en";

export default function GamingSessionItem(props) {
  return (
    <TouchableHighlight
      onPress={() =>
        props.navigation.navigate("GamingSession", {
          gamingSessionId: props.data.id
        })}
      underlayColor="white"
    >
      <View style={styles.box}>
        <View style={styles.leftBox}>
          <Image
            style={styles.avatarMini}
            source={
              props.data.game_avatar_url === "img/default-avatar.png"
                ? require("../../images/default-avatar.png")
                : { uri: props.data.game_avatar_url }
            }
          />
        </View>
        <View style={styles.middleBox}>
          <Text style={styles.gamingSessionTitle}>{props.data.category}</Text>
          <Text style={styles.gamingSessionDescription} numberOfLines={2}>
            {props.data.name}
          </Text>
        </View>
        <View style={styles.rightBox}>
          <Text style={styles.iconText}>
            <MaterialCommunityIcons
              name="calendar"
              size={12}
              color={colors.mediumGrey}
            />{" "}
            <Moment element={Text}>{props.data.start_time}</Moment>
          </Text>
          <Text style={styles.iconText}>
            <MaterialCommunityIcons
              name="account"
              size={14}
              color={colors.mediumGrey}
            />{" "}
            {props.data.primary_users_count}/{props.data.team_size}
          </Text>
          <Text style={styles.iconText}>
            <MaterialCommunityIcons
              name="gauge"
              size={14}
              color={colors.mediumGrey}
            />
            {props.data.light_level === null ? " any" : props.data.light_level}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    color: colors.white
  },
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: colors.white
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  box: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    margin: 5,
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d6d7da",
    backgroundColor: colors.white
  },
  leftBox: {
    flex: 1,
    padding: 2,
    margin: 2,
    backgroundColor: colors.white
  },
  middleBox: {
    flex: 6,
    padding: 2,
    margin: 2,
    backgroundColor: colors.white
  },
  rightBox: {
    flex: 1.1
  },
  avatarMini: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  gamingSessionTitle: {
    color: colors.grey,
    fontFamily: fontStyles.primaryFont
  },
  gamingSessionDescription: {
    color: colors.lightGrey
  },
  iconText: {
    fontSize: fontSizes.small,
    color: colors.mediumGrey
  }
});