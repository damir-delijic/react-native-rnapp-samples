import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import ListView from './ListView';
import Loader from './Loader';
import Legend from './Legend';
import GLOBAL from './global';
import request from './requests';
import EditDialog from './EditDialog';
import ShowGroup from './ShowGroup';

class Creds extends Component {
 
    state = {
        data: false,
        showDialogue: false,
        showGroup: false
    }
    
    constructor(props){
        super(props)
        GLOBAL.search = this.onSearch;
        GLOBAL.bubbleCallback = this.bubbleCallback;
    }

    bubbleCallback = (args) => {
        this.setState({showDialogue: true})
    }

    onSearch = (text) => {
        if(text == ""){
            this.setState({data: this.state.allData});
        }else{
            var newItems = []
            for(var i = 0; i < this.state.allData.length; i++){
                var obj = this.state.allData[i];
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
                data: newItems
            });
        }
    }

    getGroups = () =>{
        var that = this;
        request({
            urlEnd: "groups" + "/" + GLOBAL.user._id,
            method: "GET",
            callback: function(res){
                if(res){
                    that.state.allData = res;
                  that.setState({
                    data: res
                  });
                }else{
                  console.log("Error", res);
                }
            }
        });
    }

    showGroup = (id) => {
        console.log(id);
        this.state.groupID = id;
        this.setState({showGroup: true});
    }

    hideGroup = (toReset) => {
        this.setState({showGroup: false});
    }

    render() {
        if(!this.state.data){
            this.getGroups();
            return(<Loader />)
        }else{
            return(
                <View style={{
                    flex: 1,
                    }}>
                    {this.state.showDialogue ? <EditDialog 
                        message="Group name" 
                        backhandler={() => {this.setState({showDialogue: false})}}
                        callback={(text) => {
                            var that = this;
                            // console.log(text);
                            request({
                                urlEnd: "groups/" + GLOBAL.user._id + "/" + text,
                                method: "POST",
                                callback: function(res){
                                    if(res){
                                      that.state.allData = res;
                                      that.setState({
                                        data: false,
                                        showDialogue: false
                                      });
                                    }else{
                                        that.setState({
                                            showDialogue: false,
                                        });
                                    }
                                }
                            });
                            
                            
                         }
                        }
                        /> : <></>}
                    <Legend leftColumn="Name" rightColumn=""></Legend>
                    {this.state.showGroup ? <ShowGroup id={this.state.groupID} backhandler={this.hideGroup}/> : <></>}
                    <View style={{flex: 18}}>
                        <ListView obj={
                            {
                                data: this.state.data,
                                contentLeft: {
                                    component: <></>,
                                    content: "name",
                                    alternative: "_id"
                                },
                                contentRight:{
                                    component: <></>,
                                    content: ""
                                },
                                dataForRequest:"_id",
                                itemClick: this.showGroup
                            }
                        }></ListView>
                    </View>
                </View>
            )
        }
    }
}

export default Creds;