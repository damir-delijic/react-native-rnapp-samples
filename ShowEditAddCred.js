import React, { Component } from 'react';
import {View, Dimensions,BackHandler, Text, Button} from 'react-native';

import GLOBAL from './global';
import request from './requests';
import EditableText from './EditableText';

class ShowEditAddCred extends Component {
  state = {
    data: false
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

  handleBackButtonClick(needUpdate) {
    if(this.props.backhandler){
        this.props.backhandler(needUpdate);
        return true;
    }else{
        BackHandler.exitApp();
    }
  }

  getData = () => {
    var that = this;
    request({
      urlEnd: "credentials/" + GLOBAL.user._id + "/" + that.props.id,
      method: "GET",
      callback: function(res){
        if(res){
          that.setState({data: res});
        }else{
          that.handleBackButtonClick(false);
        }
      }
    });
  }

  deleteCred = () => {
    var that = this;
    request({
      urlEnd: "credentials/" + GLOBAL.user._id + "/" + that.props.id,
      method: "DELETE",
      callback: function(res){
        if(res){
            that.handleBackButtonClick(true);
        }else{
          that.handleBackButtonClick(false);
        }
      }
    });
  }

  updateCred = () => {
    var that = this;
    request({
      urlEnd: "credentials/" + GLOBAL.user._id + "/" + this.props.id,
      method: "PUT",
      data: that.state.data,
      callback:function(res){
        that.handleBackButtonClick(true);
      }
    });
  }

  createCred = () => {
    var that = this;
    request({
      urlEnd: "credentials/" + GLOBAL.user._id,
      method: "POST",
      data: that.state.data,
      callback:function(res){
        that.handleBackButtonClick(true);
      }
    });
  }

  render() {
    var screenHeight = Dimensions.get('window').height;
    var screenWidth = Dimensions.get('window').width;

    if(!this.state.data && this.props.id){
      this.getData();
      return(<></>)
    }else{
      return (
          <View style={{
              backgroundColor: 'rgba(160, 192, 214, 0.7)',
              position: 'absolute',
              height: screenHeight - 145,
              width: screenWidth - 10,
              zIndex: 10,
              elevation: 5,
              borderRadius: 15
          }}>
              <View style={{
                  flex: 1,
                  backgroundColor: '#A0C0D6',
                  borderColor: "#425A7D",
                  borderWidth: 3,
                  borderRadius: 15,
                  margin: 20,
                  zIndex: 10,
                  paddingBottom: 90,
              }}>
                  <EditableText name="Alias" text={this.state.data ? this.state.data.alias : ""}
                  submit={(text) => {
                    this.state.data.alias = text;
                  }}/>
                  <EditableText name="Site" text={this.state.data ? this.state.data.site : ""}
                  submit={(text) => {
                    this.state.data.site = text;
                  }}/>
                  <EditableText name="Login name" text={this.state.data ? this.state.data.loginName : ""}
                  submit={(text) => {
                    this.state.data.loginName = text;
                  }}/>
                  <EditableText name="Password" text={this.state.data ? this.state.data.password : ""}
                  submit={(text) => {
                    this.state.data.password = text;
                  }}/>
                  <EditableText name="Email" text={this.state.data ? this.state.data.email : ""}
                  submit={(text) => {
                    this.state.data.email = text;
                  }}/>
                  <EditableText name="Data" text={this.state.data ? this.state.data.additionalData : ""}
                  submit={(text) => {
                    this.state.data.additionalData = text;
                  }}/>
                  {/* <EditableText name="Favorite"/> */}
                  <View style={{
                      flex: 1.5,
                      marginLeft: 100,
                      marginRight: 100
                      }}>
                    <Button 
                      color="#425A7D" 
                      title={this.props.id ? "Done" : "Add"} 
                      onPress={() => {
                        if(this.props.id){
                          this.updateCred();
                        }else{
                          this.createCred();
                        }
                      }} />
                  </View>
                  {this.props.id ? <View style={{
                      flex: 1.5,
                      marginLeft: 100,
                      marginRight: 100,
                      marginTop: 10
                      }}>
                    <Button 
                      color="red" 
                      title="Delete" 
                      onPress={() => {
                        this.deleteCred();
                      }} />
                  </View> : <></>}
              </View>
          </View>
      )
    }
  }
}

export default ShowEditAddCred;