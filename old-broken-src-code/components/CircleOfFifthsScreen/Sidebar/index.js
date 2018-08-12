import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { tonalGravity } from '../../../static/keySignatures';
import { changeKey } from '../../../actions/keys';
import { getKeyObject } from '../../../selectors/keys';

const windowHeight = Dimensions.get('window').height;

const TouchableNote = (note, changeKeyFunc) => (
  <TouchableWithoutFeedback key={note} onPress={() => changeKeyFunc(note)}>
    <View style={{ padding: 15 }}>
      <Text >
        {note}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

const Sidebar = (props) => {
  const startIndex = props.keyObject.findIndex(el => Object.keys(el).includes('quality'));
  const endIndex = startIndex + 6;
  console.log('start', props.keyObject[startIndex]);
  console.log('end', props.keyObject[endIndex]);
  return (
    <ScrollView style={
      {
        position: 'absolute',
        top: windowHeight / 20,
        right: 10,
        height: windowHeight * (3 / 8),
        backgroundColor: 'whitesmoke',
      }}
    >
      {tonalGravity.filter((el, i) => (i < startIndex)).map(el => TouchableNote(el.note, props.changeKey))}
      <View style={{ backgroundColor: 'red' }}>
        {tonalGravity.filter((el, i) => (i >= startIndex && i <= endIndex)).map(el => TouchableNote(el.note, props.changeKey))}
      </View>
      {tonalGravity.filter((el, i) => (i > endIndex)).map(el => TouchableNote(el.note, props.changeKey))}
    </ScrollView>
  );
};

Sidebar.propTypes = {
  keyObject: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeKey: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentKey: state.keys.currentKey,
  keyObject: getKeyObject(state),
});

const mapDispatchToProps = dispatch => ({
  changeKey: newKey => dispatch(changeKey(newKey)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
