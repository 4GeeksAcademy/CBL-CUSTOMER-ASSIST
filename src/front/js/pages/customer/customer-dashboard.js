import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { TicketSmall } from "../../component/ticket_small";

export const CustomerDashboard = () => {
    const { store, actions } = useContext(Context);

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">Customer Dashboard</h1>
                <h3>Tickets:</h3>
            </div>
            <div className="bd-content">
                {store.tickets
                    .filter(ticket => ticket.status === 'Opened')
                    .map((item, i) => {
                    return <TicketSmall key={i} data={item}/>
                })}
            </div>
        </main>
    );
};
