import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const CustomerCreateTicket = () => {
    const { store, actions } = useContext(Context);
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [equipmentID, setEquipmentID] = useState(null);
    const [interventionType, setInterventionType] = useState(true)
    const navigate = useNavigate();

    const createTicket = async () => {
        const response = await actions.customerCreateTicket(equipmentID, interventionType, subject, description);
        if (response) {
            alert("Ticket created!");
            navigate("/customer/dashboard");
        }
        if (!response) {
            alert("Error");
        }

    }


    return (
        // <div className="container">
        <main className="bd-main order-1">
            <div className="bd-intro pt-2 ps-lg-2">
                <h1 className="bd-title mb-0" id="content">Create Ticket</h1>
            </div>
            <div className="bd-content ps-lg-2">
                
                {/* Support type  */}
                <div className="d-flex justify-content-evenly pb-4 border-bottom mb-4">
                    <div>
                        <div className="d-flex ">
                            <div className="mt-2 me-2" ><h5>Intervention Type:</h5></div>
                            <div>
                                <select className="form-select" onChange={e => setInterventionType(e.target.value === "true" ? true : false)}>
                                    <option>Select option</option>
                                    <option value={true}>Assistance</option>
                                    <option value={false}>Maintenance</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Select Equipment */}
                <div>
                    <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">
                        <h5 className="me-3 mt-2">Equipment:</h5>
                        <div>
                            <select className="form-select" onChange={e => setEquipmentID(e.target.value)}>
                                <option>Select option</option>
                                {store.equipmentList.length > 0
                                    ?
                                    store.equipmentList.map((equipment) => {
                                        return <option key={equipment.id} value={equipment.id}>{equipment.model + " - " + equipment.serial_number}</option>
                                    })
                                    : <option>Loading equipment list...</option>
                                }
                            </select>
                        </div>
                    </div>
                </div>
                {/* Subject of ticket*/}
                <div className="d-flex justify-content-center">
                    <div><label htmlFor="floatingTextarea1" className="me-3 "><h5>Subject:</h5></label></div>
                    <div className="form-floating">
                        <textarea
                            className="form-control" id="floatingTextarea1" placeholder="Write a short sentence to describe malfunction"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value)
                            }} />
                    </div>
                </div>

                {/* Description of equipment malfunction*/}
                <div className="d-flex justify-content-center">
                    <div><label htmlFor="floatingTextarea2" className="me-3 "><h5>Description:</h5></label></div>
                    <div className="form-floating">
                        <textarea
                            className="form-control" placeholder="Be as much detailed as you can about the equipment failure" id="floatingTextarea2"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }} />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary " onClick={() => createTicket()}>Submit</button>
                </div>
            </div>

        </main>
        // </div>

    )
};