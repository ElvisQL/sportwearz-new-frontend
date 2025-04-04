import apiClient from "./apiClient.js";
import {API_LOGIN_USER} from "../utilities/baseUrl.jsx";


export const login = async ({email,passwordHash})=> {
    console.log(email);
    console.log(passwordHash);
    const response = await apiClient.post(API_LOGIN_USER,{email,passwordHash});
    console.log(response);
    return response;
}

