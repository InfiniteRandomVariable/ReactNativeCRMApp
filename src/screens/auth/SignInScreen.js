import React from "react";
import { Auth } from "aws-amplify";
import {
  Alert,
  SafeAreaView,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TextInput,
  Button,
  View
} from "react-native";

class SignInScreen extends React.Component {
  state = {
    username: "",
    password: "",
    user: {},
    authenticationCode: "",
    showConfirmationForm: false
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  static navigationOptions = {
    title: "Please sign in"
  };

  _simpleAlertHandler = err => {
    Alert.alert(
      "Alert",
      typeof err.message !== "undefined" ? err.message : err,
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  signIn = async () => {
    const { username, password } = this.state;
    try {
      // login with provider
      const user = await Auth.signIn(username, password);
      console.log("user successfully signed in!", user);
      const userCred = Auth.currentUserCredentials();
      console.log("user cred secretAccessKey", userCred.secretAccessKey);
      console.log("user cred .sessionToken", userCred.sessionToken);
      console.log("user cred accessKeyId", userCred.accessKeyId);
      this.setState({ user, showConfirmationForm: true });
      Auth.currentCredentials().then(credentials => {
        console.log(
          "Auth.currentCredentials secretAccessKey",
          credentials.secretAccessKey
        );
        console.log(
          "Auth.currentCredentials .sessionToken",
          credentials.sessionToken
        );
        console.log(
          "Auth.currentCredentials accessKeyId",
          credentials.accessKeyId
        );

        this.props.navigation.navigate('App');
      });
    } catch (err) {


      this._simpleAlertHandler(err);
    }
  };

  confirmSignIn = async () => {
    const { user, authenticationCode } = this.state;
    try {
      await Auth.confirmSignIn(user, authenticationCode);
      console.log("user successfully signed in!", user);
      goHome();
    } catch (err) {
      console.log("error:", err);
    }
  };

  goSignUp = () => {

    this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("username", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("password", val)}
          />
          <Button title="Sign In" onPress={this.signIn} />
          <Button title="Sign Up" onPress={this.goSignUp} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: "500",
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    color: "white",
    padding: 8,
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SignInScreen;
