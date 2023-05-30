import React, { useState, useContext, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Context } from "../../store/appContext";

export const CustomerDashboard = () => {
    const { store, actions } = useContext(Context)
    const [ticketInfo, setTicketInfo] = useState([])

    useEffect(() => {
        store.customerDashboardTicket
    }, [store.customerDashboardTicket])

    return (
        <>
            <div className="container my-3">
                <div >
                    <h1 className="border-bottom mb-5">Dashboard</h1>
                </div>
                <div>
                    <h4>Tickets:</h4>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Machine</th>
                            <th>Status</th>
                            <th>Technician</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
};
