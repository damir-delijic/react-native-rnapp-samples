import React, { Component } from 'react';
import {Text, View, StyleSheet, TextInput, Button, BackHandler } from 'react-native';
import GLOBAL from '../global';
import request from '../requests';

class Register extends Component {
    state = {
      errorMsg: ""
    }

    constructor(props) {
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
  
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    handleBackButtonClick() {
      this.props.onRegister();
      return true;
    }

    onChangeTextUsername = (text) =>{
      this.setState({
        username: text
      });
    }

    onChangeTextPassword = (text) => {
      this.setState({
        password: text
      });
    }

    onChangeConfirmTextPassword = (text) => {
      this.setState({
        confirmPassword: text
      });
    }

    onChangeName = (text) => {
      this.setState({
        name: text
      });
    }

    onChangeKeyword = (text) => {
      this.setState({
        keyword: text
      });
    }

    createAnAccount = () => {
      var check = 1;
      if(this.state.username) check *= this.state.username.length;
      else check = 0;
      if(this.state.password) check *= this.state.password.length;
      else check = 0;
      if(this.state.name) check *= this.state.name.length;
      else check = 0;
      if(this.state.confirmPassword) check *= this.state.confirmPassword.length;
      else check = 0;
      if(this.state.keyword) check *= this.state.keyword.length;
      else check = 0;
        if(check == 0){
          this.setState({errorMsg: "Some fields are empty"});
          return;
        }
        var that = this;
        request({
            urlEnd: "register/" + that.state.username + "/" + that.state.password,
            method: "POST",
            data: {
              name: that.state.name,
              keyword: that.state.keyword
            },
            callback: function(res){
                if(res){
                  console.log(res);
                    that.props.onRegister();
                }else{
                    that.setState({errorMsg: "Username already exists"});
                }
            }
        });
    }

    render() {
        return (
            <View style={[GLOBAL.styles.mainBackgroundColor, styles.container]}>
                <Text style={styles.title}>RNAPP</Text>
                <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
                <TextInput style={styles.usernameInput} onChangeText={this.onChangeTextUsername} value={this.state.username} placeholder="Username" placeholderTextColor={'darkgray'}/>
                <TextInput secureTextEntry={true} style={styles.passwordInput} onChangeText={this.onChangeTextPassword} value={this.state.password} placeholder="Password" placeholderTextColor={'darkgray'} />
                <TextInput secureTextEntry={true} style={styles.passwordInput} onChangeText={this.onChangeConfirmTextPassword} value={this.state.confirmPassword} placeholder="Confirm password" placeholderTextColor={'darkgray'} />
                <TextInput style={styles.usernameInput} onChangeText={this.onChangeName} value={this.state.name} placeholder="Name" placeholderTextColor={'darkgray'}/>
                <TextInput style={styles.usernameInput} onChangeText={this.onChangeKeyword} value={this.state.keyword} placeholder="Keyword" placeholderTextColor={'darkgray'}/>
                <View style={styles.buttonContainer}>
                    <Button title='Register' onPress={this.createAnAccount} color="#DF7356"/>
                </View>
                <Text style={styles.label}>Already have an account?</Text>
                <View style={[styles.buttonContainer, styles.createAnAccount]}>
                  <Button title='Login' onPress={this.handleBackButtonClick}/>
                </View>
            </View>
        );
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
    color:'white'
  },
  usernameInput: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    color: 'darkgray',
    borderRadius: 200
  },
  passwordInput:{
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    color: 'darkgray',
    borderRadius: 200
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

export default Register;