import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import CircleOfFifthsReference from './circle-of-fifths';

class References extends Component {
  render() {
    return (
      <Swiper showButtons={true} index={this.props.index} >
        <CircleOfFifthsReference />
      </ Swiper>
    );
  }
};

// component
// accessed by the Main Menu sidebar
export const ReferencesContainer = function () { 
    //return e(View, {}, eReferences);
    return <References index=0></References>;
}

export const CircleOfFifthsReferenceContainer = function () {
    return <References index=0></References>;
}
