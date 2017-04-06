import React, { PropTypes, PureComponent } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class Counter extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    limit: PropTypes.number,

    baseColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,
  };

  render() {
    let { count, limit, baseColor, errorColor } = this.props;

    let textStyle = {
      color: count > limit? errorColor : baseColor,
    };

    return limit? (
      <View style={styles.container}>
        <Text style={[ styles.text, textStyle ]}>
            {count} / {limit}
        </Text>
      </View>
    ) : null;
  }
}
