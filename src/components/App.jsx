import React from "react";
import Login from "./LoginPage"
import Dashboard from "./Dashboard";
import Header from "./Header";
import { Route, Routes } from 'react-router-dom';
import Inventory from "./Inventory";

function App() {
    return (
        <div>
        <Header />
        <Routes>
            <Route path="" element={<Login />}/>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Inventory" element={<Inventory />} />
        </Routes>
        </div>
    );
}

export default App;