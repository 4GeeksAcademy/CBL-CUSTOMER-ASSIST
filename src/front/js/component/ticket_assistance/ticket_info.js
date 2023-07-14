import React, {useContext} from "react";
import { Context } from "../../store/appContext";
import { CarouselItem } from "./carousel_item";
import { InterventionTypes } from "../../constants/intervention_types";

import "../../../styles/carousel.css"

export const TicketInfo = () => {
    const { actions, store} = useContext(Context);
    const data = store.assignedTicket.ticket;

    data.customer_media = store.assignedTicket.ticket.customer_media;

    return (
        <div className="mb-3">
            <h4 className="border-bottom">Ticket Information</h4>
            <div className="card">
                <div className="card-header d-flex flex-wrap">

                    {/* TICKET ID */}
                    <div className="col-6">
                        <div className="text-start">
                            <h6><i className="fa-solid fa-ticket me-1"></i>{data.id}</h6>
                        </div>
                    </div>


                    {/* INTERVENTION TYPE */}
                    <div className="col-6">
                        <div className="text-end">
                            <h6><i className="fa-solid fa-screwdriver-wrench me-1"></i>{data.interventionType ? InterventionTypes.ASSISTANCE : InterventionTypes.MAINTENANCE }</h6>
                        </div>
                    </div>
                </div>

                <ul className="list-group list-group-flush">

                    {/* SUBJECT */}
                    <li className="list-group-item">
                        {/* <div className="card-body"> */}
                        <p className="card-title"><i className="fa-solid fa-circle-question me-1" style={{ color: "#689ffd" }}></i><strong>Subject</strong></p>
                        <p className="card-text">{data.subject}</p>
                        {/* </div> */}
                    </li>

                    {/* DESCRIPTION */}
                    <li className="list-group-item">
                        <p className="card-title"><i className="fa-solid fa-square-pen me-1" style={{ color: "#689ffd" }}></i><strong>Description</strong></p>
                        <p className="card-text">{data.description}</p>
                    </li>

                    {/* CAROUSEL */}
                    <li className="list-group-item">
                        <p className="card-title"><i className="fa-solid fa-photo-film me-1" style={{ color: "#689ffd" }}></i><strong>Photos from Customer</strong></p>
                        <div id="carouselExample" className="carousel slide pointer-event">
                            <div className="carousel-inner rounded-bottom">
                                {data.customer_media.length > 0 ?
                                    data.customer_media.map((url, i) => {
                                        return <CarouselItem key={i} url={data.customer_media[i]} index={i} />
                                    }) :
                                    null
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>

            {/* CARROUSEL */}

        </div>
    );
}