import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { TicketSmall } from "../../component/ticket_small";
import { InfoCard } from "../../component/info_card";
import { useParams } from "react-router-dom";

export const AdminTickets = () => {
    const { store, actions } = useContext(Context)
    const userType = store.userProfile.user_info.user_type;
    const { filter } = useParams();
    const allTickets = store.tickets;
    const openedTickets = store.tickets.filter((ticket) => ticket.status === 'Opened');
    const inProgressTickets = store.tickets.filter((ticket) => ticket.status === 'In Progress');
    const resolvedTickets = store.tickets.filter((ticket) => ticket.status === 'Resolved');
    const availableEmployees = store.availableEmployees;
    const availableVehicles = store.availableVehicles;

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">Admin Dashboard</h1>
                {/* <h3>Tickets:</h3> */}
            </div>
            <div className="bd-content">
                {!filter || filter === '' || filter === undefined && allTickets.length > 0 ? allTickets.map((item, i) => {
                    return <TicketSmall key={item.id} data={item} userType={userType} availableEmployees={availableEmployees} availableVehicles={availableVehicles} />
                })
                    : filter === 'opened' ? openedTickets.map((item, i) => {
                        return <TicketSmall key={item.id} data={item} userType={userType} availableEmployees={availableEmployees} availableVehicles={availableVehicles} />
                    })
                        : filter === 'inprogress' ? inProgressTickets.map((item, i) => {
                            return <TicketSmall key={item.id} data={item} userType={userType} availableEmployees={availableEmployees} availableVehicles={availableVehicles} />
                        })
                            : filter === 'resolved' ? resolvedTickets.map((item, i) => {
                                return <TicketSmall key={item.id} data={item} userType={userType} availableEmployees={availableEmployees} availableVehicles={availableVehicles} />
                            })
                                : <span>All customers satisfaction it's in tip-top shape!</span>}
            </div>
        </main>
    );
};
