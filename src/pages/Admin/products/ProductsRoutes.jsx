import {ProductCreate} from "./ProductCreate.jsx";
import {ProductUpdate} from "./ProductUpdate.jsx";
import {ProductEdit} from "./ProductEdit.jsx"
import {Route, Routes} from "react-router-dom";
import {NotFoundRoutes} from "../../../routes/NotFoundRoutes.jsx";
export const ProductsRoutes = () => {
    return (
        <NotFoundRoutes>
            {/* Operaciones CRUD */}
            <Route path="add" element={<ProductCreate />} />
            <Route path="edit" element={<ProductEdit />} />
            <Route path="edit/:id" element={<ProductUpdate />} />
        </NotFoundRoutes>
    );
};