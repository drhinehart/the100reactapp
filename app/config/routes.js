import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { TabNavigator } from "react-navigation";
import { StackNavigator } from "react-navigation";
import { DrawerNavigator } from "react-navigation";

import Login from "../screens/Login/";
import GamingSessionsList from "../screens/GamingSessionsList";
import GamingSession from "../screens/GamingSession";

import Group from "../screens/Group/";
import NotificationsList from "../screens/NotificationsList";
import FriendsList from "../screens/FriendsList";
import User from "../screens/User";
import Menu from "../screens/Menu";

import Chat from "../components/Chat/Chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, fontSizes } from "../styles";

import { DrawerItems } from "react-navigation";
import { connect } from "react-redux";
import { userLogout } from "../screens/NotificationsList";

const GamingSessionsStack = StackNavigator(
  {
    GamingSessionsList: { screen: GamingSessionsList },
    GamingSession: {
      screen: GamingSession,
      navigationOptions: ({ navigation }) => ({
        // headerTitle: navigation.state.params.title
        // headerRight: navigation.state.params.headerRight
      })
    },
    Player: { screen: User }
  }
  // {
  //   headerMode: "none"
  // }
);

const MenuDrawer = DrawerNavigator(
  {
    Back: {
      screen: GamingSessionsStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: "",
        drawerIcon: () => (
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            style={{ color: colors.grey }}
            // style={styles.icon}
          />
        )
      })
    }
  },
  {
    contentComponent: props => (
      <View style={styles.container}>
        <DrawerItems {...props} />
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => userLogout()}
        >
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="account-remove"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.menuText}>LOG OUT</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={24}
            style={styles.icon}
          />
          <Text style={styles.menuText}>More Coming Soon</Text>
        </View>
      </View>
    )
  }
);

const FriendsStack = StackNavigator({
  FriendsList: {
    screen: FriendsList
  },
  Friend: {
    screen: User
  }
});

export default TabNavigator(
  {
    MenuDrawer: { screen: MenuDrawer },
    Group: { screen: Group },
    NotificationsList: { screen: NotificationsList },
    FriendsList: { screen: FriendsStack }
  },
  {
    // cardStyle: { paddingTop: StatusBar.currentHeight },
    headerMode: "none"
  }
);

GamingSessionsList.navigationOptions = {
  tabBarLabel: "Games",
  header: false,
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? "ios-game-controller-b" : "ios-game-controller-b"}
      size={26}
      style={{ color: tintColor }}
    />
  )
};
Group.navigationOptions = {
  tabBarLabel: "Group",
  tabBarIcon: ({ tintColor, focused }) => (
    <MaterialCommunityIcons
      name={focused ? "account-multiple" : "account-multiple"}
      size={26}
      style={{ color: tintColor }}
    />
  )
};
NotificationsList.navigationOptions = {
  tabBarLabel: "Notifications",
  tabBarIcon: ({ tintColor, focused }) => (
    <MaterialCommunityIcons
      name={focused ? "notification-clear-all" : "notification-clear-all"}
      size={26}
      style={{ color: tintColor }}
    />
  )
};
FriendsList.navigationOptions = {
  tabBarLabel: "Friends",
  header: false,
  tabBarIcon: ({ tintColor, focused }) => (
    <MaterialCommunityIcons
      name={focused ? "account-star" : "account-star"}
      size={26}
      style={{ color: tintColor }}
    />
  )
};
User.navigationOptions = {
  tabBarLabel: "User",
  headerRight: <Button title="Add Friend" />,
  tabBarIcon: ({ tintColor, focused }) => (
    <MaterialCommunityIcons
      name={focused ? "account" : "account"}
      size={26}
      style={{ color: tintColor }}
    />
  )
};
GamingSession.navigationOptions = {
  tabBarLabel: "Games",
  // headerRight: <Button title="Join Game" />,
  // headerTitle: navigation.state.params.title,
  tabBarIcon: ({ tintColor, focused }) => (
    <MaterialCommunityIcons
      name={focused ? "account" : "account"}
      size={26}
      style={{ color: tintColor }}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  icon: {
    marginRight: 25,
    width: 24,
    height: 24,
    color: colors.grey
  },
  menuText: {
    color: colors.lightGrey,
    fontFamily: "Avenir",
    fontWeight: "bold",
    textAlign: "center"
  }
});
