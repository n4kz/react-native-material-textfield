import React, { PropTypes, Component } from 'react';
import { View } from 'react-native';

import styles from './styles';

export default class Line extends Component {
  static defaultProps = {
    pointerEvents: 'none',
  };

  static propTypes = {
    ...View.propTypes,

    type: PropTypes.oneOf(['solid', 'dotted', 'dashed']).isRequired,
    color: PropTypes.string.isRequired,
  };

  render() {
    let { color: borderColor, type: borderStyle, ...props } = this.props;

    let lineStyle = {
      borderColor, borderStyle,
    };

    return (
      <View style={[styles.line, lineStyle]} {...props} />
    );
  }
}
