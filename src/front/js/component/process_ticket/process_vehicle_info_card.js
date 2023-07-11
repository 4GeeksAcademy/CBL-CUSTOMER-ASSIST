import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import vehiclePhoto from "../../../assets/img/8568jn.jpg";

export const ProcessVehicleInfoCard = () => {
    const { store, actions } = useContext(Context);
    const kmOnLeave = store.processTicket.km_on_leave;
    const kmOnArrival = store.processTicket.km_on_arrival;
    const data = store.processTicket.vehicle_assigned;


    // TODO: change this for URL from database
    data.vehicle_photo = vehiclePhoto;

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
                                    <p className="card-title"><strong>Licence plate:</strong> {data.license_plate}</p>
                                </li>

                                {/* MAKER + MODEL */}
                                <li className="list-group-item">
                                    <p className="card-title"><strong>Vehicle</strong>: {data.maker} {data.model}</p>
                                </li>

                                {/* KMS ON LEAVE */}
                                <li className="list-group-item">
                                    <p className="card-title"><strong>Km's on leave:</strong>: {kmOnLeave}</p>
                                </li>

                                {/* KMS ON ARRIVAL */}
                                <li className="list-group-item">
                                    <p className="card-title"><strong>Km's on arrival:</strong>: {kmOnArrival}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}