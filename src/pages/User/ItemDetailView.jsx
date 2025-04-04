import { useEffect, useState } from "react";
import Loader from "../../components/Loader.jsx";
import {ItemDetail} from "../../components/ItemDetail.jsx";
import { useParams } from "react-router-dom";
import {getProduct} from "../../api/productsService.js";
const ItemDetailView = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [producto, setProducto] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const response = await getProduct(id)
                console.log(response)
                setProducto(response.response);
            } catch (error) {
                console.error(error);
                setError("no se pudo cargar el producto.intententelo nuevamente");
            } finally {
                setIsLoading(false);
            }
        };

        fetchingData();
    }, [id]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div>{error}</div>
            ) : (producto &&
                <ItemDetail product={producto} />
            )}
        </>
    );
};
export default ItemDetailView;
