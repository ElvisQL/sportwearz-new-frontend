import {Suspense,lazy, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NotFoundRoutes} from "./routes/NotFoundRoutes.jsx";
import {publicRoutes, userRoutes} from "./routes/routes.js";
import {AuthGuard} from "./guards/AuthGuard.jsx";
import {Provider} from "react-redux";

const Login = lazy(()=> import("./pages/Login/Login.jsx"))



function App() {
  const [count, setCount] = useState(0)



  return (
    <>
        <Suspense fallback={<>SPINNER</>}>
            <Provider store={}>
                <BrowserRouter>
                    <NotFoundRoutes>
                        <Route path="/" element={<AuthGuard redirectPath />}/>
                        //PUBLIC ROUTES
                        <Route path={publicRoutes.LOGIN} element={<Login/>}/>

                        //PRIVATE ROUTES
                        <Route element={<AuthGuard allowedRoles={"admin"}/>}>
                            <Route path={"admin/*"} element={<Admin/>}/>
                        </Route>
                        <Route element={<AuthGuard allowedRoles={"user"}/> }>
                            <Route path={"user/*"} element={<User/>}/>
                        </Route>


                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </NotFoundRoutes>
                </BrowserRouter>

            </Provider>


        </Suspense>

    </>
  )
}

export default App
