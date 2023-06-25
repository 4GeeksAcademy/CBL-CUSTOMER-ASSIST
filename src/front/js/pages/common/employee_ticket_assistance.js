import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { CustomerInfo } from "../../component/ticket_assistance/customer_info";
import { TicketInfo } from "../../component/ticket_assistance/ticket_info";
import { InterventionTypes } from "../../constants/intervention_types";
import { MapInfo } from "../../component/ticket_assistance/map_info"

export const EmployeeTicketAssistance = () => {
    const { store, actions } = useContext(Context);
    const ticket = store.assignedTicket;
    const mapInfo = {
        manufacturerAddress: store.manufacturerAddress,
        customerAddress: ticket.customer.address_1 + ", " + ticket.customer.address_2 + " " + ticket.customer.zipcode + " " + ticket.customer.city,
    }
    
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

    return (
        <main className="bd-main">
            <CustomerInfo data={ticket.customer} />
            <MapInfo data={mapInfo}/>
            <TicketInfo data={ticketInfo} />
        </main>
    );
};