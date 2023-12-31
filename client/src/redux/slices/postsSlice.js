import { createSlice } from "@reduxjs/toolkit";

const postSlice=createSlice({
    name:"post",
    initialState:{
        posts:[],
        postsCount:null,
        postsCate:[],
        loading:false,
        isPostCreated:false,
        post:null,
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
      state.post=action.payload
     },
     setPostLikes(state, action) {
      state.post.likes = action.payload.likes;
    },
    deletePost(state,action){
      state.posts=action.posts.filter(p=>p._id!==action.payload)
    },
    addComment(state,action){
      state.post.comments.push(action.payload)
    },
    updateComment(state,action){
      state.post.comments=state.posts.comments.map((comment)=>
      comment._id===action.payload._id ? comment.payload : comment
      )
    },
    deleteCommentFromPost(state,action){
      const comment=state.post.comments.find(comment=>comment._id!==action.payload)
      const commentIndex=state.post.comments.indexOf(comment)
      state.post.comments.splice(commentIndex,1)
    }
   }
})
const postReducer=postSlice.reducer
const postActions=postSlice.actions

export {postActions,postReducer}