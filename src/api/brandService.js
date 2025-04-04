import axios from "axios";
import {API_BRAND_CREATE, API_BRAND_DELETE, API_BRAND_EDIT, API_BRAND_LIST, API_BRAND_URL} from "../utilities/baseUrl";
import { getConfigWithToken } from "../config/axiosConfig";
export const getAllBrands = async () => {
    try {
        const response = await axios.get(API_BRAND_LIST);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const createBrand = async (data) => {
    try {
        const response = await axios.post(
            API_BRAND_CREATE,
            data,
            getConfigWithToken()
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error

    }
};

export const updateBrand = async ({editRowId,editedValues}) => {
    try {
        console.log(editRowId)
        console.log(editedValues)
        const response = await axios.put(
            `${API_BRAND_EDIT}/${editRowId}`,
            editedValues,
            getConfigWithToken()
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteBrand = async (id) => {
    try{
        const response = await axios.delete(`${API_BRAND_DELETE}/${id}`,getConfigWithToken())
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}
