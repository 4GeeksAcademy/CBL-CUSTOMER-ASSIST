import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { TicketSmall } from "../../component/ticket_small";
import { InfoCard } from "../../component/info_card";
import { NavLink, Link, useParams } from "react-router-dom";
import { PageTitle } from "../../component/page_title";
import { TicketStatusColor } from "../../constants/ticket_status_color";

import "../../../styles/admin_tickets.css";

export const AdminTickets = () => {
    const { store, actions } = useContext(Context)
    const userType = store.userProfile.user_info.user_type;
    const { filter } = useParams();

    const newTickets = store.tickets.filter((ticket) => ticket.status === 'New');
    const openedTickets = store.tickets.filter((ticket) => ticket.status === 'Opened');
    const inProgressTickets = store.tickets.filter((ticket) => ticket.status === 'In Progress');
    const resolvedTickets = store.tickets.filter((ticket) => ticket.status === 'Resolved');
    const allTickets = [...newTickets, ...openedTickets, ...inProgressTickets, ...resolvedTickets];

    const availableEmployees = store.availableEmployees;
    const availableVehicles = store.availableVehicles;

    const toolTips = {
        filter: "Select one of the options to filter displayed tickets.",
        createTicket: "Click to create a new ticket for a customer."
    }

    const ref = useRef(null);

    useEffect(() => {
        actions.getAdminTickets();
        actions.getAvailableEmployees();
        actions.getAvailableVehicles();

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }, [])

    const handleStatusColor = (filter) => {
        if (filter === "New") return TicketStatusColor.NEW;
        if (filter === "Opened") return TicketStatusColor.OPENED;
        if (filter === "In Progress") return TicketStatusColor.IN_PROGRESS;
        if (filter === "Resolved") return TicketStatusColor.RESOLVED;
        if (filter === "Closed") return TicketStatusColor.CLOSED;
    }

    const formatTitle = (value) => {
        // const str = value;
        // const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        // return str2;
        if (value === undefined || value === "") return "All";
        if (value === "new") return "New";
        if (value === "opened") return "Opened";
        if (value === "inprogress") return "In Progress";
        if (value === "resolved") return "Resolved";
        if (value === "closed") return "Closed";
    }


    // 👇️ check if element contains class on click 👇️
    // const handleClick = event => {
    //     if (event.currentTarget.classList.contains('active')) {
    //         (event.currentTarget).firstElementChild.style.backgroundColor = handleStatusColor(filter);
    //     } else {
    //         console.log('Element does NOT contain class');
    //     }
    // };

    return (
        <main className="bd-main order-1 pe-4">
            <div className="bd-intro">
                <div className="d-flex flex-row justify-content-between">
                    {/* <PageTitle title={formatTitle(filter) + " Tickets"} /> */}
                    <div className="filter-nav border rounded mt-2 d-flex gap-1 pe-2 align-items-center">
                        <i className="fa-solid fa-filter m-2 me-1"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title={toolTips.filter}></i>
                        <div className="vr"></div>

                        {/* NEW TICKETS FILTER */}
                        <NavLink to={"/admin/tickets/new"}>
                            <span className="badge btn ms-1 my-2" style={{ backgroundColor: handleStatusColor("New") }}>New</span>
                        </NavLink>

                        {/* OPENED TICKETS FILTER */}
                        <NavLink to={"/admin/tickets/opened"}>
                            <span className="badge btn my-2" style={{ backgroundColor: handleStatusColor("Opened") }}>Opened</span>
                        </NavLink>

                        {/* IN PROGRESS TICKETS FILTER */}
                        <NavLink to={"/admin/tickets/inprogress"}>
                            <span className="badge btn my-2" style={{ backgroundColor: handleStatusColor("In Progress") }}>In Progress</span>
                        </NavLink>

                        {/* RESOLVED TICKETS FILTER */}
                        <NavLink to={"/admin/tickets/resolved"}>
                            <span className="badge btn my-2" style={{ backgroundColor: handleStatusColor("Resolved") }}>Resolved</span>
                        </NavLink>
                    </div>

                    <div className="mt-2 gap-1 px-1 align-items-center">
                        {/* CREATE NEW TICKET */}
                        <NavLink to={"/admin/create/ticket"}>
                            <span className="btn btn-primary"><i className="fa-solid fa-plus fa-lg"></i></span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="bd-content">
                {!filter || filter === '' || filter === undefined && allTickets.length > 0 ? allTickets.map((item, i) => {
                    return <TicketSmall key={item.id} data={item} userType={userType} availableEmployees={availableEmployees} availableVehicles={availableVehicles} />
                })
                    : filter === 'new' ? newTickets.map((item, i) => {
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
                                    : <span>All customers equipments are working!</span>}
            </div>
        </main>
    );
};
