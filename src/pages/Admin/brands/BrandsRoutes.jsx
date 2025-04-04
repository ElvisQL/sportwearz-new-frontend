
import { Route } from "react-router-dom";
import { crudRoutes } from "../../../routes/routes";

import {NotFoundRoutes} from "../../../routes/NotFoundRoutes.jsx";
import {AddBrand} from "./AddBrand.jsx";
import {EditBrand} from "./EditBrand.jsx";

export const BrandsRoutes = () => {
    return (
        <NotFoundRoutes>
            <Route
                path={crudRoutes.CREATE}
                element={<AddBrand/>}
            />
            <Route
                path={crudRoutes.UPDATE}
                element={<EditBrand/>}
            />

        </NotFoundRoutes>
    );
}