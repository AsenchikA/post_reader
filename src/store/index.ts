import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postList';
import loginReducer from './slices/login';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
