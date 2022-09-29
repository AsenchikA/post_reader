import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { UserCard } from './user-card';

it('UserCard renders correcly', () => {
  const props = {
    id: '1',
    name: 'user',
    postCount: 1,
    className: 'test-class',
  };

  const tree = renderer
    .create(
      <MemoryRouter>
        <UserCard {...props} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
