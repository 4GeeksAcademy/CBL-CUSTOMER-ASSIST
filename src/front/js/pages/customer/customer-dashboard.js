import React, { useState, useContext, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Context } from "../../store/appContext";

export const CustomerDashboard = () => {
    const { store, actions } = useContext(Context)

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">Dashboard</h1>
                <h3>Tickets:</h3>
            </div>
            <div className="bd-content">
            {store.tickets.length > 0 ? <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Machine</th>
                        <th>Status</th>
                        <th>Subject</th>
                        <th>Technician</th>
                        <th>Intervention Type</th>
                    </tr>
                </thead>
                <tbody>
                    {/*loading bar visual maybe ? */}
                    {store.tickets.map((item, i) => {
                        return (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.open_ticket_time}</td>
                                <td>{item.machine.model}</td>
                                <td>{item.status}</td>
                                <td>{item.subject}</td>
                                <td>{"To be assigned"}</td>
                                <td>{item.intervention_type === true ? 'Assistance' : 'Maintenance'}</td>
                            </tr>)
                    })}
                </tbody>
            </Table> : <h5 className="p-3 border-top">You have no tickets..</h5>}
            </div>
        </main>
    );
};
