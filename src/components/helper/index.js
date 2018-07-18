import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles';

export default class Helper extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,
  };

  static propTypes = {
    style: Animated.Text.propTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    numberOfLines:PropTypes.number,
  };

  render() {
    let { children, style, numberOfLines, ...props } = this.props;

    return (
      <View style={styles.container}>
        <Animated.Text numberOfLines={numberOfLines} style={[styles.text, style]} {...props}>
          {children}
        </Animated.Text>
      </View>
    );
  }
}
