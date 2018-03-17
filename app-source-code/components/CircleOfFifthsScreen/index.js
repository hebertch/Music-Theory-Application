import React from 'react';
import { View } from 'react-native';

import CofContainer from './CofContainer';
import Sidebar from './Sidebar';
import Toggles from './Toggles';
import ChordSelection from './ChordSelection';

const CircleOfFifthsScreen = () => (
  <View>
    <Toggles />
    <CofContainer />
    <Sidebar />
    <ChordSelection />
  </View>
);

export default CircleOfFifthsScreen;
