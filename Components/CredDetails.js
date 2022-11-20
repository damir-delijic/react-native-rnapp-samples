import React, { Component } from 'react';
import {View, StyleSheet, Text, Button, BackHandler, TextInput} from 'react-native';

import cache from '../Data/Cache'
import sendRequest from '../Core/requests';

import Loader from './Loader';
import ButtonConfirm from './ButtonConfirm';
import EditableText from './EditableText';

class CredDetails extends Component {

  state = {
    data: false
  }

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.editMode = false;
    this.tempData = {}
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if(this.state.editMode){
      this.setState({editMode: false})
    }else{
      this.props.closeComponentCallback();
    }
    return true;
  }

  removeFavorite = () => {
    var newData = this.state.data;
    newData.favorite = false
    this.setState({
      data: newData
    });
    sendRequest({
      urlEnd: "credentials/" + cache.data.user._id + "/" + this.props.id,
      method: "PUT",
      data: newData,
      callback:function(res){
        console.log(res);
      }
    });
    // console.log("Remove favorite");
  }

  addFavorite = () => {
    var newData = this.state.data;
    newData.favorite = true;
    this.setState({
      data: newData
    });

    sendRequest({
      urlEnd: "credentials/" + cache.data.user._id + "/" + this.props.id,
      method: "PUT",
      data: newData,
      callback:function(res){
        console.log(res);
      }
    });
    // console.log("Add favorite");
  }

  deleteCred = () => {
    var that = this;
    sendRequest({
      urlEnd: "credentials/" + cache.data.user._id + "/" + this.props.id,
      method: "DELETE",
      callback: function(res){
        if(res){
          that.props.closeComponentCallback("deleted");
        }else{
          console.log("error", res);
        }
      }
    });
  }

  getData(){ 
    var that = this;
    sendRequest({
      urlEnd: "credentials/" + cache.data.user._id + "/" + this.props.id,
      method: "GET",
      callback: function(res){
        if(res){
          that.setState({data: res});
        }else{
          console.log("Error", res);
        }
      }
    });
  }

  updateCred = () => {
    var newData = JSON.parse(JSON.stringify(this.tempData))
    this.setState({
      data: newData,
      editMode: false
    });
    sendRequest({
      urlEnd: "credentials/" + cache.data.user._id + "/" + this.props.id,
      method: "PUT",
      data: newData,
      callback:function(res){
        console.log(res);
      }
    });
    
  }

  render() {
    if(!this.state.data){
        this.getData()
        return (<Loader/>)
    }else{
      this.tempData = JSON.parse(JSON.stringify(this.state.data));
      if(this.state.editMode){
        return(
          <View style={styles.content}>
            <View style={styles.card}>
              <EditableText callback={(text) => {this.tempData.alias = text}} tagNomen="Alias: " style={[styles.colorLetters, styles.editModeMargin]} text={this.state.data.alias || "None" }></EditableText>
              <EditableText callback={(text) => {this.tempData.loginName = text}} tagNomen="Login name: " style={[styles.colorLetters, styles.editModeMargin]} text={this.state.data.loginName || "None"}></EditableText>
              <EditableText callback={(text) => {this.tempData.password = text}} tagNomen="Password: " style={[styles.colorLetters, styles.editModeMargin]} text={this.state.data.password || "None"}></EditableText>
              <EditableText callback={(text) => {this.tempData.site = text}} tagNomen="Site: " style={[styles.colorLetters, styles.editModeMargin]} text={this.state.data.site.substring(0,35) + " ..."}></EditableText>
              <EditableText callback={(text) => {this.tempData.email = text}} tagNomen="Email: " style={[styles.colorLetters, styles.editModeMargin]} text={this.state.data.email || "None"}></EditableText>
              <EditableText callback={(text) => {this.tempData.additionalData = text}} tagNomen="Additional data: " style={[styles.colorLetters, styles.editModeMargin]} text={this.state.data.additionalData || "None"}></EditableText>
              
              <Button title='Save' onPress={this.updateCred}></Button>
            </View>
          </View>
        );
      }else{
        return(
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={[styles.colorLetters]}>{"Alias: " + this.state.data.alias}</Text>

              <Text style={[styles.colorLetters, styles.bold]}>{"Login name: " + this.state.data.loginName}</Text>
              <Text style={[styles.colorLetters, styles.bold]}>{"Password: " + this.state.data.password}</Text>

              <Text style={[styles.colorLetters]}>{"Site: " + this.state.data.site.substring(0,35) + " ..."}</Text>
              <Text style={[styles.colorLetters]}>{"Email: " + this.state.data.email }</Text>
              <Text style={[styles.colorLetters]}>{"Additional data: " + this.state.data.additionalData}</Text>
            
              <View style={[styles.buttonViews]}>
                {this.state.data.favorite ? 
                  <ButtonConfirm title='Remove favorite' onConfirmation={this.removeFavorite}/> 
                  : 
                  <ButtonConfirm title='Add favorite' onConfirmation={this.addFavorite}/>}
              </View>
              <View style={[styles.buttonViews]}>
                <ButtonConfirm title="Delete" onConfirmation={this.deleteCred} />
              </View>
              <View style={[styles.buttonViews, styles.simpleButton]}>
                <View style={styles.marginRight}>
                  <Button title='Add to Group'/>
                </View>
                <View style={styles.marginRight}>
                  <Button title='Edit' onPress={() => {
                    this.setState({
                      editMode: true
                    });
                  }}/>
                </View>
                <View style={styles.marginRight}>
                  <Button title='Close' onPress={() => this.props.closeComponentCallback()}/>
                </View>  
              </View>
            </View>
          </View>
        )
      }  
    }
  }
}

var styles = StyleSheet.create({
  content:{
    flex: 10,
  },
  card:{
    padding: 20,
    backgroundColor: "white",
    flex: 1,  
    borderBottomWidth: 2,
    borderColor: "silver"
  },
  colorLetters:{
    color: 'grey',
    margin: 4
  },
  bold:{
    fontWeight: 'bold'
  },
  buttonViews: {
    flex: 1,
    margin: 5
  },
  simpleButton:{
    flexDirection: 'row'
  },
  marginRight:{
    flex: 1,
    marginRight: 5
  },editModeMargin:{
    margin: 20
  }

});

export default CredDetails;