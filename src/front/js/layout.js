import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Single } from "./pages/single";
import { EmployeeReg } from "./pages/admin/employeeReg";
import { CustomerReg } from "./pages/admin/customerReg";
import injectContext from "./store/appContext";
import { Dashboard } from "./pages/admin/dashboard";

import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    // TODO: NEED TO REMOVE THIS LINE
    // if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>

                <Navbar />
                <Sidebar />
                <Routes>
                    <Route element={<Login />} path="/login" />
                    <Route element={<Home />} path="/" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route element={<h1>Not found!</h1>} />
                    <Route element={<Dashboard />} path="/dashboard" />
                    <Route element={<CustomerReg />} path="/customer-create" />
                    <Route element={<EmployeeReg />} path="/technician-create" />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
