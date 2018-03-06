import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeScale } from '../../../actions/keys';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
});

class ScaleSwitch extends Component {
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
        <Text>{this.props.currentScale === 'maj' ? 'Major' : 'Minor'}</Text>
        <Switch
          onValueChange={value => this.toggle(value)}
          value={this.state.isMajor}
        />
      </View>
    );
  }
}

ScaleSwitch.propTypes = {
  currentScale: PropTypes.string.isRequired,
  changeScale: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentScale: state.keys.scale,
});

const mapDispatchToProps = dispatch => ({
  changeScale: newScale => dispatch(changeScale(newScale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScaleSwitch);
