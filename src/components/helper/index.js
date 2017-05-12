import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles';

export default class Helper extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,
  };

  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    let { text, ...props } = this.props;

    return text? (
      <View style={styles.container}>
        <Animated.Text {...props}>{text}</Animated.Text>
      </View>
    ) : null;
  }
}
