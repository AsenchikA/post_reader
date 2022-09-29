import { IShortPostModel, IUserModel } from 'src/types';
import { getFilteredPostList, getFilteredUserList, getSordedPostList } from './index';

test('Posts should be sorted ascending', () => {
  const post1: IShortPostModel = { created_time: '2022-07-14T18:24:32+00:00', message: '1' };
  const post2: IShortPostModel = { created_time: '2022-08-14T18:24:32+00:00', message: '2' };
  const isAscending = true;

  const sortedPostList = getSordedPostList([post1, post2], isAscending);

  expect(sortedPostList).toStrictEqual([post1, post2]);
});

test('Posts should be sorted descending', () => {
  const post1: IShortPostModel = { created_time: '2022-07-14T18:24:32+00:00', message: '1' };
  const post2: IShortPostModel = { created_time: '2022-08-14T18:24:32+00:00', message: '2' };
  const isAscending = false;

  const sortedPostList = getSordedPostList([post1, post2], isAscending);

  expect(sortedPostList).toStrictEqual([post2, post1]);
});

test('Posts should be filtered', () => {
  const post1: IShortPostModel = { created_time: '2022-07-14T18:24:32+00:00', message: 'Filter 1' };
  const post2: IShortPostModel = { created_time: '2022-08-14T18:24:32+00:00', message: 'Filter 2' };
  const postList = [post1, post2];

  const filteredPostList = getFilteredPostList('Filter 2', postList);

  expect(filteredPostList).toStrictEqual([post2]);
});

test('Filtration of messages should not depend on register', () => {
  const post1: IShortPostModel = { created_time: '2022-07-14T18:24:32+00:00', message: 'Filter 1' };
  const post2: IShortPostModel = { created_time: '2022-08-14T18:24:32+00:00', message: 'Filter 2' };
  const postList = [post1, post2];

  const filteredPostList = getFilteredPostList('filter 2', postList);

  expect(filteredPostList).toStrictEqual([post2]);
});

test('Users should be filtered', () => {
  const user1: IUserModel = { id: '1', name: 'User1' };
  const user2: IUserModel = { id: '2', name: 'User2' };
  const userList = [user1, user2];

  const filteredUserList = getFilteredUserList('User2', userList);

  expect(filteredUserList).toStrictEqual([user2]);
});

test('Filtration of users should not depend on register', () => {
  const user1: IUserModel = { id: '1', name: 'User1' };
  const user2: IUserModel = { id: '2', name: 'User2' };
  const userList = [user1, user2];

  const filteredUserList = getFilteredUserList('user2', userList);

  expect(filteredUserList).toStrictEqual([user2]);
});
