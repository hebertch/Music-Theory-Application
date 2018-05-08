import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

import { fifths } from '../../../selectors/keys';
import colors from '../../../static/colors';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.75,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  chordTitle: {
   fontSize: 32,
   marginBottom: 10,
   textAlign: 'center',
   color: '#2a2a2a',
   textDecorationLine: 'underline', 
  },
});

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

  // handles setting which chord is shown in the chord modal
  setChord = (note, quality) => {
    const chord = [note];
    const noFlatOrSharpQuality = quality.replace(/[♭|♯]/g, '');
    let wordQuality;
    let third;
    let fifth;
    let seventh;

    if (noFlatOrSharpQuality.includes('°')) {
      // handle diminished chord
      wordQuality = 'Diminished';
      third = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 3) % 12];
      fifth = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 6) % 12];
    } else if (/^[A-Z]+$/g.test(noFlatOrSharpQuality)) {
      // handle major chord
      wordQuality = 'Major';
      third = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 8) % 12];
      fifth = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 11) % 12];
    } else if (/^[a-z]+$/g.test(noFlatOrSharpQuality)) {
      // handle minor chord
      wordQuality = 'Minor';
      third = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 3) % 12];
      fifth = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 11) % 12];
    } else {
      // handle dominant chord
      wordQuality = 'Dominant';
      third = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 8) % 12];
      fifth = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 11) % 12];
      seventh = this.props.fifths[(this.props.fifths.findIndex(el => el === note) + 2) % 12];
    }

    chord.push(third, fifth);
    if (seventh !== undefined) {
      chord.push(seventh);
    }

    // setting the component's state so that the render function knows to update
    this.setState({
      modalNote: note,
      modalQuality: wordQuality,
      modalChord: chord,
    });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    // setting up array of { note: , quality: } before returning render details
    const scale = this.props.currentScale === 'maj' ? ['vii°', 'iii', 'vi', 'ii', 'V7', 'I', 'IV'] : ['ii°', 'V7', 'i', 'iv', '♭VII', '♭III', '♭VI'];
    const fifthsIntoScale = this.props.currentScale === 'maj' ? this.props.fifths.filter((el, i) => (i > 0 && i < 8)) : this.props.fifths.filter((el, i) => (i > 3 && i < 11));
    const notesAndQualities = fifthsIntoScale.map((el, i) => ({ note: el, quality: scale[i] }));

    return (
      <View style={{
          alignContent: 'center',
        }}
      >
        <Text>Touch notes below to view chord structures:</Text>
        <ScrollView
          horizontal
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          style={{
            backgroundColor: '#2a2a2a',
          }}
        >
          {
            // returning touchable options for each note in the scale
            notesAndQualities.map((el, i) => (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  this.setChord(el.note, el.quality);
                  this.toggleModal();
                }}
              >
                <View style={{ padding: 10 }}>
                  <Text style={{ color: (this.props.currentScale === 'maj' ? colors[i + 1] : colors[i + 4]) }} >{el.note}</Text>
                  <Text style={{ color: (this.props.currentScale === 'maj' ? colors[i + 1] : colors[i + 4]) }} >{el.quality}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </ScrollView>
        <Modal
          isVisible={this.state.showModal}
          onSwipe={this.toggleModal}
          swipeDirection="up"
        >
          <View style={styles.modalContainer}>
            <View style={{ flex: .5, padding: 5 }}>
              <TouchableOpacity onPress={this.toggleModal}>
                <Text style={{ fontSize: 16, textAlign: 'right' }}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 10, flexDirection: 'row', padding: 5 }}>
              <View
                style={{ backgroundColor: '#2a2a2a', flex: 2, borderRadius: 5 }}
              >
                {
                  // returning touchable options for each note in the scale
                  notesAndQualities.map((el, i) => (
                    <TouchableWithoutFeedback
                      key={i}
                      style={{ textAlign: 'center' }}
                      onPress={() => {
                        this.setChord(el.note, el.quality);
                      }}
                    >
                      <View style={{ padding: 10, backgroundColor: (el.note === this.state.modalNote ? 'white' : '#2a2a2a') }}>
                        <Text
                          style={{ 
                            textShadowColor: 'black',
                            textShadowOffset: {width: 1,height: 1},
                            textShadowRadius: 3,
                            textAlign: 'center',
                            color: (el.note === this.state.modalNote ? '#2a2a2a' : (this.props.currentScale === 'maj' ? colors[i + 1] : colors[i + 4]))
                          }}
                        >
                          {el.note}
                        </Text>
                        <Text
                          style={{ 
                            textShadowColor: 'black',
                            textShadowOffset: {width: 1,height: 1},
                            textShadowRadius: 3,
                            textAlign: 'center',
                            color: (el.note === this.state.modalNote ? '#2a2a2a' : (this.props.currentScale === 'maj' ? colors[i + 1] : colors[i + 4]))
                          }}
                        >{el.quality}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))
                }
              </View>
              <View style={{ flex: 10, padding: 10, backgroundColor: 'white' }}>
                <Text style={styles.chordTitle}>{this.state.modalNote} {this.state.modalQuality}</Text>
                <Text style={{ textAlign: 'center', fontSize: 80, color: '#2a2a2a' }}>{this.state.modalChord}</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

ChordSelection.propTypes = {
  fifths: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  fifths: fifths(state),
  currentScale: state.keys.scale,
  currentKey: state.keys.currentKey,
});

export default connect(mapStateToProps, null)(ChordSelection);
