import axios from "axios";
import {
    API_ADD_ITEM_CART,
    API_CART_URL,
    API_GET_CART,
    API_REMOVE_ITEM,
    API_UPDATE_ITEM
} from "../utilities/baseUrl.jsx";
import {getConfigWithToken} from "../config/axiosConfig.js";



export const getCart = async() => {
    try {

        const response = await axios.get(API_GET_CART,getConfigWithToken());
        return response.data; // { items: [], total: 0 }
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const addItem = async(data) => {
    try {
        console.log(data)
        const response = await axios.post(API_ADD_ITEM_CART,data,getConfigWithToken())
        console.log(response)
        return response.data;
    }
    catch (e) {
        console.log(e)
        throw e
    }
}

export const removeItem= async(cartItemId) => {
    try {
        console.log(cartItemId)
        const response = await axios.delete(API_REMOVE_ITEM(cartItemId),getConfigWithToken())
        console.log(response)
        return response.data;
    }
    catch (e) {
        console.log(e)
        throw e
    }
}


export const updateItem = async({cartItemId, quantity}) => {
    try{
        console.log("llegue aqui")
        const response = await axios.put(`http://localhost:5031/api/Cart/UpdateQuantity/${cartItemId}`, quantity,getConfigWithToken())
        console.log(response)
        return response.data
    }
    catch (e) {
        console.log(e)
        throw e
    }
}
