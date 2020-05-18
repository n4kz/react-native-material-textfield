import 'react-native';
import React from 'react';
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';

import Affix from '.';

/* eslint-env jest */

const props = {
  color: 'black',
  fontSize: 16,

  labelAnimation: new Animated.Value(1),
};

const prefix = 'a';
const suffix = 'z';

it('renders prefix', () => {
  let affix = renderer
    .create(<Affix type='prefix' {...props}>{prefix}</Affix>)
    .toJSON();

  expect(affix)
    .toMatchSnapshot();
});

it('renders inactive prefix', () => {
  let affix = renderer
    .create(
      <Affix type='prefix' {...props} labelAnimation={new Animated.Value(0)}>
        {prefix}
      </Affix>
    )
    .toJSON();

  expect(affix)
    .toMatchSnapshot();
});

it('renders suffix', () => {
  let affix = renderer
    .create(<Affix type='suffix' {...props}>{suffix}</Affix>)
    .toJSON();

  expect(affix)
    .toMatchSnapshot();
});

it('renders inactive suffix', () => {
  let affix = renderer
    .create(
      <Affix type='suffix' {...props} labelAnimation={new Animated.Value(0)}>
        {suffix}
      </Affix>
    )
    .toJSON();

  expect(affix)
    .toMatchSnapshot();
});
