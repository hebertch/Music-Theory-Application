import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class DiatonicSubstitutesReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Diatonic Substitutes          
          </Text>
          <Text style={styles.paragraph}> Diatonic Substitutes are chords within a given key that sound similar enough to each other to be able to function in the same way. They can be subjectively categorized as Strong and weak based on how effectively they can perform the function of the chord they are substituting. They are typically used as follows:
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{flex:1}}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: 'bold' }}>
                  In Major Keys
                </Text>
              </Text>
              <FlatList
                data={[{ key: '7 = 5 (Strong)' }, { key: '3 = 5 (weak) or 1 (weak)' }, { key: '6 = 1 (weak) or 4 (weak)' }, { key: '2 = 4 (Strong)' }, { key: '5 = 7 (Strong) or 3 (weak)' }, { key: '1= 3 (weak) or 6 (weak)' }, { key: '4 = 2 (Strong) or 6 (weak)' }]}
                renderItem={({item}) => <Text>{item.key}</Text>}
              />
            </View>
            <View style={{flex:1}}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: 'bold' }}>
                  In minor Keys
                </Text>
              </Text>
               <FlatList
                data={[{ key: '2 = 4 (Strong)' }, { key: '5 = b7 (weak)' }, { key: '1 = b3 (weak) or b6 (weak)' }, { key: '4 = 2 (Strong)' }, { key: 'b7 = 2 (Strong)' }, { key: 'b3 = 1 (weak)' }, { key: 'b6 = 1 (weak) or 4 (weak)' }]}
                renderItem={({item}) => <Text>{item.key}</Text>}
              />
            </View>
          </View>          
          <Text style={styles.paragraph}> Using these substitutions is a way to bring more variety into chord progressions while still obeying the principles of functional harmony. For example, instead of a 2-5-1 progression, a 2-7-1 progression could be used to function the same way but give the music a different flavor. This is because the 7 chord can function the same way as the 5 chord and lead the ear to the 1 chord.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontStyle: 'italic' }}>
              Diatonic Substitutes are deceptively complex - that is, they seem pretty simple but once they are regularly employed it can be difficult, if not impossible to decisively analyze a given harmonic progression. If not used discerningly, they can significantly weaken the sense of musical gravity, even when following all the ‘“rules.” As with all music, the best thing to do is to experiment and listen to the results rather than relying on purely theoretical information.  
            </Text>
          </Text>
        </View>
      </ ScrollView>
    );
  }
};

