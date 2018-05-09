import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class MusicalGravityReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }} >
          { /* Title */ }
          <Text style={styles.title}>
            Musical Gravity 
          </Text>
          <Text style={styles.paragraph}> Because of the strength of the 3/2 relationship, the Perfect Fifth plays a key role in determining a sense of musical direction and orientation, or “Gravity.”  For example, playing a G followed by a D creates tension, while moving in the opposite direction (D followed by G) releases that tension and creates a sense of rest or arrival. Thus we can say that the “gravity” of D is to move towards G. In like manner, G has musical gravity to C, and C to F. In fact every pitch has this property, as shown below: 
          </Text>
          <ScrollView style={styles.horizontalScroll} horizontal >
            <Text>B# -> E# -> A# -> D# -> G# -> C# -> F# -> B -> E -> A -> D -> G -> C -> F -> Bb -> Eb -> Ab -> Db -> Gb -> Cb -> Fb etc...</Text>
          </ ScrollView>
          <Text style={styles.paragraph}/>
        </View>
      </ ScrollView>
    );
  }
};

