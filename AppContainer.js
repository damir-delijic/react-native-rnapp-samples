import React, { Component } from 'react';

import { View } from 'react-native';

import Header from './Header';
import Content from './Content';
import Bubble from './Bubble';
import Navigation from './Navigation';
import request from './requests';
import GLOBAL from './global';

class AppContainer extends Component {

  state = {}

  componentDidMount = () => {
    this.setFirstState();
  }

  setFirstState = () => {
    this.setState({
      bubbleCallback: true,
      activeNavigationElement: 1,
      showSearch: true,
      content: 'creds'
    });
  }

  setSecondState = () => {
    this.setState({
      bubbleCallback: true,
      activeNavigationElement: 2,
      showSearch: true,
      content: 'groups',
    });
  }

  setThridState = () =>{
    this.setState({
      bubbleCallback: false,
      activeNavigationElement: 3,
      showSearch: false,
      content: 'profile'
    });
  }

  navigate = (screenID) => {
    if(this.state.activeNavigationElement == screenID) return;
    if(screenID == 1){
      this.setFirstState();
    }else if(screenID == 2){
      this.setSecondState();
    }else{
      this.setThridState();
    }
  }

  render() {
    if(!this.state.activeNavigationElement){
      console.log("Sprijecen render");
      return (<></>);
    }
    
    var standardView = true;
    // if(this.state.showGroupDialog) standardView = false;

    return(
      <View style={{
        flex:1,
        margin: 5
        }}>
        <Header showSearch={this.state.showSearch}/>
        {standardView ? <Content content={this.state.content}/>  : <></>}
        {standardView ? (this.state.bubbleCallback ? <Bubble /> : <></>) : <></>}
        <Navigation activeNavigationElement={this.state.activeNavigationElement} callback={this.navigate} />
      </View>   
    )
  }
}

export default AppContainer;