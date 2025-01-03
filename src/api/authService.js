import apiClient from "./apiClient.js";
import {API_LOGIN_USER} from "../utilities/baseUrl.js";
import {getConfigWithToken} from "../config/axiosConfig.js";


export const login = async ({email,password})=> {
    const response = await apiClient.post(API_LOGIN_USER,{email,password},getConfigWithToken(false))
//todo
}