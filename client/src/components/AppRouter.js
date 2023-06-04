import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes"
import Tickets from "../pages/Tickets"
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>}/>
            )}
            {publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>}/>
            )}
            <Route path="*" element={<Tickets/>}/>
        </Routes>
    );
});

export default AppRouter