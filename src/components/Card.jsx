import {Link, useParams} from "react-router-dom";
import {publicRoutes, userRoutes} from "../routes/routes.js";

const Card = ({ producto }) => {
    const { username } = useParams()
    return (
        <div className="card">
            <img src={producto.imageURL} alt="rutaimagen" />
            <div className="card-body">
                <h4>{producto.productName}</h4>
                <span>${producto.price}</span>
                <div className="container-boton-card">
                    <Link
                        className="link-boton"
                        to={username
                            ? `/${username}/catalog/${producto.productId}` // Ruta con username
                            : `/catalog/${producto.productId}` // Ruta base
                        }
                    >
                        <span>Ver Producto</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
