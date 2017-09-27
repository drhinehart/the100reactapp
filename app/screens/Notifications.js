import React, { PropTypes, PureComponent, Component } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connectAlert } from "../components/Alert";
import { connect } from "react-redux";
import { onAuthChange } from "../actions/authentication";
import { fetchNotifications } from "../actions/notifications";

import { colors, fontSizes, fontStyles } from "../../app/styles";
import Moment from "../../node_modules/react-moment";
import TimeAgo from "../../node_modules/react-native-timeago";

class Notifications extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
    notificationsError: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    // this.props.dispatch(fetchNotifications());
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.notificationsError &&
      nextProps.notificationsError !== this.props.notificationsError
    ) {
      this.props.alertWithType("error", "Error", nextProps.notificationsError);
    }
  }

  fetchData() {
    this.props.dispatch(fetchNotifications());
  }

  handleRefresh = () => {
    this.fetchData();
  };

  userLogout() {
    try {
      AsyncStorage.removeItem("id_token");
    } catch (error) {
      console.log("AsyncStorage error: " + error.message);
    }
    this.props.dispatch(onAuthChange(""));
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      if (this.props.items.length < 1) {
        return (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={this.fetchData}
            >
              <Text style={styles.buttonText}>Get Notifications</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={this.userLogout.bind(this)}
        >
          <Text style={styles.buttonText}> Log out </Text>
        </TouchableOpacity>

        <FlatList
          data={this.props.items}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item, index) => index}
          refreshing={this.props.isLoading}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

class ListItem extends PureComponent {
  render() {
    return (
      <View style={styles.box}>
        <View style={styles.leftBox}>
          <Image
            style={styles.avatarMini}
            source={
              this.props.item.avatar_url === null
                ? require("../../app/images/default-avatar.png")
                : { uri: this.props.item.avatar_url }
            }
          />
        </View>
        <View style={styles.middleBox}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.time}>
              {this.props.item.notification_type} -
            </Text>
            <Text style={styles.time}>
              <TimeAgo time={this.props.item.created_at} minPeriod="60" />
            </Text>
          </View>
          <Text style={styles.username}>{this.props.item.message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  defaultText: {
    color: colors.white
  },
  container: {
    padding: 5,
    margin: 3,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: colors.white
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  box: {
    flexDirection: "row",
    margin: 5,
    padding: 5
  },
  input: {
    flexDirection: "row",
    alignItems: "stretch",
    margin: 5,
    padding: 5,
    borderTopWidth: 0.5,
    borderTopColor: "#d6d7da"
  },
  buttonWrapper: {
    padding: 10
  },
  leftBox: {
    flex: 1,
    padding: 2,
    margin: 2,
    backgroundColor: colors.white
  },
  middleBox: {
    flex: 7,
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
  username: {
    color: colors.grey,
    fontFamily: fontStyles.primaryFont,
    fontSize: fontSizes.secondary
  },
  time: {
    padding: 3,
    color: colors.lightestGrey,
    fontSize: fontSizes.small
  },
  text: {
    color: colors.mediumGrey
  },
  iconText: {
    fontSize: fontSizes.small,
    color: colors.mediumGrey
  }
});

const mapStateToProps = state => {
  const isAuthenticating = state.authentication.isAuthenticating;
  const isAuthed = state.authentication.isAuthed;
  const items = state.notifications.notifications;
  const isLoading = state.notifications.isLoading;

  return {
    isAuthenticating,
    isAuthed,
    items,
    isLoading,
    notificationsError: state.notifications.error
  };
};

export default connect(mapStateToProps)(connectAlert(Notifications));