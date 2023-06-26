import React, { useState } from "react";

export const VehicleInfoCard = (props) => {
    const data = props.data;
    const [valueKilometersOnLeave, setValueKilometersOnLeave] = useState("");
    const [valueKilometersOnArrival, setValueKilometersOnArrival] = useState("");
    const [editKilometers, setEditKilometers] = useState(false);
    const [kilometersOnLeave, setKilometersOnLeave] = useState(false);
    const [kilometersOnArrival, setKilometersOnArrival] = useState(editKilometers && kilometersOnLeave);

    const handleEditKilometers = () => {
        return () => {
            setEditKilometers(!editKilometers);
            setKilometersOnArrival(!editKilometers && kilometersOnLeave);
        }
    }

    const handleKmOnLeaveValue = () => {
        return (e) => {
            let num = +(e.target.value);
            setValueKilometersOnLeave(num);
            if(!isNaN(num)) setKilometersOnLeave(true);
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
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="floatingOnLeave"
                                                placeholder="Fill in vehicle km's before leave home facilities."
                                                disabled={!editKilometers}
                                                value={valueKilometersOnLeave}
                                                onChange={handleKmOnLeaveValue()} />
                                            <label htmlFor="floatingOnLeave">Km's on leave</label>
                                        </div>

                                        {/* KMs ON ARRIVAL */}
                                        <div className="form-floating col-12 col-sm-6">
                                            <input type="number" className="form-control" id="floatingOnArrival" placeholder="Fill in vehicle km's after arriving home facilities." disabled={!kilometersOnArrival} />
                                            <label htmlFor="floatingOnArrival">Km's on arrival</label>
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input me-2" checked={editKilometers} onChange={handleEditKilometers()} type="checkbox" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">Edit Kilometers</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}