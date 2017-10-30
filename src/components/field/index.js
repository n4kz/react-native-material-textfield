import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  Platform,
  ViewPropTypes,
} from 'react-native';

import RN from 'react-native/package.json';
import Color from 'color';

import Line from '../line';
import Label from '../label';
import Affix from '../affix';
import Helper from '../helper';
import Counter from '../counter';

import styles from './styles.js';

export default class TextField extends PureComponent {
  static defaultProps = {
    underlineColorAndroid: 'transparent',
    disableFullscreenUI: true,
    autoCapitalize: 'sentences',
    editable: true,

    animationDuration: 225,

    fontSize: 16,
    titleFontSize: 12,
    labelFontSize: 12,
    labelHeight: 32,
    labelPadding: 4,
    inputContainerPadding: 8,
    helperTextNumberOfLines: 1,
    
    tintColor: 'rgb(0, 145, 234)',
    textColor: 'rgba(0, 0, 0, .87)',
    baseColor: 'rgba(0, 0, 0, .38)',
    placeholderTextColor: 'rgba(158, 158, 158, 1.0)',

    errorColor: 'rgb(213, 0, 0)',

    disabled: false,
    disabledLineType: 'dotted',

    active: false,    
  };

  static propTypes = {
    ...TextInput.propTypes,

    animationDuration: PropTypes.number,

    fontSize: PropTypes.number,
    titleFontSize: PropTypes.number,
    labelFontSize: PropTypes.number,
    labelHeight: PropTypes.number,
    labelPadding: PropTypes.number,
    inputContainerPadding: PropTypes.number,

    labelTextStyle: Text.propTypes.style,
    titleTextStyle: Text.propTypes.style,
    affixTextStyle: Text.propTypes.style,

    tintColor: PropTypes.string,
    textColor: PropTypes.string,
    baseColor: PropTypes.string,

    label: PropTypes.string.isRequired,
    title: PropTypes.string,

    characterRestriction: PropTypes.number,

    error: PropTypes.string,
    errorColor: PropTypes.string,

    disabled: PropTypes.bool,
    disabledLineType: Line.propTypes.type,

    active: PropTypes.bool,

    renderAccessory: PropTypes.func,

    prefix: PropTypes.string,
    suffix: PropTypes.string,

    containerStyle: (ViewPropTypes || View.propTypes).style,
    inputContainerStyle: (ViewPropTypes || View.propTypes).style,

    helperTextNumberOfLines: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onPress = this.focus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);

    this.updateRef = this.updateRef.bind(this, 'input');

    let { value, error, fontSize } = this.props;

