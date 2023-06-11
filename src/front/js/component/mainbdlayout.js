import React, {useState, useEffect} from "react";

export const MainBdLayout = ({children}) => {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(()=>{
        setPathname(window.location.pathname)
    });

    return (
        <div className={pathname === '/' ? "container-xxl bd-gutter mt-3 my-md-4" : "container-xxl bd-gutter mt-3 my-md-4 bd-layout"} style={{position: "relative"}}>
            {children}
        </div>

    );
}