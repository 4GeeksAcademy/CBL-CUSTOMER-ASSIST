import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';

export const CustomerCreateTicket = () => {
    const [contact, setContact] = useState("")
    const [description, setDescription] = useState("")
    const [machine, setMachine] = useState(null)
    const [support, setSupport] = useState("")
    const navigate = useNavigate();
    const machineData = [{ Machine: 'A Machine 1', id: 1 }, { Machine: 'B Machine 2', id: 2 }, { Machine: 'C Machine 3', id: 3 }, { Machine: 'Z Machine 3', id: 4 }];
    const [machineOptions, setMachineOptions] = useState(machineData);

    const createTicket = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contact: contact,
                support: support,
                description: description,
                machine: machine
            })
        });
        if (response.ok) {
            navigate("")
        }
    }

    const saveMachine = (selected) => {
        const selectedMachie = selected.map((select) => select.Machine);
        setMachine(selectedMachie)
    }

    return (
        <div className="container">
            <div className="border-bottom mb-4 mt-3">
                <h1>Create Ticket</h1>
            </div>

            {/* Support type and contact person */}
            <div className="d-flex justify-content-evenly pb-4 border-bottom mb-4">
                <div>
                    <div className="d-flex ">
                        <div className="mt-2 me-2" ><h5>Select:</h5></div>
                        <div>
                            <select className="form-select" value={support} onChange={e => setSupport(e.target.value)}>
                                <option></option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="d-flex">
                        <label className="mt-2 me-2" htmlFor="formGroupExampleInput1"><h5>Contact:</h5></label>
                        {/* <label htmlFor="formGroupExampleInput1" className="form-label me-3 mt-1">Contact Person</label> */}
                        <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Contact Person"
                            onChange={(e) => {
                                setContact(e.target.value)
                            }} />
                    </div>
                </div>
            </div>

            {/* Select Machine */}
            <div>
                <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">

                    <h5 className="me-3 mt-2">Machine:</h5>
                    <Multiselect options={machineOptions} displayValue="Machine" placeholder="Select machine"
                        onSelect={saveMachine} onRemove={saveMachine} />

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