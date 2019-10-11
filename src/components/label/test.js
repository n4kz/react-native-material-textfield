import 'react-native';
import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';

import Label from '.';

/* eslint-env jest */

const text = 'test';
const props = {
  baseSize: 32,
  basePadding: 4,

  fontSize: 16,
  activeFontSize: 12,

  baseColor: 'black',
  tintColor: 'blue',
  errorColor: 'red',

  focusAnimation: new Animated.Value(0),
  labelAnimation: new Animated.Value(0),
};

it('renders label', () => {
  let label = renderer
    .create(<Label {...props}>{text}</Label>);

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders active label', () => {
  let label = renderer
    .create(
      <Label {...props} labelAnimation={new Animated.Value(1)}>
        {text}
      </Label>
    );

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders active focused label', () => {
  let label = renderer
    .create(
      <Label
        {...props}
        labelAnimation={new Animated.Value(1)}
        focusAnimation={new Animated.Value(1)}
      >
        {text}
      </Label>
    );

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders errored label', () => {
  let label = renderer
    .create(
      <Label
        {...props}
        labelAnimation={new Animated.Value(0)}
        focusAnimation={new Animated.Value(-1)}
      >
        {text}
      </Label>
    );

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders active errored label', () => {
  let label = renderer
    .create(
      <Label
        {...props}
        labelAnimation={new Animated.Value(1)}
        focusAnimation={new Animated.Value(-1)}
      >
        {text}
      </Label>
    );

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders restricted label', () => {
  let label = renderer
    .create(
      <Label restricted={true} {...props}>{text}</Label>
    );

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders styled label', () => {
  let style = { textTransform: 'uppercase' };
  let label = renderer
    .create(
      <Label style={style} {...props}>{text}</Label>
    );

  expect(label.toJSON())
    .toMatchSnapshot();
});
