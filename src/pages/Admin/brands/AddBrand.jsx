import { Formik, Field, ErrorMessage, Form } from "formik";

import { useDispatch } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";

import {unwrapResult} from "@reduxjs/toolkit";
import {createBrand} from "../../../api/brandService.js";
export const AddBrand = () => {
    const dispatch = useDispatch();
    //TODO
    const handleSubmit1 = async (values) => {
        try {
            console.log(values);
            const resultAction = await createBrand(values);
            console.log(resultAction);

            if (resultAction.success) {
                toast.success(`Se añadió la marca ${resultAction.response.brandName} con éxito`);
            } else {
                // Manejar errores del servidor (como marca ya existente)
                toast.error(resultAction.message || 'Error al crear la marca');
            }

        } catch (rejectedValue) {
            console.log(rejectedValue);
            // Manejar errores de red o excepciones no controladas
            toast.error(rejectedValue.message || 'Error de conexión');
        }
    };
    /* const handleSubmit = (values) => {
       dispatch(createBrandThunk(values))
         .then((res) => {
           console.log(res);
           toast.success(res.payload.message);
         })

         .catch((e) => {
           console.error(e);
           toast.error(e.response.message);
         });
     };*/
    return (
        <div className="box-add-brand-form">
            <h1>Añadir Marca de productos: </h1>
            <div className="formulario">
                <Formik
                    initialValues={{
                        brandName: "",
                        description: "",
                    }}
                    validate={(values) => {
                        let errores = {};
                        if (!values.brandName) {
                            errores.brandName = "*El nombre de la marca es obligatorio";
                        }
                        return errores;
                    }}
                    onSubmit={(values) => {
                        handleSubmit1(values);
                    }}
                >
                    {({ errors }) => (
                        <Form>
                            <div className="sectionForm">
                                <label htmlFor="brandName">Nombre</label>
                                <Field
                                    type="text"
                                    id="brandName"
                                    name="brandName"
                                    placeholder="Ingrese el nombre de la marca"
                                />
                                <ErrorMessage
                                    name="brandName"
                                    component={() => <span>{errors.brandName}</span>}
                                />
                            </div>
                            <div className="sectionForm">
                                <label htmlFor="description">Descripcion</label>
                                <Field
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Ingrese la descripcion de la marca"
                                />
                                <ErrorMessage
                                    name="description"
                                    component={() => <span>{errors.description}</span>}
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