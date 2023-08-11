import React from "react";
import Login from "./LoginPage"
import Dashboard from "./Dashboard";
import Header from "./Header";
import { Route, Routes, useLocation } from 'react-router-dom';
import Inventory from "./Inventory";
import AddItem from "./AddItem"
import ModifyItem from "./ModifyItem";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";

    return (
        <div>
            {isLoginPage ? null : <Header />}
            <Routes>
                <Route path="" element={<Login />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path='/modify-item' element={<ModifyItem />} />
            </Routes>
        </div>
    );
}

export default App;