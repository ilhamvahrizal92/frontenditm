import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isServerBusy: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        //login with ldap API 'http://localhost:5000/user/ldap, http://localhost:5000/login
        const response = await axios.post('http://localhost:5000/login', {
            email: user.userName,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if(error.response){ 
             const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
       
    }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        //getme with ldP http://localhost:5000/user/getmeldap, http://localhost:5000/me
        const response = await axios.get('http://localhost:5000/me');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            if (error.response.status === 503) {
                return thunkAPI.rejectWithValue({ message, isServerBusy: true });
              }
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete('http://localhost:5000/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true;
            state.isServerBusy =  false;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.isServerBusy = action.payload && action.payload.isServerBusy;
        });

        // Get User Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.isServerBusy = action.payload && action.payload.isServerBusy;
        })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;