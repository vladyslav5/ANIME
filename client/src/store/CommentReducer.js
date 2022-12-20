import {createSlice} from "@reduxjs/toolkit";

const commentInitialState = {
    answeringComment: {},
    comments: []
}

const commentSlice = createSlice({
    name: "comments",
    initialState: commentInitialState,
    reducers: {
        setAnsweringComment(state, action) {
            state.answeringComment = action.payload;
        },
        _setComments(state, action) {
            state.comments = action.payload
        },
        addComment(state,action){
            state.comments = [...state.comments,action.payload]
        },
        addAnswer(state,action){
            state.comments.forEach((comment)=>{
                if(comment._id === action.payload._id){
                    comment.answers = [...comment.answers,action.payload.answer]
                }
            })
        }
    }
})

export default commentSlice.reducer
export const {setAnsweringComment,_setComments,addComment,addAnswer} = commentSlice.actions