import { Route } from "react-router-dom";
import {adminRoutes, userRoutes} from "../../routes/routes";
import {NotFoundRoutes} from "../../routes/NotFoundRoutes.jsx";
import { DashboardHome } from "./DashboardHome";
/*import { DashboardOrders } from "./orders/DashboardOrders";
import { DashboardCategories } from "./categories/DashboardCategories";

import { DashboardProducts } from "./products/DashboardProducts";
import { CategoriesRoute } from "./categories/Categories.route";
import { ProductsRoute } from "./products/Products.route";
import UsersRoute from "./users/UsersRoute";
import OrdersRoute from "./orders/OrdersRoute";
import { CouponsRoute } from "./coupons/CouponsRoute";
import { BrandsRoute } from "./brands/BrandsRoute";
import Cart from "../../components/Cart.jsx";
import {Header} from "../../components/Header.jsx";*/
export const Admin = () => {
    return (
        <NotFoundRoutes>
            <Route index element={<DashboardHome></DashboardHome>} />
            <Route
                path={adminRoutes.DASHBOARD}
                element={<DashboardHome></DashboardHome>}
            />
           {/* <Route
                path={`${adminRoutes.CATEGORY}/*`}
                element={<CategoriesRoute />}
            ></Route>
            <Route path={`${adminRoutes.USERS}/*`} element={<UsersRoute />} />
            <Route path={`${adminRoutes.PRODUCTS}/*`} element={<ProductsRoute />} />
            <Route path={`${adminRoutes.ORDERS}/*`} element={<OrdersRoute />} />
            <Route path={`${adminRoutes.COUPONS}/*`} element={<CouponsRoute />} />
            <Route path={`${adminRoutes.BRANDS}/*`} element={<BrandsRoute />} />
            <Route path={userRoutes.CART} element={
                <>
                    <Header/>
                    <Cart/>
                </>

            }/>*/}

        </NotFoundRoutes>
    );
};
