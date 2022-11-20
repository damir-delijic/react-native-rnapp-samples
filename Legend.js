import React, { Component } from 'react';
import { View, Text} from 'react-native';

class Legend extends Component {
 
  render() {
    return(
        <View style={{
            flex: 2,
            backgroundColor: '#425A7D',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            elevation: 7,
            flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: "center"
                    }}>
                        <Text style={{color: "#E5FAFC", borderRightColor: this.props.rightColumn != "" ? "#E5FAFC" : "#425A7D", borderRightWidth: this.props.rightColumn != "" ? 1 : 0, width:"100%", textAlign: 'center'}}>{this.props.leftColumn}</Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: "center"
                    }}>
                        <Text style={{color: "#E5FAFC", borderLeftColor: this.props.rightColumn != "" ? "#E5FAFC" : "#425A7D", borderLeftWidth: this.props.rightColumn != "" ? 1 : 0, width: "100%", textAlign: 'center'}}>{this.props.rightColumn}</Text>
                </View>
        </View>
    )
  }
}

export default Legend;