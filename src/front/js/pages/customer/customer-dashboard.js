import React, { useState, useContext, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Context } from "../../store/appContext";

export const CustomerDashboard = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getTickets()

    }, [store.tickets])

    return (
        <>
            <div className="container my-3">
                <div >
                    <h1 className="border-bottom mb-5">Dashboard</h1>
                </div>
                <div>
                    <h3>Tickets:</h3>
                </div>
                {store.tickets.length > 0 ? <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Machine</th>
                            <th>Status</th>
                            <th>Technician</th>
                            <th>Intervention Type </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*loading bar visual maybe ? */}
                        {store.tickets.map((item, i) => {
                            return (
                                <tr key={item.id}>
                                    <td>{i + 1}</td>
                                    <td>{item.open_ticket_time}</td>
                                    <td>{item.machine_id}</td>
                                    <td>{item.status_id}</td>
                                    <td>{"To be assigned"}</td>
                                    <td>{item.intervention_type_id}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table> : <h5 className="p-3 border-top">You have no tickets..</h5>}
            </div>
        </>
    );
};
