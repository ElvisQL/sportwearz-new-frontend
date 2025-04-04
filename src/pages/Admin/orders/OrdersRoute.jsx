import { Route } from "react-router-dom";

import { crudRoutes } from "../../../routes/routes";

import {OrderList} from "./OrderList.jsx";
import {NotFoundRoutes} from "../../../routes/NotFoundRoutes.jsx";
import {OrderDetail} from "./OrderDetail.jsx";

const OrdersRoute = () => {
    return (
        <NotFoundRoutes>
            <Route
                path={crudRoutes.READ}
                element={
                    <OrderList/>
                }
            />
            <Route
                path={`${crudRoutes.READ}/:id`}
                element={
                    <OrderDetail/>
                }
            />
        </NotFoundRoutes>
    );
};

export default OrdersRoute;