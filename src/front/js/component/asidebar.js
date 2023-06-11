import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CustomerSidebar } from "./customerSidebar";
import { AdminSidebar } from "./adminSidebar";

export const Asidebar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
    const [pathname, setPathname] = useState(window.location.pathname);
    console.log('asidebar: ', store.userProfile.user_info.user_type)

    useEffect(()=>{
        setPathname(window.location.pathname)
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
            // store.userProfiel.user_info.user_type === "admin"
            // ?<div>Admin</div>
            // :<div></div>
        );
    }
        
}