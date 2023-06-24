import React from "react";

export const TicketInfo = (props) => {
    const data = props.data;

    return (
        <div className="container">
            <h4 className="border-bottom">Ticket Information</h4>
            <div class="card">
                <div class="card-header d-flex flex-wrap">
                
                    {/* TICKET ID */}
                    <div className="col-12 col-md-6">
                        <div className="col-12 text-start">
                            <h6><i className="fa-solid fa-ticket me-1"></i>{data.id}</h6>
                        </div>
                    </div>

                    
                    {/* INTERVENTION TYPE */}
                    <div className="col-12 col-md-6">
                        <div className="col-12 text-start text-md-end">
                            <h6><i className="fa-solid fa-screwdriver-wrench me-1"></i>{data.interventionType}</h6>
                        </div>
                    </div>
                </div>

                <ul class="list-group list-group-flush">

                    {/* SUBJECT */}
                    <li class="list-group-item">
                        {/* <div className="card-body"> */}
                            <p className="card-title"><i className="fa-solid fa-circle-question me-1" style={{color: "#689ffd"}}></i><strong>Subject</strong></p>
                            <p className="card-text">{data.subject}</p>
                        {/* </div> */}
                    </li>

                    {/* DESCRIPTION */}
                    <li class="list-group-item">
                        <p className="card-title"><i className="fa-solid fa-square-pen me-1" style={{color: "#689ffd"}}></i><strong>Description</strong></p>
                        <p className="card-text">{data.description}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

                {/* SUBJECT */}
                {/* <div className="col-12">
                    <h6><i className="fa-solid fa-circle-question me-1" style={{color: "#689ffd"}}></i><strong>Subject</strong></h6>
                    <p>{data.subject}</p>
                </div> */}

                {/* DESCRIPTION */}
                {/* <div className="col-12">
                    <h6><i className="fa-solid fa-square-pen me-1"></i><strong>Description</strong></h6>
                    <p>{data.description}</p>
                </div> */}