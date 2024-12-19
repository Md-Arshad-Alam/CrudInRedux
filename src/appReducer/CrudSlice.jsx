import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  status: "idle", 
  error: null,
};

//  fetching users
export const fetchUsers = createAsyncThunk("crud/fetchUsers", async () => {
  const response = await axios.get("https://655acc496981238d054dbc3a.mockapi.io/crud");
  return response.data; 
});

export const deleteUser = createAsyncThunk(
    "crud/deleteUser",
    async (userId, { dispatch, rejectWithValue }) => {
      try {
        await axios.delete(`https://655acc496981238d054dbc3a.mockapi.io/crud/${userId}`);
        dispatch(fetchUsers());  
        return userId;  
      } catch (error) {
        return rejectWithValue(error.response.data);  
      }
    }
  );
  


export const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
  
    updateUser:(state,action)=>{

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser,updateUser } = crudSlice.actions;
export default crudSlice.reducer;
