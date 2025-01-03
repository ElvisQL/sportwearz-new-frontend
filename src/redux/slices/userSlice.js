import {createSlice} from "@reduxjs/toolkit";


const userDefaultState = {
    _id: null,
    name: "",
    email: "",
    role:"",
    token:"",
    cart:[],
    wishList:[]

};

const initialState = {
    user: userDefaultState,
    redirectMessage: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    }
})