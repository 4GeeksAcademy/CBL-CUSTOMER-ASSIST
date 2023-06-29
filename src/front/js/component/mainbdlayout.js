import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";

import smallLogo from "../../assets/img/logo.png"
export const MainBdLayout = ({ children }) => {
    const { store, actions } = useContext(Context);
    const currentLocation = useLocation();
    const [pathname, setPathname] = useState(currentLocation.pathname);

    useEffect(() => {
        setPathname(currentLocation.pathname);
    });


    return (
        <div className={pathname === '/' || pathname === '/loading' ? "container-xxl bd-gutter mt-3 my-md-4 vh-100" : "container-xxl bd-gutter mt-3 my-md-4 bd-layout"} style={{ position: "relative" }}>
            {children}

            {/* MODAL TICKET INFO*/}
            <div id="modalTicketInfo" className="modal fade modal-fullscreen" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{store.modalTitle}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>{store.modalBody}</div>
                            <div>{store.modalEquipment != null ? (
                                store.modalEquipment.map((item, index) => {
                                    return (
                                        <ul className="list-group mb-3" key={item.id}>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                                                Malfunction {item.knowledge.malfunction.id}
                                                <span className="badge text-warning bg-dark rounded-pill">{item.knowledge.category.description}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                                                {item.knowledge.malfunction.description}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                                                Solution {item.knowledge.solution.id}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                                                {item.knowledge.solution.description}
                                            </li>
                                        </ul>
                                    );
                                })
                            ) : (
                                <div>No historical available for this equipment!</div>
                            )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOAST */}
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <img src={smallLogo} className="rounded me-2" alt="..." />
                        <strong className="me-auto">{store.liveToastHeader}</strong>
                        <small>less then 1 minute ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">{store.liveToastBody}</div>
                </div>
            </div>
        </div>
    );
}