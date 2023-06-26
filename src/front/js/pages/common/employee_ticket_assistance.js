import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { CustomerInfo } from "../../component/ticket_assistance/customer_info";
import { TicketInfo } from "../../component/ticket_assistance/ticket_info";
import { InterventionTypes } from "../../constants/intervention_types";
import { MapInfo } from "../../component/ticket_assistance/map_info"
import { EquipmentInfoCard } from "../../component/ticket_assistance/equipment_info_card";
import { ModalEquipmentHistorical } from "../../component/ticket_assistance/modal_equipment_info";

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

    return (
        <main className="bd-main">
            <CustomerInfo data={customerInfo} />
            <MapInfo data={mapInfo}/>
            <TicketInfo data={ticketInfo} />
            <EquipmentInfoCard data={equipmentInfo} />
            <ModalEquipmentHistorical data={modalEquipmentHistorical}/>
        </main>
    );
};