import * as React from 'react';
import {TextInput, TextInputProps} from 'react-native'

interface ContentInset {
  top?: number
  left?: number
  right?: number
  label?: number
  input?: number
}

interface LabelOffset {
  x0?: number
  y0?: number
  x1?: number
  y1?: number
}

interface TextFieldProps {
  textColor?: string
  fontSize?: number
  labelFontSize?: number
  lineWidth?: number
  activeLineWidth?: number
  disabledLineWidth?: number
  tintColor?: string
  baseColor?: string
  label?: string
  title?: string
  prefix?: string
  suffix?: string
  error?: string
  errorColor?: string
  lineType?: string
  disabledLineType?: string
  animationDuration?: number
  characterRestriction?: number
  disabled?: boolean
  contentInset?: ContentInset // TODO
  labelOffset?: LabelOffset // TODO
  inputContainerStyle?: any
  containerStyle?: any
  labelTextStyle?: any
  titleTextStyle?: any
  affixTextStyle?: any
  formatText?: Function
  renderLeftAccessory?: Function
  renderRightAccessory?: Function
}

type Props = TextFieldProps & TextInputProps;

declare const TextFieldBase: React.PureComponent<Props> & typeof TextInput;

export class TextField extends TextFieldBase {
  context: any
  props: Props;
  state: any;
  refs: any;
  forceUpdate: (callback?: () => void) => void
  render: () => any
  setState: (state: any, callback?: () => void) => void

  value: () => string
  isErrored: () => boolean
  isRestricted: () => boolean
  isDefaultVisible: () => boolean
  isPlaceholderVisible: () => boolean
  setValue: (value: string) => void
}

export class FilledTextField extends TextField {}

export class OutlinedTextField extends TextField {}
