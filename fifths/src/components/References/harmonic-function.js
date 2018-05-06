import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class HarmonicFunctionReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            The Primary Principles of Harmonic Function 
          </Text>
          <Text style={styles.paragraph}>Harmonic Function is the way chords move from one to another. The following principles are a description of the most typical ways that chords “want” to move. 
          </Text>
          <Text style={styles.paragraph}> When moving clockwise ("down") on the Circle of Fifths, move by step only. Stepwise means moving to an adjacent chord. For example a C chord should step down  to an F chord rather than leap down to a Bb chord. To move from a D chord to C, first step down to G, then step down  again to C. Don’t leap down from D does not “want” to leap down to C, it “wants” to step down to G. Leaping down directly from D to C will weaken the sense of musical gravity.
          </Text>
          <Text style={styles.paragraph}> Counter-clockwise (“up”) motion can be by step (eg C to G) or by leap (eg C to A). However, up motion, whether by step or leap, weakens the sense of musical gravity; therefore consecutive up motions are generally avoided. An up motion, whether step or leap, is usually followed by a step down.
          </Text>
          <Text style={styles.paragraph}>
            In short form, these two principles are:
          </Text>
          <FlatList
            data={[{ key: '1. Movement “down" by step only' }, { key: '2. Avoid consecutive “up" movement' }]}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
        </View>
      </ ScrollView>
    );
  }
};

