import { DataGrid } from "@mui/x-data-grid";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Modal } from "antd";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast, ToastContainer, Zoom } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import {deleteProduct, getAllProducts, updateProduct} from "../../../api/productsService.js";
import {API_EDIT_PRODUCT, API_PRODUCT_URL} from "../../../utilities/baseUrl.jsx";


export const ProductEdit= () => {
    const [open, setOpen] = useState(false);
    const [deleteRowId, setDeleteRowId] = useState(null);
    const [nameCategoryToDelete, setNameCategoryToDelete] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProducts = async () => {
            try{
                var response = await getAllProducts();
                console.log(response)
                setProducts(response.response)
            } catch (e){
                console.log(e)
                throw e;
            }

        }


        fetchProducts()
    },[])

    const handleEditProduct = (id) => {
        console.log(id); //TODO
        navigate(`${id}`);
    };
    const handleDeleteProduct = (params) => {
        console.log(params)
        setDeleteRowId(params.id);
        setNameCategoryToDelete(params.row.productName);

        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setDeleteRowId(null);
        setNameCategoryToDelete(null);
    };
    const handleOk = async() => {
        setConfirmLoading(true);
        try {
            var response = await deleteProduct(deleteRowId);
            console.log(response);
            if (response.success){
                setProducts(prevState => prevState.filter(p => p.productId !== deleteRowId))
                toast.success(`producto ${nameCategoryToDelete} eliminado!`)
            }

        } catch (e) {
            console.log(e);
            toast.error(e.response);
        }
        finally {
            setConfirmLoading(false);
            setOpen(false);
            setDeleteRowId(null);
            setNameCategoryToDelete(null);
        }

    };

    const columns = [
        {field:"productId", headerName: "ID", width: 150,},
        {
            field: "imageURL",
            headerName: "Imagen",
            width: 200,

            renderCell: (params) => {
                return (
                    <div
                        style={{
                            width: "4.5em",
                            height: "4.5em",
                            borderRadius: "50%",
                            border: "solid gray 0.150em",
                            overflow: "hidden",
                            margin: "auto",
                        }}
                    >
                        <img
                            src={params.row.imageURL}
                            alt={`image-id-${params.id}`}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                    </div>
                );
            },
        },
        { field: "productName", headerName: "Nombre", width: 300 },
        { field: "price", headerName: "Precio(ars$)", width: 150 },
        { field: "stock", headerName: "cantidad", width: 150 },
        {
            field: "action",
            headerName: "Acciones",
            maxWidth: 250,
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="actions-table">
                        <BiEdit onClick={() => handleEditProduct(params.id)}>Editar</BiEdit>
                        <BiTrash onClick={() => handleDeleteProduct(params)}>
                            Eliminar
                        </BiTrash>
                    </div>
                );
            },
        },
        ,
    ];
    console.log(products);

    return (
        <>
            <h1>Editar productos</h1>
            <div className="table-datagrid">
                <DataGrid
                    rows={products}
                    columns={columns}
                    autoPageSize
                    getRowId={row => row.productId}
                    disableRowSelectionOnClick
                    getRowHeight={() => "auto"}
                ></DataGrid>
            </div>
            <Modal
                title="Confirmacion"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <p>
                    Estas seguro que deseas eliminar el producto {nameCategoryToDelete}?
                </p>
            </Modal>
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
        </>
    );
};