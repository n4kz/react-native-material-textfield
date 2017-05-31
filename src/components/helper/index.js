import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles';

export default class Helper extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,
  };

  static propTypes = {
    ...Animated.Text.propTypes,
  };

  render() {
    let { children, ...props } = this.props;

    return (
      <View style={styles.container}>
        <Animated.Text {...props}>{children}</Animated.Text>
      </View>
    );
  }
}
