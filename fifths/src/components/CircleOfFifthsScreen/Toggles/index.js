import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-modest-checkbox';
import Modal from 'react-native-modal';

import { fifths } from '../../../selectors/keys';
import { colorArraySelect } from '../../../static/colors';
import { changeScale, toggleParallel, toggleRelative } from '../../../actions/keys';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  touchableText: {
    fontSize: 14,
    padding: 8,
  },
  modalContainer: {
    flex: 0.85,
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

class Toggles extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isMajor: true,
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
      modalChord: chord.join(''),
    });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  // toggles between major and minor
  toggle = (value) => {
    const newScale = this.props.currentScale === 'maj' ? 'min' : 'maj';
    // dispatch action to redux so that newScale is in redux state
    this.props.changeScale(newScale);
    this.setState({ isMajor: value });
  };

  render() {
    const scale = this.props.currentScale === 'maj' ? ['vii°', 'iii', 'vi', 'ii', 'V7', 'I', 'IV'] : ['ii°', 'V7', 'i', 'iv', '♭VII', '♭III', '♭VI'];
    const fifthsIntoScale = this.props.currentScale === 'maj' ? this.props.fifths.filter((el, i) => (i > 0 && i < 8)) : this.props.fifths.filter((el, i) => (i > 3 && i < 11));
    const notesAndQualities = fifthsIntoScale.map((el, i) => ({ note: el, quality: scale[i] }));

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.toggleParallel(!this.props.showParallel)}>
          <View>
            <Text style={styles.touchableText}>{this.props.showParallel ? 'Hide Parallel' : 'Show Parallel'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.toggleRelative(!this.props.showRelative)}>
          <View>
            <Text style={styles.touchableText}>{this.props.showRelative ? 'Hide Relative' : 'Show Relative'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toggle(!this.state.isMajor)}>
          <View>
            <Text style={styles.touchableText}>{this.props.currentScale === 'maj' ? 'Change to minor' : 'Change to Major'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.setChord(this.props.currentKey, (this.props.currentScale === 'maj' ? 'I' : 'i'));
          this.toggleModal();
        }}>
          <View>
            <Text style={styles.touchableText}>View Chords</Text>
          </View>
        </TouchableOpacity>
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
                            color: (el.note === this.state.modalNote ? '#2a2a2a' : (this.props.currentScale === 'maj' ? colorArraySelect(this.props.currentScale)[i + 1] : colorArraySelect(this.props.currentScale)[i + 4]))
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
                            color: (el.note === this.state.modalNote ? '#2a2a2a' : (this.props.currentScale === 'maj' ? colorArraySelect(this.props.currentScale)[i + 1] : colorArraySelect(this.props.currentScale)[i + 4]))
                          }}
                        >{el.quality}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))
                }
              </View>
              <View style={{ flex: 10, padding: 10, backgroundColor: 'white' }}>
                <Text style={styles.chordTitle}>{this.state.modalNote} {this.state.modalQuality}</Text>
                <View style={{flexDirection: 'column'}}>
                  {this.state.modalChord.split('').reverse().map((el, i) =>
                    <Text key={el} style={{ textAlign: 'center', fontSize: 80, color: '#2a2a2a' }}>{el}</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

Toggles.propTypes = {
  currentKey: PropTypes.string.isRequired,
  currentScale: PropTypes.string.isRequired,
  fifths: PropTypes.array.isRequired,
  changeScale: PropTypes.func.isRequired,
  showParallel: PropTypes.bool.isRequired,
  showRelative: PropTypes.bool.isRequired,
  toggleParallel: PropTypes.func.isRequired,
  toggleRelative: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentKey: state.keys.currentKey,
  fifths: fifths(state),
  currentScale: state.keys.scale,
  showParallel: state.keys.showParallel,
  showRelative: state.keys.showRelative,
});

const mapDispatchToProps = dispatch => ({
  changeScale: newScale => dispatch(changeScale(newScale)),
  toggleParallel: shouldShow => dispatch(toggleParallel(shouldShow)),
  toggleRelative: shouldShow => dispatch(toggleRelative(shouldShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toggles);
