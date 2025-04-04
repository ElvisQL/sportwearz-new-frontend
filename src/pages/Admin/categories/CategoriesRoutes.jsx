
import { crudRoutes } from "../../../routes/routes";
import { Route } from "react-router-dom";

import {AddCategorie} from "./AddCategorie.jsx";
import {NotFoundRoutes} from "../../../routes/NotFoundRoutes.jsx";
import {EditCategorie} from "./EditCategorie.jsx";

export const CategoriesRoutes = () => {
    return (
        <NotFoundRoutes>
            <Route
                path={crudRoutes.CREATE}
                element={<AddCategorie/>}
            />
            <Route
                path={crudRoutes.UPDATE}
                element={<EditCategorie/>}
            />

        </NotFoundRoutes>
    );
};