import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const CustomerCreateTicket = () => {
    const { store, actions } = useContext(Context);
    const [description, setDescription] = useState("")
    const [machineID, setMachineID] = useState(null)
    const [interventionID, setInterventionID] = useState(null)
    const navigate = useNavigate();

    const createTicket = async () => {
        const response = await actions.customerCreateTicket(machineID, interventionID, description);
        if (response) {
            alert("Ticket created!");
            navigate("/");
        }
        if (!response) {
            alert("Error");
        }

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
                            <select className="form-select" onChange={e => setInterventionID(e.target.value)}>
                                <option>Select option</option>
                                <option value={false}>Maintenance</option>
                                <option value={true}>Assistance</option>
                                
                            </select>
                        </div>

                    </div>
                </div>
            </div>

            {/* Select Machine */}
            <div>
                <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">
                    <h5 className="me-3 mt-2">Machine:</h5>
                    <div>
                        <select className="form-select" onChange={e => setMachineID(e.target.value)}>
                            <option>Select option</option>
                            {store.machineList.length > 0
                                ?
                                store.machineList.map((machine) => {
                                    return <option key={machine.id} value={machine.id}>{machine.model + " - " + machine.serial_number}</option>
                                })
                                : <option>Loading machine list...</option>
                            }
                        </select>
                    </div>
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