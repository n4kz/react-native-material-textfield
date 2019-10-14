import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import styles from './styles';

export default class Helper extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,
  };

  static propTypes = {
    title: PropTypes.string,
    error: PropTypes.string,

    style: Animated.Text.propTypes.style,

    baseColor: PropTypes.string,
    errorColor: PropTypes.string,

    fontSize: PropTypes.number,

    focusAnimation: PropTypes.instanceOf(Animated.Value),
  };

  constructor(props) {
    super(props);

    let { error, focusAnimation } = this.props;

    let opacity = focusAnimation.interpolate({
      inputRange: [-1, -0.5, 0],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });

    this.state = {
      errored: !!error,
      opacity,
    };
  }

  componentDidMount() {
    let { focusAnimation } = this.props;

    let prevValue;
    this.listener = focusAnimation.addListener(({ value }) => {
      if (prevValue > -0.5 && value <= -0.5) {
        this.setState({ errored: true });
      }

      if (prevValue < -0.5 && value >= -0.5) {
        this.setState({ errored: false });
      }

      prevValue = value;
    });
  }

  componentWillUnmount() {
    let { focusAnimation } = this.props;

    focusAnimation.removeListener(this.listener);
  }

  render() {
    let { errored, opacity } = this.state;
    let { style, title, error, baseColor, errorColor, fontSize } = this.props;

    let text = errored?
      error:
      title;

    if (null == text) {
      return null;
    }

    let textStyle = {
      fontSize,
      opacity,

      color: errored?
        errorColor:
        baseColor,
    };

    return (
      <Animated.Text style={[styles.text, style, textStyle]}>
        {text}
      </Animated.Text>
    );
  }
}
