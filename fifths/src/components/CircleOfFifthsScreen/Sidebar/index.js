import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { tonalGravity } from '../../../static/keySignatures';
import { colors } from '../../../static/colors';
import { changeKey } from '../../../actions/keys';
import { getKeyObject } from '../../../selectors/keys';

const windowHeight = Dimensions.get('window').height;

// returns a touchable component
const TouchableNote = (note, changeKeyFunc, color) => (
  <TouchableWithoutFeedback key={note} onPress={() => changeKeyFunc(note)}>
    <View style={{ padding: 15 }}>
      <Text style={{ color }} >
        {note}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

const Sidebar = (props) => {
  let startIndex = tonalGravity.findIndex(el => el.note === props.currentKey);
  startIndex -= props.currentScale === 'maj' ? 5 : 2;
  const endIndex = startIndex + 6;
  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      style={
      {
        backgroundColor: 'whitesmoke',
      }}
      contentOffset={{ x: 0, y: 45 * startIndex }}
    >
      {
        // set up first part of non-scale notes
        tonalGravity.filter((el, i) => (i < startIndex)).map(el => TouchableNote(el.note, props.changeKey))
      }
      <View style={{ backgroundColor: '#2a2a2a' }}>
        {
          // set up current scale notes with different styling
          tonalGravity.filter((el, i) => (i >= startIndex && i <= endIndex)).map((el, i) => TouchableNote(el.note, props.changeKey, (props.currentScale === 'maj' ? colors[i + 1] : colors[i + 4])))
        }
      </View>
      {
        // set up second part of non-scale notes
        tonalGravity.filter((el, i) => (i > endIndex)).map(el => TouchableNote(el.note, props.changeKey))
      }
    </ScrollView>
  );
};

Sidebar.propTypes = {
  changeKey: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentKey: state.keys.currentKey,
  currentScale: state.keys.scale,
});

const mapDispatchToProps = dispatch => ({
  changeKey: newKey => dispatch(changeKey(newKey)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
