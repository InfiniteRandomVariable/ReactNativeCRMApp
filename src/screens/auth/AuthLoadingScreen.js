import React from "react";
import { SafeAreaView } from "react-navigation";
import styles from "./styles";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

import { Auth } from "aws-amplify";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //  const userToken = await AsyncStorage.getItem("userToken");
    console.log("AuthLoadingScreen 0");
    await Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("AuthLoadingScreen 1");
        this.props.navigation.navigate(user ? "App" : "Auth");
      })
      .catch(err => {
        this.props.navigation.navigate("Auth");
        console.log("ERROR: " + err);
      });
    //console.log("AuthLoadingScreen 1")
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    console.log("AuthLoadingScreen 2");

  };

  // Render any loading content that you like here
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      </SafeAreaView>
    );
  }
}


export default AuthLoadingScreen;
