import React from "react";

export const InfoCard = (props) => {
    const data = props.data;
    const status = (data[0].status);

    return (
        <div className={`card text-center border-${status === 'Opened' ? 'danger' : status === 'In Progress' ? 'warning' : status === 'Resolved' ? 'success' : 'secondary'} mb-3`}>
            {/* <div className="card-header">Header</div> */}
            <div className="card-header">
                <h4 className="card-title m-0">Tickets</h4>
            </div>
            <div className="card-body">
                <h5 className={`card-title text-${status === 'Opened' ? 'danger' : status === 'In Progress' ? 'warning' : status === 'Resolved' ? 'success' : 'secondary'}`}>Status {status}</h5>
                <p className="card-text fs-3">{data.length}</p>
            </div>
        </div>
    );
}