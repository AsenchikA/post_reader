import { IShortPostModel, IUserModel } from 'src/types';

export const getSordedPostList = (posts: IShortPostModel[], isAscending: boolean) => {
  return [...posts].sort((post1, post2) => {
    return new Date(post1.created_time) > new Date(post2.created_time) ? (isAscending ? 1 : -1) : isAscending ? -1 : 1;
  });
};

export const getFilteredPostList = (filterValue: string, postList: IShortPostModel[]) => {
  if (filterValue.length === 0) {
    return postList;
  }

  return postList.filter(({ message }) => message.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
};

export const getFilteredUserList = (filterValue: string, userList: IUserModel[]) => {
  if (filterValue.length === 0) {
    return userList;
  }

  return userList.filter(({ name }) => name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
};
