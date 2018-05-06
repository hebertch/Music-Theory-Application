import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class SecondaryDominantsReference  extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Secondary Dominants          
          </Text>
          <Text style={styles.paragraph}> Secondary Dominants are among the most commonly used chromatic chords in the system of functional harmony. They are actually very simple: a Secondary Dominant chord is a Dominant chord that naturally resolves to a chord other than the 1 chord. In the key of C Major, the Dominant chord is G7 (5), and it wants to resolve to CMaj (1). Any other Dominant chord is a Secondary Dominant.
          </Text>
          <Text style={styles.paragraph}> The simplest way to think about Secondary Dominants is to use them as approach chords - that is, decide which chord you are aiming for and then use a Secondary Dominant to get there.  This facilitates and strengthens harmonic transitions (even extreme transitions such as rapidly changing into a different, unrelated key) because of the strength of the Dominant resolution. For example, if the target chord is DMaj, it can be effectively approached by the Dominant chord a Perfect Fifth above it (A7). So even if the music is in a different key, say F Major, the Secondary Dominant A7 can be used to move to DMaj. While there may be a temporary sense of surprise or dissonance, the harmonic resolution from A7 to DMaj is so strong that it will be quickly accepted by the ear.  
          </Text>
          <Text style={styles.paragraph}>
            Another good way to start conceptualizing and using Secondary Dominant chords is to relate them to their diatonic counterparts. An example is shown below in the key of C Major:  
          </Text>
          <FlatList
            data={[{ key: '7  Bdim = B7 (the “5 of 3”)' }, { key: '3  Emin = E7 (the “5 of 6”)' }, { key: '6  Amin = A7 (the “5 of 2”)' }, { key: '2  Dmin = D7 (the “5 of 5”)' }, { key: '5  G7 is the Primary Dominant (the ”5 of 1” or simply “the 5 chord”)' }, { key: '1  CMaj = C7 (the “5 of 4”)' }]}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
          <Text style={styles.paragraph}> The function of the 2 chord (in this case Dmin) is to move to the 5 chord (G7). The Secondary Dominant D7 (the “5 of 5”) will also move to the 5 chord, and is therefore a good substitution for the 2 chord. So the following chord progression  
          </Text>
          <Text style={styles.paragraph}>
            Dmin (2) -> G7 (5) -> CMaj (1)  
          </Text>
          <Text style={styles.paragraph}>
            could easily become
          </Text>
          <Text style={styles.paragraph}>
            D7 (5 of 5) -> G7 (5) -> CMaj (1)
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

