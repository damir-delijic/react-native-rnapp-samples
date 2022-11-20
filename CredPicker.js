import React, { Component } from 'react';
import {View, BackHandler, Dimensions, FlatList, Button, Text} from 'react-native';

import request from './requests';
import GLOBAL from './global';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class CredPicker extends Component {
    state = {
        data: false
    }

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.selectedCredentials = []
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

      getCreds = () => {
        var that = this;
        request({
            urlEnd: "credentials/" + GLOBAL.user._id,
            method: "GET",
            callback: function(res){
                if(res){
                    var qwe = [];
                    for(var i = 0; i < res.length; i++){
                        var cred = res[i];
                        var ima = false;
                        for(var j = 0; j < that.props.creds.length; j++){
                            if(cred._id == that.props.creds[j]._credId){
                                ima = true;
                                break;
                            }
                        }
                        if(!ima){
                            qwe.push(cred);
                        }
                    }
                that.setState({
                    data: qwe
                });
                }else{
                    that.handleBackButtonClick(false);
                }
            }
        });
      }

      selectCred = (id) => {
        var i;
        for(i = 0; i < this.selectedCredentials.length; i++){
            var cred = this.selectedCredentials[i];
            if(cred[i] == id){
                this.selectedCredentials.splice(i, 1);
                break;
            }
        }
        if(i == this.selectedCredentials.length){
            this.selectedCredentials.push(id);
        }
      }

      addCredentials = () => {
        if(this.selectedCredentials.length > 0){
            var that = this;
            request({
                urlEnd: "groupsToCredentials/" + GLOBAL.user._id + "/" + this.props.groupId,
                method: "POST",
                data: that.selectedCredentials,
                callback: function(res){
                    if(res){
                        that.handleBackButtonClick(true);
                    }else{
                        that.handleBackButtonClick(false);
                    }
                }
            });
            
        }else{
            this.handleBackButtonClick(false);
        }
      }

    render() {
        if(!this.state.data){
            this.getCreds();
            return(<></>)
        }
        var screenWidth = Dimensions.get('window').width;
        var screenHeight = Dimensions.get('window').height;
        return (
            <View style={{
                position: 'absolute',
                backgroundColor: '#E5FAFC',
                height: screenHeight - 230,
                width: screenWidth - 100,
                top: 20,
                left: 20,
                zIndex: 10,
                borderRadius: 15,
                borderWidth: 3,
                borderColor: "#425A7D"
                }}>
                    <FlatList 
                        style={{
                            flex: 1
                        }}
                        data={this.state.data}
                        renderItem={
                            ({item}) => <Select item={item} selectCallback={this.selectCred}/>
                        }
                    />
                    <View style={{
                        flex: 0.1,
                        marginTop: 20,
                        marginLeft: 100,
                        marginRight: 100,
                        paddingTop: 20
                    }}>
                        <Button title='Done' color="#425A7D" onPress={() => {
                            this.addCredentials();
                        }}/>
                    </View>
            </View>
            )
    }
}

class Select extends Component {

    state={
        selected: false
    }

    render(){
        var item = this.props.item
        var callback = this.props.selectCallback;
        return(
           <View style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 20,
            marginRight: 20,
            borderBottomWidth: 3,
            borderBottomColor: "#2A3240",
            marginTop: 5,
            marginBottom: 5,
            overflow: 'hidden'
           }}>
             <Text style={{
                flex: 7, 
                color: '#425A7D',
                fontWeight: 'bold',
                padding: 3,
                overflow: 'hidden'
            }}
            onPress={()=>{
                this.setState({selected: true})
                callback(item._id);
            }}
            >{item.alias || item._id}</Text>
            <Text style={{flex: 1, textAlign: 'center', textAlignVertical: 'center', color: "#DF7356"}}>
                {this.state.selected ? <FontAwesome name='check' style={{fontSize: 20}}/> : ""}
            </Text>
           </View>
        );
    }
}

export default CredPicker;