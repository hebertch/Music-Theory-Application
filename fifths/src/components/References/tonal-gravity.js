import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class TonalGravityReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            The Schedule of Tonal Gravity          
          </Text>
          <Text style={styles.paragraph}> An intimidating name for a straightforward and useful musical concept, the Schedule of Tonal Gravity (STG) is like an interactive map that shows how chords in a given key will relate to each other and move from one to another.
          </Text>
          <Text style={styles.paragraph}>
            Here is the map of the STG in C Major and in C minor:
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{flex:1}}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: 'bold' }}>
                  C Major
                </Text>
              </Text>
              <FlatList
                data={[{ key: '7 - Bdim' }, { key: '3 - Emin' }, { key: '6 - Amin' }, { key: '2 - Dmin' }, { key: '5 - G7' }, { key: '1 - CMaj' }, { key: '4 - FMaj' }]}
                renderItem={({item}) => <Text>{item.key}</Text>}
              />
            </View>
            <View style={{flex:1}}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: 'bold' }}>
                  C minor
                </Text>
              </Text>
               <FlatList
                data={[{ key: '2 - Ddim' }, { key: '5 - G7*' }, { key: '1 - Cmin' }, { key: '4 - Fmin' }, { key: 'b7 - BbMaj' }, { key: 'b3 - EbMaj' }, { key: 'b6 - AbMaj' }]}
                renderItem={({item}) => <Text>{item.key}</Text>}
              />
            </View>
          </View>
          <Text style={styles.paragraph}> The STG follows the Primary Principles of Harmonic Motion. Chords move “down” by step only, and can move “up” by step or by leap; consecutive upwards motions are generally avoided. It is also important to know that the 1 chord is the “Center of Gravity” - it is the chord that feels the most stable and resolved - and also that the 4 chord in a Major key will tend to want to resolve upwards to the 1 chord (although it can leap up to any other chord as well).
          </Text>
          <Text style={styles.paragraph}> Please note that while the notes will change in different keys, the quality and the function of each chord will remain the same. So regardless of the center of gravity or key, the Major and minor STGs look like this:
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{flex:1}}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: 'bold' }}>
                 Major STG 
                </Text>
              </Text>
              <FlatList
                data={[{ key: '7 - dim' }, { key: '3 - min' }, { key: '6 - min' }, { key: '2 - min' }, { key: '5 - 7' }, { key: '1 - Maj' }, { key: '4 - Maj' }]}
                renderItem={({item}) => <Text>{item.key}</Text>}
              />
            </View>
            <View style={{flex:1}}>
              <Text style={styles.paragraph}>
                <Text style={{ fontStyle: 'italic' }}>
                  minor STG
                </Text>
              </Text>
               <FlatList
                data={[{ key: '2 - dim' }, { key: '5 - 7*' }, { key: '1 - min' }, { key: '4 - min' }, { key: 'b7 - Maj' }, { key: 'b3 - Maj' }, { key: 'b6 - Maj' }]}
                renderItem={({item}) => <Text>{item.key}</Text>}
              />
              
            </View>
          </View>  
          <Text style={styles.paragraph}>
            <Text style={{ fontStyle: 'italic' }}>
              *The 5 chord in a minor key is unusual in that it contains a note not found in the key signature. This is because the 5 chord is almost always Dominant in order to create a strong sense of gravity to the 1 chord, and in order to have a Dominant 5 chord the third of the 5 chord must be raised by half step. So in the key of C minor, rather than the five chord being Gmin or Gmin7 (G Bb D F) it must be altered to G7 (G B D F). Another way to think of this is that the 5 chord in minor keys is permanently borrowed from the parallel Major keys.
            </Text>
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

