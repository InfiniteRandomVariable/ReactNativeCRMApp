// @flow
// @format

import React from "react";
import { SafeAreaView } from "react-navigation";
import { Auth } from "aws-amplify";
import DrawerTouchableOpacity from "../../components/UI/DrawerTouchableOpacity";
import styles from "../../styles/common";

import { View, Image, Button, TouchableOpacity } from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Text,
  Left,
  Body,
  Right
} from "native-base";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: "HomeScreen",
      drawerLabel: "HomeScreen",
      headerLeft: (
        <DrawerTouchableOpacity onPress={() => navigation.openDrawer()} />
      )
      /* These values are used instead of the shared configuration! */
      // headerStyle: {
      //   backgroundColor: navigationOptions.headerTintColor,
      // },
      // headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Button
            title="Actually, sign me out :)"
            onPress={this._signOutAsync}
          />
        </View>
      </SafeAreaView>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    //await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };
}

export default HomeScreen;
