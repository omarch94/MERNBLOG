import { createSlice } from "@reduxjs/toolkit";

const postSlice=createSlice({
    name:"post",
    initialState:{
        posts:[],
        postsCount:null,
        postsCate:[],
        loading:false,
        isPostCreated:false,
        postSingle:null,
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
     setLoading(state){
      state.loading=true
     },
     clearLoading(state){
      state.loading=false
     },
     setIsPostCreated(state){
      state.isPostCreated=true
      state.loading=false
     },
     clearIsPostCreated(state){
      state.isPostCreated=false
     },
     postDetailss(state,action){
      state.postSingle=action.payload
     },
     setPostLikes(state, action) {
      state.postSingle.likes = action.payload.likes;
    },
    deletePost(state,action){
      state.posts=action.posts.filter(p=>p._id!==action.payload)
    }
   }
})
const postReducer=postSlice.reducer
const postActions=postSlice.actions

export {postActions,postReducer}