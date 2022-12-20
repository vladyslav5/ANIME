import {combineReducers, configureStore} from '@reduxjs/toolkit'
import AnimesReducer from "./AnimesReducer";
import UserReducer from "./UserReducer";
import CommentReducer from "./CommentReducer";

const rootReducer = combineReducers({
    animes: AnimesReducer,
    users: UserReducer,
    comments:CommentReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}