import { createSlice } from "@reduxjs/toolkit";

const commentSlice=createSlice({
    name:"comment",
    initialState:{
        comments:[],
    },
    reducers:{
     setComment(state,action){
        state.comments=action.payload
     },
     addComment(state,action){
        state.comments=action.payload
     },
     deleteCommentFromPost(state,action){
        state.comments=state.comments.filter(c=>c._id!==action.payload)
     },

    }
})
const commentReducer=commentSlice.reducer
const commentActions=commentSlice.actions

export {commentActions,commentReducer}