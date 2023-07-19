import React, {useState, useEffect} from "react";
import injectContext from "./store/appContext";
import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router-dom";
import { Login } from "./pages/login";
import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";
import { MainBdLayout } from "./component/mainbdlayout";
import { AdminTickets } from "./pages/admin/admin_tickets";
import { AdminDashboard } from "./pages/admin/admin_dashboard";
import { AdminContactList } from "./pages/admin/admin_contact_list";
import { AdminCreateTicket } from "./pages/admin/admin-create-ticket";
import { AdminProcessTicket } from "./pages/admin/admin_process_ticket";
import { CustomerDashboard } from "./pages/customer/customer-dashboard";
import { CustomerEditProfile } from "./pages/customer/customer_edit_profile";
import { CustomerCreateTicket } from "./pages/customer/customer-create-ticket";
import { CustomerEquipmentList } from "./pages/customer/customer_equipment_list";
import { CustomerEquipmentHistory } from "./pages/customer/customer_equipment_history";
import { EmployeeDashboard } from "./pages/common/employee_dashboard"
import { EmployeeEditProfile } from "./pages/common/employee_edit_profile";
import { EmployeeTicketAssistance } from "./pages/common/employee_ticket_assistance";
import { LoadingData } from "./pages/common/loading_data";
import { Footer } from "./component/footer"
// import { CustomerHelpGuide } from "./pages/customer/customer_help_guide"
// import { Home } from "./pages/home";
// import { Single } from "./pages/single";
// import { CreateAdmin } from "./pages/admin/admin-create";
// import { CreateTech } from "./pages/technician/tech-create";
// import { CreateCustomer } from "./pages/customer/customer-create.js";
import {CapturePhoto} from "./pages/customer/capture_photo";
import { LandingPage } from "./pages/landing_page";


const Layout = () => {
    const basename = process.env.BASENAME || "";
    const currentLocation = useLocation();
    const [pathname, setPathname] = useState(currentLocation.pathname);

    useEffect(()=>{
        setPathname(currentLocation.pathname)
    })

    // TODO: NEED TO REMOVE THIS LINE
    // if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
    return (
        <div className="h-100">
            {/* <BrowserRouter basename={basename}> */}
                {pathname !== "/" && <Navbar />}
                <MainBdLayout>
                    <Sidebar />
                    <Routes>
                        {/* <Route element={<Login />} path="/" /> */}
                        <Route element={<LandingPage />} path="/" />
                        {/* <Route element={<Home />} path="/" /> */}
                        <Route element={<AdminDashboard />} path="/admin/dashboard" />
                        <Route element={<AdminTickets />} path="/admin/tickets" />
                        <Route element={<AdminTickets />} path="/admin/tickets/:filter" />
                        <Route element={<AdminProcessTicket />} path="/admin/process/ticket" />
                        <Route element={<EmployeeDashboard />} path="/employee/dashboard" />
                        <Route element={<EmployeeEditProfile />} path="/employee/edit/profile" />
                        <Route element={<EmployeeTicketAssistance />} path="/employee/ticket/assistance" />
                        <Route element={<EmployeeTicketAssistance />} path="/employee/ticket/assistance" />
                        <Route element={<CustomerDashboard />} path="/customer/dashboard" />
                        <Route element={<CustomerEditProfile />} path="/customer/edit/profile" />
                        <Route element={<CustomerCreateTicket />} path="/customer/create/ticket" />
                        <Route element={<CustomerEquipmentList />} path="/customer/equipment/list" />
                        <Route element={<CustomerEquipmentHistory />} path="/customer/equipment/history" />
                        <Route element={<AdminContactList />} path="/admin/contact/list" />
                        <Route element={<LoadingData />} path="/loading" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        {/* <Route element={<Single />} path="/single/:theid" /> */}
                        <Route element={<AdminCreateTicket />} path="/admin/create/ticket" />
                        {/* <Route element={<CreateAdmin/>} path="/admin/create" /> */}
                        {/* <Route element={<CreateTech/>} path="/tech/create"/> */}
                        {/* <Route element={<CreateCustomer/>} path="/customer/create"/> */}
                    </Routes>
                </MainBdLayout>
            {/* </BrowserRouter> */}
            {/* <Footer /> */}
        </div>
    );
};

export default injectContext(Layout);
