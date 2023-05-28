import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Select from 'react-select';

export const CustomerCreateTicket = () => {
    const [description, setDescription] = useState("")
    const [machine, setMachine] = useState(null)
    const [intervention, setIntervention] = useState("")
    const navigate = useNavigate();
    const machineData = [
        { label: 'A Machine 1', value: 1 },
        { label: 'B Machine 2', value: 2 },
        { label: 'C Machine 3', value: 3 },
        { label: 'Z Machine 3', value: 4 }
    ];
    const [machineOptions, setMachineOptions] = useState(machineData);

    const createTicket = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                intervention: intervention,
                description: description,
                machine: machine
            })
        });
        if (response.ok) {
            navigate("")
        }
    }

    const selectMachine = (machineObject) => {
        const machineChoice = machineObject;
        setMachine(machineChoice)
    }

    return (
        <div className="container">
            <div className="border-bottom mb-4 mt-3">
                <h1>Create Ticket</h1>
            </div>

            {/* Support type  */}
            <div className="d-flex justify-content-evenly pb-4 border-bottom mb-4">
                <div>
                    <div className="d-flex ">
                        <div className="mt-2 me-2" ><h5>Intervention Type:</h5></div>
                        <div>
                            <select className="form-select" value={intervention} onChange={e => setIntervention(e.target.value)}>
                                <option></option>
                                <option>Assistance</option>
                                <option>Maintenance</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>

            {/* Select Machine */}
            <div className="border-bottom mb-5">
                <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex  ">

                    <h5 className="me-3 mt-2">Machine:</h5>
                    <Select
                        options={machineOptions}
                        valueKey={machine}
                        placeholder="Select machine"
                        onChange={selectMachine} />

                </div>
            </div>

            {/* Description of machine selected*/}
            <div className="d-flex justify-content-center">
                <div><label htmlFor="floatingTextarea2" className="me-3 "><h5>Description:</h5></label></div>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Description" id="floatingTextarea2" style={{ height: "120px", width: "900px" }}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }} />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary " onClick={() => createTicket()}>Submit</button>
            </div>

        </div>

    )
};