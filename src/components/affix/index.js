import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import styles from './styles';

export default class Affix extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,

    active: false,
    focused: false,
  };

  static propTypes = {
    numberOfLines: PropTypes.number,

    active: PropTypes.bool,
    focused: PropTypes.bool,

    type: PropTypes.oneOf(['prefix', 'suffix']).isRequired,

    fontSize: PropTypes.number.isRequired,
    baseColor: PropTypes.string.isRequired,
    animationDuration: PropTypes.number.isRequired,

    style: Animated.Text.propTypes.style,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  constructor(props) {
    super(props);

    let { active, focused } = this.props;

    this.state = {
      opacity: new Animated.Value((active || focused)? 1 : 0),
    };
  }

  componentWillReceiveProps(props) {
    let { opacity } = this.state;
    let { active, focused, animationDuration } = this.props;

    if ((focused ^ props.focused) || (active ^ props.active)) {
      Animated
        .timing(opacity, {
          toValue: (props.active || props.focused)? 1 : 0,
          duration: animationDuration,
        })
        .start();
    }
  }

  render() {
    let { opacity } = this.state;
    let { style, children, type, fontSize, baseColor: color } = this.props;

    let containerStyle = {
      height: fontSize * 1.5,
      opacity,
    };

    let textStyle = {
      color,
      fontSize,
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
