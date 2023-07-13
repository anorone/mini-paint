import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadUsers } from '../api/users';
import { addDrawing, loadDrawings } from '../api/drawings';
import type { Users } from '../api/users';
import type { Drawings, Drawing } from '../api/drawings';

interface Data {
  users: Users;
  drawings: Drawings;
  requestStatus: 'idle' | 'loading' | 'failed';
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

const drawingsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(loadData.fulfilled, (state, { payload }) => {
        state.users = payload.users;
        state.drawings = payload.drawings;
        state.requestStatus = 'idle';
      })
      .addCase(loadData.rejected, (state) => {
        state.requestStatus = 'failed';
      });
  },
});

export { saveDrawing, loadData };
export default drawingsSlice.reducer;
