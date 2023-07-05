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

    // localStorage to be able to technician/engineer work offline
    // initialization
    // MAYBE WE NEED TO CHANGE THIS LINE TO ANOTHER PLACE (APPCONTEXT???)
    // useEffect(() => {
    //     localStorage.getItem('ticketStage') ? actions.setTicketStage(JSON.parse(localStorage.getItem('ticketStage'))) : localStorage.setItem('ticketStage', 0);
    // }, [])
    const ticketStage = store.ticketStage;

    const customerInfo = store.assignedTicket.customer;
    const ticketInfo = store.assignedTicket.ticket;
    const equipmentInfo = store.assignedTicket.equipment;
    const vehicleInfo = store.assignedTicket.vehicle_assigned;

    // const mapInfo = {
    //     manufacturerAddress: store.manufacturerAddress,
    //     customerAddress: customerInfo.address_1 + ", " + customerInfo.address_2 + " " + customerInfo.zipcode + " " + customerInfo.city,
    // };

    // interventionType: ticket.intervention_type ? InterventionTypes.ASSISTANCE : InterventionTypes.MAINTENANCE,

    // const categoryOptions = store.categoryOptions;
    // const knowledges = store.knowledges;

    return (
        <main className="bd-main">
            {ticketStage > 0 ?
                <>
                    <CustomerInfo />
                    <TicketInfo />
                    <EquipmentInfoCard />
                    {/* <MapInfo data={mapInfo} /> */}
                    <VehicleInfoCard />
                </>
                : null
            }
            {/* {ticketStage >= 3 ?
                <KnowledgeAssistanceReport categoryOptions={categoryOptions} knowledges={knowledges} customerInfo={customerInfo} />
                : null
            } */}
            <ModalEquipmentHistory /> {/* this one needs to be the last element of <main> */}
        </main>
    );
};