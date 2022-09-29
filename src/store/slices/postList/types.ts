import { IShortPostModel, IFullPostModel, IUserModel } from 'src/types';

export interface IPostsSuccessResponse {
  data: {
    page: number;
    posts: IFullPostModel[];
  };
  meta: {
    request_id: string;
  };
}

export interface IUserInfo {
  from_name: string;
  postList: IShortPostModel[];
}

export interface IPostsState {
  isLoaded: boolean;
  postListByUserId: Record<string, IUserInfo>;
  userList: IUserModel[];
}
