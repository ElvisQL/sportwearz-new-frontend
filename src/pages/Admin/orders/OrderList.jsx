import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

import { getAllOrders } from "../../../api/ordersService";
import { useNavigate } from "react-router-dom";
import moment from "moment"
import {Button} from "antd";
export const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders();
                const formattedOrders = response.response.map(order => ({
                    ...order,
                    id: order.idVenta // Mapea idVenta a id
                }));
                console.log(formattedOrders);
                setOrders(formattedOrders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    const columns = [
        {
            field: "idUsuario",  // Usar el nombre correcto del campo
            headerName: "Usuario",
            width: 150,

        },
        {
            field: "cantidad",
            headerName: "Cantidad Productos",
            width: 150,
            valueGetter: (value, row) => {
                const detalles = row.detalleVenta || [];
                return detalles.reduce((total, detalle) => total + detalle.cantidad, 0);
            },
        },
        {
            field: "estado",
            headerName: "Estado",
            width: 150,

        },
        {
            field: "total",
            headerName: "Total",
            width: 150,

        },
        {
            field: "fechaCreacion",
            headerName: "Fecha",
            width: 150,
            
        },
        {

            field: "acciones",
            headerName: "Acciones",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/admin/orders/${params.id}`)}
                >
                    Ver Detalles
                </Button>
            ),
        },
    ];

    return (
        <>
            <h1>ORDENES TOTALES</h1>
            <DataGrid
                columns={columns}
                rows={orders}
                autoPageSize
                getRowId={(row)=>row.idVenta}
                disableRowSelectionOnClick
            />
        </>
    );
};