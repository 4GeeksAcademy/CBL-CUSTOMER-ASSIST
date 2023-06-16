import React, {useState, useEffect} from "react";
import injectContext from "./store/appContext";
import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router-dom";
import { Login } from "./pages/login";
import { CustomerDashboard } from "./pages/customer/customer-dashboard";
import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";
import { AdminDashboard } from "./pages/admin/admin_dashboard";
import { CustomerCreateTicket } from "./pages/customer/customer-create-ticket";
import { CustomerEquipmentList } from "./pages/customer/customer_equipment_list";
import { EditCustomerProfile } from "./pages/customer/customer-edit-profile";
import { MainBdLayout } from "./component/mainbdlayout";
import { CustomerEquipmentHistory } from "./pages/customer/customer_equipment_history";
// import { Home } from "./pages/home";
// import { Single } from "./pages/single";
// import { AdminCreateTicket } from "./pages/admin/admin-create-ticket";
// import { CreateAdmin } from "./pages/admin/admin-create";
// import { CreateTech } from "./pages/technician/tech-create";
// import { CreateCustomer } from "./pages/customer/customer-create.js";
const Layout = () => {
    const basename = process.env.BASENAME || "";
    const currentLocation = useLocation();
    const [pathname, setPathname] = useState(currentLocation.pathname);

    useEffect(()=>{
        setPathname(currentLocation.pathname)
    })

    console.log('LAYOUT pathname: ', pathname);
    // TODO: NEED TO REMOVE THIS LINE
    // if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
    return (
        <div>
            {/* <BrowserRouter basename={basename}> */}
                <Navbar />
                <MainBdLayout>
                    <Sidebar />
                    <Routes>
                        <Route element={<Login />} path="/" />
                        {/* <Route element={<Home />} path="/" /> */}
                        <Route element={<AdminDashboard />} path="/admin/dashboard" />
                        <Route element={<CustomerDashboard />} path="/customer/dashboard" />
                        <Route element={<EditCustomerProfile />} path="/edit/customer/profile" />
                        <Route element={<CustomerCreateTicket />} path="/customer/create/ticket" />
                        <Route element={<CustomerEquipmentList />} path="/customer/equipment/list" />
                        <Route element={<CustomerEquipmentHistory />} path="/customer/equipment/history" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        {/* <Route element={<Single />} path="/single/:theid" /> */}
                        {/* <Route element={<AdminCreateTicket />} path="/admin/create/ticket" /> */}
                        {/* <Route element={<CreateAdmin/>} path="/admin/create" /> */}
                        {/* <Route element={<CreateTech/>} path="/tech/create"/> */}
                        {/* <Route element={<CreateCustomer/>} path="/customer/create"/> */}
                    </Routes>
                </MainBdLayout>
            {/* </BrowserRouter> */}
        </div>
    );
};

export default injectContext(Layout);
