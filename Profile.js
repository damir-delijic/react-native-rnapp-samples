import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import GLOBAL from './global';
import EditDialog from './EditDialog';
import request from './requests';

class Profile extends Component {
    state = {
        showEditComponent: false
    }

    editUser = (args) => {
        
        
        if(args.property == 'name') {
            this.state.message = "Edit user name";
            this.state.editCallback = this.editName;
        }
        else if(args.property == 'username'){
            this.state.message = "Edit user username";
            this.state.editCallback = this.editUsername;
        }
        else if(args.property == 'password'){
            this.state.message = "Edit user password";
            this.state.editCallback = this.editPassword;
        }
        else if(args.property == 'keyword') {
            this.state.message = "Edit user keyword";
            this.state.editCallback = this.editKeyword;
        }
        this.setState({showEditComponent: true});
    }

    editName = (text) =>{
        GLOBAL.user.name = text;
        this.setState({showEditComponent: false});
        var that = this;
        request({
            urlEnd: "users/" + GLOBAL.user._id,
            method: "PUT",
            data: GLOBAL.user,
            callback: function(res){
                that.setState({showEditComponent: false});
            }
        });
    }

    editUsername = (text) =>{
        GLOBAL.user.username = text;
        this.setState({showEditComponent: false});
        var that = this;
        request({
            urlEnd: "users/" + GLOBAL.user._id,
            method: "PUT",
            data: GLOBAL.user,
            callback: function(res){
                that.setState({showEditComponent: false});
            }
        });
    }

    editPassword = (text) =>{
        GLOBAL.user.password = text;
        this.setState({showEditComponent: false});
        var that = this;
        request({
            urlEnd: "users/" + GLOBAL.user._id,
            method: "PUT",
            data: GLOBAL.user,
            callback: function(res){
                that.setState({showEditComponent: false});
            }
        });
    }

    editKeyword = (text) =>{
        GLOBAL.user.keyword = text;
        this.setState({showEditComponent: false});
    }

    render() {
        if(this.state.showEditComponent){
            return (<EditDialog 
                callback={this.state.editCallback} 
                message={this.state.message}
                backhandler={() => {this.setState({showEditComponent: false})}}
                />
            );
        }
        return (
            <View style={{
                flex:1,
                // backgroundColor: 'red'
            }}>
                <View style={[qwe.fieldStyle]}>
                    <Text style={[qwe.textStyle]}>
                        Name: <Text style={[qwe.valueTextStyle]}>{GLOBAL.user.name}</Text>
                    </Text>
                    <View style={[qwe.configStyle]}>
                        <TouchableOpacity onPress={() => {this.editUser({property: 'name'})}}>
                            <FontAwesome name="gear" style={{fontSize: 30}} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[qwe.fieldStyle]}>
                    <Text style={[qwe.textStyle]}>
                        Username: <Text style={[qwe.valueTextStyle]}>{GLOBAL.user.username}</Text>
                    </Text>
                    <View style={[qwe.configStyle]}>
                    <TouchableOpacity onPress={() => {this.editUser({property: 'username'})}}>
                            <FontAwesome name="gear" style={{fontSize: 30}} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[qwe.fieldStyle]}>
                    <Text style={[qwe.textStyle]}>
                        Password: <Text style={[qwe.valueTextStyle]}>*******</Text>
                    </Text>
                    <View style={[qwe.configStyle]}>
                    <TouchableOpacity onPress={() => {this.editUser({property: 'password'})}}>
                            <FontAwesome name="gear" style={{fontSize: 30}} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[qwe.fieldStyle]}>
                    <Text style={[qwe.textStyle]}>
                        Keyword: <Text style={[qwe.valueTextStyle]}>{GLOBAL.user.keyword}</Text>
                    </Text>
                    <View style={[qwe.configStyle]}>
                    <TouchableOpacity onPress={() => {this.editUser({property: 'keyword'})}}>
                            <FontAwesome name="gear" style={{fontSize: 30}} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

var qwe = StyleSheet.create({
    textStyle: {
        color: "#2A3240",
        paddingLeft: 20,
        fontWeight: 'bold',
        // fontStyle: 'bold',
        flex: 5,
        // backgroundColor: 'red'
    },
    fieldStyle: {
        height: 50,
        backgroundColor: "#A0C0D6",
        margin: 20,
        marginBottom: 0,
        alignItems: "center",
        flexDirection: 'row'
    },
    configStyle:{
        flex: 1
    },
    valueTextStyle: {
        // color: "gray",
        fontStyle: 'italic',
        fontWeight: '400',
        fontSize: 15,
    }
});

export default Profile;