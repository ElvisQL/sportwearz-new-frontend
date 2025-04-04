import { ProductForm } from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";

import {useEffect, useState} from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { useParams } from "react-router-dom";
import {getProduct, updateProduct, uploadImage} from "../../../api/productsService";
import {getCategories} from "../../../api/categoriesService.js";
import {getAllBrands} from "../../../api/brandService.js";

export const ProductUpdate= () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        productName: '',
        price: 0,
        stock: 0,
        description: '',
        categoriesIds: [],
        brandId: ''
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [imageView, setImageView] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Obtener datos necesarios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, categoriesRes, brandsRes] = await Promise.all([
                    getProduct(id),
                    getCategories(),
                    getAllBrands()
                ]);
                console.log(productRes)
                console.log(categoriesRes)
                console.log(brandsRes)
                setProduct(productRes.response);
                setCategories(categoriesRes.response);
                setBrands(brandsRes.response);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);
    const handleOnSubmit = async (values) => {
        console.log(values);
        try {
            if (imageView) {
                const newImageURL = await uploadImage(imageView);
                values = { ...values, URLimage: newImageURL };
            }

            var res = await updateProduct(id,values);
            console.log(res);
            if(res.success){
                toast.success(`el producto ha sido actualizado con exito!`)
            }

        } catch (e) {
            console.error(e);
            toast.error(e.response);
        }
    };
    return (
        <div className="add-product-view">
            {
                isLoading ? (
                    <div>Cargando... </div>
                ): (
                    <>
                        <h1>Actualiza el producto</h1>
                        <div className="box-formik">
                            <ProductForm
                                valoresIniciales={{
                                    productName: '',
                                    price: 0,
                                    stock: 0,
                                    description: '',
                                    categoriesIds: [],
                                    brandId: '',
                                    ...product

                                }}
                                onSubmit={handleOnSubmit}
                                isUpdate={true}
                                imageView={imageView}
                                setImageView={setImageView}
                                categories={categories}
                                brands={brands}
                            />
                        </div>
                    </>
                )
            }

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Zoom}
            />
        </div>
    );
};