import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { CustomerInfo } from "../../component/customer_info";

export const EmployeeTicketAssistance = () => {
    const { store, actions } = useContext(Context);
    const ticket = store.assignedTicket;

    return (
        <main className="bd-main">
            <CustomerInfo data={ticket.customer} />
        </main>
    );
};