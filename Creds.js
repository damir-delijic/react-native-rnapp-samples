import React, { Component } from 'react';
import { View } from 'react-native';

import ListView from './ListView';
import Loader from './Loader';
import Legend from './Legend';
import GLOBAL from './global';
import request from './requests';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShowEditAddCred from './ShowEditAddCred';

class Creds extends Component {
 
    state = {
        data: false,
        showCred: false,
    }

    constructor(props){
        super(props)
        GLOBAL.search = this.onSearch;
        GLOBAL.bubbleCallback = this.bubbleCallback;
    }

    bubbleCallback = () => {
        this.setState({
            showCred: "add"
        });
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
    
    getCreds = () =>{
        var that = this;
        request({
            urlEnd: "credentials" + "/" + GLOBAL.user._id,
            method: "GET",
            callback: function(res){
                if(res){
                  that.state.allData = res;
                  that.setState({
                    data: res,
                  });
                }else{
                  console.log("Error", res);
                }
            }
        });
    }

    showCred = (id) =>{
        // console.log(id);
        this.setState({
            showCred: "showEdit",
            credID: id
        });
    }

    render() {
        
        if(!this.state.data){
            this.getCreds();
            return(<Loader />)
        }else{
            return(
                <View style={{
                    flex: 1,
                    }}>
                    {this.state.showCred ? 
                        (this.state.showCred == "add" ? 
                            <ShowEditAddCred type="add" backhandler={(needUpdate) => {
                                if(needUpdate){
                                    this.setState({
                                        showCred: false,
                                        data: false
                                    })
                                }else{
                                    this.setState({
                                        showCred: false,
                                    })
                                }
                            }}/> 
                            : 
                            <ShowEditAddCred type="showEdit" id={this.state.credID} 
                                backhandler={(needUpdate) => {
                                if(needUpdate){
                                    this.setState({
                                        showCred: false,
                                        data: false
                                    })
                                }else{
                                    this.setState({
                                        showCred: false
                                    })
                                }
                            }}/>
                        ) 
                        : 
                        <></>
                    }
                    <Legend leftColumn="Name" rightColumn="Frequency"></Legend>

                    <View style={{flex: 18}}>
                        <ListView obj={
                            {
                                data: this.state.data,
                                contentLeft: {
                                    component: <></>,
                                    content: "alias",
                                    alternative: "_id"
                                },
                                contentRight:{
                                    component: <></>,
                                    content: "frequency",
                                    alternative: "favorite"
                                },
                                dataForRequest:"_id",
                                itemClick: this.showCred,
                                favorite: true
                            }
                        }></ListView>
                    </View>
                </View>
            )
        }
    }
}

export default Creds;