import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

export const MainBdLayout = ({children}) => {
    const currentLocation = useLocation();
    const [pathname, setPathname] = useState(currentLocation.pathname);
    console.log('mainbdlayout pathname: ', pathname);

    useEffect(()=>{
        console.log('MAINDBLAYOUT useEffect');
        setPathname(currentLocation.pathname);
    });

    return (
        <div className={pathname === '/' ? "container-xxl bd-gutter mt-3 my-md-4" : "container-xxl bd-gutter mt-3 my-md-4 bd-layout"} style={{position: "relative"}}>
            {children}
        </div>

    );
}