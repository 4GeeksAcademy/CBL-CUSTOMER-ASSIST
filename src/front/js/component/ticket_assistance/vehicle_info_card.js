import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";

export const VehicleInfoCard = (props) => {
    const { store, actions } = useContext(Context);
    const data = props.data;
    const [editKilometers, setEditKilometers] = useState(false);
    const [editKilometersOnLeave, setEditKilometersOnLeave] = useState(false);
    const [editKilometersOnArrival, setEditKilometersOnArrival] = useState(false);
    const [valueKilometersOnLeave, setValueKilometersOnLeave] = useState("");
    const [valueKilometersOnArrival, setValueKilometersOnArrival] = useState("");
    const [kilometersOnLeave, setKilometersOnLeave] = useState(false);
    const [kilometersOnArrival, setKilometersOnArrival] = useState(editKilometers && kilometersOnLeave);
    const ticketStage = store.ticketStage;
    const [proceedToStage2, setProceedToStage2] = useState(false);

    const handleEditKilometers = () => {
        return () => {
            setEditKilometers(!editKilometers);

            // conditions to enable input to insert kilometers on leave
            valueKilometersOnLeave === "" && valueKilometersOnArrival === "" && ticketStage === 1 ? setEditKilometersOnLeave(!editKilometersOnLeave) : setEditKilometersOnLeave(false);

            // conditions to enable input to insert kilometers on arrival
            valueKilometersOnLeave !== "" && valueKilometersOnArrival === "" && ticketStage === 6 ? setEditKilometersOnArrival(!editKilometersOnArrival) : setEditKilometersOnArrival(false);
            
            // conditions to enable button to proceed to stage 2
            valueKilometersOnLeave !== "" && valueKilometersOnArrival === "" && ticketStage === 1 ? setProceedToStage2(true) : setProceedToStage2(false);
        }
    }

    const handleKmOnLeaveValue = () => {
        return (e) => {
            let num = +(e.target.value);
            setValueKilometersOnLeave(num);
            if (!isNaN(num)) {
                console.log(typeof num)
                setKilometersOnLeave(true);
            }
        }
    }

    const handleProceedToCustomer = () => {
        return () => {
            if (proceedToStage2) actions.setTicketStage(2);
        }
    }

    const handleArrivedCustomerFacilities = () => {
        return () => {
            actions.setTicketStage(3);
        }
    }

    return (
        <div className="mb-3">
            <h4 className="border-bottom">Vehicle Information</h4>
            <div className="card mb-3 px-3 py-2">
                <div className="row g-0">
                    {data.photo ?
                        <div className="col-12 col-sm-4">
                            <div className="img d-block d-sm-none w-100 rounded-top" style={{ "backgroundImage": `url('${data.photo}')` }}></div>
                            <div className="img d-none d-sm-block w-100 rounded-start" style={{ "backgroundImage": `url('${data.photo}')` }}></div>
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
                                                onChange={handleKmOnLeaveValue()} />
                                            <label htmlFor="floatingOnLeave">Km's on leave</label>
                                        </div>

                                        {/* KMs ON ARRIVAL */}
                                        <div className="form-floating col-12 col-sm-6">
                                            <input type="number"
                                                className="form-control"
                                                id="floatingOnArrival"
                                                placeholder="Fill in vehicle km's after arriving home facilities."
                                                disabled={!editKilometersOnArrival} />
                                            <label htmlFor="floatingOnArrival">Km's on arrival</label>
                                        </div>
                                    </div>
                                    {ticketStage === 1 || ticketStage === 6 ?
                                        <div className="form-check">
                                            <input className="form-check-input me-2" checked={editKilometers} onChange={handleEditKilometers()} type="checkbox" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">Edit Kilometers</label>
                                        </div> :
                                        null
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {ticketStage === 1 ?
                <button type="button" className="btn btn-primary"
                    style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}
                    onClick={handleProceedToCustomer()}
                    disabled={!proceedToStage2}>
                    Proceed to customer
                </button> :
                null
            }
            {ticketStage === 2 ?
                <button type="button" className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#customerFacilitiesArrivalConfirmation"
                    style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}>
                    Arrived Customer Facilities
                </button> :
                null
            }

            {/* MODAL TO CONFIRM ARRIVAL TO CUSTOMER FACILITIES */}
            <div className="modal fade" id="customerFacilitiesArrivalConfirmation" tabIndex="-1" aria-labelledby="customerFacilitiesArrivalConfirmationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="customerFacilitiesArrivalConfirmationLabel">Customer Facilities Arrival Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Did you arrived to customer facilities?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={handleArrivedCustomerFacilities()}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}