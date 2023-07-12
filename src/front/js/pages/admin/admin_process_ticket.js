import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { ProcessCustomerInfo } from "../../component/process_ticket/process_customer_info";
import { ProcessTicketInfo } from "../../component/process_ticket/process_ticket_info";
import { ProcessEquipmentInfoCard } from "../../component/process_ticket/process_equipment_info_card";
import { ProcessVehicleInfoCard } from "../../component/process_ticket/process_vehicle_info_card";
import { ProcessKnowledgeAssistanceReport } from "../../component/process_ticket/process_knowledge_assistance_report";

export const AdminProcessTicket = () => {
    const { actions, store } = useContext(Context);
    const location = useLocation();
    const data = store.processTicket?.customer_info;
    const [newMalfunction, setNewMalfuntion] = useState("");
    const [newSolution, setNewSolution] = useState("");
    const [newKnowledgeDisabled, setNewKnowledgeDisabled] = useState(true);

    const handleCreateNewKnowledge = () => {
        actions.adminCreateProcessTicketKnowledge()
    }

    return (
        <main className="bd-main order-1">
            <h3 className="">Process Ticket</h3>
            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            <ProcessCustomerInfo />
            <ProcessTicketInfo />
            <ProcessEquipmentInfoCard />
            <ProcessVehicleInfoCard />
            <ProcessKnowledgeAssistanceReport />

            {/* CREATE NEW KNOWLEDGE */}
            {!newKnowledgeDisabled &&
                <div>
                    <h4 className="border-bottom">Create new knowledge</h4>
                    <div className="form-floating mb-1">
                        <textarea className="form-control border-danger focus-ring focus-ring-danger"
                            id="newMalfunction"
                            placeholder="Leave a comment here"
                            style={{ minHeight: "200px" }}
                            value={newMalfunction}
                            onChange={(e) => setNewMalfuntion(e.target.value)}
                        ></textarea>
                        <label htmlFor="newMalfunction"
                            className="text-danger fst-italic"
                        >Malfunction</label>
                    </div>
                    <div className="form-floating mb-1">
                        <textarea className="form-control border-success focus-ring focus-ring-success"
                            id="newSolution"
                            placeholder="Leave a comment here"
                            style={{ minHeight: "200px" }}
                            value={newSolution}
                            onChange={(e) => setNewSolution(e.target.value)}
                        ></textarea>
                        <label htmlFor="newSolution"
                            className="text-success fst-italic"
                        >Solution</label>
                    </div>
                </div>
            }
            <div className="">
                <Link to={"/admin/tickets/resolved"}>
                    <button type="button" className="btn btn-secondary">Go back</button>
                </Link>
                <button type="button"
                    className="btn btn-primary"
                    onClick={() => setNewKnowledgeDisabled(!newKnowledgeDisabled)}
                >Create Knowledge</button>
            </div>
        </main>
    );
}