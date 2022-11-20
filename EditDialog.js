import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput,BackHandler } from 'react-native';

import GLOBAL from './global';

class EditDialog extends Component {
    state = {
       
    }

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      handleBackButtonClick() {
        if(this.props.backhandler){
            this.props.backhandler();
            return true;
        }else{
            BackHandler.exitApp();
        }
      }

        submit = (text) => {
            this.props.callback(text);
        }

    render() {
        var screenHeight = Dimensions.get('window').height;
        var screenWidth = Dimensions.get('window').width;
        return (
            <View style={{
                position: 'absolute',
                backgroundColor: 'rgba(160, 192, 214, 0.7)',
                width: screenWidth - 10,
                height: screenHeight - 145,
                zIndex: 7,
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 250,
                paddingTop: 150,
                elevation:5,
                borderRadius: 15
            }}>
                <View style={{
                    flex: 1, 
                    backgroundColor: 'rgba(160, 192, 214, 1)',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 3,
                    borderColor: "#425A7D",
                    borderRadius: 15,
                    paddingTop: 30,
                    opacity: 1,
                    elevation: 7
                    }}>
                        <Text style={{fontSize: 20, marginBottom: 30, color: '#425A7D', fontWeight: 'bold'}}>
                            {this.props.message}
                        </Text>
                        <TextInput style={{
                            width: "90%",
                            fontSize: 20,
                            fontWeight: '400',
                            fontStyle: 'italic',
                            borderColor: '#425A7D',
                            borderWidth: 2,
                            borderRadius: 15,
                            paddingRight: 10,
                            paddingLeft: 10,
                            textAlign: 'center',
                            color: '#425A7D',
                            }} onSubmitEditing = {(event) => (this.submit(event.nativeEvent.text))}
                            cursorColor="#425A7D"
                            >

                            </TextInput>
                </View>
            </View>
        );
    }
}

export default EditDialog;