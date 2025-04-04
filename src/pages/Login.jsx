import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {loginUser, getCurrentUser, logout} from "../redux/slices/userSlice.js";
import {useEffect, useState} from "react";

const Login = () => {
    const [errorMessages, setErrorMessages] = useState({
        incorrectPassword: "",
        invalidUser: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user.user.user);

    useEffect(() => {
        console.log("llegue aqui y el token es: ", token)
        if (token) {
            dispatch(logout());
            navigate('/login');
        }

    }, []);

    const handleLogin = async (values) => {
        try {
            console.log(values);
            const response = await dispatch(loginUser(values));
            console.log(response)
            navigate("/");
        } catch (error) {
            const { data, status } = error;
            if (status === 401) {
                setErrorMessages((prev) => ({ ...prev, incorrectPassword: data.message }));
            } else if (status === 404) {
                setErrorMessages((prev) => ({ ...prev, invalidUser: data.message }));
            }
        }
    };

    const validationRules = (values) => {
        let errors = {};

        // Validación de email
        if (!values.email) {
            errors.email = "Ingrese su email";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Ingrese un email válido";
        } else if (errorMessages.invalidUser) {
            errors.email = errorMessages.invalidUser;
        }

        // Validación de contraseña
        if (!values.passwordHash) {
            errors.password = "Ingrese una contraseña";
        } else if (values.passwordHash.length < 2) {
            errors.password = "La contraseña debe ser mayor a 6 dígitos";
        } else if (errorMessages.incorrectPassword) {
            errors.password = errorMessages.incorrectPassword;
        }

        return errors;
    };

    const clearErrorMessages = () => {
        setErrorMessages({ incorrectPassword: "", invalidUser: "" });
    };

    return (
        <div className="body-login">
            <div className="container-login">
                <h1>Login</h1>
                <Formik
                    initialValues={{
                        email: "",
                        passwordHash: "",
                    }}
                    validate={validationRules}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                    {({ errors, setFieldTouched }) => (
                        <Form className="form-container">
                            <div className="container-section-form">
                                <label htmlFor="email">Email</label>
                                <Field
                                    type="text"
                                    id="email"
                                    placeholder="Ingrese su Email"
                                    name="email"
                                    onFocus={() => {
                                        setFieldTouched("email", false);
                                        clearErrorMessages();
                                    }}
                                />
                                <ErrorMessage
                                    name="email"
                                    component={() => <span>{errors.email}</span>}
                                />
                            </div>

                            <div className="container-section-form">
                                <label htmlFor="passwordHash">Contraseña</label>
                                <Field
                                    type="password"
                                    id="passwordHash"
                                    placeholder="Ingrese su Contraseña"
                                    name="passwordHash"
                                    onFocus={() => {
                                        setFieldTouched("passwordHash", false);
                                        clearErrorMessages();
                                    }}
                                />
                                <ErrorMessage
                                    name="password"
                                    component={() => <span>{errors.password}</span>}
                                />
                            </div>

                            <button type="submit">Ingresar</button>
                            <span>
                                ¿Aún no estás registrado?
                                <Link to="/signup">Regístrate</Link> para más beneficios.
                            </span>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
