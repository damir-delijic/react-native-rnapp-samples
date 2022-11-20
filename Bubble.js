import React, { Component } from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GLOBAL from './global';


class Bubble extends Component {

    callback = () => {
        GLOBAL.bubbleCallback("qwe");
    }

    render() {
        
        var screenWidth = Dimensions.get('window').width;
        var screenHeight = Dimensions.get('window').height;

        return (
            <TouchableOpacity style={{
                backgroundColor: '#DF7356', 
                position: 'absolute', 
                zIndex: 9, 
                width: 80, 
                height: 80, 
                bottom: ((screenHeight / 100) * 20 - 40), 
                right: ((screenWidth / 100) * 20 - 40),
                borderRadius: 200,
                justifyContent: 'center',
                elevation: 4
            }} onPress={this.callback}>
                <Text style={{fontSize: 20, color:'#425A7D', alignSelf: 'center'}}>
                    <FontAwesome name="plus" style={{fontSize: 35}}/>
                </Text>
            </TouchableOpacity>
        );
    }
}

export default Bubble;