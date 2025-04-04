import React, {useEffect, useState} from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import Select from "react-select";
import { TbPhotoPlus } from "react-icons/tb";
import { LuImagePlus } from "react-icons/lu";

import {PreviewImage} from "./PreviewImage";


export const ProductForm = ({
                                valoresIniciales,
                                onSubmit,
                                isUpdate,
                                imageView,
                                setImageView,
                                categories,
                                brands
                            }) => {




    return (
        <>
            <Formik
                initialValues={valoresIniciales}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({values,setFieldValue,isSubmitting}) => (
                    <Form>
                        <div className="label-horizontal-1">
                            <label htmlFor="productName">Nombre</label>
                            <Field type="text" name="productName" id="productName" />
                        </div>
                        <div className="label-select">
                            <label htmlFor="categoriesIds">Categoria</label>
                            <FieldArray name="categorieIds" id="categoriesIds">
                                {() => (
                                    <>
                                        <Select
                                            isMulti
                                            options={categories?.map((cat) => ({
                                                value: cat.categoryId,
                                                label: cat.nombre,
                                            }))}
                                            onChange={(selected) => {
                                                setFieldValue(
                                                    "categoriesIds",
                                                    selected.map((option) => option.value)
                                                );
                                            }}
                                            value={
                                                values.categoriesIds?.length > 0
                                                    ? values.categoriesIds.map(value => ({
                                                        value,
                                                        label: categories.find(c => c.categoryId === value)?.nombre
                                                    }))
                                                    : []
                                            }
                                            /*defaultValue={
                                                isUpdate
                                                    ? selected.category?.map((catId) => ({
                                                        value: catId,
                                                        label: categories.find((cat) => cat.id === catId)
                                                            ?.title,
                                                    }))
                                                    : []
                                            }*/
                                        />
                                    </>
                                )}
                            </FieldArray>
                        </div>

                        <div className="label-horizontal-3">
                            <label htmlFor="price">Precio</label>
                            <Field type="text" name="price" id="price" />
                        </div>
                        <div className="label-horizontal-4">
                            <label htmlFor="stock">Cantidad</label>
                            <Field type="text" name="stock" id="stock" />
                        </div>
                        <div className="label-description">
                            <label htmlFor="description">Descripcion</label>
                            <Field as="textarea" name="description" id="description" />
                        </div>
                        <div className="brand">
                            <label htmlFor="brandId">Marca</label>
                            <Field name="brandId" id="brandId">
                                {() => {

                                    return(
                                        <>
                                            <Select
                                                options={brands?.map((brand) => ({
                                                    value: brand.brandId,
                                                    label: brand.brandName,
                                                }))}
                                                onChange={(selected) => {
                                                    setFieldValue("brandId", selected?.value);
                                                }}
                                                value={
                                                    values.brandId && brands.some(b => b.brandId === values.brandId)
                                                        ? {
                                                            value: values.brandId,
                                                            label: brands.find(b => b.brandId === values.brandId).brandName
                                                        }
                                                        : null
                                                }
                                                /*defaultValue={
                                                    selectedBrand ? {value:selectedBrand._id,label:selectedBrand.name} :null
                                                }*/
                                            />
                                        </>)
                                }}

                            </Field>
                        </div>

                        <div className="label-image">

                            <div className="container-img">
                                {isUpdate && valoresIniciales.imageURL && !imageView? (
                                    <img src={valoresIniciales.imageURL} alt="preview" />
                                ) : imageView ? (
                                    <PreviewImage file={imageView}/>
                                ) : (
                                    <TbPhotoPlus />
                                )}
                            </div>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => {
                                    console.log(e.target.files);
                                    setFieldValue("image", e.currentTarget.files[0])
                                    setImageView(e.currentTarget.files[0])
                                }}
                            />
                            <label htmlFor="image">
                                <LuImagePlus /> Agregue una imagen
                            </label>
                        </div>
                        <div className="button">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Guardando..." : isUpdate ? "Actualizar" : "Crear"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};
