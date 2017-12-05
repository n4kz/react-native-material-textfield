import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import styles from './styles';

export default class Line extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['solid', 'dotted', 'dashed', 'none']).isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  };

  render() {
    let {
      width: borderWidth,
      color: borderColor,
      type: borderStyle,
    } = this.props;

    if ('none' === borderStyle) {
      return null;
    }

    let [top, right, bottom, left] = [-2, -1.5, 0, -1.5]
      .map((value) => value * borderWidth);

    let lineStyle = {
      borderColor,
      borderStyle,
      top,
      right,
      bottom,
      left,
      borderWidth,
    };

    return (
      <View style={[styles.line, lineStyle]} pointerEvents='none' />
    );
  }
}
