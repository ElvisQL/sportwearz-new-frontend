// Esta función configurará el objeto de encabezados basándose en el token del usuario
export const getConfigWithToken = (includeCredentials = false) => {
    // Utiliza el hook useSelector dentro de esta función de componente
    const persistedState = localStorage.getItem("persist:root");

    const parsedState = JSON.parse(persistedState);
    console.log(parsedState);

    // Acceder al token del usuario
    const { token } = JSON.parse(parsedState.user).user;
    console.log(token);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    if (includeCredentials) {
        config.withCredentials = true;
    }
    return config;
};
