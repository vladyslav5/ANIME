import {createSlice} from "@reduxjs/toolkit";

const UserInitialState = {
    isAuth: false,
    user:{},
    avatar:""
    // token: "",
}

const UserSlice = createSlice({
    name: "users",
    initialState: UserInitialState,
    reducers: {
        loginUser:(state,action) => {
            state.user = action.payload
            state.isAuth = true
        },
        setAvatar(state,actions){
            state.avatar = actions.payload
        },
        out(state) {
            state.isAuth = false
            state.user={}
            localStorage.setItem('token',state.user)

        }
    }
})

export default UserSlice.reducer
export const {loginUser, out,setAvatar} = UserSlice.actions