import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TextField from '.';

/* eslint-env jest */

it('renders text field', () => {
  let field = renderer
    .create(<TextField label='test' />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});