    this.mounted = false;
    this.state = {
      text: value,

      focus: new Animated.Value(error? -1 : 0),
      focused: false,
      receivedFocus: false,

      placeholderTextColorWithAlpha: 'transparent',

      error: error,
      errored: !!error,

      height: fontSize * 1.5,
    };
  }

  componentWillReceiveProps(props) {
    let { error } = this.state;

    if (null != props.value) {
      this.setState({ text: props.value });
    }

    if (props.error && props.error !== error) {
      this.setState({ error: props.error });
    }

    if (props.error !== this.props.error) {
      this.setState({ errored: !!props.error });
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillUpdate(props, state) {
    let { error, animationDuration, placeholderTextColor } = this.props;
    let { focus, focused } = this.state;

    if (props.error !== error || focused ^ state.focused) {
      Animated
        .timing(focus, {
          toValue: props.error? -1 : (state.focused? 1 : 0),
          duration: animationDuration,
        })
        .start(() => {
          if (this.mounted) {
            this.setState((state, { error }) => ({ error }));
          }
        });
    }
    focus.addListener(({value}) => {
      let placeholderTextColorWithAlpha = Color(placeholderTextColor).alpha(value).string();
        
      this.setState({
        placeholderTextColorWithAlpha: placeholderTextColorWithAlpha,
      });
    });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  focus() {
    let { disabled, editable } = this.props;

    if (!disabled && editable) {
      this.input.focus();
    }
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  value() {
    let { text, receivedFocus } = this.state;
    let { value, defaultValue } = this.props;

    return (receivedFocus || null != value || null == defaultValue)?
      text:
      defaultValue;
  }

  isFocused() {
    return this.input.isFocused();
  }

  isRestricted() {
    let { characterRestriction } = this.props;
    let { text = '' } = this.state;

    return characterRestriction < text.length;
  }

  onFocus(event) {
    let { onFocus } = this.props;

    if ('function' === typeof onFocus) {
      onFocus(event);
    }

    this.setState({ focused: true, receivedFocus: true });
  }

  onBlur(event) {
    let { onBlur } = this.props;

    if ('function' === typeof onBlur) {
      onBlur(event);
    }

    this.setState({ focused: false });
  }

  onChange(event) {
    let { onChange, multiline } = this.props;

    if ('function' === typeof onChange) {
      onChange(event);
    }

    /* XXX: onContentSizeChange is not called on RN 0.44 and 0.45 */
    if (multiline && 'android' === Platform.OS) {
      if (/^0\.4[45]\./.test(RN.version)) {
        this.onContentSizeChange(event);
      }
    }
  }

  onChangeText(text) {
    let { onChangeText } = this.props;

    this.setState({ text });

    if ('function' === typeof onChangeText) {
      onChangeText(text);
    }
  }

  onContentSizeChange(event) {
    let { onContentSizeChange, fontSize } = this.props;
    let { height } = event.nativeEvent.contentSize;

    if ('function' === typeof onContentSizeChange) {
      onContentSizeChange(event);
    }

    this.setState({
      height: Math.max(
        fontSize * 1.5,
        Math.ceil(height) + Platform.select({ ios: 5, android: 1 })
      ),
    });
  }

  renderAccessory() {
    let { renderAccessory } = this.props;

    if ('function' !== typeof renderAccessory) {
      return null;
    }

    return (
      <View style={styles.accessory}>
        {renderAccessory()}
      </View>
    );
  }

  renderAffix(type, active, focused) {
    let {
      [type]: affix,
      fontSize,
      baseColor,
      animationDuration,
      affixTextStyle,
    } = this.props;

    if (null == affix) {
      return null;
    }

    let props = {
      type,
      active,
      focused,
      fontSize,
      baseColor,
      animationDuration,
    };

    return (
      <Affix style={affixTextStyle} {...props}>{affix}</Affix>
    );
  }

  render() {
    let { receivedFocus, focus, focused, error, errored, height, text = '', placeholderTextColorWithAlpha } = this.state;
    let {
      style: inputStyleOverrides,
      label,
      title,
      value,
      defaultValue,
      characterRestriction: limit,
      editable,
      disabled,
      disabledLineType,
      active,
      animationDuration,
      fontSize,
      titleFontSize,
      labelFontSize,
      labelHeight,
      labelPadding,
      inputContainerPadding,
      labelTextStyle,
      titleTextStyle,
      tintColor,
      baseColor,
      textColor,
      errorColor,
      containerStyle,
      inputContainerStyle: inputContainerStyleOverrides,
      helperTextNumberOfLines,
      ...props
    } = this.props;

    if (props.multiline && props.height) {
      /* Disable autogrow if height is passed as prop */
      height = props.height;
    }

    let defaultVisible = !(receivedFocus || null != value || null == defaultValue);

    value = defaultVisible?
      defaultValue:
      text;

    active = (!!value) || active;
    let count = value.length;
    let restricted = limit < count;

    let borderBottomColor = restricted?
      errorColor:
      focus.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [errorColor, baseColor, tintColor],
      });

    let borderBottomWidth = restricted?
      2:
      focus.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [2, StyleSheet.hairlineWidth, 2],
      });

    let inputContainerStyle = {
      paddingTop: labelHeight,
      paddingBottom: inputContainerPadding,

      ...(disabled?
        { overflow: 'hidden' }:
        { borderBottomColor, borderBottomWidth }),

      ...(props.multiline?
        { height: labelHeight + inputContainerPadding + height }:
        { height: labelHeight + inputContainerPadding + fontSize * 1.5 }),
    };

    let inputStyle = {
      fontSize,

      color: (disabled || defaultVisible)?
        baseColor:
        textColor,

      ...(props.multiline?
        {
          height: fontSize * 1.5 + height,

          ...Platform.select({
            ios: { top: -1 },
            android: { textAlignVertical: 'top' },
          }),
        }:
        { height: fontSize * 1.5 }),
    };

    let errorStyle = {
      color: errorColor,

      opacity: focus.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [1, 0, 0],
      }),

      fontSize: title?
        titleFontSize:
        focus.interpolate({
          inputRange:  [-1, 0, 1],
          outputRange: [titleFontSize, 0, 0],
        }),
    };

    let titleStyle = {
      color: baseColor,

      opacity: focus.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 1, 1],
      }),

      fontSize: titleFontSize,
    };

    let helperContainerStyle = {
      flexDirection: 'row',
      height: (title || limit)?
        titleFontSize * 1.5 * helperTextNumberOfLines:
        focus.interpolate({
          inputRange:  [-1, 0, 1],
          outputRange: [titleFontSize * 1.5 * helperTextNumberOfLines, 8, 8],
        }),
    };

    let containerProps = {
      style: containerStyle,
      onStartShouldSetResponder: () => true,
      onResponderRelease: this.onPress,
      pointerEvents: !disabled && editable?
        'auto':
        'none',
    };

    let inputContainerProps = {
      style: [
        styles.inputContainer,
        inputContainerStyle,
        inputContainerStyleOverrides,
      ],
    };

    let labelProps = {
      baseSize: labelHeight,
      basePadding: labelPadding,
      fontSize,
      activeFontSize: labelFontSize,
      tintColor,
      baseColor,
      errorColor,
      animationDuration,
      active,
      focused,
      errored,
      restricted,
      style: labelTextStyle,
    };

    let counterProps = {
      baseColor,
      errorColor,
      count,
      limit,
      fontSize: titleFontSize,
      style: titleTextStyle,
    };

    return (
      <View {...containerProps}>
        <Animated.View {...inputContainerProps}>
          {disabled && <Line type={disabledLineType} color={baseColor} />}

          <Label {...labelProps}>{label}</Label>

          <View style={styles.row}>
            {this.renderAffix('prefix', active, focused)}

            <TextInput
              style={[styles.input, inputStyle, inputStyleOverrides]}
              selectionColor={tintColor}

              {...props}
              placeholderTextColor={placeholderTextColorWithAlpha}
              editable={!disabled && editable}
              onChange={this.onChange}
              onChangeText={this.onChangeText}
              onContentSizeChange={this.onContentSizeChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={value}
              ref={this.updateRef}
            />

            {this.renderAffix('suffix', active, focused)}
            {this.renderAccessory()}
          </View>
        </Animated.View>

        <Animated.View style={helperContainerStyle}>
          <View style={styles.flex}>
            <Helper style={[errorStyle, titleTextStyle]} numberOfLines={helperTextNumberOfLines}>{error}</Helper>
            <Helper style={[titleStyle, titleTextStyle]} numberOfLines={helperTextNumberOfLines}>{title}</Helper>
          </View>

          <Counter {...counterProps} />
        </Animated.View>
      </View>
    );
  }
}
