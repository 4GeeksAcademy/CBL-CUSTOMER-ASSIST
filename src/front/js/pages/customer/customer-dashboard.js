import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { TicketSmallCustomer } from "../../component/ticket_small_customer";
import DashboardExplained from "../../../assets/img/help_description/Dashboard-Google-Docs.png"
import DashboardHelpImg from "../../../assets/img/help_description/DashboardHelpImage.png"
import {PageTitle} from "../../component/page_title";

export const CustomerDashboard = () => {
    const { store, actions } = useContext(Context);
    const customerAllowedTicketStatus = ['New', 'Opened', 'In Progress', 'Resolved'];

    const newTickets = store.tickets.filter((ticket) => ticket.status === 'New');
    const openedTickets = store.tickets.filter((ticket) => ticket.status === 'Opened');
    const inProgressTickets = store.tickets.filter((ticket) => ticket.status === 'In Progress');
    const resolvedTickets = store.tickets.filter((ticket) => ticket.status === 'Resolved');
    const allTickets = [...newTickets, ... openedTickets, ...inProgressTickets, ...resolvedTickets];

    useEffect(()=>{
        actions.getCustomerTickets();
    }, []);

    return (
        <main className="bd-main order-1">
            <div className="bd-intro  d-flex border-bottom justify-content-end">
                {/* <h1 className="">Dashboard</h1> */}
                {/* <!-- Button trigger modal --> */} 
                <div>
                    <strong typeof="button" className="bd-links-heading btn d-flex w-100 align-items-center fw-semibold" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i className="fa-solid fa-circle-question me-1" style={{ color: "blue" }}></i>Help
                    </strong>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Dashboard Explained</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex">
                            <div >
                                <img className="p-2 me-4 border rounded-3" src="https://res.cloudinary.com/dsonpr8ip/image/upload/v1689793345/Dashboard-Google-Docs_xnqhtr.png"/>
                            </div>
                            <div >
                                <img className="border rounded-3" style={{ height: "400px", width: "1200px" }} src="https://res.cloudinary.com/dsonpr8ip/image/upload/v1689793345/DashboardHelpImage_lhy6mx.png"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bd-content">
                {allTickets != null || undefined ? allTickets
                    .filter(ticket => customerAllowedTicketStatus.includes(ticket.status))
                    .map((item, i) => {
                        return <TicketSmallCustomer key={i} data={item} />
                    }) : []}

            </div>
        </main>
    );
};
