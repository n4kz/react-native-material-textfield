import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Label from '.';

/* eslint-env jest */

const text = 'test';
const props = {
  fontSize: 16,
  activeFontSize: 12,
  tintColor: 'blue',
  baseColor: 'black',
  errorColor: 'red',
  animationDuration: 225,
};

it('renders label', () => {
  let field = renderer
    .create(<Label {...props}>{text}</Label>)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});
