import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Line from '.';

/* eslint-env jest */

[{ type: 'solid', color: 'black', width: 1 }, { type: 'dotted', color: 'grey', width: 1 }]
  .forEach(({ type, color, width }) => {
    it(`renders ${type} ${color} line`, () => {
      let line = renderer
        .create(<Line type={type} color={color} width={width} />)
        .toJSON();

      expect(line)
        .toMatchSnapshot();
    });
  });
