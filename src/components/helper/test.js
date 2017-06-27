import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Helper from '.';

/* eslint-env jest */

const string = 'helper';

it('renders helper', () => {
    let helper = renderer
      .create(<Helper>{string}</Helper>)
      .toJSON();

    let text = helper.children[0];

    expect(text.type).toBe('Text');
    expect(text.children).toEqual([string]);

    expect(helper)
      .toMatchSnapshot();
});
