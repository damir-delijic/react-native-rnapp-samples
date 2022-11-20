import React, {Component} from 'react';
import { View } from 'react-native';

import Login from './Components/Login';
import AppContainer from './AppContainer';

class App extends Component{

  state = {
    loggedIn: false,
  }

  showApp = () => {
    this.setState({loggedIn: true});
  }

  render(){
    return (
      <View style={{
        flex:1,
        backgroundColor: '#425A7D'
        }}>
        <AppContainer />
        {/* {this.state.loggedIn ? <AppContainer /> : <Login onLogin={this.showApp} />} */}
      </View>
    );
  }
};

export default App;