import { createSlice } from "@reduxjs/toolkit";

const postSlice=createSlice({
    name:"post",
    initialState:{
        posts:[],
        postsCount:null,
        postsCate:[]
    },
    reducers:{
     setPost(state,action){
        state.posts=action.payload
     },
     setPostCount(state,action){
        state.postsCount=action.payload
     },
     setPostCate(state,action){
        state.postsCate=action.payload
     },

    }
})
const postReducer=postSlice.reducer
const postActions=postSlice.actions

export {postActions,postReducer}