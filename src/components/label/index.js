import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

export default class Label extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,

    active: false,
    focused: false,
    errored: false,
    restricted: false,
  };

  static propTypes = {
    active: PropTypes.bool,
    focused: PropTypes.bool,
    errored: PropTypes.bool,
    restricted: PropTypes.bool,

    baseSize: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    activeFontSize: PropTypes.number.isRequired,
    basePadding: PropTypes.number.isRequired,

    tintColor: PropTypes.string.isRequired,
    baseColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,

    animationDuration: PropTypes.number.isRequired,
    useNativeDriver: PropTypes.bool,

    style: Animated.Text.propTypes.style,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  constructor(props) {
    super(props);

    this.state = {
      input: new Animated.Value(this.inputState()),
      focus: new Animated.Value(this.focusState()),
    };
  }

  componentWillReceiveProps(props) {
    let { focus, input } = this.state;
    let { active, focused, errored, animationDuration: duration, useNativeDriver } = this.props;

    if (focused ^ props.focused || active ^ props.active) {
      let toValue = this.inputState(props);

      Animated
        .timing(input, { toValue, duration, useNativeDriver })
        .start();
    }

    if (focused ^ props.focused || errored ^ props.errored) {
      let toValue = this.focusState(props);

      Animated
        .timing(focus, { toValue, duration, useNativeDriver })
        .start();
    }
  }

  inputState({ focused, active } = this.props) {
    return active || focused? 1 : 0;
  }

  focusState({ focused, errored } = this.props) {
    return errored? -1 : (focused? 1 : 0);
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
      baseSize,
      basePadding,
      style,
      errored,
      active,
      focused,
      animationDuration,
      useNativeDriver,
      ...props
    } = this.props;

    let color = restricted ?
      errorColor:
      (focused ? (errored ? errorColor : tintColor): baseColor )

    let translateY = input.interpolate({
      inputRange: [0, 1],
      outputRange: [
        baseSize + fontSize * 0.25,
        baseSize - basePadding - activeFontSize,
      ],
    });

    let translateX = input.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        basePadding - activeFontSize,
      ],
    });

    let scaleY = input.interpolate({
      inputRange: [0, 1],
      outputRange: [1, activeFontSize/fontSize],
    });

    let scaleX = input.interpolate({
      inputRange: [0, 1],
      outputRange: [1, activeFontSize/fontSize],
    });

    let textStyle = {
      fontSize,
      color,
    };

    let containerStyle = {
      position: 'absolute',
      transform: [
        { translateY },
        {scaleY},
        {scaleX},
        {translateX}
      ],
    };

    return (
      <Animated.View style={containerStyle}>
        <Animated.Text style={[style, textStyle]} {...props}>
          {React.cloneElement(children, {style: {color}})}
        </Animated.Text>
      </Animated.View>
    );
  }
}
