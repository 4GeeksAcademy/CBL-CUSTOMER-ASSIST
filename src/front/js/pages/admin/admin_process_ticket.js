import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { ProcessCustomerInfo } from "../../component/process_ticket/process_customer_info";
import { ProcessTicketInfo } from "../../component/process_ticket/process_ticket_info";
import { ProcessEquipmentInfoCard } from "../../component/process_ticket/process_equipment_info_card";
import { ProcessVehicleInfoCard } from "../../component/process_ticket/process_vehicle_info_card";
import { ProcessKnowledgeAssistanceReport } from "../../component/process_ticket/process_knowledge_assistance_report";

export const AdminProcessTicket = () => {
    const location = useLocation();

    return (
        <main className="bd-main order-1">
            <h3 className="">Process Ticket</h3>
            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            <ProcessCustomerInfo />
            <ProcessTicketInfo />
            <ProcessEquipmentInfoCard />
            <ProcessVehicleInfoCard />
            <ProcessKnowledgeAssistanceReport />
            <div className="">
                <Link to={"/admin/tickets/resolved"}>
                <button type="button" className="btn btn-secondary">Go back</button>
                </Link>
                {/* <button type="button" className="btn btn-primary">Understood</button> */}
            </div>
        </main>
    );
}