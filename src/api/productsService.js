import { getConfigWithToken } from "../config/axiosConfig";
import {
    API_CREATE_PRODUCT, API_EDIT_PRODUCT,
    API_PRODUCT_DELETE,
    API_PRODUCT_GET,
    API_PRODUCT_LIST,
    API_PRODUCT_URL
} from "../utilities/baseUrl";
import axios from "axios";
import { UPLOAD_PRESET, CLOUD_NAME } from "../utilities/cloudinaryConstants";

export const getAllProducts = async (params) => {
    console.log(params);
    const response = await axios.get(API_PRODUCT_LIST, { params });
    return response.data;
};

export const getProduct = async (id) => {
    const response = await axios.get(API_PRODUCT_GET + "/" + id);
    return response.data;
};
export const uploadImage = async (image) => {
    if (!image) {
        return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);
    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
            data
        );
        return response.data.secure_url;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const createProduct = async (data) => {
    console.log(data)
    const URL = await uploadImage(data.image);
    if (!URL) {
        // Mostrar un mensaje de error si no se obtiene la URL de la imagen
        console.log("no se pudo subir la imagen(cloudinary)");
        throw new Error("no se pudo subir la imagen(cloudinary)");
    }
    data.imageURL = URL;
    delete data.image;





    console.log(data)
    const response = await axios.post(
        API_CREATE_PRODUCT,
        data,
        getConfigWithToken()
    );
    return response.data;

};

export const deleteProduct = async (id) => {
    const response = await axios.delete(
        `${API_PRODUCT_DELETE}/${id}`,
        getConfigWithToken()
    );
    return response.data;
};

export const updateProduct = async (id, data) => {
    try {
        console.log("a enviar : ", data);
        const response = await axios.put(
            `${API_EDIT_PRODUCT}/${id}`,
            data,
            getConfigWithToken()
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
