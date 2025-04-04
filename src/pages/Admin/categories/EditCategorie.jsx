import { DataGrid } from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {Await, Link} from "react-router-dom";
import { adminRoutes, crudRoutes } from "../../../routes/routes";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { ToastContainer, Zoom, toast } from "react-toastify";
import { Modal } from "antd";
import {deleteCategories, getCategories, updateCategories} from "../../../api/categoriesService.js";


export const EditCategorie = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [editRowId, setEditRowId] = useState(null);
    const [deleteRowId, setDeleteRowId] = useState(null);
    const [nameCategoryToDelete, setNameCategoryToDelete] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect( ()=>{
            const fetchCategories = async () => {
                try {
                    var res = await getCategories();
                    console.log(res)
                    setCategories(res.response)
                } catch (e) {
                    console.log(e)
                    throw e
                }
            }

            fetchCategories()
    }

,[])
    const handleCancel = () => {
        setDeleteRowId(null);
        setOpen(false);
    };
    const handleOk = async () => {
        setConfirmLoading(true);
        //aca hacer el diapstch de delete
        try {
            var response = await deleteCategories(deleteRowId);
            console.log(response)
            setConfirmLoading(false);
            setOpen(false);
            if(response.response){
                // Filtrar la categoría eliminada del estado
                setCategories(prev => prev.filter(cat => cat.categoryId !== deleteRowId));
                toast.success(`Categoría "${nameCategoryToDelete}" eliminada correctamente!`);
            }

        } catch (e) {
            console.log(e)
            setOpen(false)
            setConfirmLoading(false);
            toast.error(e.response?.data?.message || "Error al eliminar");
        }

    };

    const handleEditClick = (params) => {
        console.log(params);
        if (editRowId !== params.id) {
            setEditRowId(params.id);
            setEditedValues({
                nombre: params.row.nombre,
                descripcion: params.row.descripcion,
            });
        } else {
            setEditRowId(null);
            setEditedValues({});
        }
    };
    const handleCancelEdit = () => {
        setEditRowId(null);
        setNameCategoryToDelete(null);
        setEditedValues({});
    };
    const handleSaveEdit = async () => {
        try {
            var response = await updateCategories({editRowId, editedValues});
            console.log(editedValues);
            console.log(response);
            if(response.response){
                setCategories(prev =>
                    prev.map(cat =>
                        cat.categoryId === editRowId
                            ? { ...cat, ...editedValues }
                            : cat
                    )
                );
                toast.success(`categoria actualizada!`);
            }

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message);

        } finally {
            // Limpiar los valores editados y desactivar el modo de edición
            setEditRowId(null);
            setEditedValues({});
        }
    }




    const handleDeleteCategory = (params) => {
        setDeleteRowId(params.id);
        setNameCategoryToDelete(params.row.nombre);

        setOpen(true);
        console.log(params);
    };
    const columns = [
        {field: "categoryId", headerName: "ID", width: 250},
        {
            field: "nombre",
            headerName: "Nombre",
            width: 150,

            renderCell: (params) => {
                if (params.id === editRowId) {
                    // Muestra un campo de edición para la columna "Nombre" cuando está en modo de edición
                    return (
                        <input
                            type="text"
                            value={editedValues.nombre}
                            onChange={(e) =>
                                setEditedValues((prev) => ({...prev, nombre: e.target.value}))
                            }
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    );
                } else {
                    // Muestra el valor normal de la columna "Nombre"
                    return params.row.nombre;
                }
            },
        },
        {
            field: "descripcion",
            headerName: "Descripcion",
            width: 280,

            renderCell: (params) => {
                if (params.id === editRowId) {
                    // Muestra un campo de edición para la columna "Descripción" cuando está en modo de edición
                    return (
                        <input
                            type="text"
                            value={editedValues.descripcion}
                            onChange={(e) =>
                                setEditedValues((prev) => ({
                                    ...prev,
                                    descripcion: e.target.value,
                                }))
                            }
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    );
                } else {
                    // Muestra el valor normal de la columna "Descripción"
                    return params.row.descripcion;
                }
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 120,
            maxWidth: 180,
            renderCell: (params) => {
                if (params.id === editRowId) {
                    // Mostrar botones de Guardar y Cancelar durante la edición
                    return (
                        <div className="actions-table">
                            <button onClick={handleSaveEdit}>Guardar</button>
                            <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                    );
                } else {
                    // Mostrar botones de Editar y Eliminar si no está en modo de edición
                    return (
                        <div className="actions-table">
                            <BiEdit onClick={() => handleEditClick(params)}>Editar</BiEdit>
                            <BiTrash onClick={() => handleDeleteCategory(params)}>
                                Eliminar
                            </BiTrash>
                        </div>
                    );
                }
            },
        },
    ];

    return (
        <>
            <h1>Edit Categories</h1>
            <div className="table-datagrid">
                <DataGrid
                    rows={categories}
                    columns={columns}
                    autoPageSize
                    getRowId = {(row) => row.categoryId}
                    disableRowSelectionOnClick
                    disableDensitySelector
                    onCellKeyDown={(params, event) => {
                        // Evitar el comportamiento predeterminado al presionar la barra espaciadora
                        if (event.key === " ") {
                            event.stopPropagation();
                        }
                    }

                    }
                    /* sx={{
                      "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                      },
                    }} */
                />
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
            <Modal
                title="Confirmacion"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>
                    Estas seguro que deseas eliminar la categoria {nameCategoryToDelete} ?
                </p>
            </Modal>
        </>
    )
}