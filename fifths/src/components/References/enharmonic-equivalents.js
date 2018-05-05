import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class EnharmonicEquivalentsReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Enharmonic Equivalents          
          </Text>
          <Text style={styles.paragraph}> Enharmonic equivalents are notes that are spelled differently but sound the same. For example, there is only one note between E and D. It is lower than E, and it is higher than D. Thus it can be spelled as (or written, or called) either Eb or D#, and regardless of how it is spelled it sounds the same. Eb and D# are thus enharmonic equivalents. The most common enharmonic equivalents are: 
          </Text>
          <Text style={styles.paragraph}>F#=Gb  C#=Db  G#=Ab  D#=Eb  A#=Bb  E#=F  B#=C</Text>
          <Text style={styles.paragraph}>Less common enharmonic equivalents are:</Text>
          <Text style={styles.paragraph}>
            E#=F B#=C
          </Text>
          <Text style={styles.paragraph}>
            Fb=E Cb=B
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

