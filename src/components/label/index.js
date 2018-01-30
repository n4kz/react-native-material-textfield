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

    style: Animated.Text.propTypes.style,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  constructor(props) {
    super(props);

    this.containerWidth = 0;

    this.state = {
      inputTX: new Animated.Value(this.inputTXState()),
      inputTY: new Animated.Value(this.inputTYState()),
      inputScale: new Animated.Value(this.inputScaleState()),
      focus: new Animated.Value(this.focusState()),
    };
  }

  componentWillReceiveProps(props) {
    let { focus, inputTY, inputScale, inputTX } = this.state;
    let { active, focused, errored, animationDuration: duration } = this.props;

    if (focused ^ props.focused || active ^ props.active) {
      Animated.parallel([
        Animated.timing(inputTX, { toValue:this.inputTXState(props), duration, useNativeDriver:true }),
        Animated.timing(inputTY, { toValue:this.inputTYState(props), duration, useNativeDriver:true }),
        Animated.timing(inputScale, { toValue:this.inputScaleState(props), duration, useNativeDriver:true }),
      ]).start();
    }

    if (focused ^ props.focused || errored ^ props.errored) {
      let toValue = this.focusState(props);

      Animated
        .timing(focus, { toValue, duration })
        .start();
    }
  }

  inputTYState({ focused, active, baseSize, fontSize, basePadding, activeFontSize } = this.props) {
    return (active || focused) ? (baseSize - basePadding - activeFontSize - 2) : (baseSize + fontSize * 0.25);
  }

  inputScaleState({ focused, active, fontSize, activeFontSize } = this.props) {
    return (active || focused) ? (activeFontSize/fontSize) : 1;
  }

  inputTXState({ focused, active } = this.props) {
    return (active || focused) ? -this.getTranslationX() : 0;
  }

  getTranslationX({ fontSize, activeFontSize } = this.props) {
    return this.containerWidth * (1 - activeFontSize/fontSize) /2;
  }

  focusState({ focused, errored } = this.props) {
    return errored? -1 : (focused? 1 : 0);
  }

  onContainerLayout(event) {
    this.containerWidth = event.nativeEvent.layout.width;
    if(!this.props.focused && this.props.active) {
      this.setState({ inputTX: new Animated.Value(-this.getTranslationX()) });
    }
  }

  render() {
    let { focus } = this.state;
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
      ...props
    } = this.props;

    let color = restricted?
      errorColor:
      focus.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [errorColor, baseColor, tintColor],
      });

    let textStyle = {
      fontSize,
      color,
    };

    let transform = [
      {translateX: this.state.inputTX},
      {translateY: this.state.inputTY},
      {scale: this.state.inputScale},
    ];

    let containerStyle = {
      position: 'absolute',
      top: 0,
      transform,
    };

    return (
      <Animated.View style={containerStyle} onLayout={this.onContainerLayout.bind(this)}>
        <Animated.Text style={[style, textStyle]} {...props}>
          {children}
        </Animated.Text>
      </Animated.View>
    );
  }
}
