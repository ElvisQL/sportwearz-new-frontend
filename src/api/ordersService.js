import axios from "axios";
import {
    API_VENTA_REGISTRAR,
    API_VENTA_LISTAR,
    API_VENTA_CAMBIAR_ESTADO
} from "../utilities/baseUrl";
import { getConfigWithToken } from "../config/axiosConfig";
import error from "eslint-plugin-react/lib/util/error.js";

export const getAllOrders = async () => {
    try {
        const response = await axios.get(
            API_VENTA_LISTAR,
            getConfigWithToken()
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const registrarVenta = async(data) => {
    try{
        const response = await axios.post(API_VENTA_REGISTRAR,data,getConfigWithToken())
        console.log(response)
        return response;
    }catch (e) {
        console.log(error)
        throw error;
    }
}

export const cambiarEstado = async(estado) => {
    try{
        const res = await axios.patch(API_VENTA_CAMBIAR_ESTADO,estado,getConfigWithToken())
        console.log(res)
        return res;
    }
    catch (e) {
        console.log(e);
        throw e;
    }

}