import React, { Component } from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

class Popup extends Component {

  state = {
  }

  render() {
    <View style={styles.content}>
        <View style={styles.card}>
            <Button title='One'></Button>
            <Button title='Two'></Button>
        </View>
    </View>
    
  }
}

var styles = StyleSheet.create({
    content:{
      flex: 18
    },
    card:{
        margin: 80,
        backgroundColor: 'whitesmoke',
        borderWidth: 5,
        borderColor: 'grey',
        borderRadius: 30
    }
});

export default Popup;