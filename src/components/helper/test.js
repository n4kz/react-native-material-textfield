import 'react-native';
import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';

import Helper from '.';

/* eslint-env jest */

const text = 'helper';
const props = {
  title: text,
  fontSize: 16,

  baseColor: 'black',
  errorColor: 'red',

  focusAnimation: new Animated.Value(0),
};

it('renders helper', () => {
  let helper = renderer
    .create(<Helper {...props} />)
    .toJSON();

  expect(helper)
    .toMatchSnapshot();
});

it('renders disabled helper', () => {
  let helper = renderer
    .create(
      <Helper {...props} disabled={true} />
    )
    .toJSON();

  expect(helper)
    .toMatchSnapshot();
});

it('renders helper with error', () => {
  let helper = renderer
    .create(
      <Helper {...props} error={text} focusAnimation={new Animated.Value(-1)} />
    )
    .toJSON();

  expect(helper)
    .toMatchSnapshot();
});
