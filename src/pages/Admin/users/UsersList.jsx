import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import {getAllUsers} from "../../../api/usersService.js";
export const UsersList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                console.log(response);
                setUsers(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    const columns = [
        {
            field: "username",
            headerName: "Nombre",
            width: 100,
        },
        {
            field: "email",
            headerName: "Email",
            width: 100,
        },
        {
            field: "roleName", // Nombre personalizado para la columna
            headerName: "Rol",
            width: 150,
            valueGetter: (params) => params?.row?.role?.roleName || "Sin rol", // Accede al roleName
        },
        {
            field: "action",
            headerName: "Acciones",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="actions-table">
                        <button>Ver mas</button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <h1>VER USUARIOS</h1>
            <DataGrid
                columns={columns}
                rows={users}
                getRowId={(row) => row.userId}
                autoPageSize
                disableRowSelectionOnClick
                /* getRowHeight={() => "auto"} */
            />
        </>
    );
};