import React from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import CircleOfFifthsReference from './circle-of-fifths';

const References = (props) => (
  <Swiper showButtons={true} index={props.index} >
    <CircleOfFifthsReference />
  </ Swiper>
);

// component
// accessed by the Main Menu sidebar
export const ReferencesContainer = () => (
  <References index={0} />
);

export const CircleOfFifthsReferenceContainer = () => (
  <References index={0} />
);
