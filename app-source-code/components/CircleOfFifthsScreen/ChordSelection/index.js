import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

import { getKeyObject } from '../../../selectors/keys';
import { tonalGravity } from '../../../static/keySignatures';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class ChordSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalNote: '',
      modalQuality: '',
      modalChord: '',
    };
  }

  setChord = (note, quality) => {
    const tonal = tonalGravity.map(el => el.note);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    return (
      <View style={{
          flex: 1,
          position: 'absolute',
          top: windowHeight / 10,
          width: windowWidth,
          alignItems: 'center',
          backgroundColor: 'whitesmoke',
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          style={{
            position: 'absolute',
            top: windowHeight / 10,
            width: windowWidth * (2 / 3),
            backgroundColor: 'whitesmoke',
          }}
        >
          {
            this.props.keyObject.filter(el => !!el.quality).map((el, i) => (
              <TouchableWithoutFeedback key={i} onPress={this.toggleModal}>
                <View style={el.quality === 'I' || el.quality === 'i' ? { padding: 10, backgroundColor: 'red' } : { padding: 10 }}><Text>{el.note}</Text></View>
              </TouchableWithoutFeedback>
            ))
          }
        </ScrollView>
        <Modal style={{ height: windowHeight / 2 }} isVisible={this.state.showModal}>
          <View style={{ flex: 1, height: windowHeight / 2, backgroundColor: 'red' }}>
            <Text>I am the modal content!</Text>
            <TouchableOpacity onPress={this.toggleModal}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

ChordSelection.propTypes = {
  currentKey: PropTypes.string.isRequired,
  keyObject: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  currentKey: state.keys.currentKey,
  keyObject: getKeyObject(state),
});

export default connect(mapStateToProps, null)(ChordSelection);
