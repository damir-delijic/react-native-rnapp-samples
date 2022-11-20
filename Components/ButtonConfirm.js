import React, { Component } from 'react';
import {View, StyleSheet, Text, Button, BackHandler} from 'react-native';

class ButtonConfirm extends Component {

  state = {
    isExpanded: false
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
    this.setState({
        isExpanded: false
    });
  }

  render() {
    var isExpanded = this.state.isExpanded;
    if(isExpanded){
        return (
            <View style={[styles.content]}>
                <View style={[styles.marginRight]}>
                    <Button title={this.props.title} onPress={() => this.setState({isExpanded: false})}></Button>
                </View>
                <View style={[styles.marginRight]}>
                    <Button title="Confirm" onPress={() => {
                        this.props.onConfirmation();
                        this.setState({isExpanded: false});
                    }} />
                </View>
                <View style={[styles.marginRight]}>
                    <Button title='Cancel' onPress={() => {
                        if(this.props.onCancelation) this.props.onCancelation();
                        this.setState({isExpanded: false});
                    }}/>
                </View>
            </View>
        );
    }else{
        return(
        <View style={[styles.content]}>
            <Button title={this.props.title} onPress={() => this.setState({isExpanded: true})}></Button>
        </View>  
        );
    }
  }
}

var styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row'
    },
    marginRight: {
        marginRight: 5,
        flex: 1
    }
});

export default ButtonConfirm;