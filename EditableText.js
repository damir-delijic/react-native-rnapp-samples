import React, { Component } from 'react';
import {View, StyleSheet, Text, Button, BackHandler, TextInput} from 'react-native';

class EditableText extends Component {

  state = {
    editTextMode: false
  }

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.currentText = this.props.text;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if(this.state.editTextMode){
        this.setState({editTextMode: false})
        return true;
    }
  }

  onSubmit = (text) => {
    this.currentText = text;
    this.setState({editTextMode: false});
    if(this.props.callback) this.props.callback(text);
  }

  onSubmitText = () =>{
    console.log(this.currentText)
    this.setState({
      editTextMode: false,
    });
    this.props.submit(this.currentText);
  }

  onChangeText = (text) => {
    this.currentText = text;
  }

  render() {
    return(
      <View style={{
        flexDirection: 'row',
        flex: 1,
        margin: 15
        }}>
          <Text style={{
            flex: 1,
            backgroundColor: '#425A7D',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            color: "white",
            fontWeight: 'bold',
            textAlignVertical: 'center',
            textAlign: 'center'
            }}>{this.props.name}</Text>
          {!this.state.editTextMode ? <Text style={{
            flex: 2,
            overflow: 'hidden',
            borderBottomColor: "#425A7D",
            borderBottomWidth: 2,
            textAlign: 'center',
            textAlignVertical: 'center'
            }} onPress={()=>{
              this.setState({editTextMode: true});
            }}>
              {this.currentText}
            </Text> 
            : 
            <TextInput style={{
              flex: 2,
              overflow: 'hidden',
              borderBottomColor: "#425A7D",
              borderBottomWidth: 2,
              padding: 0,
              paddingLeft: 5,
              paddingRight: 5,
              marginLeft: 5,
              marginRight: 5
              }} 
              cursorColor="#425A7D" 
              onSubmitEditing={this.onSubmitText}
              onChangeText={this.onChangeText} 
              /> 
            }
      </View>
  );
  }
}

export default EditableText;