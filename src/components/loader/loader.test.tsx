import React from 'react';
import renderer from 'react-test-renderer';
import { Loader } from './loader';

it('Loader renders correcly', () => {
  const tree = renderer.create(<Loader className="test-class" />).toJSON();
  expect(tree).toMatchSnapshot();
});
