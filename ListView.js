import React, { Component } from 'react';
import {View, FlatList } from 'react-native';

import ListItem from './ListItem';

class ListView extends Component {
 
  render() {
    // console.log(this.props.obj.favorite)
    return(
      <FlatList 
          style={{flex: 1}} 
          data={this.props.obj.data} 
          renderItem={
            ({item}) => 
            <ListItem 
              left={item[this.props.obj.contentLeft.content] || item[this.props.obj.contentLeft.alternative]} 
              right={item[this.props.obj.contentRight.content]} 
              id={item[this.props.obj.dataForRequest]} 
              itemClick={this.props.obj.itemClick}
              callbackWithRef={this.closeOpenComponent}
              favorite={this.props.obj.favorite ? item.favorite : false}
            />
          } 
        />
    )
  }
}

export default ListView;