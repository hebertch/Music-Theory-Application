import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class ParallelAndBorrowedReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Parallel Keys & Borrowed Chords
          </Text>
          <Text style={styles.paragraph}> Parallel keys share a common center of gravity but include different notes. They always come as a pair, with one Major key and one minor key. For example, C Major is the parallel key of C minor. In both keys, C is the center of gravity, but each key contains a different set of notes. In C Major the notes are BEADGCF, while in C minor the notes are DGCFBbEbAb.
          </Text>
          <Text style={styles.paragraph}> Borrowed Chords are chromatic chords that come from the parallel key. A chord progression in a Major key could use chords from the parallel minor key. For example, the diatonic 2 chord in C Major is Dmin, but the 2 chord from C minor, which is Ddim, could be used in its place.
          </Text>
          <Text style={styles.paragraph}> With this concept in mind we can create a single STG that describes 2 parallel keys while still obeying the primary principles of harmonic motion. Using this extended STG will allow for much more variety, color, and surprise in harmonic progressions.
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: 'bold' }}>
                  C Major
                </Text>
              </Text>
              <FlatList
                data={[{ key: '7 - Bdim' }, { key: '3 - Emin' }, { key: '6 - Amin' }, { key: '2 - Dmin <--' }, { key: '5 - G7    <--' }, { key: '1 - CMaj <--' }, { key: '4 - FMaj <--' }]}
                renderItem={({item}) => <Text>{item.key}</Text>}
              />
            </View>
            <View
              style={{marginTop: 51}}
            >
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: 'bold' }}>    C minor
                </Text>
              </Text>
               <FlatList
                data={[{ key: '--> 2 - Ddim' }, { key: '--> 5 - G7*' }, { key: '--> 1 - Cmin' }, { key: '--> 4 - Fmin' }, { key: '    b7 - BbMaj' }, { key: '    b3 - EbMaj' }, { key: '    b6 - AbMaj' }]}
                renderItem={({item}) => <Text>{item.key}</Text>}
              />
            </View>
          </View>
          <Text style={styles.paragraph}> 
          </Text>
          <Text style={styles.paragraph}> 
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

