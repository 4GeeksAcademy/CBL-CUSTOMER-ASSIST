import React from "react";
import injectContext from "./store/appContext";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Single } from "./pages/single";
import { AdminCreateTicket } from "./pages/admin/admin-create-ticket";
import { CustomerDashboard } from "./pages/customer/customer-dashboard";
import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";
import { AdminDashboard } from "./pages/admin/admin-dashboard";
import { CreateAdmin } from "./pages/admin/admin-create";
import { CreateTech } from "./pages/technician/tech-create";
import { CustomerCreateTicket } from "./pages/customer/customer-create-ticket";
import { CustomerMachineList } from "./pages/customer/customer-machine-list";
import { EditCustomerProfile } from "./pages/customer/customer-edit-profile";
import { CreateCustomer } from "./pages/customer/customer-create.js";

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
                    <Route element={<EditCustomerProfile />} path="/edit/customer/profile" />
                    <Route element={<CustomerDashboard />} path="/customer/dashboard" />
                    <Route element={<CustomerCreateTicket />} path="/customer/create/ticket" />
                    <Route element={<CustomerMachineList />} path="/customer/machine/list" />
                    <Route element={<AdminCreateTicket />} path="/admin/create/ticket" />
                    <Route element={<AdminDashboard />} path="/admin/dashboard" />
                    <Route element={<CreateAdmin/>} path="/admin/create" />
                    <Route element={<CreateTech/>} path="/tech/create"/>
                    <Route element={<CreateCustomer/>} path="/customer/create"/>

                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
