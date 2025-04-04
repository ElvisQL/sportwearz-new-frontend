import {Suspense,lazy, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NotFoundRoutes} from "./routes/NotFoundRoutes.jsx";
import {publicRoutes, userRoutes} from "./routes/routes.js";
import {AuthGuard} from "./guards/AuthGuard.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.js";
import {Admin} from "./pages/Admin/Admin.jsx";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {User} from "./pages/User/User.jsx"
import Signup from "./pages/Signup.jsx";
import {DashboardLayout} from "./pages/Admin/layout/DashboardLayout.jsx";
import {DashboardHome} from "./pages/Admin/DashboardHome.jsx";
import {ProductsRoutes} from "./pages/Admin/products/ProductsRoutes.jsx";
import {CategoriesRoutes} from "./pages/Admin/categories/CategoriesRoutes.jsx";
import {BrandsRoutes} from "./pages/Admin/brands/BrandsRoutes.jsx";
import {UsersRoute} from "./pages/Admin/users/UsersRoute.jsx";
import OrdersRoute from "./pages/Admin/orders/OrdersRoute.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./components/Loader.jsx";
const Login = lazy(()=> import("./pages/Login.jsx"))



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Suspense fallback={<Loader/>}>
            <Provider store = {store}>
                <PersistGate loading={null} persistor={persistStore(store)}>
                    <BrowserRouter>
                        <NotFoundRoutes>
                            <Route path="/" element={<AuthGuard redirectPath />}/>
                            //PUBLIC ROUTES
                            <Route path={publicRoutes.LOGIN} element={<Login/>}/>
                            <Route path={publicRoutes.SIGNUP} element={<Signup/>}/>
                            //PRIVATE ROUTES
                            {/* Admin Routes */}
                            <Route element={<AuthGuard allowedRoles={["Admin"]} />}>
                                <Route path="/admin/*" element={<DashboardLayout />}>
                                    <Route index element={<Admin />} />
                                    <Route path="products/*" element={<ProductsRoutes />} />
                                    <Route path="categories/*" element={<CategoriesRoutes />} />
                                    <Route path="brands/*" element={<BrandsRoutes />} />
                                    <Route path="users/*" element={<UsersRoute />} />
                                    <Route path="orders/*" element={<OrdersRoute />} />
                                </Route>
                            </Route>
                            <Route element={<AuthGuard allowedRoles={"Usuario"}/> }>
                                <Route path={"/:username/*"} element={<User/>}/>
                            </Route>


                            {/*<Route path="/dashboard" element={<Dashboard/>}/>*/}
                        </NotFoundRoutes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>


        </Suspense>

    </>
  )
}

export default App
