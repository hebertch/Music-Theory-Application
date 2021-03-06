import React from 'react';
import PropTypes from 'prop-types';
import { ART, Text as NormText, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

const {
  Group, Transform, Text,
} = ART;

const CircularText = props => (
  <Group>
    {
      // use array of notes or qualities and render them around the circle
      // we use redux's centroids which were set earlier to place the text
      props.data.map((item, index) =>
        (<Text
          key={index}
          x={(props.centroids[index][0] + 2.5) * props.multiplier}
          y={(props.centroids[index][1] + 5) * props.multiplier}
          alignment="middle"
          fill={props.colors[index]}
          outline="#000"
          font='bold 10px "Helvetica"'
          transform={new Transform().rotate(props.rotation)}
        >
          {item}
        </Text>
      ))
    }
  </Group>

);

CircularText.propTypes = {
  data: PropTypes.array.isRequired,
  centroids: PropTypes.array.isRequired,
  rotation: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  multiplier: PropTypes.number.isRequired,
};

// retrieves the centroids from the redux state
// makes them accessable in the component's props
const mapStateToProps = state => ({
  centroids: state.art.centroids,
});

export default connect(mapStateToProps)(CircularText);

