import React from "react";
import { TicketStatusColor } from "../constants/ticket_status_color";

export const InfoCard = (props) => {
    const data = props.data;
    const status = (data[0].status);

    const handleStatusColor = (status) => {
        if(status === "New") return TicketStatusColor.NEW;
        if(status === "Opened") return TicketStatusColor.OPENED;
        if(status === "In Progress") return TicketStatusColor.IN_PROGRESS;
        if(status === "Resolved") return TicketStatusColor.RESOLVED;
        if(status === "Closed") return TicketStatusColor.CLOSED;
    }

    return (
        // <div className={`card text-center border-${handleStatusColor(status)} mb-3`}>
        <div className={`card text-center mb-3`} style={{borderColor: handleStatusColor(status)}}>
            {/* <div className="card-header">Header</div> */}
            {/* <div className={`card-header text-white bg-${handleStatusColor(status)}`}> */}
            <div className={`card-header text-white`} style={{backgroundColor: handleStatusColor(status)}}>
                <h4 className="card-title m-0">{status}</h4>
            </div>
            <div className="card-body">
                {/* <h5 className={`card-title text-${status === 'New' ? TicketStatusColor.NEW :
                    status === 'Opened' ? TicketStatusColor.OPENED
                        : status === 'In Progress' ? TicketStatusColor.IN_PROGRESS
                            : status === 'Resolved' ? TicketStatusColor.RESOLVED
                                : TicketStatusColor.CLOSED}`}
                >Status {status}</h5> */}
                <p className="card-text fs-3">{data.length}</p>
            </div>
        </div>
    );
}