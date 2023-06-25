import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { CustomerInfo } from "../../component/customer_info";
import { TicketInfo } from "../../component/ticket_info";
import { InterventionTypes } from "../../constants/intervention_types";
import { MapInfo } from "../../component/ticket_assistance/map_info"

export const EmployeeTicketAssistance = () => {
    const { store, actions } = useContext(Context);
    const ticket = store.assignedTicket;
    const mapInfo = {
        manufacturerAddress: store.manufacturerAddress,
        customerAddress: ticket.customer.address_1 + ", " + ticket.customer.address_2 + " " + ticket.customer.zipcode + " " + ticket.customer.city
    }

    console.log(mapInfo);

    const ticketInfo = {
        id: ticket.id,
        interventionType: ticket.intervention_type ? InterventionTypes.ASSISTANCE : InterventionTypes.MAINTENANCE,
        subject: ticket.subject,
        description: ticket.description
    };

    return (
        <main className="bd-main">
            <CustomerInfo data={ticket.customer} />
            <MapInfo data={mapInfo}/>
            <TicketInfo data={ticketInfo} />
        </main>
    );
};