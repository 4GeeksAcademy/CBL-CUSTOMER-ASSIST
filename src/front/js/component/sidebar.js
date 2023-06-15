import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";
import { CustomerSidebar } from "./customerSidebar";
import { AdminSidebar } from "./adminSidebar";

export const Sidebar = () => {
	const { store, actions } = useContext(Context);
    const currentLocation = useLocation();
    const [pathname, setPathname] = useState(currentLocation.pathname);

    useEffect(()=>{
        setPathname(currentLocation.pathname)
    });

    if(pathname === '/'){
        return ''
    }
    else {
        return (
            store.userProfile.user_info.user_type === "customer"
            ?<CustomerSidebar/>
            :store.userProfile.user_info.user_type === "admin"
            ?<AdminSidebar/>
            :''
        );
    }
        
}