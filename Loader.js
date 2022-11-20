import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

class Loader extends Component {
  state = {
  }

  render() {
    return (<View style={{
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
    }}><ActivityIndicator size="large"/></View>)
  }
}

export default Loader;