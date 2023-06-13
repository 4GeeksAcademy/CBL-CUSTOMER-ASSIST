import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { TicketSmall } from "../../component/ticket_small";
import { InfoCard } from "../../component/info_card";

export const AdminDashboard = () => {
    const { store, actions } = useContext(Context)

    const openedTickets = store.tickets.filter((ticket) => ticket.status === 'Opened');
    const inProgressTickets = store.tickets.filter((ticket) => ticket.status === 'In Progress');
    const resolvedTickets = store.tickets.filter((ticket) => ticket.status === 'Resolved');

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">Admin Dashboard</h1>
                {/* <h3>Tickets:</h3> */}
            </div>
            <div className="bd-content">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {openedTickets.length > 0
                    ?<div className="col">
                        <InfoCard data={openedTickets} />
                    </div>
                    : null}

                    {inProgressTickets.length > 0
                    ?<div className="col">
                        <InfoCard data={inProgressTickets} />
                    </div>
                    : null}

                    {resolvedTickets.length > 0
                    ?<div className="col">
                        <InfoCard data={resolvedTickets} />
                    </div>
                    : null}
                </div>
{/*                 
                {store.tickets.length > 0
                ?store.tickets.map((item, i) => {
                    return <TicketSmall key={i} data={item} userType={store.userProfile.user_info.user_type}/>
                })
                :<span>All customers satisfaction is on top!</span>} */}
            </div>
        </main>
    );
};
