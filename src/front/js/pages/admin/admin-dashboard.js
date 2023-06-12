import React, { useState, useContext, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Context } from "../../store/appContext";
import { TicketSmall } from "../../component/ticket_small";

export const AdminDashboard = () => {
    const { store, actions } = useContext(Context)

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">Dashboard</h1>
                <h3>Tickets:</h3>
            </div>
            <div className="bd-content">
                {store.tickets.map((item, i) => {
                    return <TicketSmall key={i} data={item}/>
                })}
            </div>
        </main>
    );
};
