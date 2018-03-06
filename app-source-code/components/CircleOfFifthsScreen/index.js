import React from 'react';
import { View } from 'react-native';

import CofContainer from './CofContainer';
import Sidebar from './Sidebar';
import ScaleSwitch from './ScaleSwitch';

const CircleOfFifthsScreen = () => (
  <View>
    <ScaleSwitch />
    <CofContainer />
    <Sidebar />
  </View>
);

export default CircleOfFifthsScreen;
