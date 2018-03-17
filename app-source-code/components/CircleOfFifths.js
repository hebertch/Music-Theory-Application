import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ART, Dimensions, StyleSheet, Text as NormText, TouchableWithoutFeedback, ScrollView, View, PanResponder, Switch } from 'react-native';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import PropTypes from 'prop-types';
import { changeKey, changeScale } from '../actions/keys';
import { getKeyObject, getParallelKey, getRelativeKey } from '../selectors/keys';
import CircularText from './CircularText';

const {
  Group, Shape, Surface, Transform,
} = ART;

const d3 = {
  scale,
  shape,
};

const Theme = {
  colors: [
    '#8cff0a', '#ffff00', '#ffc30a', '#fa870a',
    '#fa500a', '#ff0000', '#8700c3', '#5000c3',
    '#3200a5', '#0000ff', '#2dc3be', '#19c80a',
  ],
};

const styles = StyleSheet.create({
  container: {
    margin: 60,
  },
});

const sidebarPattern = ['Fx', 'B♯', 'E♯', 'A♯', 'D♯', 'G♯', 'C♯', 'F♯',
  'B', 'E', 'A', 'D', 'G', 'C', 'F',
  'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭',
  'B♭♭',
];

const touchableSidebarNote = (currentKey, value, index) => {
  const style = { color: 'black' };
  if (this.props.keyObject.find(el => el.note === value)) {
    console.log(value);
    style.backgroundColor = 'red';
  }
  console.log(currentKey);
  return (
    <TouchableWithoutFeedback
      key={value}
      onPress={() => this._onPieItemSelected(index)}
    >
      <View style={{ padding: 15 }}>
        <NormText style={[styles.label, style]}>
          {value}
        </NormText>
      </View>
    </TouchableWithoutFeedback>
  );
};

