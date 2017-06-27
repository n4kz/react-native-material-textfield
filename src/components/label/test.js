import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Label from '.';

/* eslint-env jest */

const string = 'test';
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
    .create(<Label {...props}>{string}</Label>)
    .toJSON();

  let text = field.children[0];

  expect(text.type).toBe('Text');
  expect(text.children).toEqual([string]);

  expect(field)
    .toMatchSnapshot();
});
