import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, ViewPropTypes } from 'react-native';

import styles from './styles';

export default class Affix extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,
  };

  static propTypes = {
    numberOfLines: PropTypes.number,
    style: ViewPropTypes.style,

    color: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,

    type: PropTypes
      .oneOf(['prefix', 'suffix'])
      .isRequired,

    labelAnimation: PropTypes
      .instanceOf(Animated.Value)
      .isRequired,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  render() {
    let { labelAnimation, style, children, type, fontSize, color } = this.props;

    let containerStyle = {
      height: fontSize * 1.5,
      opacity: labelAnimation,
    };

    let textStyle = {
      includeFontPadding: false,
      textAlignVertical: 'top',

      fontSize,
      color,
    };

    switch (type) {
      case 'prefix':
        containerStyle.paddingRight = 8;
        textStyle.textAlign = 'left';
        break;

      case 'suffix':
        containerStyle.paddingLeft = 8;
        textStyle.textAlign = 'right';
        break;
    }

    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Text style={[style, textStyle]}>{children}</Animated.Text>
      </Animated.View>
    );
  }
}