class CircleOfFifths extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paths: [],
      data: [
        {
          number: 5, displayName: 'B', name: 'b',
        },
        {
          number: 5, displayName: 'E', name: 'e',
        },
        {
          number: 5, displayName: 'A', name: 'a',
        },
        {
          number: 5, displayName: 'D', name: 'd',
        },
        {
          number: 5, displayName: 'G', name: 'g',
        },
        {
          number: 5, displayName: 'C', name: 'c',
        },
        {
          number: 5, displayName: 'F', name: 'f',
        },
        {
          number: 5, displayName: 'B♭', name: 'bFlat',
        },
        {
          number: 5, displayName: 'E♭', name: 'eFlat',
        },
        {
          number: 5, displayName: 'A♭', name: 'aFlat',
        },
        {
          number: 5, displayName: 'D♭', name: 'dFlat',
        },
        {
          number: 5, displayName: 'G♭/F♯', name: 'gFlat',
        },
      ],
      currentTouch: {},
      lastTouch: {},
      rotation: 0,
      centroids: [],
      angles: [],
      switch: true,
    };
  }

  componentWillMount() {
    this._createChart(100);
    this._setUpGestureHandler();
  }

  _value = item => item.number

  _label = item => item.displayName

  _color = index => Theme.colors[index]

  _createChart(radius) {
    const arcs = d3.shape.pie()
      .value(this._value)(this.state.data);

    const lines = [];
    const centers = [];

    this.setState({
      angles: arcs.map(a => ({ startAngle: a.startAngle, endAngle: a.endAngle })),
    });

    for (let i = 0; i < arcs.length; i++) {
      const path = d3.shape.arc()
        .outerRadius(radius) // Radius of the pie
        .padAngle(0.05) // Angle between sections
        .innerRadius(30)(arcs[i]);


      const center = d3.shape.arc()
        .outerRadius(radius) // Radius of the pie
        .padAngle(0.05) // Angle between sections
        .innerRadius(30) // Inner radius: to create a donut or pie
        .centroid(arcs[i]);

      lines.push(path);
      centers.push(center);
    }

    this.setState({ paths: lines, centroids: centers });

    // put C to top
    const cIndex = 5;
    const currentStartAngle = arcs[cIndex].startAngle * (180 / Math.PI);
    const currentEndAngle = arcs[cIndex].endAngle * (180 / Math.PI);
    // rotate this note to the top
    this.setState({
      rotation: (360 - Math.abs(currentStartAngle) - Math.abs(currentEndAngle - currentStartAngle) / 2),
    });
  }

  _distanceBetweenTwoPoints = (first, second) => {
    const distance = Math.sqrt(((second.X - first.X) ** 2) + ((second.Y - first.Y) ** 2));
    return distance;
  }

  _lockWheel = () => {
    let min = 10;
    let index;
    this.state.angles.forEach((item, i) => {
      if (Math.abs(item.startAngle + this.state.rotation) % 2 * Math.PI < min) {
        min = Math.abs(item.startAngle);
        index = i;
      }
    });
    const currentStartAngle = Math.abs(this.state.rotation + this.state.angles[index].startAngle)
      * (180 / Math.PI);
    const currentEndAngle = Math.abs(this.state.rotation + this.state.angles[index].endAngle)
      * (180 / Math.PI);
    // rotate this note to the top
    this.setState({
      rotation: (360 - Math.abs(currentStartAngle) - Math.abs(currentEndAngle - currentStartAngle) / 2),
    });
  }

  _onPieItemSelected = (index) => {
    this.props.changeKey(this.state.data[index].name);
    const currentStartAngle = this.state.angles[index].startAngle * (180 / Math.PI);
    const currentEndAngle = this.state.angles[index].endAngle * (180 / Math.PI);
    // rotate this note to the top
    this.setState({
      rotation: (360 - Math.abs(currentStartAngle) - Math.abs(currentEndAngle - currentStartAngle) / 2),
    });
  }

  _setUpGestureHandler() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        this.setState({ lastTouch: {}, currentTouch: {} });
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        if (gestureState.numberActiveTouches === 1) {
          console.log(gestureState.moveX, gestureState.moveY);

          if (this.state.lastTouch === {}) {
            this.setState({ currentTouch: { X: gestureState.moveX, Y: gestureState.moveY } });
            this.setState({ lastTouch: { X: 0, Y: 0 } });
          } else {
            this.setState({ lastTouch: this.state.currentTouch });
            this.setState({ currentTouch: { X: gestureState.moveX, Y: gestureState.moveY } });

            const triangle = {
              // magic numbers
              radiusPoint: { X: 190, Y: 415 },
              lastPoint: this.state.lastTouch,
              currentPoint: this.state.currentTouch,

              a: {},
              b: {},
              c: {},

              theta: {},
            };

            // find angle with law of cosines
            triangle.a =
              this._distanceBetweenTwoPoints(triangle.lastPoint, triangle.currentPoint);
            triangle.b =
              this._distanceBetweenTwoPoints(triangle.radiusPoint, triangle.lastPoint);
            triangle.c =
              this._distanceBetweenTwoPoints(triangle.radiusPoint, triangle.currentPoint);

            triangle.theta =
              Math.acos((-(triangle.a ** 2) + (triangle.b ** 2) + (triangle.c ** 2)) / (2 * triangle.b * triangle.c)) * (180 / Math.PI);

            // gross if statements for actual rotation
            if (triangle.currentPoint.Y > triangle.radiusPoint.Y
              && triangle.currentPoint.X > triangle.lastPoint.X
              && Math.abs(triangle.currentPoint.Y - triangle.lastPoint.Y) < Math.abs(triangle.currentPoint.X - triangle.lastPoint.X)
            ) {
              this.setState({ rotation: this.state.rotation - triangle.theta });
            } else if (triangle.currentPoint.Y > triangle.radiusPoint.Y
              && triangle.currentPoint.X < triangle.lastPoint.X
              && Math.abs(triangle.currentPoint.Y - triangle.lastPoint.Y) < Math.abs(triangle.currentPoint.X - triangle.lastPoint.X)
            ) {
              this.setState({ rotation: this.state.rotation + triangle.theta });
            } else if (triangle.currentPoint.Y < triangle.radiusPoint.Y
              && triangle.currentPoint.X > triangle.lastPoint.X
              && Math.abs(triangle.currentPoint.Y - triangle.lastPoint.Y) < Math.abs(triangle.currentPoint.X - triangle.lastPoint.X)
            ) {
              this.setState({ rotation: this.state.rotation + triangle.theta });
            } else if (triangle.currentPoint.Y < triangle.radiusPoint.Y
              && triangle.currentPoint.X < triangle.lastPoint.X
              && Math.abs(triangle.currentPoint.Y - triangle.lastPoint.Y) < Math.abs(triangle.currentPoint.X - triangle.lastPoint.X)
            ) {
              this.setState({ rotation: this.state.rotation - triangle.theta });
            } else if (triangle.currentPoint.X < triangle.radiusPoint.X
              && triangle.currentPoint.Y < triangle.lastPoint.Y
              && Math.abs(triangle.currentPoint.Y - triangle.lastPoint.Y) > Math.abs(triangle.currentPoint.X - triangle.lastPoint.X)
            ) {
              this.setState({ rotation: this.state.rotation + triangle.theta });
            } else if (triangle.currentPoint.X < triangle.radiusPoint.X
              && triangle.currentPoint.Y > triangle.lastPoint.Y
              && Math.abs(triangle.currentPoint.Y - triangle.lastPoint.Y) > Math.abs(triangle.currentPoint.X - triangle.lastPoint.X)
            ) {
              this.setState({ rotation: this.state.rotation - triangle.theta });
            } else if (triangle.currentPoint.X > triangle.radiusPoint.X
              && triangle.currentPoint.Y < triangle.lastPoint.Y
              && Math.abs(triangle.currentPoint.Y - triangle.lastPoint.Y) > Math.abs(triangle.currentPoint.X - triangle.lastPoint.X)
            ) {
              this.setState({ rotation: this.state.rotation - triangle.theta });
            } else if (triangle.currentPoint.X > triangle.radiusPoint.X
              && triangle.currentPoint.Y > triangle.lastPoint.Y
              && Math.abs(triangle.currentPoint.Y - triangle.lastPoint.Y) > Math.abs(triangle.currentPoint.X - triangle.lastPoint.X)
            ) {
              this.setState({ rotation: this.state.rotation + triangle.theta });
            }
          }
        }
      },
    });
  }

  render() {
    const x = Dimensions.get('window').width / 2 + 20;
    const y = Dimensions.get('window').height / 2;

    return (
      <View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          margin: 10,
        }}
        >
          <Switch value={this.state.switch} onValueChange={value => this.setState({ switch: value })} />
        </View>
        <View {...this._panResponder.panHandlers}>
          <Surface width={Dimensions.get('window').width} height={Dimensions.get('window').height}>
            <Group x={x} y={y} transform={new Transform().rotate(this.state.rotation)}>
              {
                this.state.paths.map((item, index) =>
                  (
                    <Shape
                      key={item}
                      fill={this._color(index)}
                      stroke={this._color(index)}
                      d={item}
                    />
                  ))
              }
              { /* Circular text for current key */ }
              <CircularText
                searchStr="displayName"
                centroids={this.state.centroids}
                data={this.state.data}
                rotation={-this.state.rotation}
                colors={Theme.colors}
                multiplier={2}
                displayObj={this.props.keyObject}
              />
              { /* Circular text for all notes */ }
              <CircularText
                searchStr="displayName"
                centroids={this.state.centroids}
                data={this.state.data}
                rotation={-this.state.rotation}
                colors={Theme.colors}
                multiplier={1.9}
                displayObj={null}
              />
              { /* Circular text for parallel notes */ }
              <CircularText
                searchStr="displayName"
                centroids={this.state.centroids}
                data={this.state.data}
                rotation={-this.state.rotation}
                colors={new Array(12).fill('#000')}
                multiplier={1}
                displayObj={this.props.parallelKey}
              />
              { /* Circular text for relative notes */ }
              <CircularText
                searchStr="displayName"
                centroids={this.state.centroids}
                data={this.state.data}
                rotation={-this.state.rotation}
                colors={new Array(12).fill('#000')}
                multiplier={2.5}
                displayObj={this.props.relativeKey}
              />
            </Group>
          </Surface>

        </View>

        {/* Sidebar */}
        <ScrollView style={
          {
            position: 'absolute',
            top: Dimensions.get('window').height / 6,
            left: 10,
            height: Dimensions.get('window').height * (2 / 3),
          }}
        >
          {
            sidebarPattern.map((item, index) => touchableSidebarNote(this.props.keyObject, item, index))
          }
        </ScrollView>
      </View>
    );
  }
}

CircleOfFifths.propTypes = {
  currentKey: PropTypes.string.isRequired,
  keyObject: PropTypes.object.isRequired,
  parallelKey: PropTypes.object.isRequired,
  relativeKey: PropTypes.object.isRequired,
  scale: PropTypes.string.isRequired,
  changeKey: PropTypes.func.isRequired,
  changeScale: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentKey: state.keys.currentKey,
  scale: state.keys.scale,
  keyObject: getKeyObject(state),
  parallelKey: getParallelKey(state),
  relativeKey: getRelativeKey(state),
});

const mapDispatchToProps = dispatch => ({
  changeKey: newKey => dispatch(changeKey(newKey)),
  changeScale: newScale => dispatch(changeScale(newScale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CircleOfFifths);
