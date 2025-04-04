import {NotFoundRoutes} from "../../routes/NotFoundRoutes.jsx";
import {userRoutes} from "../../routes/routes.js";
import {Route, useParams} from "react-router-dom";
import {Header} from "../../components/Header.jsx"
import {Layout} from "./Layout.jsx";
import {Home} from "../Home.jsx";
import {Catalogo} from "../Catalogo.jsx";
import {ItemDetail} from "../../components/ItemDetail.jsx";
import ItemDetailView from "./ItemDetailView.jsx";
import Checkout from "./Checkout.jsx";
export const User = () => {

    return (
        <NotFoundRoutes>

            <Route element={<Layout/>}>
                <Route index element={<Home/>} />
                <Route path={userRoutes.CATALOG} element={<Catalogo/>} />
                <Route path={`${userRoutes.CATALOG}/:id`} element={<ItemDetailView/>}/>
                <Route path={`${userRoutes.CHECKOUT}`} element = {<Checkout/>} />

                {/*<Route path={userRoutes.CART} element={
                <>
                    <Header/>
                    <Cart/>
                </>

            }/>*/}
            </Route>




        </NotFoundRoutes>
    )
}