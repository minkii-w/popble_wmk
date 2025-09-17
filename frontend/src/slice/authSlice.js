import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    refreshToken:null,
    user: null,
    isauthenticated: false,
}




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isauthenticated = true;
        },

        logout(state){
            state.accessToken = null;
            state.refreshToken = null;
            state.isauthenticated = false;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }


    }
    
})


export const { loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;
