import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class DiatonicReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Diatonic 
          </Text>
          <Text style={styles.paragraph}> A music element (such as a scale, a chord, or a melody) is diatonic only if it exclusively contains notes that belong in the key of the music. For example, since the key of C Major has no sharps and flats in it, a diatonic scale, chord, or melody in C Major would likewise contain no sharps or flats. In the key of C Major a melody that contains an F# is not diatonic. Rather, it is chromatic, because it contains an accidental, a note that does not belong in the key. In other words, a musical element is diatonic if it only contains notes that belong in the key, and it is chromatic if it has accidentals.            
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

