import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../component/page_title"
import { object } from "prop-types";
import Select from "react-select"; 
import UploadWidget from "../../component/upload_widget";


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
        
        <main className="bd-main order-1 pe-4">
        <div className="bd-intro d-flex border-bottom justify-content-between">
            <div>
                <PageTitle title={"Create Ticket"} />
            </div>
            <div>
                <strong
                    typeof="button"
                    className="bd-links-heading btn d-flex w-100 align-items-center fw-semibold"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    <i className="fa-solid fa-circle-question me-1" style={{ color: "blue" }}></i>
                    Help
                </strong>
            </div>
        </div>
    
        {/* Customer Name Select */}
        <div className="bd-content">
        <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 d-flex align-items-center">
    <h5 className="me-3 mt-2">Customer:</h5>
    <div>
        <select
            className="form-select"
            onChange={(e) => {
                setCompanyName(parseInt(e.target.value));
            }}
        >
            <option value={0}>Select option</option>
            {store.equipmentList.length > 0 ? (
                filteredCustomers.map((user) => (
                    <option key={user.id} value={user.customer_id}>
                        {user.company_name}
                    </option>
                ))
            ) : (
                <option>Loading equipment list...</option>
            )}
        </select>
    </div>
</div>

     
    
        
            <div className="d-flex flex-column gap-3">
                {/* INTERVENTION TYPE */}
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h6>Intervention type:</h6>
                        <Select
                            className="react-select-container w-100"
                            placeholder="Select Intervention Type..."
                            id="selectIntervention"
                            closeMenuOnSelect={true}
                            blurInputOnSelect={true}
                            isDisabled={!enable}
                            options={[
                                { value: true, label: "Assistance" },
                                { value: false, label: "Maintenance" },
                            ]}
                            onChange={(value) => setInterventionType(value.value)}
                        />
                    </div>
                    {/* Select Equipment */}
                    <div className="col-12 col-md-6">
                        <h6>Equipment:</h6>
                        <Select
                            className="react-select-container w-100"
                            placeholder="Select Equipment..."
                            id="selectEquipment"
                            closeMenuOnSelect={true}
                            blurInputOnSelect={true}
                            isDisabled={!enable}
                            options={
                                filterEquipments !== null
                                    ? filterEquipments.map((equipment) => ({
                                          value: equipment.id,
                                          label: equipment.model + " - " + equipment.serial_number,
                                      }))
                                    : [{ value: "", label: "Loading equipment list..." }]
                            }
                            onChange={(value) => setEquipmentID(value.value)}
                        />
                    </div>
                </div>
    
                {/* SUBJECT */}
                <div className="row">
                    <h6>Subject:</h6>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Write a short sentence to describe malfunction"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                            disabled={!enable}
                        />
                    </div>
                </div>
    
                {/* DESCRIPTION */}
                <div className="row">
                    <h6>Description:</h6>
                    <div>
                        <textarea
                            className="form-control"
                            style={{ minHeight: "300px" }}
                            placeholder="Be as much detailed as you can about the equipment failure"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            disabled={!enable}
                        />
                    </div>
                </div>
            </div>
    
            <div className="d-flex justify-content-center mt-3 gap-3">
                {/* CLOUDINARY */}
                <UploadWidget />
    
                {/* CREATE TICKET */}
                <button className="btn btn-primary col-4" onClick={() => createTicket()}>
                    Create Ticket
                </button>
            </div>
        </div>
    </main>
    

               

             
        // </div>

    )
};