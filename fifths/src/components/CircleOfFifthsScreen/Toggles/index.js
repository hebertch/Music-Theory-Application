import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-modest-checkbox';

import { changeScale, toggleParallel, toggleRelative } from '../../../actions/keys';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
});

const majorMinorLabel = scale => (
  <Text>
    <Text style={scale === 'maj' ? { color: 'red' } : {}}>Major</Text>
     /
    <Text style={scale === 'min' ? { color: 'red' } : {}}>Minor</Text>
  </Text>
);

class Toggles extends Component {
  constructor(props) {
    super(props);
    this.state = { isMajor: true };
  }

  toggle = (value) => {
    const newScale = this.props.currentScale === 'maj' ? 'min' : 'maj';
    this.props.changeScale(newScale);
    this.setState({ isMajor: value });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.toggleParallel(!this.props.showParallel)}>
          <View>
            <Text style={{ padding: 10 }}>{this.props.showParallel ? 'Hide Parallel' : 'Show Parallel'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.toggleRelative(!this.props.showRelative)}>
          <View>
            <Text style={{ padding: 10 }}>{this.props.showRelative ? 'Hide Relative' : 'Show Relative'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toggle(!this.state.isMajor)}>
          <View>
            <Text style={{ padding: 10 }}>{this.props.currentScale === 'maj' ? 'Change to minor' : 'Change to Major'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

Toggles.propTypes = {
  currentScale: PropTypes.string.isRequired,
  changeScale: PropTypes.func.isRequired,
  showParallel: PropTypes.bool.isRequired,
  showRelative: PropTypes.bool.isRequired,
  toggleParallel: PropTypes.func.isRequired,
  toggleRelative: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
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
