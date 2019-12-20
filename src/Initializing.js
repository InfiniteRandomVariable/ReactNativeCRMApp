//https://medium.com/react-native-training/react-native-navigation-v2-by-wix-getting-started-7d647e944132
// Initializing.js
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'

import { goToAuth, goHome } from './nav/navigation'

import { Auth } from 'aws-amplify'

export default class Initializing extends React.Component {
  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log('user: ', user)
      if (user) {
        goHome()
      } else {
        goToAuth()
      }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
