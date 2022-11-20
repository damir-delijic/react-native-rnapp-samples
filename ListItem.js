import React, { Component } from 'react';
import {Text, StyleSheet, View } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

class ListItem extends Component {
  
  render() {
    // console.log(this.props.favorite)
    return(
      <View style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#E5FAFC',
        padding: 20,
        borderBottomWidth: 2,
        marginRight: 10,
        marginLeft: 10,
        borderBottomColor: "#DF7356"
        }}>
        <View style={{flex: 5}}>
          <Text style={{
            textAlign: "left",
            color: "grey",
            fontWeight: 'bold',
            fontSize: 17
          }} onPress={() => {
            this.props.itemClick(this.props.id);
          }}>{this.props.left}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{
            textAlign: "right",
            justifyContent: 'center',
            alignItems: 'center',
            color: "grey"
          }}>{this.props.favorite ? <FontAwesome name="star" style={{fontSize: 18}} /> : <></>}{"  "}{this.props.right}</Text>
        </View>
      </View>
    )
  }
}

export default ListItem;