import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity } from 'react-native';

class Navigation extends Component {
    state = {
        currentOption: 'Blitz'
    }

    buttonPress(option){
        this.setState({currentOption: option});
        this.props.navigationCallback(option);

    }

    render() {
        return (
            <View style={navigationStyles.container}>
                <NavigationElement name="Blitz" style={navElementStyles.borderRight} active={this.state.currentOption == "Blitz"}  onPressFunction={this.buttonPress.bind(this)}/>
                <NavigationElement name="Favorites" style={navElementStyles.borderRight} active={this.state.currentOption == "Favorites"} onPressFunction={this.buttonPress.bind(this)}/>
                <NavigationElement name="Search" style={navElementStyles.borderRight} active={this.state.currentOption == "Search"} onPressFunction={this.buttonPress.bind(this)}/>
                <NavigationElement name="Add" style={navElementStyles.borderRight} active={this.state.currentOption == "Add"} onPressFunction={this.buttonPress.bind(this)}/>
                <NavigationElement name="Profile" active={this.state.currentOption == "Profile"} onPressFunction={this.buttonPress.bind(this)}/>
            </View>
        );
    }
}

const navigationStyles = StyleSheet.create({
    container: {
        flex: 1.65,
        flexDirection: 'row',
        borderTopWidth: 2,
        borderColor: 'silver'
        // backgroundColor: 'dimgrey',
    },
});

class NavigationElement extends Component{
    state = {}

    styleArrayFunction(active){
        if(active) return [navElementStyles.button, navElementStyles.activeButton]
        else return [navElementStyles.button]
    }

    render(){
        return(
        <View style={[navElementStyles.navElement, this.props.style]}>
            <TouchableOpacity style={this.styleArrayFunction(this.props.active)} 
            onPress={() => {
                this.props.onPressFunction(this.props.name);
                }}>
                <Text>{this.props.name}</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const navElementStyles = StyleSheet.create({
    navElement:{
        flex: 1,
    },  
    button:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton:{
        backgroundColor: 'grey'
    },
    borderRight:{
        borderRightWidth: 2,
        borderColor: 'silver'
    }
});

export default Navigation;