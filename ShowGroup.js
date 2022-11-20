import React, { Component } from 'react';
import {View, StyleSheet, BackHandler, Dimensions, FlatList, Text, Button} from 'react-native';

import request from './requests';
import GLOBAL from './global';
import CredPicker from './CredPicker';

class ShowGroup extends Component {
  state = {
    data: false,
    showCredPicker: false
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

    credPickerBackhandler = (needUpdate) => {
        if(needUpdate){
            this.setState({
                showCredPicker: false,
                data: false
            });
        }else{
            this.setState({
                showCredPicker: false
            })
        }
    }

    showCredPicker = () => {
        this.setState({showCredPicker: true})
    }

  getData = () => {
    var that = this;
    request({
      urlEnd: "groupsToCredentials/" + GLOBAL.user._id + "/" + that.props.id,
      method: "GET",
      callback: function(res){
        if(res){
          that.setState({
            data: res
          });
        }else{
          that.handleBackButtonClick(false);
        }
      }
    });
  }

  render() {
    var screenWidth = Dimensions.get('window').width;
    var screenHeight = Dimensions.get('window').height;
    if(!this.state.data){
        this.getData();
        return(<></>);
    }
    // console.log(this.state.data)
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
                { this.state.showCredPicker ? <CredPicker groupId={this.props.id} backhandler={this.credPickerBackhandler} creds={this.state.data} /> : <></> }
                <FlatList 
                    style={{
                        flex: 1,
                        paddingTop: 20
                    }} 
                    data={this.state.data}
                    renderItem={
                        ({item}) => <Text style={{
                            flex: 1,
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 7,
                            marginBottom: 7,
                            borderBottomWidth: 3,
                            borderBottomColor: "#DF7356",
                            padding: 5,
                            color: "#425A7D",
                            fontWeight: 'bold'
                        }}>{item.name || item._credId}</Text>
                    }
                    />
                <View style={{
                    flex: 0.1,
                    marginLeft: 100,
                    marginRight: 100
                }}>
                    <Button title="Add cred" color={"#425A7D"} onPress={() => {
                        this.showCredPicker();
                    }}/>
                </View>
            </View>
        </View>
    )
  }
}

export default ShowGroup;