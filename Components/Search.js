import React, { Component } from 'react';
import {BackHandler, StyleSheet, TouchableOpacity, View, Text, TextInput} from 'react-native';

import cache from '../Data/Cache'
import sendRequest from '../Core/requests';

import Loader from './Loader';
import ListView from './ListView';
import CredDetails from './CredDetails';

class Search extends Component {
  state = {
    isCached: false,
    filter: "credentials",
    items: []
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
      urlEnd: that.state.filter + "/" + cache.data.user._id,
      method: "GET",
      callback: function(res){
          if(res){
            cache.setData({dataType: that.state.filter, data: res})
            that.setState({
                isCached: true,
                filter: that.state.filter,
                items: cache.data[that.state.filter]
            });
          }else{
            console.log("Error", res);
          }
      }
    });
  }

  onSearch = (text) =>{
    var newItems = []
    var oldItems = cache.data[this.state.filter];
    for(var i = 0; i < oldItems.length; i++){
        var obj = oldItems[i];
        for(var prop in obj){
            if(typeof obj[prop] == "string"){
                var contains = obj[prop].indexOf(text) !== -1;
                // console.log(contains)
                if(contains){
                    newItems.push(obj);
                    break;
                }
            }
        }
    }
    this.setState({
        items: newItems
    });
  }

  render() {
    if(!this.state.isCached){
      this.getData()
      return (<Loader/>)
    }else{
    //   this.items = cache.data[this.state.filter];
      var obj = {
        data: this.state.items,
        contentLeft: {
          component: <></>,
          content: this.state.filter == "credentials" ? "alias" : "name",
          alternative: "_id"
        },
        contentRight:{
          component: <></>,
          content: ""
        },
        dataForRequest:"_id",
        itemClickComponentRender: this.state.filter == "credentials" ? CredDetails : <></>
      }
      return(
        <View style={styles.content}>
            <View style={[styles.filters]}>
                <TouchableOpacity 
                    style={[
                        styles.credsFilter, 
                        this.state.filter == "credentials" ? styles.selected : styles.notSelected 
                    ]} onPress={() => {
                        if(this.state.filter == "credentials") return;
                        this.setState({
                            isCached: false,
                            filter: "credentials"
                        });
                    }}>
                        <Text style={[
                            styles.filterText, 
                            this.state.filter == "credentials" ? styles.selected : styles.notSelected 
                        ]}>Credentials</Text>
                    </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.grpsFilter, 
                        this.state.filter == "groups" ? styles.selected : styles.notSelected
                    ]} onPress={() => {
                        if(this.state.filter == "groups") return;
                        this.setState({
                            isCached: false,
                            filter: "groups"
                        });
                    }}>
                        <Text style={[
                            styles.filterText, 
                            this.state.filter == "groups" ? styles.selected : styles.notSelected ]}>Groups</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchBar} 
                    onSubmitEditing = {(event) => (this.onSearch(event.nativeEvent.text))}
                    placeholderTextColor="grey"
                    placeholder="Search"
                />
            </View>
            <ListView obj={obj}/>
        </View>
        
      );
    }
  }
}

var styles = StyleSheet.create({
    content:{
        flex: 18
    },
    filters:{
        flex:2,
        flexDirection:"row",
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: 'silver'
    },
    credsFilter:{
        flex: 1,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'silver'
    },
    grpsFilter:{
        flex: 1,
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderColor: 'silver'

    },
    selected:{
        opacity: 1,
        fontWeight: 'bold',
    },
    notSelected:{
        opacity: 0.5,
    },
    filterText:{
        textAlign: 'center',
        fontSize: 20,
        color: 'grey',
    },
    searchContainer:{
        flex: 3,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: "silver",
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar:{
        height: 40,
        margin: 20,
        width: "50%",
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 20,
        padding: 10,
        color: "grey",
    }
});

export default Search;