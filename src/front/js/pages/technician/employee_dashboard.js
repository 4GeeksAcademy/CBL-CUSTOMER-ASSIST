import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { TicketSmallEmployee } from "../../component/ticket_small_employee";

export const EmployeeDashboard = () => {
    const { store, actions } = useContext(Context);
    const ticket = { ...store.assignedTicket };

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">Dashboard</h1>
            </div>
            <div className="bd-content">
                {Object.keys(ticket).length > 0 ? <TicketSmallEmployee data={ticket} />
                    : <div className="alert alert-info" role="alert">
                        There is no ticket assigned!
                    </div>
                }
            </div>
        </main>
    );
};
