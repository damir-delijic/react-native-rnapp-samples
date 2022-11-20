import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Navigation extends Component {
    
    render() {
        return (
            <View style={{
                flex:2, 
                backgroundColor: '#E5FAFC',
                // borderBottomLeftRadius: 15,
                // borderBottomRightRadius: 15,
                borderRadius: 15,
                marginTop: 5,
                flexDirection: 'row',
                elevation: 7
                }}>
                    <View style={[
                        qwe.navigationElement
                        ]}>
                        <TouchableOpacity style={[
                            qwe.touchable,
                            this.props.activeNavigationElement == 1 ? qwe.activeElement : {}
                            ]} onPress={() => {this.props.callback(1)}}>
                                <Text style={[qwe.touchableText]}>
                                <FontAwesome name="lock" style={{fontSize: 30}}/>
                                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[
                        qwe.navigationElement
                        ]}>
                        <TouchableOpacity style={[
                            qwe.touchable,
                            this.props.activeNavigationElement == 2 ? qwe.activeElement : {}
                            ]} onPress={() => {this.props.callback(2)}}>
                                <Text style={[qwe.touchableText]}>
                                <FontAwesome name="folder" style={{fontSize: 30}}/></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[
                        qwe.navigationElement
                        ]}>
                        <TouchableOpacity style={[
                            qwe.touchable,
                            this.props.activeNavigationElement == 3 ? qwe.activeElement : {}
                            ]} onPress={() => {this.props.callback(3)}}>
                                <Text style={[qwe.touchableText]}>
                                <FontAwesome name="user" style={{fontSize: 30}}/>
                                </Text>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }
}

const qwe = StyleSheet.create({
    navigationElement: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchable:{
        width: 50,
        height: 50,
        backgroundColor: '#425A7D',
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeElement: {
        backgroundColor:"#DF7356" 
    },
    touchableText: {
        color: 'white',
        fontSize: 15
    }
});

export default Navigation;