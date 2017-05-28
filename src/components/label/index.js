import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

export default class Label extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,

    active: false,
    focused: false,
    errored: false,
    restricted: false,
  };

  static propTypes = {
    ...Animated.Text.propTypes,

    active: PropTypes.bool,
    focused: PropTypes.bool,
    errored: PropTypes.bool,
    restricted: PropTypes.bool,

    fontSize: PropTypes.number.isRequired,
    activeFontSize: PropTypes.number.isRequired,

    tintColor: PropTypes.string.isRequired,
    baseColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,

    animationDuration: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    let { active, focused, errored } = this.props;

    this.state = {
      input: new Animated.Value((active || focused)? 1 : 0),
      focus: new Animated.Value(errored? -1 : (focused? 1 : 0)),
    };
  }

  componentWillReceiveProps(props) {
    let { focus, input } = this.state;
    let { active, focused, errored, animationDuration } = this.props;

    if ((focused ^ props.focused) || (active ^ props.active)) {
      Animated
        .timing(input, {
          toValue: (props.active || props.focused)? 1 : 0,
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease),
        })
        .start();
    }

    if ((focused ^ props.focused) || (errored ^ props.errored)) {
      Animated
        .timing(focus, {
          toValue: props.errored? -1 : (props.focused? 1 : 0),
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease),
        })
        .start();
    }
  }

  render() {
    let { focus, input } = this.state;
    let {
      children,
      restricted,
      fontSize,
      activeFontSize,
      errorColor,
      baseColor,
      tintColor,
      ...props
    } = this.props;

    let color = restricted?
      errorColor:
      focus.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [errorColor, baseColor, tintColor],
      });

    let top = input.interpolate({
      inputRange: [0, 1],
      outputRange: [
        32 + fontSize * 0.25,
        32 - fontSize * 0.25 - activeFontSize,
      ],
    });

    let textStyle = {
      fontSize: input.interpolate({
        inputRange: [0, 1],
        outputRange: [fontSize, activeFontSize],
      }),

      color,
    };

    let containerStyle = {
      position: 'absolute',
      top,
    };

    return (
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle} {...props}>{children}</Animated.Text>
      </Animated.View>
    );
  }
}
