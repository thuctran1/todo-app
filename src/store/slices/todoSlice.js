import { createSlice } from "@reduxjs/toolkit";
import {getTodosThunk} from './thunk'

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    loadingStatus: 'idle',
    data: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.data.push(action.payload);
    },

    completeTodo: (state, action) => {
      const currentTodo = state.find((todo) => todo.id == action.payload.id);
      currentTodo.completed = !currentTodo.completed;
    },
  },
  extraReducers:{
    [getTodosThunk.pending]: (state) => {
      state.loadingStatus = 'loading'
    },
    [getTodosThunk.fulfilled]: (state, action) => {
      state.loadingStatus = 'idle',
      state.data = action.payload
    },
  }
});

export default todoSlice