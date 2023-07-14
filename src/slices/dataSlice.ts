import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadUsers } from '../api/users';
import { addDrawing, loadDrawings } from '../api/drawings';
import type { Users } from '../api/users';
import type { Drawings, Drawing } from '../api/drawings';

interface Data {
  users: Users;
  drawings: Drawings;
  requestStatus: 'idle' | 'loading' | 'failed' | 'succeeded';
}

const initialState: Data = {
  users: {},
  drawings: {},
  requestStatus: 'idle',
};

const saveDrawing = createAsyncThunk(
  'data/saveDrawing',
  async (drawing: Partial<Drawing>) => {
    await addDrawing(drawing);
  }
);

const loadData = createAsyncThunk('data/load', async () => {
  const users = await loadUsers();
  const drawings = await loadDrawings();
  return { users, drawings };
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetRequestStatus: (state) => {
      state.requestStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveDrawing.fulfilled, (state) => {
        state.requestStatus = 'succeeded';
      })
      .addCase(loadData.fulfilled, (state, { payload }) => {
        state.users = payload.users;
        state.drawings = payload.drawings;
        state.requestStatus = 'idle';
      });

    builder
      .addMatcher(
        ({ type }) => type.startsWith('data/') && type.endsWith('/pending'),
        (state) => {
          state.requestStatus = 'loading';
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('data/') && type.endsWith('/rejected'),
        (state) => {
          state.requestStatus = 'failed';
        }
      );
  },
});

export const { resetRequestStatus } = dataSlice.actions;
export { saveDrawing, loadData };
export default dataSlice.reducer;
