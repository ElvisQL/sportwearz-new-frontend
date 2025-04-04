
import { crudRoutes } from "../../../routes/routes";
import { Route } from "react-router-dom";

import {NotFoundRoutes} from "../../../routes/NotFoundRoutes.jsx";
import {UsersList} from "./UsersList.jsx";
 export const UsersRoute = () => {
    return (
        <NotFoundRoutes>
            <Route
                path={crudRoutes.READ}
                element={<UsersList />}
            />
            <Route
                path={crudRoutes.UPDATE}
                element={<>TODO</>}
            />
        </NotFoundRoutes>
    );
};

