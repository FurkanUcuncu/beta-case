import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authServices from '../services/auth';
import { api } from '../services/api';

export const getSessionId = createAsyncThunk('session', async () => {
  const response = await authServices.sessionId();
  return response;
});

const initialState: { sessionId: string } = {
  sessionId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSessionId.fulfilled, (state, action) => {
      state.sessionId = action?.payload?.data;
      api.defaults.headers.common['Session-ID'] = `${state.sessionId}`;
    });
  },
});
