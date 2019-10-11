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

  borderColor() {
    let {
      disabled,
      restricted,
      baseColor,
      tintColor,
      errorColor,
      focusAnimation,
    } = this.props;

    if (disabled) {
      return baseColor;
    }

    if (restricted) {
      return errorColor;
    }

    return focusAnimation.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [errorColor, baseColor, tintColor],
    });
  }

  borderWidth() {
    let {
      disabled,
      restricted,
      lineWidth,
      activeLineWidth,
      disabledLineWidth,
      focusAnimation,
    } = this.props;

    if (disabled) {
      return disabledLineWidth;
    }

    if (restricted) {
      return activeLineWidth;
    }

    return focusAnimation.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [activeLineWidth, lineWidth, activeLineWidth],
    });
  }

  borderStyle() {
    let { disabled, lineType, disabledLineType } = this.props;

    return disabled?
      disabledLineType:
      lineType;
  }

  render() {
    let borderStyle = this.borderStyle();

    if ('none' === borderStyle) {
      return null;
    }

    let borderColor = this.borderColor();
    let borderWidth = this.borderWidth();

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
