import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IShortPostModel, IFullPostModel, IUserModel } from '../../../types';
import { PAGES_COUNT, SUCCESS_CODE } from '../../../constants';
import { IPostsState, IPostsSuccessResponse, IUserInfo } from './types';

const initialState: IPostsState = {
  isLoaded: false,
  postListByUserId: {},
  userList: [],
};

const fetchAllPostList = createAsyncThunk<IFullPostModel[]>('getSuccess', async (_, { rejectWithValue }) => {
  const sl_token = localStorage.getItem('sl_token');

  if (!sl_token) {
    return rejectWithValue('There is no token');
  }

  const mainUrl = `https://api.supermetrics.com/assignment/posts?sl_token=${sl_token}`;

  const fetchList = [];

  for (let i = 1; i <= PAGES_COUNT; i++) {
    fetchList.push(fetch(`${mainUrl}&page=${i}`));
  }

  try {
    return Promise.all(fetchList)
      .then((responseList) =>
        Promise.all(
          responseList.map((response) => {
            if (response.status !== SUCCESS_CODE) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
        )
      )
      .then((responseList) => {
        return (responseList as IPostsSuccessResponse[]).reduce(
          (postList, { data }) => postList.concat(data.posts),
          [] as IFullPostModel[]
        );
      });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const postsSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostList.fulfilled, (state: IPostsState, action: PayloadAction<IFullPostModel[]>) => {
        const posts = action.payload;
        state.isLoaded = true;

        const userList: IUserModel[] = [];

        const postListByUserId: Record<string, IUserInfo> = posts.reduce((result, postItem) => {
          const currentPost: IShortPostModel = { created_time: postItem.created_time, message: postItem.message };

          if (!result[postItem.from_id]) {
            result[postItem.from_id] = {
              from_name: postItem.from_name,
              postList: [currentPost],
            };
            userList.push({ id: postItem.from_id, name: postItem.from_name });
          } else {
            result[postItem.from_id].postList.push(currentPost);
          }

          return result;
        }, state.postListByUserId);

        userList.sort((user1, user2) => (user1.name.toLowerCase() > user2.name.toLowerCase() ? 1 : -1));

        state.postListByUserId = postListByUserId;
        state.userList = userList;
      })
      .addCase(fetchAllPostList.rejected, (state: IPostsState) => {
        state.isLoaded = true;
      });
  },
});

export { fetchAllPostList };

export default postsSlice.reducer;
