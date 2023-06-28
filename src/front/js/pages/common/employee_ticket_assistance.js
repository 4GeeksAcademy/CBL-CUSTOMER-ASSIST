import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { CustomerInfo } from "../../component/ticket_assistance/customer_info";
import { TicketInfo } from "../../component/ticket_assistance/ticket_info";
import { InterventionTypes } from "../../constants/intervention_types";
import { MapInfo } from "../../component/ticket_assistance/map_info"
import { EquipmentInfoCard } from "../../component/ticket_assistance/equipment_info_card";
import { ModalEquipmentHistory } from "../../component/ticket_assistance/modal_equipment_history";
import { VehicleInfoCard } from "../../component/ticket_assistance/vehicle_info_card";
import { KnowledgeAssistanceReport } from "../../component/ticket_assistance/knowledge_assistance_report";

export const EmployeeTicketAssistance = () => {
    const { store, actions } = useContext(Context);
    const ticket = store.assignedTicket;
    const customerInfo = ticket.customer;
    const mapInfo = {
        manufacturerAddress: store.manufacturerAddress,
        customerAddress: customerInfo.address_1 + ", " + customerInfo.address_2 + " " + customerInfo.zipcode + " " + customerInfo.city,
    };
    const ticketInfo = {
        id: ticket.id,
        interventionType: ticket.intervention_type ? InterventionTypes.ASSISTANCE : InterventionTypes.MAINTENANCE,
        subject: ticket.subject,
        description: ticket.description,
        customerMedia: [
            "https://picsum.photos/1040/500",
            "https://picsum.photos/1040/500",
            "https://picsum.photos/1040/500"
        ]
    };
    const equipmentInfo = ticket.equipment;
    const modalEquipmentHistorical = ticket.equipment.knowledge;
    const vehicleInfo = ticket.vehicle;
    const categoryOptions = store.categoryOptions;
    const knowledges = store.knowledges;
    const ticketStage = store.ticketStage;

    return (
        <main className="bd-main">
            {ticketStage > 0 ?
                <>
                    <CustomerInfo data={customerInfo} />
                    <TicketInfo data={ticketInfo} />
                    <EquipmentInfoCard data={equipmentInfo} />
                    <MapInfo data={mapInfo} />
                    <VehicleInfoCard data={vehicleInfo} />
                </>
                : null
            }
            {ticketStage >= 3 ?
                <KnowledgeAssistanceReport categoryOptions={categoryOptions} knowledges={knowledges} customerInfo={customerInfo} />
                : null
            }
            <ModalEquipmentHistory data={modalEquipmentHistorical} /> {/* this one needs to be the last element of <main> */}
        </main>
    );
};