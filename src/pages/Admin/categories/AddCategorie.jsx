import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";

import { toast, ToastContainer, Zoom } from "react-toastify";
import {unwrapResult} from "@reduxjs/toolkit";
import {createCategory} from "../../../api/categoriesService.js";


export const AddCategorie = () => {
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            console.log(values);
            const response = await createCategory(values);

            console.log(response);
            toast.success(`categoria ${response.response.nombre} creada!`);
        }
        catch (rejerctedValue){
            toast.error(rejerctedValue.message)
        }
    };

    return (
        <div className="addCategorieForm">
            <h2>Añadir categorias: </h2>
            <div className="formulario">
                <Formik
                    initialValues={{
                        nombre: "",
                        descripcion: "",
                    }}
                    validate={(values) => {
                        let errores = {};
                        if (!values.nombre) {
                            errores.nombre = "*El nombre de la categoria es obligatorio";
                        }

                        return errores;
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ errors }) => (
                        <Form>
                            <div className="sectionForm">
                                <label htmlFor="nombre">Nombre</label>
                                <Field
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ingrese el nombre de la categoria"
                                />
                                <ErrorMessage
                                    name="nombre"
                                    component={() => <span>{errors.nombre}</span>}
                                />
                            </div>
                            <div className="sectionForm">
                                <label htmlFor="descripcion">Descripcion</label>
                                <Field
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    placeholder="Ingrese la descripcion de la categoria"
                                />
                            </div>
                            <button type="submit">AÑADIR</button>
                        </Form>
                    )}
                </Formik>
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
}