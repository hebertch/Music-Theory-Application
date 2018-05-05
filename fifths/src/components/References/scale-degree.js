import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class ScaleDegreeReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Numbers: Scale Degree and Function 
          </Text>
          <Text style={styles.paragraph}> In a given key, the seven diatonic notes (and the diatonic chords built on them) are given a number. These numbers are determined by the note’s place is the scale of the key. So the C Major scale, which is CDEFGAB(C) determines the number of each note in C Major: C=1, D=2, E=3, F=4, G=5, A=6, and B=7. This is convenient for thinking about music in terms of scales.
          </Text>
          <Text style={styles.paragraph}> However, scales are a secondary element of tonal music. The relationship of each of these notes by Perfect Fifth is much more important than their position in a scale. Rather than thinking about C Major “ordinally” as CDEFGAB [1234567], the notes and chords of the key are best conceptualized “functionally” in their Perfect Fifth relationship, BEADGCF [7362514].  
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontStyle: 'italic' }}>
              Very little music is created by thinking primarily about scales, whereas most music is made by using chords and the system of functional harmony. Don’t get caught in the trap of thinking about music in terms of scales; think FIRST in terms of chords and keys - scales are secondary, and can distract from what’s really going on with the music!
            </Text>
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

