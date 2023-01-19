import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text } from 'react-native';

import styles from './styles';

export default class Counter extends PureComponent {

  render() {
    let { count, limit, baseColor, errorColor, style } = this.props;

    if (!limit) {
      return null;
    }

    let textStyle = {
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
