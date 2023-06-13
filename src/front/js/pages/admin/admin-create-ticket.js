import React from "react";
import "../../../styles/home.css";



export const AdminCreateTicket = () => {
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
                                {store.interventionType.length > 0
                                    ? store.interventionType.map((type) => {
                                        return <option key={type.id} value={type.id} >{type.name}</option>
                                    })
                                    :
                                    <option>Loading...</option>
                                }
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

            {/* Description of equipment selected*/}
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
