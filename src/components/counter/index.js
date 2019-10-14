import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text } from 'react-native';

import styles from './styles';

export default class Counter extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    limit: PropTypes.number,

    fontSize: PropTypes.number,

    baseColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,

    style: Text.propTypes.style,
  };

  render() {
    let { count, limit, baseColor, errorColor, fontSize, style } = this.props;

    if (!limit) {
      return null;
    }

    let textStyle = {
      fontSize,
      color: count > limit?
        errorColor:
        baseColor,
    };

    return (
      <Text style={[styles.text, style, textStyle]}>
        {count} / {limit}
      </Text>
    );
  }
}
