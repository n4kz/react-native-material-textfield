import PropTypes from 'prop-types';
import React, { Children, PureComponent } from 'react';
import { Animated } from 'react-native';

import styles from './styles';

export default class Label extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,
    disabled: false,
    restricted: false,
  };

  static propTypes = {
    numberOfLines: PropTypes.number,

    disabled: PropTypes.bool,
    restricted: PropTypes.bool,

    fontSize: PropTypes.number.isRequired,
    activeFontSize: PropTypes.number.isRequired,
    activeInset: PropTypes.number.isRequired,

    baseColor: PropTypes.string.isRequired,
    tintColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,

    focusAnimation: PropTypes
      .instanceOf(Animated.Value)
      .isRequired,

    labelAnimation: PropTypes
      .instanceOf(Animated.Value)
      .isRequired,

    style: Animated.Text.propTypes.style,
    label: PropTypes.string,
  };

  render() {
    let {
      label,
      disabled,
      restricted,
      fontSize,
      activeFontSize,
      activeInset,
      errorColor,
      baseColor,
      tintColor,
      style,
      focusAnimation,
      labelAnimation,
      children,
      ...props
    } = this.props;

    if (null == label) {
      return null;
    }

    let color = disabled?
      baseColor:
      restricted?
        errorColor:
        focusAnimation.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [errorColor, baseColor, tintColor],
        });

    let textStyle = {
      fontSize,
      color,
    };

    let offset = activeFontSize
      + activeInset
      + fontSize * 0.25;

    let containerStyle = {
      transform: [{
        scale: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, activeFontSize / fontSize],
        }),
      }, {
        translateY: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
        }),
      }],
    };

    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Text style={[styles.text, style, textStyle]} {...props}>
          {label}
        </Animated.Text>
      </Animated.View>
    );
  }
}
