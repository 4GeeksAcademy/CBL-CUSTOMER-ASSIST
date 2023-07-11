import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { CustomerInfo } from "../../component/ticket_assistance/customer_info";
import { TicketInfo } from "../../component/ticket_assistance/ticket_info";
import { InterventionTypes } from "../../constants/intervention_types";
import { MapInfo } from "../../component/ticket_assistance/map_info";
import { EquipmentInfoCard } from "../../component/ticket_assistance/equipment_info_card";
import { ModalEquipmentHistory } from "../../component/ticket_assistance/modal_equipment_history";
import { VehicleInfoCard } from "../../component/ticket_assistance/vehicle_info_card";
import { KnowledgeAssistanceReport } from "../../component/ticket_assistance/knowledge_assistance_report";

export const EmployeeTicketAssistance = () => {
    const { store, actions } = useContext(Context);
    console.log("localStorage ticketStage", localStorage.getItem('ticketStage'))
    const ticketStage = store.ticketStage;
    const cat = store.categoryOptions;
    const customerInfo = store.assignedTicket.customer;
    const mapInfo = {
        origin: store.manufacturerAddress,
        destination: customerInfo.address_1 + ", " + customerInfo.address_2 + " " + customerInfo.zipcode + " " + customerInfo.city,
    };
    
    useEffect(()=>{
        const localStorageTicketStage = localStorage.getItem('ticketStage') ? JSON.parse(localStorage.getItem('ticketStage')) : null;
        localStorageTicketStage ? actions.setTicketStage(localStorageTicketStage) : actions.setTicketStage(0);
    }, [])


    return (
        <main className="bd-main">
            {ticketStage > 0 ?
                <>
                    <CustomerInfo />
                    <TicketInfo />
                    <EquipmentInfoCard />
                    <div className="mb-3">
                        <MapInfo addresses={mapInfo} isMarkerShown />
                    </div>
                    <VehicleInfoCard />
                </>
                : null
            }
            {ticketStage >= 3 ?
                <KnowledgeAssistanceReport />
                : null
            }
            <ModalEquipmentHistory /> {/* this one needs to be the last element of <main> */}
        </main>
    );
};