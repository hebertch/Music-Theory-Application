import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class KeySignaturesReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Keys & Key Signatures          
          </Text>
          <Text style={styles.paragraph}> A key is a pre-determined collection of notes (including the scale and the chords that are most commonly made with those notes). Keys are harmonically centered around one note which gives the key its name. For example, the notes BEADGCF belong together in the key of C Major, and when playing in the key of C, the note C sounds like the natural resting point or “center of gravity.” In addition, using these notes are used to form various chords further orients the ear towards C.
          </Text>
          <Text style={styles.paragraph}> BEADGCF is also the order of flats, and the reverse of this pattern (FCGDAEB) is the order of sharps. This means that a key with one flat will always have Bb as the only flat, a key with two flats with have Bb and Eb, and so on. The same principle applies to sharps - F# is always the first sharp, C# is always the second. This makes memorizing key signatures and their associated scales much simpler and easier.
          </Text>
       </View>
      </ ScrollView>
    );
  }
};

