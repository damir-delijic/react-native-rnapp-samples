import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GLOBAL from './global';

class Header extends Component {

    search = (text) => {
        GLOBAL.search(text);
    }

    render() {
        return (
            <View style={{
                flex: 2, 
                backgroundColor: '#E5FAFC',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                marginBottom: 3,
                flexDirection: 'row',
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 5
                }}>
                    <View style={{
                        backgroundColor: "#425A7D",
                        flex: 1,
                        justifyContent: 'center',
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: this.props.showSearch ? 0 : 15,
                        alignItems: 'center'
                        }}>
                        <Text style={{
                            marginLeft: 10,
                            color: "#DF7356",
                            fontSize: 20,
                            fontWeight: 'bold',
                            
                        }}>RNAPP</Text>
                    </View>
                </View>
                {this.props.showSearch ? <View style={[
                    {
                        flex: 2,
                        justifyContent: 'center',
                        padding: 5
                    }
                ]}>
                    {this.props.showSearch ? <TouchableOpacity style={{
                        alignItems: 'flex-end'
                    }} >
                        <Search callback={this.search}/>
                        {/* <Text style={{
                            marginRight: 40,
                            color: "#6BC6A5",
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Search</Text> */}
                    </TouchableOpacity> : <></>}
                </View> : <></>}
            </View>
        );
    }
}

class Search extends Component{
    state = {
        text: '',
        textAlign: 'right',
        placeholder: 'Search...',
        isFirst: true
    }

    onChangeText = (text) => {
        this.setState({text: text, isFirst: false})

    }

    onSubmitText = () => {
        this.props.callback(this.state.text);
    }

    render(){
        if(this.state.text == "" && !this.state.isFirst){
            this.state.isFirst = true
            setTimeout(() => {
                this.props.callback(this.state.text)
            }, 1000);
        }
        return(
        <TextInput style={{
            width: "100%",
            fontSize: 20,
            fontWeight: '400',
            fontStyle: 'italic',
            borderColor: 'gray',
            borderWidth: 2,
            textAlign: this.state.textAlign,
            borderTopRightRadius: 15,
            paddingRight: 20,
            color: 'grey',
            
            }} 
            placeholder={this.state.placeholder} 
            placeholderTextColor={'grey'} 
            onFocus={()=>{this.setState({textAlign: 'left', placeholder: ''})}}
            cursorColor="#425A7D"
            onBlur={() => this.setState({textAlign:'right', placeholder: 'Search...'})}
            onChangeText={this.onChangeText} 
            onSubmitEditing={this.onSubmitText}
        />);
    }
}

export default Header;