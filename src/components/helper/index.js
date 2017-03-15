import React, { PropTypes, Component } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles';

export default class Helper extends Component {
  static defaultProps = {
    numberOfLines: 1,
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    let { text, ...props } = this.props;

    return (
      <View style={styles.container}>
        <Animated.Text {...props}>{text}</Animated.Text>
      </View>
    );
  }
}
