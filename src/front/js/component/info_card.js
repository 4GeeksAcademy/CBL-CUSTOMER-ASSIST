import React from "react";
import { TicketStatus } from "../constants/ticket_status";

export const InfoCard = (props) => {
    const data = props.data;
    const status = (data[0].status);

    return (
        <div className={`card text-center border-${status === 'New' ? TicketStatus.NEW
            : status === 'Opened' ? TicketStatus.OPENED
                : status === 'In Progress' ? TicketStatus.IN_PROGRESS
                    : status === 'Resolved' ? TicketStatus.RESOLVED
                        : TicketStatus.CLOSED} mb-3`}>
            {/* <div className="card-header">Header</div> */}
            <div className="card-header">
                <h4 className="card-title m-0">Tickets</h4>
            </div>
            <div className="card-body">
                <h5 className={`card-title text-${status === 'New' ? TicketStatus.NEW :
                    status === 'Opened' ? TicketStatus.OPENED
                        : status === 'In Progress' ? TicketStatus.IN_PROGRESS
                            : status === 'Resolved' ? TicketStatus.RESOLVED
                                : TicketStatus.CLOSED}`}
                >Status {status}</h5>
                <p className="card-text fs-3">{data.length}</p>
            </div>
        </div>
    );
}