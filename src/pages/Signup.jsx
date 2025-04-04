import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { createUser } from "../redux/slices/userSlice"; // Supón que defines esta acción en tu Redux

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messageUserExisting, setMessageUserExisting] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorMessages, setErrorMessages] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Obtener los valores del formulario
        const form = e.target;
        const userData = {
            username: form.elements.username.value,
            email: form.elements.email.value,
            passwordHash: form.elements.passwordHash.value,
            confirmPasswordHash: form.elements.confirmPasswordHash.value,
            firstName: form.elements.firstName.value,
            lastName: form.elements.lastName.value,
            phoneNumber: form.elements.phoneNumber.value,
        };

        // Validaciones rápidas (puedes mejorarlas según tu lógica)
        const errors = {};
        if (!userData.username) errors.username = "Ingrese nombre de usuario";
        if (!userData.email) errors.email = "Ingrese Email";
        if (!userData.passwordHash) errors.passwordHash = "Ingrese contraseña";
        if (userData.passwordHash !== userData.confirmPasswordHash) {
            errors.confirmPasswordHash = "Las contraseñas no coinciden";
        }
        if (!userData.firstName) errors.firstName = "Ingrese primer nombre";
        if (!userData.lastName) errors.lastName = "Ingrese apellido";
        if (!userData.phoneNumber) errors.phoneNumber = "Ingrese número de teléfono";

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }
        console.log(userData)
        const res = await dispatch(createUser(userData));
        const {response} = res.payload;
        const {email,passwordHash} = response;
        dispatch(loginUser({email,passwordHash}))
            .then((response) => {
                    navigate('/');

            })


    };

    return (
        <div className="body-login">
            <div className="container-signup">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Nombre de usuario</label>
                        <input type="text" id="username" name="username" />
                        {errorMessages.username && <span>{errorMessages.username}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                        {errorMessages.email && <span>{errorMessages.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="passwordHash">Contraseña</label>
                        <input type="password" id="passwordHash" name="passwordHash" />
                        {errorMessages.passwordHash && <span>{errorMessages.passwordHash}</span>}
                    </div>
                    <div>
                        <label htmlFor="confirmPasswordHash">Confirmar contraseña</label>
                        <input type="password" id="confirmPasswordHash" name="confirmPasswordHash" />
                        {errorMessages.confirmPasswordHash && <span>{errorMessages.confirmPasswordHash}</span>}
                    </div>
                    <div>
                        <label htmlFor="firstName">Primer nombre</label>
                        <input type="text" id="firstName" name="firstName" />
                        {errorMessages.firstName && <span>{errorMessages.firstName}</span>}
                    </div>
                    <div>
                        <label htmlFor="lastName">Apellido</label>
                        <input type="text" id="lastName" name="lastName" />
                        {errorMessages.lastName && <span>{errorMessages.lastName}</span>}
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Número de teléfono</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" />
                        {errorMessages.phoneNumber && <span>{errorMessages.phoneNumber}</span>}
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;