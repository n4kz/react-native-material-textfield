[npm-badge]: https://img.shields.io/npm/v/react-native-material-textfield.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-material-textfield
[license-badge]: https://img.shields.io/npm/l/react-native-material-textfield.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-material-textfield/master/license.txt
[example-url]: https://cloud.githubusercontent.com/assets/2055622/24325711/eaa4ff08-11af-11e7-8550-2504c1580979.gif

# react-native-material-textfield

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Material texfield with consistent behaviour on iOS and Android

![example][example-url]

## Features

* Material design [guidelines](https://material.io/guidelines/components/text-fields.html) compliance
* Consistent look and feel on iOS and Android
* Animated state transitions (normal, focused and errored)
* Customizable font size, colors and animation duration
* Disabled state (with dotted underline)
* Helper text
* Character counter
* Multiline text input
* Pure javascript implementation

## Installation

```bash
npm install --save react-native-material-textfield
```

## Usage

```javascript
import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';

class Example extends Component {
  state = {
    phone: '',
  };

  render() {
    let { phone } = this.state;

    return (
      <TextField
        label='Phone number'
        value={phone}
        onChangeText={ (phone) => this.setState({ phone }) }
      />
    );
  }
}
```

## Properties

 name                 | description                                 | type     | default
:-------------------- |:------------------------------------------- | --------:|:------------------
 textColor            | Text input color                            |   String | rgba(0, 0, 0, .87)
 fontSize             | Text input font size                        |   Number | 16
 labelFontSize        | Text field label font size                  |   Number | 12
 tintColor            | Text field accent color                     |   String | rgb(0, 145, 234)
 baseColor            | Text field base color                       |   String | rgba(0, 0, 0, .38)
 label                | Text field label text                       |   String | -
 title                | Text field helper text                      |   String | -
 error                | Text field error text                       |   String | -
 errorColor           | Text field color for errored state          |   String | rgb(213, 0, 0)
 animationDuration    | Text field animation duration in ms         |   Number | 225
 characterRestriction | Text field soft limit for character counter |   Number | -
 disabled             | Text field availability                     |  Boolean | false
 editable             | Text field text can be edited               |  Boolean | true
 multiline            | Text filed multiline input                  |  Boolean | false
 renderAccessory      | Render input accessory view                 | Function | -
 onChangeText         | Change text callback                        | Function | -
 onFocus              | Focus callback                              | Function | -
 onBlur               | Blur callback                               | Function | -

Other [TextInput](https://facebook.github.io/react-native/docs/textinput.html#props) properties will also work

## Methods

 name           | description                   | return type
:-------------- |:----------------------------- | -----------:
 focus()        | Acquire focus                 |   undefined
 blur()         | Release focus                 |   undefined
 clear()        | Clear text field              |   undefined
 value()        | Get current value             |      String
 isFocused()    | Get current focus state       |     Boolean
 isRestricted() | Get current restriction state |     Boolean

## Example

```bash
git clone https://github.com/n4kz/react-native-material-textfield
cd react-native-material-textfield/example
npm install
npm run ios # or npm run android
```

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
