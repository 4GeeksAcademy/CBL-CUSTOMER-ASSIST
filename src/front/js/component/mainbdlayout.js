import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

export const MainBdLayout = ({children}) => {
    const currentLocation = useLocation();
    const [pathname, setPathname] = useState(currentLocation.pathname);

    useEffect(()=>{
        setPathname(currentLocation.pathname);
    });

    return (
        <div className={pathname === '/' ? "container-xxl bd-gutter mt-3 my-md-4" : "container-xxl bd-gutter mt-3 my-md-4 bd-layout"} style={{position: "relative"}}>
            {children}
            
            {/* MODAL */}
            <div id="modalTicketInfo" className="modal fade modal-fullscreen" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    );
}