import React, { Component } from 'react';
import { ART } from 'react-native';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCentroids } from '../../../../actions/art';
// import CircularText from './CircularText';

const {
  Group, Shape,
} = ART;

const d3 = {
  scale,
  shape,
};

class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paths: [],
      data: (new Array(12)).fill({ number: 1 }),
      centroids: [],
      angles: [],
    };
  }

  componentWillMount() {
    this._createChart(this.props.radius);
  }

  // create colored circle with different colored wedges
  _createChart(radius) {
    // arcs are used to create paths which will be the wedges
    const arcs = d3.shape.pie()
      .value(item => item.number)(this.state.data);
    const lines = [];
    const centers = [];

    // keep track of this array in the component's state
    this.setState({
      angles: arcs.map(a => ({ startAngle: a.startAngle, endAngle: a.endAngle })),
    });

    // get paths for wedges
    for (let i = 0; i < arcs.length; i++) {
      const path = d3.shape.arc()
        .outerRadius(radius) // Radius of the pie
        .padAngle(0) // Angle between sections
        .innerRadius(this.props.innerRadius)(arcs[i]);


      // get wedge centers for centroids
      // centroids will allow us to position text around the circle
      const center = d3.shape.arc()
        .outerRadius(radius) // Radius of the pie
        .padAngle(0.05) // Angle between sections
        .innerRadius(this.props.innerRadius) // Inner radius: to create a donut or pie
        .centroid(arcs[i]);

      lines.push(path);
      centers.push(center);
    }

    // set component state and redux state
    this.setState({ paths: lines });
    this.props.setCentroids(centers);
  }

  render() {
    return (
      <Group>
        {
          // draw paths using ART
          this.state.paths.map((item, index) =>
            (
              <Shape
                key={item}
                fill={this.props.colors[index]}
                stroke={this.props.colors[index]}
                d={item}
              />
            ))
        }
      </Group>
    );
  }
}

// this function will dispatch the setCentroids action to the art redux reducer
// the reducer will then make centroids accessable in the redux state
// the below line makes the function accessable in the component's props
const mapDispatchToProps = dispatch => ({
  setCentroids: centroids => dispatch(setCentroids(centroids)),
});

// retrieves the centroids from the redux state
// makes them accessable in the component's props
const mapStateToProps = state => ({
  centroids: state.art.centroids,
});

Circle.propTypes = {
  radius: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  setCentroids: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Circle);
