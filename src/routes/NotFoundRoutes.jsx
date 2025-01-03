import {Outlet, Route, Routes} from "react-router-dom";


export const NotFoundRoutes = ({children}) => {


    return (
        <Routes>
            {children}
            <Route path = "*" element={<NotFoundPage/>}></Route>

        </Routes>

    )
}