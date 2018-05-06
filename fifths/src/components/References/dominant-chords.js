import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

// Requirement 02: Chords Reference Page
export default class DominantChordsReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Dominant Chords          
          </Text>
          <Text style={styles.paragraph}> Dominant chords, which functionally are 5 chords (V chords) play the most important role of any chord in functional harmony, which is to determine where the ear perceives the center of musical gravity to be. This is because Dominant chords are inherently “tense” or “unresolved” sounding. Moving from a Dominant chord to a Major (or minor) chord a perfect fifth below creates a sense of resolution or arrival. For example, in the key of C Major, the center of gravity is the 1 chord, C Major. This is because the chord that comes before C Major (1) is a dominant chord, G7 (5), and the tension created when the G7 is played is resolved when the CMaj follows it.
          </Text>
          <Text style={styles.paragraph}> The defining characteristic of Dominant chords is that they have perhaps the strongest sense of musical gravity of any kind of chord; they seem to urgently “want” to resolve. Importantly, and helpfully, how they want to resolve is very simple and is related to the Perfect Fifth (of course). Dominant chords want to to resolve to a chord a Perfect Fifth below them. So a B Dominant (B7) will resolve to a E chord, an E7 will resolve to an A chord, an A7 will resolve to a D chord, etc. Just like every other chord, Dominant chords want to move “downwards” around the circle of fifths; they simply do it with a stronger sense of musical gravity than other kinds of chords. The extremely strong sense of gravity that Dominant chords possess is the reason why the 5 chord in minor keys is almost always Dominant; even though it has a note that is not in the key signature, and is not truly a Diatonic chord, its musical gravity is critical in making the 1 chord sound like the center of gravity.  
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontStyle: 'italic' }}>
              In modern music Dominant chords almost always have four notes (the root and then three more stacked in thirds above), meaning they have a Root, a 3rd, a 5th and a 7th. The first three notes together form a Major triad, and the fourth note, the 7th, is a minor 7th. For this reason they are sometimes called “Major-minor 7th” chords but in practice they are usually referred to as “Dominant” chords.
            </Text>
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

