# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `bottom` key for `contentInset` prop

## [0.16.0] - 2019-10-24

### Added

- `left` and `right` keys for `contentInset` prop
- `labelOffset` prop
- `FilledTextField` component
- `OutlinedTextField` component

### Changed

- Accessory view positioning

## [0.15.0] - 2019-10-17

### Added

- `contentInset` prop

### Changed

- Refactored helper layout for consistent line height
- Improved RTL support for helper
- Improved label animation
- `label` prop was made optional

### Removed

- `titleFontSize` prop
- `labelHeight` prop
- `labelPadding` prop
- `inputContainerPadding` prop

## [0.14.1] - 2019-10-15

### Fixed

- Collapsing layout outside of ScrollView
- Visible sideline on some Android versions

## [0.14.0] - 2019-10-14

### Added

- `lineType` prop
- `formatText` prop for masked input support
- `isPlaceholderVisible()` method

### Changed

- Refactored componentDidUpdate and improved animation

### Fixed

- Label and Helper text color in disabled state
- Multiline title and error messages
- Multiline layout on iOS

## [0.13.0] - 2019-10-11

### Added

- `renderLeftAccessory` prop
- `renderRightAccessory` prop
- `.isDefaultVisible()` method
- `.isErrored()` method
- `.setValue()` method

### Changed

- `defaultValue` prop becomes current value on focus
- `value` prop provides only initial value
- TextField refactored to improve internal layout
- TextField refactored to be fully uncontrolled component
- Line refactored to render all types of underlines
- Focus and label animations refactored for better performance

### Removed

- `renderAccessory` prop

### Fixed

- Crash on `null` value for `value` prop
- Deprecation warnings for React component lifecycle methods
- Text position for Label and Affix on Android

## [0.12.0] - 2018-01-18

### Added

- RTL support

### Fixed

- Multiline input on Web platform

## [0.11.0] - 2017-12-05

### Added

- `lineWidth` prop
- `activeLineWidth` prop
- `disabledLineWidth` prop

### Fixed

- Normalized `clearTextOnFocus` behaviour
- Disabled underline on Android

## [0.10.0] - 2017-09-15

### Added

- `inputContainerPadding` prop
- `inputContainerStyle` prop
- `disabledLineType` prop

[Unreleased]: https://github.com/n4kz/react-native-material-textfield/compare/0.16.0...HEAD
[0.16.0]: https://github.com/n4kz/react-native-material-textfield/compare/0.15.0...0.16.0
[0.15.0]: https://github.com/n4kz/react-native-material-textfield/compare/0.14.1...0.15.0
[0.14.1]: https://github.com/n4kz/react-native-material-textfield/compare/0.14.0...0.14.1
[0.14.0]: https://github.com/n4kz/react-native-material-textfield/compare/0.13.0...0.14.0
[0.13.0]: https://github.com/n4kz/react-native-material-textfield/compare/0.12.0...0.13.0
[0.12.0]: https://github.com/n4kz/react-native-material-textfield/compare/0.11.0...0.12.0
[0.11.0]: https://github.com/n4kz/react-native-material-textfield/compare/0.10.0...0.11.0
[0.10.0]: https://github.com/n4kz/react-native-material-textfield/compare/0.9.0...0.10.0
