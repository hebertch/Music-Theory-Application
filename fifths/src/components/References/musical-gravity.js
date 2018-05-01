import React, { Component } from 'react';
import { FlatList, StyleSheet, Image, ScrollView, View, Text } from 'react-native';

import styles from './styles';

export default class  extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        { /* Title */ }
        <Text style={styles.title}>
        
        </Text>
        <Text style={styles.paragraph}>
          
        </Text>
        <ScrollView style={styles.horizontalScroll} horizontal>
          <Text>
          
          </Text>
        </ ScrollView>
        <Text style={styles.paragraph}>
          
        </Text>
        {/* Image */ }

        <Text style={styles.paragraph}>
          
          <Text style={{ fontStyle: 'italic' }}>
            
          </Text>
        </Text>
        { /* List Example */ }
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
      </ ScrollView>
    );
  }
};
