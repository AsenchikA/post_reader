import React from 'react';
import renderer from 'react-test-renderer';
import { PostCard } from './post-card';

it('PostCard renders correcly', () => {
  const props = {
    created_time: '1970-01-01T00:00:00Z',
    message: 'message',
    className: 'test-class',
  };

  const tree = renderer.create(<PostCard {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
