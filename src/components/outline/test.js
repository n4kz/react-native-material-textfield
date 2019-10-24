import 'react-native';
import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';

import Outline from '.';

/* eslint-env jest */

const props = {
  disabled: false,
  restricted: false,

  baseColor: 'black',
  tintColor: 'blue',
  errorColor: 'red',

  lineWidth: 0.5,
  activeLineWidth: 2,
  disabledLineWidth: 1,

  focusAnimation: new Animated.Value(0),
  labelAnimation: new Animated.Value(0),
  labelWidth: new Animated.Value(72),

  contentInset: { left: 12, right: 12 },
};

it('renders outline', () => {
  let line = renderer
    .create(<Outline {...props} />)
    .toJSON();

  expect(line)
    .toMatchSnapshot();
});

it('renders disabled outline', () => {
  let line = renderer
    .create(<Outline {...props} disabled={true} />)
    .toJSON();

  expect(line)
    .toMatchSnapshot();
});

it('renders restricted outline', () => {
  let line = renderer
    .create(<Outline {...props} restricted={true} />)
    .toJSON();

  expect(line)
    .toMatchSnapshot();
});

it('renders active outline', () => {
  let line = renderer
    .create(<Outline {...props} labelAnimation={new Animated.Value(1)} />)
    .toJSON();

  expect(line)
    .toMatchSnapshot();
});
