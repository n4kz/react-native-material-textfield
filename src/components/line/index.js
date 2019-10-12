import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import styles from './styles';

const lineTypes = PropTypes
  .oneOf(['solid', 'dotted', 'dashed', 'none']);

export default class Line extends PureComponent {
  static defaultProps = {
    lineType: 'solid',
    disabledLineType: 'dotted',

    disabled: false,
    restricted: false,
  };

  static propTypes = {
    lineType: lineTypes,
    disabledLineType: lineTypes,

    disabled: PropTypes.bool,
    restricted: PropTypes.bool,

    tintColor: PropTypes.string,
    baseColor: PropTypes.string,
    errorColor: PropTypes.string,

    lineWidth: PropTypes.number,
    activeLineWidth: PropTypes.number,
    disabledLineWidth: PropTypes.number,

    focusAnimation: PropTypes.instanceOf(Animated.Value),
  };

  render() {
    let {
      disabled,
      restricted,
      lineType,
      disabledLineType,
      lineWidth,
      activeLineWidth,
      disabledLineWidth,
      baseColor,
      tintColor,
      errorColor,
      focusAnimation,
    } = this.props;

    let borderStyle = disabled?
      disabledLineType:
      lineType;

    if ('none' === borderStyle) {
      return null;
    }

    let borderColor, borderWidth;

    if (disabled) {
      borderColor = baseColor;
      borderWidth = disabledLineWidth;
    } else {
      if (restricted) {
        borderColor = errorColor;
        borderWidth = activeLineWidth;
      } else {
        borderColor = focusAnimation.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [errorColor, baseColor, tintColor],
        });

        borderWidth = focusAnimation.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [activeLineWidth, lineWidth, activeLineWidth],
        });
      }
    }

    let [top, right, left] = [-2, -1.5, -1.5]
      .map((value) => Animated.multiply(value, borderWidth));

    let lineStyle = {
      borderStyle,
      borderColor,
      borderWidth,
      top,
      right,
      left,
    };

    return (
      <Animated.View style={[styles.line, lineStyle]} pointerEvents='none' />
    );
  }
}
