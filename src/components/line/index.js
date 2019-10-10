import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import styles from './styles';

export default class Line extends PureComponent {
  static propTypes = {
    borderStyle: PropTypes.oneOf(['solid', 'dotted', 'dashed', 'none']),
    borderWidth: PropTypes.any,
    borderColor: PropTypes.any,
  };

  render() {
    let { borderWidth, borderColor, borderStyle } = this.props;

    if ('none' === borderStyle) {
      return null;
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
