import React, { Component } from 'react';
import {BackHandler} from 'react-native';

import cache from '../Data/Cache'
import sendRequest from '../Core/requests';

import Loader from './Loader';
import ListView from './ListView';
import CredDetails from './CredDetails';

class Blitz extends Component {
  state = {
    isCached: false,
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
    BackHandler.exitApp();
  }

  getData(){ 
    var that = this;
    sendRequest({
      urlEnd: "credentials/top/" + cache.data.user._id,
      method: "GET",
      callback: function(res){
          if(res){
            cache.setData({dataType: "topCredentials", data: res})
            that.setState({isCached: true});
          }else{
            console.log("Error", res);
          }
      }
    });
  }

  render() {
    if(!this.state.isCached){
      this.getData()
      return (<Loader/>)
    }else{
      var items = cache.data.topCredentials;
      var obj = {
        data: items,
        contentLeft: {
          component: <></>,
          content: "alias",
          alternative: "_id"
        },
        contentRight:{
          component: <></>,
          content: "frequency"
        },
        dataForRequest:"_id",
        itemClickComponentRender: CredDetails
      }
      return(
        <ListView obj={obj}/>
      );
    }
  }
}

export default Blitz;