import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from './input';

it('Input renders correcly', () => {
  const props = {
    id: 'test-id',
    label: 'label',
    className: 'test-class',
  };

  const tree = renderer.create(<Input {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
