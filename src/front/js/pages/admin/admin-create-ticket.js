import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../component/page_title"
import { object } from "prop-types";

export const AdminCreateTicket = () => {
    const { store, actions } = useContext(Context);
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [equipmentID, setEquipmentID] = useState(null);
    const [interventionType, setInterventionType] = useState(true);
    const [companyName, setCompanyName] = useState(0);
    const [enable, setEnable] = useState(false);
    const [filterEquipments , setFilterEquipment] = useState(null) 
    const [customerId, setCustomerId] = useState(0)
    const filteredCustomers = store.userList.filter(item => item.customer_id !== null);
    const navigate = useNavigate();

    const createTicket = async () => {
        const response = await actions.adminCreateTicket(equipmentID, interventionType, subject, description, customerId);
        console.log(response)
        if (response) {
            actions.userToastAlert("New Customer Ticket", "Ticket created successfully!");
            // alert("Ticket created!");
            navigate("/admin/dashboard");
        }
        if (!response) {
            alert("Error");
        } 
    }

    useEffect(()=>{
        actions.getAdminEquipment();
        actions.getAdminUserList();
        actions.getAdminEquipment();
    }, []);
    
    useEffect(() => {
        const equipment = store.equipmentList.filter(item => item.customer_id === companyName);   
        setFilterEquipment(equipment);
        setEnable(change => companyName > 0 ? change = true : change = false)
        setCustomerId(equipment.map(e => e.customer_id)[0])
    },[companyName])
    
    return (
        // <div className="container">
        <main className="bd-main order-1">
            <div className="bd-intro">
                <PageTitle title={"Create Ticket"} />
            </div>  
            <div className="bd-content ps-lg-2">  

                {/* Customer Name Selecet */}
                <div>
                    <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">
                        <h5 className="me-3 mt-2">Customer:</h5>     
                        <div> 
                            <select className="form-select" onChange={e => {
                                setCompanyName(parseInt(e.target.value))}}>
                                <option value={0}>Select option</option>
                                {store.equipmentList.length > 0
                                    ?
                                    filteredCustomers.map((user) => {
                                        return <option key={(user.id)} value={user.customer_id} > 
                                            {user.company_name} </option>
                                    })
                                    : <option>Loading equipment list...</option>
                                }
                            </select>
                        </div>
                    </div>
                </div>

                {/* Intervention type  */}
                <div className="d-flex justify-content-evenly pb-4 border-bottom mb-4">
                    <div>
                        <div className="d-flex ">
                            <div className="mt-2 me-2" ><h5>Intervention Type:</h5></div>
                            <div>
                                <select className="form-select" disabled={!enable} onChange={e => setInterventionType(e.target.value === "true" ? true : false)}>
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
                            <select className="form-select" disabled={!enable} style={{ width: "170px" }} onChange={e => setEquipmentID(e.target.value)}>
                                <option>Select option</option>
                                {filterEquipments !== null
                                    ?
                                    filterEquipments.map((equipment) => {
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
                            className="form-control" disabled={!enable} id="floatingTextarea1" placeholder="Write a short sentence to describe malfunction"
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
                            className="form-control" disabled={!enable} placeholder="Be as much detailed as you can about the equipment failure" id="floatingTextarea2"
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