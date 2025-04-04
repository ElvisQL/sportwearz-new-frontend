import axios from "axios";
import {API_CATEGORY_CREATE, API_CATEGORY_DELETE, API_CATEGORY_EDIT, API_CATEGORY_LIST} from "../utilities/baseUrl";
import { getConfigWithToken } from "../config/axiosConfig";

export const getCategories = async () => {
    try {
        const response = await axios.get(API_CATEGORY_LIST);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const createCategory = async (data) => {
    try {
        const response = await axios.post(
            API_CATEGORY_CREATE,
            data,
            getConfigWithToken()
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateCategories = async ({editRowId,editedValues}) => {
    try {
        const response = await axios.put(
            `${API_CATEGORY_EDIT}/${editRowId}`,
            editedValues,
            getConfigWithToken()
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCategories = async (id) => {
    try {
        const response = await axios.delete(
            `${API_CATEGORY_DELETE}/${id}`,
            getConfigWithToken()
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};