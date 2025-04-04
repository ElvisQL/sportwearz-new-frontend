import { useEffect, useState } from "react";
import { getAllOrders} from "../../../api/ordersService";

export const OrderDetail = ({ id }) => {
    const [order, setOrder] = useState();
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await getAllOrders(id);
            console.log(response);
            setOrder(response);
        };
        fetchOrders();
    }, []);

    return (
        order && (
            <div>
                <h1>Order Detail</h1>
                <div>
                    <div>
                        <h2>Cliente</h2>
                        <p>Nombre: {order.orderBy.nombre}</p>
                        <p>Email: {order.orderBy.email}</p>
                    </div>
                    <div>
                        <h3>Productos</h3>
                        <ul>
                            {order.products.map((p) => (
                                <li key={p._id}>
                                    <div className="description-product">
                                        <h3>{p.name}</h3>
                                        <span>cantidad : {p.cantidad}</span>
                                        <span>
                      Total <b>{p.precio * p.cantidad}</b>
                    </span>
                                    </div>
                                    {/* <BsTrashFill
                                    onClick={() => sacarProducto(p._id)}
                                    className="trash-icon"
                                ></BsTrashFill> */}
                                </li>
                            ))}
                        </ul>
                        <div>
                            <h4>Total de la orden </h4>
                            <span>
                Total <b>{order.totalOrder}</b>
              </span>
                        </div>
                    </div>
                    <div>
                        <h3>Estado de la orden</h3>
                        <p>Estado: {order.orderStatus}</p>
                    </div>
                </div>
            </div>
        )
    );
};
