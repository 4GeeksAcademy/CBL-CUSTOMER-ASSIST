import React from "react";
import "../../styles/carousel.css"

export const TicketInfo = (props) => {
    const data = props.data;

    return (
        <div className="container">
            <h4 className="border-bottom">Ticket Information</h4>
            <div className="card">
                <div className="card-header d-flex flex-wrap">
                
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

                <ul className="list-group list-group-flush">

                    {/* SUBJECT */}
                    <li className="list-group-item">
                        {/* <div className="card-body"> */}
                            <p className="card-title"><i className="fa-solid fa-circle-question me-1" style={{color: "#689ffd"}}></i><strong>Subject</strong></p>
                            <p className="card-text">{data.subject}</p>
                        {/* </div> */}
                    </li>

                    {/* DESCRIPTION */}
                    <li className="list-group-item">
                        <p className="card-title"><i className="fa-solid fa-square-pen me-1" style={{color: "#689ffd"}}></i><strong>Description</strong></p>
                        <p className="card-text">{data.description}</p>
                    </li>
                </ul>
            </div>

            {/* CARROUSEL */}
            <div className="bd-example-snippet border rounded-2 mt-1">
                <div className="bd-example m-0">
                    <div id="carouselExample" className="carousel slide pointer-event">
                    <div className="carousel-inner">
                        <div className="carousel-item">
                        {/* <img src="https://picsum.photos/1040/500" className="d-block w-100 ratio ratio-4x3" role="img" alt="..."/> */}
                            <div className="img d-block w-100 ratio ratio-4x3" style={{"backgroundImage": "url('https://picsum.photos/1040/500')"}}></div>
                        </div>
                        <div className="carousel-item">
                        {/* <img src="https://picsum.photos/1040/500" className="d-block w-100 ratio ratio-4x3" role="img" alt="..."/> */}
                            <div className="img d-block w-100 ratio ratio-4x3" style={{"backgroundImage": "url('https://picsum.photos/1040/500')"}}></div>
                        </div>
                        <div className="carousel-item active">
                        {/* <img src="https://picsum.photos/1040/500" className="d-block w-100 ratio ratio-4x3" role="img" alt="..."/> */}
                            <div className="img d-block w-100 ratio ratio-4x3" style={{"backgroundImage": "url('https://picsum.photos/1040/500')"}}></div>
                        </div>
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
                </div>
            </div>
        </div>
    );
}