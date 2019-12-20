// SignUp.js
import { Fragment, default as React } from 'react';
import { Alert, View, Button, TextInput, StyleSheet } from "react-native";

import { Navigation } from "react-native-navigation";
import { Auth } from "aws-amplify";

const initialState = {
  username: "",
  password: "",
  email: "",
  phone_number: "",
  name: "",
  authenticationCode: "",
  showConfirmationForm: false
};

export default class SignUp extends React.Component {
  state = initialState;

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

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    const { username, password, email, phone_number, name } = this.state;
    try {
      // here place your signup logic

      const success = await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number, name }
      });
      console.log("user successfully signed up!: ", success);
      this.setState({ showConfirmationForm: true });

      console.log("user successfully signed up!: ", success);
    } catch (err) {
      Object.keys(err).forEach(key => {
        let value = err[key];
        console.log(key, value);
        //use key and value here
      });

      this._simpleAlertHandler(err);
    }
  };

  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state;
    try {
      await Auth.confirmSignUp(username, authenticationCode);
      console.log("successully signed up!");
      alert("User signed up successfully!");
      this.setState({ ...initialState });
    } catch (err) {
      console.log("error confirming signing up: ", err);
    }
  };

  render() {
    return (
      <View style={styles.container}>

      {!this.state.showConfirmationForm && (
        <React.Fragment>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("username", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("password", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("email", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("phone_number", val)}
        />
        <Button title="Sign Up" onPress={this.signUp} />
        </React.Fragment>
          )
        }

        {
      this.state.showConfirmationForm && (
        <React.Fragment>
          <TextInput
            style={styles.input}
            placeholder='Authentication code'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('authenticationCode', val)}
          />
          <Button
            title='Confirm Sign Up'
            onPress={this.confirmSignUp}
          />
        </React.Fragment>
      )
    }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
