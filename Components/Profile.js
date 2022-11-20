import React, { Component } from 'react';
import {BackHandler, View, Text, StyleSheet, Button} from 'react-native';

import cache from '../Data/Cache'
import sendRequest from '../Core/requests';

import Loader from './Loader';
import ListView from './ListView';
import CredDetails from './CredDetails';

class Profile extends Component {
  state = {
  }

  render() {
    return(
        <View style={styles.container}>
            <Text style={[styles.heading]}>Profile</Text>
            <View style={[styles.buttons]}>
                <Button title="Change username" />
            </View>
            <View style={[styles.buttons]}>
                <Button title="Change password" />
            </View>
            <View style={[styles.buttons]}>
                <Button title='Statistics' />
            </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
    container:{
        flex: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    heading:{
        color: 'grey',
        fontSize: 40
    },
    buttons:{
        margin: 20,
    }
});

export default Profile;