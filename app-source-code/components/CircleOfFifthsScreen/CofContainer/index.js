import React, { Component } from 'react';
import {
  ART,
  StyleSheet,
  View,
  Dimensions,
  PanResponder,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getKeyObject, fifths } from '../../../selectors/keys';
import { changeKey } from '../../../actions/keys';
import _distanceBetweenTwoPoints from '../../../util/geometry';
import Circle from './Circle';
import CircularText from './CircularText';

const {
  Surface,
  Group,
  Transform,
} = ART;

// const art = Platform.select({
//   ios: (
//     <View>
//       <Circle
//         radius={150}
//         colors={[
//           '#fa500a', '#ff0000', '#8700c3', '#5000c3',
//           '#3200a5', '#0000ff', '#2dc3be', '#19c80a',
//           '#8cff0a', '#ffff00', '#ffc30a', '#fa870a',
//         ]}
//       />
//       <Circle
//         radius={200}
//         colors={[
//           '#8cff0a', '#ffff00', '#ffc30a', '#fa870a',
//           '#fa500a', '#ff0000', '#8700c3', '#5000c3',
//           '#3200a5', '#0000ff', '#2dc3be', '#19c80a',
//         ]}
//       />
//     </View>
//   ),
//   android: <CircleOfFifths />,
// });

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'whitesmoke',
    marginTop: 21,
    alignItems: 'center',
  },
});

const colors = [
  '#8cff0a', '#ffff00', '#ffc30a', '#fa870a',
  '#fa500a', '#ff0000', '#8700c3', '#5000c3',
  '#3200a5', '#0000ff', '#2dc3be', '#19c80a',
];

class CofContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTouch: {},
      lastTouch: {},
      rotation: 0,
    };

    // set up rotation of circle
    this._setUpGestureHandler();
  }

  _setUpGestureHandler() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        this.setState({ lastTouch: {}, currentTouch: {} });
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.numberActiveTouches === 1) {
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
              _distanceBetweenTwoPoints(triangle.lastPoint, triangle.currentPoint);
            triangle.b =
              _distanceBetweenTwoPoints(triangle.radiusPoint, triangle.lastPoint);
            triangle.c =
              _distanceBetweenTwoPoints(triangle.radiusPoint, triangle.currentPoint);

            triangle.theta =
              Math.acos((-(triangle.a ** 2) + (triangle.b ** 2) + (triangle.c ** 2)) / (2 * triangle.b * triangle.c)) * (180 / Math.PI);

            // TODO fix the if statements below;
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
    const x = Dimensions.get('window').width / 2;
    const y = Dimensions.get('window').height / 2;
    return (
      <View style={styles.container}>
        <View {...this._panResponder.panHandlers}>
          <Surface width={Dimensions.get('window').width} height={Dimensions.get('window').height}>
            <Group x={x} y={y} transform={new Transform().rotate(this.state.rotation)}>
              <Circle
                radius={200}
                innerRadius={30}
                colors={colors}
              />
              <Circle
                radius={165}
                innerRadius={160}
                colors={new Array(12).fill('#000')}
              />
              <Circle
                radius={95}
                innerRadius={90}
                colors={new Array(12).fill('#000')}
              />
              { /* Circular text for current key */}
              <CircularText
                data={this.props.fifths.map((el) => {
                  if (!el.quality) {
                    return '';
                  }
                  return el.quality;
                })}
                rotation={-this.state.rotation}
                colors={new Array(12).fill('#000')}
                multiplier={1.45}
              />
              { /* Circular text for all notes */}
              <CircularText
                data={this.props.fifths.map(el => el.note)}
                rotation={-this.state.rotation}
                colors={new Array(12).fill('#000')}
                multiplier={1.25}
              />
              { /* Circular text for parallel notes */}
              <CircularText
                data={this.props.fifths.map((el) => {
                  if (!el.parallel) {
                    return '';
                  }
                  return el.parallel;
                })}
                rotation={-this.state.rotation}
                colors={new Array(12).fill('#000')}
                multiplier={0.7}
              />
              { /* Circular text for relative notes */}
              <CircularText
                data={this.props.fifths.map((el) => {
                  if (!el.relative) {
                    return '';
                  }
                  return el.relative;
                })}
                rotation={-this.state.rotation}
                colors={new Array(12).fill('#000')}
                multiplier={1.95}
              />
            </Group>
          </Surface>
        </View>
      </View>
    );
  }
}

CofContainer.propTypes = {
  keyObject: PropTypes.arrayOf(PropTypes.object).isRequired,
  fifths: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  currentKey: state.keys.currentKey,
  keyObject: getKeyObject(state),
  fifths: fifths(state),
});

const mapDispatchToProps = dispatch => ({
  changeKey: newKey => dispatch(changeKey(newKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CofContainer);
