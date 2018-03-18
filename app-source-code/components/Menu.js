import { DrawerNavigator } from 'react-navigation';
import React from 'react';
import { View, Text } from 'react-native';
import CircleOfFifthsScreen from './CircleOfFifthsScreen';
import { ReferencesContainer } from './References';
import { CompositionContainer } from './Composition';

const RootDrawer = DrawerNavigator({
  Home: {
    screen: <View><Text>Hello</Text></View>, // CircleOfFifthsScreen,
  },
  References: {
    screen: <View><Text>Hello</Text></View>,
  },
  Compose: {
    screen: <View><Text>Hello</Text></View>,
  },
});

export default RootDrawer;
