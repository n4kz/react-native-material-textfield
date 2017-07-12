import { Image } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {shouldForwardToOnContentSizeChanged} from './funcs'

import TextField from '.';

const props = {
  label: 'test',
};

/* eslint-env jest */

it('renders', () => {
  let field = renderer
    .create(<TextField {...props} />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders value', () => {
  let field = renderer
    .create(<TextField {...props} value='text' />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders disabled value', () => {
  let field = renderer
    .create(<TextField {...props} value='text' disabled />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders default value', () => {
  let field = renderer
    .create(<TextField {...props} defaultValue='text' />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders multiline value', () => {
  let field = renderer
    .create(<TextField {...props} value='text' multiline />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders title', () => {
  let field = renderer
    .create(<TextField {...props} title='field' />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders error', () => {
  let field = renderer
    .create(<TextField {...props} error='message' />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders counter', () => {
  let field = renderer
    .create(<TextField {...props} value='text' characterRestriction={10} />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders prefix', () => {
  let field = renderer
    .create(<TextField {...props} value='text' prefix='$' />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders suffix', () => {
  let field = renderer
    .create(<TextField {...props} value='text' suffix='.com' />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('renders accessory', () => {
  let render = () => <Image />

  let field = renderer
    .create(<TextField {...props} renderAccessory={render} />)
    .toJSON();

  expect(field)
    .toMatchSnapshot();
});

it('should forward onChange to onContentSizeChange', () => {
  const shouldForward = shouldForwardToOnContentSizeChanged(true, 'android', {nativeEvent: {contentSize: {width: 1, height: 2}}});
  
  expect(shouldForward).toBe(true);
});

it('should not forward onChange to onContentSizeChange if no contentSize in event', () => {
  const shouldForward = shouldForwardToOnContentSizeChanged(true, 'android', {nativeEvent: {}});

  expect(shouldForward).toBe(false);
});
