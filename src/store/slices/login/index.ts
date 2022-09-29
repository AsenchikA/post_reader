import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CLIENT_ID, SUCCESS_CODE } from '../../../constants';
import { IFailedResponse } from '../../../types';
import { ILoginState, ILoginSuccessResponse, IRegisterResponseType } from './types';

const initialState: ILoginState = {
  client_id: '',
  isLoaded: false,
  email: '',
};

const fetchRegister = createAsyncThunk<IRegisterResponseType, { name: string; email: string }>(
  'registerSuccess',
  async ({ name, email }, { rejectWithValue }) => {
    const url = `https://api.supermetrics.com/assignment/register`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, client_id: CLIENT_ID }),
    });

    const parsedResponse: ILoginSuccessResponse | IFailedResponse = await response.json();

    if (response.status !== SUCCESS_CODE) {
      return rejectWithValue((parsedResponse as IFailedResponse).error.code);
    }

    return (parsedResponse as ILoginSuccessResponse).data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.fulfilled, (state: ILoginState, action: PayloadAction<IRegisterResponseType>) => {
        localStorage.setItem('sl_token', action.payload.sl_token);

        state.isLoaded = true;
        state.client_id = action.payload.client_id;
        state.email = action.payload.email;
      })
      .addCase(fetchRegister.rejected, (state: ILoginState) => {
        state.isLoaded = true;
      });
  },
});

export { fetchRegister };

export default loginSlice.reducer;
