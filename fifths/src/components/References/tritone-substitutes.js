import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

	    

const sub_pairs_diagram = <View>
      <View flexDirection='row' flex={1} justifyContent='center'><Text>C/F#(Gb)</Text></View>
      <View flexDirection='row' flex={1} justifyContent='space-between'><Text>G/Db</Text><Text>F/B</Text></View>
      <View flexDirection='row' flex={1} justifyContent='space-between'><Text>D/Ab</Text><Text>Bb/E</Text></View>
      <View flexDirection='row' flex={1} justifyContent='center'><Text>Eb/A</Text></View>
      </View>;

	//TODO: restyle
	/*
D7 	→	G7	→	CMaj
(5 of 5)		(5)		(1)


Ab7	→	G7	→	CMaj
(TtSub 5 of 5)	(5)		(1)
	*/
const example1 =
      <View>
      <Text>D7 (5 of 5) → G7 (5) → CMaj (1)</Text>
      </View>;
const example2 = 
      <View style={{ marginBottom: 40 }} >
      <Text>Ab7 (TtSub 5 of 5) → G7 (5) → CMaj (1)</Text>
      </View>;

export default class TritoneSubstitutesReference extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow:1}}>
        <View style={{ flex:1 }}>
          { /* Title */ }
          <Text style={styles.title}>
            Tritone Substitutes          
          </Text>
            <Text style={styles.paragraph}> Tritone Substitutions are specific chords used as a substitute for Dominant chords, so any place a Dominant chord can be used a Tritone Substitution can be used in its place. 
          </Text>
	    <Text style={styles.paragraph}> Specifically, a Tritone Substitution is a Dominant chord whose root is a tritone away from the root of the chord it replaces. (Two notes that are a tritone apart are also directly opposite each other on the Circle of Fifths. A tritone is 3 whole steps, or 6 half steps, or half an octave). So for example, the Tritone Substitution of B7 would be F7, since B and F are a tritone apart. 
          </Text>

<Text style={styles.paragraph}>
Below is a diagram of all Tritone Substitution pairs:
          </Text>
	    {sub_pairs_diagram}
          <Text style={styles.paragraph}>
This diagram can be read clockwise, just like the Circle of Fifths, to show the gravity of each Tritone Substitution pair of Dominant chords: C7 and F#7 can both resolve to either F or B, and F7 and B7 can both resolve to either Bb or E. 
          </Text>

	
          <Text style={styles.paragraph}>
As mentioned before, every Dominant chord has a Tritone Substitute, so using Tritone Substitution is possible not only for Diatonic Dominant chords (the 5 chord) but on Secondary Dominant chords as well. Just as with Secondary Dominants, Tritone Substitutions can facilitate rapid and extreme changes from one key to another. 
          </Text>

          <Text style={styles.paragraph}>
So the following chord progression:
        </Text>

	{example1}
          <Text style={styles.paragraph}>
	    could become
        </Text>
	    {example2}
	    
        </View>
      </ ScrollView>
    );
  }
};
