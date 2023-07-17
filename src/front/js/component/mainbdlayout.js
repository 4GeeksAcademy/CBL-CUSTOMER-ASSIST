import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";

import smallLogo from "../../assets/img/logo.png"
import { ProcessTicketInfo } from "./process_ticket/process_ticket_info";
import { ProcessCustomerInfo } from "./process_ticket/process_customer_info";
import { ProcessEquipmentInfoCard } from "./process_ticket/process_equipment_info_card";
import { ProcessVehicleInfoCard } from "./process_ticket/process_vehicle_info_card";
import { ProcessKnowledgeAssistanceReport } from "./process_ticket/process_knowledge_assistance_report";


export const MainBdLayout = ({ children }) => {
    const { store, actions } = useContext(Context);
    const currentLocation = useLocation();
    const [pathname, setPathname] = useState(currentLocation.pathname);

    useEffect(() => {
        setPathname(currentLocation.pathname);
    });

    const switchModal = () => {
        const processTicketModal = document.querySelector('#processTicketModal');

        new bootstrap.Modal(processTicketModal).toggle();
    }

    return (
        <div className={pathname === '/' || pathname === '/loading' || pathname === '/landing' ? "container-xxl vh-100" : "container-xxl bd-gutter vh-100 bd-layout"} style={{ position: "relative" }}>
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
                            <div className="border rounded p-2 mb-3 shadow-sm">
                                <h5 className=" mb-3">Description</h5>
                                <div>{store.modalBody}</div>
                            </div>
                            <div>{store.modalEquipment !== null ? (
                                store.modalEquipment.map((item, index) => {
                                    return (
                                        <ul className="list-group mb-3" key={item.id}>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                                                Malfunction {item.malfunction.id}
                                                <span className="badge text-warning bg-dark rounded-pill">{item.category.description}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                                                {item.malfunction.description}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                                                Solution {item.solution.id}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                                                {item.solution.description}
                                            </li>
                                        </ul>
                                    );
                                })
                            ) : (
                                <div>No history available for this equipment!</div>
                            )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL PROCESS TICKET*/}
            <div id="processTicketModal" className="modal fade modal-fullscreen" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="staticBackdropLabel">Process Ticket</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ProcessCustomerInfo />
                            <ProcessTicketInfo />
                            <ProcessEquipmentInfoCard />
                            <ProcessVehicleInfoCard />
                            <ProcessKnowledgeAssistanceReport />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL PROCESS TICKET EQUIPMENT HISTORY */}
            <div id="processEquipmentHistoryModal" className="modal fade modal-fullscreen" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="staticBackdropLabel">Equipment History</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                {store.processTicket.equipment.knowledge.length > 0 ?
                                    store.processTicket.equipment.knowledge.map((item, i) => {
                                        return (
                                            <ul className="list-group mb-3" key={'k'+i}>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                                                Malfunction {item.malfunction.id}
                                                <span className="badge text-warning bg-dark rounded-pill">{item.category.description}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                                                {item.malfunction.description}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                                                Solution {item.solution.id}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                                                {item.solution.description}  
                                            </li>
                                        </ul>
                                        )
                                    })
                                :<p>Not hello</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
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