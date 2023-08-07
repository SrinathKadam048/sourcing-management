import React from "react";
import Login from "./LoginPage"
import Dashboard from "./Dashboard";
import Header from "./Header";
import { Route, Routes } from 'react-router-dom';
import Inventory from "./Inventory";
import AddItem from "./AddItem"

function App() {
    return (
        <div>
        <Header />
        <Routes>
            <Route path="" element={<Login />}/>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/add-item" element={<AddItem />}/>
        </Routes>
        </div>
    );
}

export default App;