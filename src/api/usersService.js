import axios from "axios";
import {API_LIST_USER, API_USER_URL} from "../utilities/baseUrl";
import { getConfigWithToken } from "../config/axiosConfig";
export const getAllUsers = async () => {
    try {
        const response = await axios.get(API_LIST_USER, getConfigWithToken());
        console.log(response);
        const dataWithId = response.data.response.map((user) => ({
            ...user,
            id: user.userId,
        }));
        return dataWithId;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
