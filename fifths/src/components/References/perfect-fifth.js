import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

// Requirement 02: Perfect Fifth reference page
export default class PerfectFifthReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            The Perfect Fifth          
          </Text>
          <Text style={styles.paragraph}> In Western music the interval of the Perfect Fifth can can be compared to the Golden Ratio (or golden mean) of mathematics. Just as the Golden Ratio is found throughout the natural world, the visual arts, and architecture,  the Perfect Fifth is found throughout Western Music. Concepts of scales, keys and key signatures, and harmonic functions (movement from one chord to another) are best understood as variations on the pattern of perfect fifths. 
          </Text>
          <Text style={styles.paragraph}> The Perfect Fifth is a relationship between two pitches, one lower and one higher, related to each other in a simple 3 to 2 ratio. For every two vibrations of the lower pitch, the upper pitch vibrates three times. In other words, if you play a perfect fifth with the notes G and D on a violin, every two vibrations of the lower string (G)  would occur in the same time frame as three vibrations of the upper string (D). This 3/2 relationship is the simplest, and therefore strongest, relationship between two different notes.    
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: 'bold' }}> Every musician should immediately memorize 
            </Text> the following sequence of Perfect Fifths: BEADGCF. This pattern puts the seven letters associated with musical notes into their most logical musical order, and it reappears in many different and important ways in musical theory.
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

