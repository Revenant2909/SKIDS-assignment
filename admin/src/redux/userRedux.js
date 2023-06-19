import {createSlice} from "@reduxjs/toolkit";


const userRedux = createSlice({
    name:"user",
    initialState:{
        users: [],
        isFetching: false,
        error: false,
    },
    reducers:{
      //GET USERS
      getUsersStart:(state)=>{
        state.isFetching=true;
        state.error = false;
       },
       getUsersSuccess:(state,action)=>{
        state.isFetching=false;
        state.users=action.payload; 
       },
       getUsersFailure:(state)=>{
        state.isFetching=false;
        state.error = true;
       },
      //DELETE USERS
      deleteUserStart:(state)=>{
        state.isFetching=true;
        state.error = false;
       },
       deleteUserSuccess:(state,action)=>{
        state.isFetching=false;
        state.users.splice( 
          state.users.findIndex((item)=>item._id === action.payload._id),
          1
      );  
       },
       deleteUserFailure:(state)=>{
        state.isFetching=false;
        state.error = true;
       },

       //CREATE USER
      createUserStart:(state)=>{
        state.isFetching=true;
        state.error = false;
       },
       createUserSuccess:(state,action)=>{
        state.isFetching=false;
        state.users.push(action.payload);
       },
       createUserFailure:(state)=>{
        state.isFetching=false;
        state.error = true;
       },
       
       //UPDATE USER
      updateUserStart:(state)=>{
        state.isFetching=true;
        state.error = false;
       },
       updateUserSuccess:(state,action)=>{
        state.isFetching=false;
        state.users[state.users.findIndex((item)=>item._id === action.payload.id)
        ] = action.payload.user;
       },
       updateUserFailure:(state)=>{
        state.isFetching=false;
        state.error = true;
       },
    },
});

export const {getUsersStart,getUsersSuccess,getUsersFailure,deleteUserFailure, deleteUserStart, deleteUserSuccess,createUserFailure, createUserStart, createUserSuccess,updateUserFailure, updateUserStart, updateUserSuccess} = userRedux.actions;
export default userRedux.reducer;