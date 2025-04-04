import { DataGrid } from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { BiEdit, BiTrash } from "react-icons/bi";


import { ToastContainer, toast, Zoom } from "react-toastify";
import {Modal} from "antd";
import {createBrand, deleteBrand, getAllBrands, updateBrand} from "../../../api/brandService.js";
export const EditBrand = () => {
    const [editRowId, setEditRowId] = useState(null);
    const [editedValues, setEditedValues] = useState(null);
    const [nameBrandToDelete, setNameBrandToDelete] = useState(null);
    const [deleteRowId, setDeleteRowId] = useState(null);
    const [open, setOpen] = useState(false);
    const [brands, setBrands] = useState([]);


    useEffect(()=>{
        const fetchBrands = async() => {
            try{
                var res = await getAllBrands();
                console.log(res);
                setBrands(res.response)
            }
            catch (e) {
                console.log(e)
                throw e;
            }
        }


        fetchBrands();
    },[])

    const handleSaveEdit = async () => {
        try {
            console.log(editedValues)
            var response = await updateBrand({editRowId,editedValues})
            console.log(response)
            if(response.response){
                setBrands(prev => prev.map(brand => brand.brandId === editRowId ? {...brand,...editedValues} : brand))
                toast.success(`categoria actualizada!`)
            }



        } catch (e) {
            console.log(e)
            toast.error(e.response.data.message);

        }
        finally {
            setEditRowId(null);
            setEditedValues({});
        }

    };
    const handleEditClick = (params) => {
        if (editRowId !== params.id) {
            setEditRowId(params.id);
            setEditedValues({
                brandName: params.row.brandName,
                description: params.row.description,
            });
        } else {
            setEditRowId(null);
            setEditedValues({});
        }
    };

    const handleCancelEdit = () => {
        setEditRowId(null);
        setNameBrandToDelete(null);
        setEditedValues({});
    };
    const handleDeleteBrand = (params) => {
        setDeleteRowId(params.id);
        setNameBrandToDelete(params.row.brandName);
        setOpen(true);
    };
    const confirmDeleteBrand = async () => {
        try {
            var response = await deleteBrand(deleteRowId);
            console.log(response)
            setOpen(false)
            if(response.response){
                setBrands((prevState)=> prevState.filter(brand => brand.brandId !== deleteRowId));
                toast.success(`marca ${nameBrandToDelete} eliminado!`)
            }
        } catch (e) {
            setOpen(false)
            console.log(e)
            toast.error(e.response?.data?.message || "Error al eliminar");
        }
    }
    const handleCancelModalDelete = ()=> {
        setNameBrandToDelete("")
        setDeleteRowId(null)
        setOpen(false)
    }
    const columns = [
        { field: "brandId", headerName: "ID", width: 250 },
        {
            field: "brandName",
            headerName: "Nombre",
            width: 150,
            renderCell: (params) => {
                if (params.id === editRowId) {
                    // Muestra un campo de edición para la columna "Nombre" cuando está en modo de edición
                    return (
                        <input
                            type="text"
                            value={editedValues.brandName}
                            onChange={(e) =>
                                setEditedValues((prev) => ({ ...prev, brandName: e.target.value }))
                            }
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    );
                } else {
                    // Muestra el valor normal de la columna "Nombre"
                    return params.row.brandName;
                }
            },
        },
        {
            field: "description",
            headerName: "Descripcion",
            width: 220,
            renderCell: (params) => {
                if (params.id === editRowId) {
                    // Muestra un campo de edición para la columna "Descripción" cuando está en modo de edición
                    return (
                        <input
                            type="text"
                            value={editedValues.description}
                            onChange={(e) =>
                                setEditedValues((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    );
                } else {
                    // Muestra el valor normal de la columna "Descripción"
                    return params.row.description;
                }
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                if (params.id === editRowId) {
                    // Mostrar botones de Guardar y Cancelar durante la edición
                    return (
                        <div className="actions-table" >
                            <button onClick={handleSaveEdit}>Guardar</button>
                            <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                    );
                } else {
                    // Mostrar botones de Editar y Eliminar si no está en modo de edición
                    return (
                        <div className="actions-table">
                            <BiEdit onClick={() => handleEditClick(params)}>Editar</BiEdit>
                            <BiTrash onClick={() => handleDeleteBrand(params)}>
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
            <h1>Actualizar marcas: </h1>
            <div className={"table-datagrid"}>
                <DataGrid
                    rows={brands}
                    columns={columns}
                    getRowId={(row)=>row.brandId}
                    autoPageSize
                    disableRowSelectionOnClick
                    onCellKeyDown={(event) => {
                        if (event.key === " ") {
                            event.stopPropagation();
                        }
                    }}
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
            <Modal title="Confirmacion"  open={open} onCancel={handleCancelModalDelete} onOk={confirmDeleteBrand}>
                <p>
                    Estas seguro que deseas eliminar la marca {nameBrandToDelete} ?
                </p>
            </Modal>
        </>
    );
}