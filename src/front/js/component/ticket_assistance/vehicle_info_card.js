import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import vehiclePhoto from "../../../assets/img/8568jn.jpg";

export const VehicleInfoCard = () => {
    const { store, actions } = useContext(Context);
    const ticketStage = store.ticketStage;
    const data = store.assignedTicket.vehicle_assigned;

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }, [])

    // TODO: change this for URL from database
    data.vehicle_photo = vehiclePhoto;

    const [editKilometers, setEditKilometers] = useState(false);
    const [editKilometersOnLeave, setEditKilometersOnLeave] = useState(false);
    const [editKilometersOnArrival, setEditKilometersOnArrival] = useState(false);
    const [errorKilometersValuesInsertion, setErrorKilometersValuesInsertion] = useState(false);

    const [valueKilometersOnLeave, setValueKilometersOnLeave]
        = useState(localStorage.getItem('value_kilometers_on_leave') ? JSON.parse(localStorage.getItem('value_kilometers_on_leave')) : "");
    const [valueKilometersOnArrival, setValueKilometersOnArrival]
        = useState(localStorage.getItem('value_kilometers_on_arrival') ? JSON.parse(localStorage.getItem('value_kilometers_on_arrival')) : "");
    const [proceedToStage2, setProceedToStage2]
        = useState(localStorage.getItem('proceed_to_stage_2') ? JSON.parse(localStorage.getItem('proceed_to_stage_2')) : false);

    const handleEditKilometers = () => {
        // enable kilometers input
        setEditKilometers(!editKilometers);

        // conditions to enable input to insert kilometers on leave
        ticketStage === 1 ? setEditKilometersOnLeave(!editKilometersOnLeave) : setEditKilometersOnLeave(false);

        // conditions to enable input to insert kilometers on arrival
        valueKilometersOnLeave !== "" && ticketStage === 6 ? setEditKilometersOnArrival(!editKilometersOnArrival) : setEditKilometersOnArrival(false);

        // conditions to enable button to proceed to stage 2
        valueKilometersOnLeave !== "" && valueKilometersOnArrival === "" && ticketStage === 1 ? handleProceedToStage2(true) : handleProceedToStage2(false);

        // conditions to proceed to stage 7
        valueKilometersOnLeave !== "" && valueKilometersOnArrival !== "" && ticketStage === 6 && !errorKilometersValuesInsertion ? handleProceedToStage7() : null;
    }

    useEffect(() => {
        if (valueKilometersOnLeave !== "" && valueKilometersOnArrival !== "" && ticketStage === 6) compareKilometersValues();
    }, [valueKilometersOnArrival, valueKilometersOnLeave])

    const handleValueKilometersOnLeave = (value) => {
        let num = +(value);

        if (!isNaN(num)) {
            setValueKilometersOnLeave(num);
            localStorage.setItem('value_kilometers_on_leave', JSON.stringify(num));
        }
    }

    const handleValueKilometersOnArrival = (value) => {
        let num = +(value);

        if (!isNaN(num)) {
            setValueKilometersOnArrival(num);
            localStorage.setItem('value_kilometers_on_arrival', JSON.stringify(num));
        }
    }

    const compareKilometersValues = () => {
        valueKilometersOnArrival > valueKilometersOnLeave ? setErrorKilometersValuesInsertion(false) : setErrorKilometersValuesInsertion(true);
    }

    const handleProceedToStage2 = (value) => {
        setProceedToStage2(value);
        localStorage.setItem('proceed_to_stage_2', JSON.stringify(value));
    }

    const handleProceedToCustomer = () => {
        if (proceedToStage2) actions.setTicketStage(2);
    }

    const handleArrivedCustomerFacilities = () => {
        actions.setTicketStage(3);
    }

    const handleProceedToStage7 = () => {
        actions.setTicketStage(7);
    }

    return (
        <div className="mb-3">
            <h4 className="border-bottom">Vehicle Information</h4>
            <div className="card mb-3 px-3 py-2">
                <div className="row g-0">
                    {data.vehicle_photo ?
                        <div className="col-12 col-sm-4">
                            <div className="img d-block d-sm-none w-100 rounded-top" style={{ "backgroundImage": `url('${data.vehicle_photo}')` }}></div>
                            <div className="img d-none d-sm-block w-100 rounded-start" style={{ "backgroundImage": `url('${data.vehicle_photo}')` }}></div>
                        </div> :
                        null
                    }
                    <div className="col-12 col-sm-8">
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush">

                                {/* LICENCE PLATE */}
                                <li className="list-group-item">
                                    <p className="card-title"><strong>Licence plate:</strong> {data.licence_plate}</p>
                                </li>

                                {/* MAKER + MODEL */}
                                <li className="list-group-item">
                                    <p className="card-title"><strong>Vehicle</strong>: {data.maker} {data.model}</p>
                                </li>

                                {/* KM's INPUT's */}
                                <li className="list-group-item">
                                    <div className="row g-2">
                                        {/* KMs ON LEAVE */}
                                        <div className="form-floating col-12 col-sm-6">
                                            <input type="number"
                                                className="form-control"
                                                id="floatingOnLeave"
                                                placeholder="Fill in vehicle km's before leave home facilities."
                                                disabled={!editKilometersOnLeave}
                                                value={valueKilometersOnLeave}
                                                onChange={(e) => handleValueKilometersOnLeave(e.target.value)} />
                                            <label htmlFor="floatingOnLeave">Km's on leave</label>
                                        </div>

                                        {/* KMs ON ARRIVAL */}
                                        <div className="form-floating col-12 col-sm-6">
                                            <input type="number"
                                                className="form-control"
                                                id="floatingOnArrival"
                                                placeholder="Fill in vehicle km's after arriving home facilities."
                                                disabled={!editKilometersOnArrival}
                                                value={valueKilometersOnArrival}
                                                onChange={(e) => handleValueKilometersOnArrival(e.target.value)} />
                                            <label htmlFor="floatingOnArrival">Km's on arrival</label>
                                        </div>
                                    </div>
                                    {ticketStage === 1 || ticketStage === 6 ?
                                        <div className="form-check">
                                            <input className="form-check-input me-2" checked={editKilometers} onChange={() => handleEditKilometers()} type="checkbox" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">Edit Kilometers</label>
                                        </div> :
                                        null
                                    }

                                    {/* WARNING TO ALERT USER OF PROBLEM IN VALUES INSERTED IN KILOMETERS */}
                                    {errorKilometersValuesInsertion ?
                                        <span className="badge text-bg-warning">Kilometers inserted on arrival are lesser then on leave!</span>
                                        : null
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTON: PROCEED TO CUSTOMER */}
            {ticketStage === 1 ?
                <span className="d-inline-block"
                    tabIndex="0"
                    data-bs-toggle="tooltip"
                    data-bs-title={!proceedToStage2 ? "Check 'Edit kilometers' and insert kilometers displayed at vehicle odometer." : "Click to proceed to customer facilities."}>
                    <button type="button" className="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#customerFacilitiesTripConfirmation"
                        style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}
                        disabled={!proceedToStage2}>
                        Proceed to customer
                    </button>
                </span>
                : null
            }

            {/* BUTTON: ARRIVED CUSTOMER FACILITIES */}
            {ticketStage === 2 ?
                <button type="button" className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#customerFacilitiesArrivalConfirmation"
                    style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}>
                    Arrival at the Customer's Facilities
                </button> :
                null
            }

            {/* MODAL TO CONFIRM TRIP TO CUSTOMER FACILITIES */}
            <div className="modal fade" id="customerFacilitiesTripConfirmation" tabIndex="-1" aria-labelledby="customerFacilitiesTripConfirmationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="customerFacilitiesTripConfirmationLabel">Customer Facilities Trip Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Do you wish to start the trip for the customer facilities?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={() => handleProceedToCustomer()}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL TO CONFIRM ARRIVAL TO CUSTOMER FACILITIES */}
            <div className="modal fade" id="customerFacilitiesArrivalConfirmation" tabIndex="-1" aria-labelledby="customerFacilitiesArrivalConfirmationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="customerFacilitiesArrivalConfirmationLabel">Customer Facilities Arrival Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Do you confirm that you have arrived at the customer's facilities?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={() => handleArrivedCustomerFacilities()}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}