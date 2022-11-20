import React, { Component } from 'react';
import { View } from 'react-native';

import Creds from './Creds';
import Groups from './Groups';
import Profile from './Profile';

class Content extends Component {

    render() {
        return (
            <View style={{
                flex:18, 
                backgroundColor: '#E5FAFC',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
            }}>
                {this.props.content == "creds" ? <Creds /> : <></>}
                {this.props.content == "groups" ? <Groups /> : <></>}
                {this.props.content == "profile" ? <Profile /> : <></>}
            </View>
        );
    }
}

export default Content;