import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Router from './app/Router';
import Main from './app/Main';

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router></Router>
    )
  }
}

export default App