import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Affix from '.';

/* eslint-env jest */

const props = {
  fontSize: 16,
  baseColor: 'blue',
  animationDuration: 225,
};

const prefix = 'a';
const suffix = 'z';

it('renders prefix', () => {
    let affix = renderer
      .create(<Affix type='prefix' {...props}>{prefix}</Affix>)
      .toJSON();

    let text = affix.children[0];

    expect(text.type).toBe('Text');
    expect(text.children).toEqual([prefix]);
    expect(text.props.style.textAlign).toBe('left');

    expect(affix)
      .toMatchSnapshot();
});

it('renders suffix', () => {
    let affix = renderer
      .create(<Affix type='suffix' {...props}>{suffix}</Affix>)
      .toJSON();

    let text = affix.children[0];

    expect(text.type).toBe('Text');
    expect(text.children).toEqual([suffix]);
    expect(text.props.style.textAlign).toBe('right');

    expect(affix)
      .toMatchSnapshot();
});
