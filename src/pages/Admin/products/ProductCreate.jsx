import { Field, FieldArray, Form, Formik } from "formik";

import { TbPhotoPlus } from "react-icons/tb";
import { LuImagePlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";

import { toast, ToastContainer, Zoom } from "react-toastify";

import { ProductForm } from "./ProductForm";

import {unwrapResult} from "@reduxjs/toolkit";
import axios from "axios";
import {createProduct} from "../../../api/productsService.js";
import {getCategories} from "../../../api/categoriesService.js";
import {getAllBrands} from "../../../api/brandService.js";
//CORREGIR ERRORES DE SUBIR PRODUCTO
export const ProductCreate = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [imageView, setImageView] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, brandsRes] = await Promise.all([
                    getCategories(),
                    getAllBrands()
                ]);
                console.log(categoriesRes)
                console.log(brandsRes)
                setCategories(categoriesRes.response);
                setBrands(brandsRes.response);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleOnSubmit = async (values) => {
    try {
        console.log(values);
      values.image = imageView;
      console.log(values);
      const res = await createProduct(values);
      console.log(res);
      if(res.success){
          toast.success(`Producto ${res.response.productName} creado con exito!`)
      }
    }
    catch (error){
      console.error(error);

      toast.error(error.response);
    }

  };

  return (
      <div className="add-product-view">
        <h1>Añadir producto: </h1>
        <div className="box-formik">
          <ProductForm
              valoresIniciales={{
                productName: "",
                description: "",
                price: "",
                stock: "",
                brandId: null,
                categoriesIds: [],
                image: null,
              }}
              onSubmit={handleOnSubmit}
              isUpdate={false}
              imageView={imageView}
              setImageView={setImageView}
              categories={categories}
              brands={brands}
          ></ProductForm>
        </div>
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
