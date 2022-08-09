import { getStorage } from "../../utils";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {TODO_STORAGE_KEY} from '../../constants'

const getTodosThunk = createAsyncThunk(
  "todo/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const todos = await getStorage(TODO_STORAGE_KEY);
      return todos;
    } catch (e) {
      return rejectWithValue();
    }
  }
);

export { getTodosThunk };