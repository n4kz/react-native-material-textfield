# react-native-material-textfield

Material texfield with consistent behaviour on iOS and Android

![Example](https://cloud.githubusercontent.com/assets/2055622/23831653/145e6bc8-0737-11e7-8663-c31454c639cb.gif)

## Installation

```bash
npm install --save react-native-material-textfield
```

## Usage

```javascript
import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';

export default class Example extends Component {
  state = {
    phone: '',
  };

  render() {
    let { phone } = this.state;

    return (
      <TextField
        label='Phone number'
        ref='phone'
        value={phone}
        onBlur={ () => this.setState({ phone: this.refs.phone.value() }) }
      />
    );
  }
}
```

## Properties

* `tintColor`            - Text field accent color (default: rgb(0, 145, 234))
* `textColor`            - Text input color (default: rgba(0, 0, 0, .87)
* `baseColor`            - Text field base color (default: rgba(0, 0, 0, .38))
* `label`                - Text field label text
* `error`                - Text field error text
* `errorColor`           - Text field color for errored state (default: rgb(213, 0, 0))
* `animationDuration`    - Text field animation duration in ms (default: 225)
* `characterRestriction` - Text field soft limit for character counter
* `onFocus`              - Focus callback
* `onBlur`               - Blur callback

## Methods

* `focus()`        - Acquire focus
* `blur()`         - Release focus
* `clear()`        - Clear text field
* `value()`        - Get current value
* `isFocused()`    - Get current focus state
* `isRestricted()` - Get current restriction state

## Example

```bash
git clone https://github.com/n4kz/react-native-material-textfield.git
cd react-native-material-textfield/example
npm install
react-native run-ios # or run-android
```

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
