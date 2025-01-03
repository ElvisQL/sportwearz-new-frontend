import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"



const persistConfig = {
    key:"root",
    storage,
    whitelist:["user"]
}
const rootReducer = combineReducers({
    user : userReducer
})

export const store = configureStore({
    reducer: {

    }
})