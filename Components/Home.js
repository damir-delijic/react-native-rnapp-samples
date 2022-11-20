import React, { Component } from 'react';

import { Text } from 'react-native';

import Navigation from './Navigation';
import Blitz from './Blitz';
import Favorites from './Favorites';
import Search from './Search';

import Profile from './Profile';

var componentMap = {
    "Blitz": Blitz,
    "Favorites": Favorites,
    "Search": Search,
    "Add": Text,
    "Profile": Profile
}

class Home extends Component {
  state = {
    contentComponent: componentMap["Blitz"],
    compStr: "Blitz"
  }

  navigationCallback(option){
    this.setState({
        contentComponent: componentMap[option],
        compStr: option
    });
  }

  render() {
    var Scene = this.state.contentComponent;
    return(
      <>
        <Scene>{this.state.compStr}</Scene>
        <Navigation navigationCallback={this.navigationCallback.bind(this)} />
      </>   
    )
  }
}

export default Home;