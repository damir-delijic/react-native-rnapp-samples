import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, Button } from 'react-native';

import Register from './Register';
import request from '../requests';
import GLOBAL from '../global';

class Login extends Component {
    state = {
        renderRegister: false,
        errorMsg: ""
    }

    constructor(props){
        super(props);
    }

    onChangeTextUsername = (text) => {
        // this.state.username = text;
        this.setState({
            username: text
        });
    }

    onChangeTextPassword = (text) => {
        this.setState({
            password: text
        });
    }

    setUser = (user) => {
        user.password = this.password;
        GLOBAL.user = user;
    }

    showApp = (user) =>{
        this.setUser(user);
        this.props.onLogin();
    }

    createAnAccount = () => {
        this.setState({renderRegister: true})
    }

    login = () => {
        var check = 1;
        if(this.state.username) check *= this.state.username.length;
        else check = 0;
        if(this.state.password) check *= this.state.password.length;
        else check = 0;
        if(check == 0){
            this.setState({
                errorMsg: "Some fields are empty"
            });
            this.state.username = "";
            this.state.password = "";
            return;
        }
        var that = this;
        request({
            urlEnd: "login/" + that.state.username + "/" + that.state.password,
            method: "GET",
            callback: function(res){
                if(res){
                    that.showApp(res);
                }else{
                    that.setState({errorMsg: "Wrong username or password"});
                }
            }
        });
    }

    showLogin = () => {
        this.setState({renderRegister: false})
    }

    render() {
        if(this.state.renderRegister){
            return(<Register onRegister={this.showLogin}/>);
        }else{
            return (
                <View style={[GLOBAL.styles.mainBackgroundColor, styles.container]}>
                    <Text style={styles.title}>RNAPP</Text>
                    <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
                    <TextInput style={styles.usernameInput} onChangeText={this.onChangeTextUsername} value={this.state.username} placeholder="Username" placeholderTextColor={'darkgray'}/>
                    <TextInput secureTextEntry={true} ref={(input) => {this.secondTextInput = input;}} style={styles.passwordInput} onChangeText={this.onChangeTextPassword} value={this.state.password} placeholder="Password" placeholderTextColor={'darkgray'} />
                    <View style={styles.buttonContainer}>
                        <Button title='Login' onPress={this.login}/>
                    </View>
                    <Text style={styles.label}>Dont have an account?</Text>
                    <View style={[styles.buttonContainer, styles.createAnAccount]}>
                        <Button title='Create an account' onPress={this.createAnAccount} color="#DF7356"/>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title:{
    alignSelf: 'center',
    marginBottom: 20,
    fontSize: 48,
    color: '#DF7356',
    fontWeight: '500'
  },
  label:{
    alignSelf: 'center',
    color: 'white'
  },
  usernameInput: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 200,
    color: 'darkgray'
  },
  passwordInput:{
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 200,
    color: 'darkgray'
  },
  buttonContainer:{
    margin: 12,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  createAnAccount:{
    paddingRight: 85,
    paddingLeft: 85
  },
  errorMsg:{
    marginBottom: 10,
    alignSelf: 'center',
    color: 'yellow'
  }
});

export default Login;