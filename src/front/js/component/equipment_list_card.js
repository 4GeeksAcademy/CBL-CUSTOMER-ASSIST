import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const EquipmentListCard = (props) => {
    const { store, actions } = useContext(Context)
    const data = props.data;
    const myModal = document.querySelector('#modalTicketInfo');

    const handleAllTickets = () => {

        const filtered = store.tickets.filter(obj => {
            return obj.equipment.id === data.id;
            
          });
          actions.getCustomerEquipmentTickets(filtered)
          console.log("CUSTOMER TICKETS")
            console.log(store.customerEquipmentTickets)
          //The code below was saving the number and not the ticket. Try save the whole object by matching the ids. There might be a match function.

        // const ticketIds = store.tickets.map(item => item.equipment.id)
        // ticketIds.filter(ticketId => {
        //     if (ticketId === data.id) actions.getCustomerEquipmentTickets(item)});
        // console.log(ticketIds)
    };

    

    return (
        <div className="card w-100 mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="text-start">
                    <h5 className="card-text">Model: {data.model}</h5>
                    <p className="card-text">Serial Number: {data.serial_number} </p>
                </div>
                <div className="text-end">
                    <p className="card-text">ID: {data.id}</p>
                    <p className="card-text">IM109: {data.im109}</p>
                </div>
            </div>
            <Link to={'/customer/equipment/history'} style={{ textDecoration: 'none' }}>
                <div onClick={handleAllTickets} className="card-footer text-body-secondary d-flex justify-content-center btn btn-secondary border border-0 border-top">
                    <h6 className="card-subtitle my-1 text-body-secondary">View Equipment History</h6>
                </div>
            </Link>
        </div>
    );
}