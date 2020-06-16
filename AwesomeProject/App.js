/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import login from './src/Modules/login';
import register from './src/Modules/register';
import HomeScreen from './src/Modules/home';
import playerDetail from './src/Modules/playerDetail'
import playerList from './src/Modules/PlayersList'
import UpdatePlayer from './src/Modules/updatePlayer'
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  loginScreen: {
    screen : login,
    navigationOptions: {
      header: null,
    },
  },
  registerScreen: {
    screen: register,
    navigationOptions: {
      header: null,
    },
  },
  HomeScreen: {
    screen: HomeScreen

  },
  playerDetail : {
    screen : playerDetail
  },
  playerList :{
    screen : playerList
  },
  updatePlayer :{
    screen : UpdatePlayer
  },
  
});

const AppContainer = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




