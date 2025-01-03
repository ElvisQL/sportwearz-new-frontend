import axios from "axios";

const apiClient = axios.create();
apiClient.interceptors.response.use(
    response => response, // Si la respuesta es correcta, simplemente la devuelve
    async error => {
        const originalRequest = error.config;

        // Si recibes un 401 (no autorizado)
        if (error.response && error.response.status === 401) {
            // Despacha la acción de logout
            store.dispatch(logoutUser());

            // Limpiar el local storage
            localStorage.clear();

            // Redirige al login
            const navigate = useNavigate();
            navigate('/login');
        }

        return Promise.reject(error); // Rechaza la promesa para que el flujo de control pueda seguir manejando el error
    }
);

export default apiClient;