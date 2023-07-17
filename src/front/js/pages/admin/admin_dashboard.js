import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { InfoCard } from "../../component/info_card";
import { Link, useNavigate } from "react-router-dom";

//include your index.scss file into the bundle
import "../../../styles/info_card.css";
import "../../../styles/sidebar.css";
import "../../../styles/dashboard.css";
import { PageTitle } from "../../component/page_title";


export const AdminDashboard = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    const newTickets = store.tickets.filter((ticket) => ticket.status === 'New');
    const openedTickets = store.tickets.filter((ticket) => ticket.status === 'Opened');
    const inProgressTickets = store.tickets.filter((ticket) => ticket.status === 'In Progress');
    const resolvedTickets = store.tickets.filter((ticket) => ticket.status === 'Resolved');
    
    useEffect(()=>{
        actions.getAdminTickets();
    }, [])

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <PageTitle title={"Dashboard"} />
            </div>
            <div className="bd-content">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    
                    {/* NEW TICKETS */}
                    {newTickets.length > 0
                        ? <Link className="info-card" to={'/admin/tickets/new'}>
                            <div className="col"><InfoCard data={newTickets} /></div>
                        </Link>
                        : null}

                    {/* OPENED TICKETS */}
                    {openedTickets.length > 0
                        ? <Link className="info-card" to={'/admin/tickets/opened'}>
                            <div className="col"><InfoCard data={openedTickets} /></div>
                        </Link>
                        : null}

                    {/* IN PROGRESS TICKETS */}
                    {inProgressTickets.length > 0
                        ? <Link className="info-card" to={'/admin/tickets/inprogress'}>
                            <div className="col"><InfoCard data={inProgressTickets} /></div>
                        </Link>
                        : null}

                    {/* RESOLVED TICKETS */}
                    {resolvedTickets.length > 0
                        ? <Link className="info-card" to={'/admin/tickets/resolved'}>
                            <div className="col"><InfoCard data={resolvedTickets} /></div>
                        </Link>
                        : null}
                </div>
            </div>
        </main>
    );
};
