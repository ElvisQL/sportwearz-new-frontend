import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"

import userReducer from "../redux/slices/userSlice.js"

const persistConfig = {
    key:"root",
    storage,
    whitelist:["user"]
}
const rootReducer = combineReducers({
    user : userReducer
})


const persistedUserReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    }
})