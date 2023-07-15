import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { CapturePhoto } from "./capture_photo";
import UploadWidget from "../../component/upload_widget";
import { PageTitle } from "../../component/page_title";

export const CustomerCreateTicket = () => {
    const { store, actions } = useContext(Context);
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [equipmentID, setEquipmentID] = useState(null);
    const [interventionType, setInterventionType] = useState(true);
    const customerMedia = store.customer_media;
    const navigate = useNavigate();
    const interventionOptions = [{
        value: true,
        label: "Assistance"
    },
    {
        value: false,
        label: "Maintenance"
    }];

    useEffect(()=>{
        actions.getCustomerEquipment();
    }, []);

    const createTicket = async () => {
        const response = await actions.customerCreateTicket(equipmentID, interventionType, subject, description, customerMedia );
        if (response) {
            actions.userToastAlert("New Customer Ticket", "Ticket created successfully!");
            // alert("Ticket created!");
            navigate("/customer/dashboard");
        }
        if (!response) {
            alert("Error");
        }

    }


    return (
        // <div className="container">
        <main className="bd-main order-1">
            <div className="bd-intro">
                <PageTitle title={"Create Ticket"} />
            </div>
            <div className="bd-content">

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
                                isDisabled={false}
                                options={interventionOptions}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                    }),
                                }}
                                onChange={(value) => setInterventionType(value.value)}
                            />
                        </div>

                        {/* EQUIPMENT SELECT */}
                        <div className="col-12 col-md-6">
                            <h6>Equipment:</h6>
                            <Select
                                className="react-select-container w-100"
                                placeholder="Select Equipment..."
                                id="selectEquipment"
                                closeMenuOnSelect={true}
                                blurInputOnSelect={true}
                                isDisabled={false}
                                options={
                                    store.equipmentList.map((equipment) => {
                                        return {
                                            value: equipment.id,
                                            label: equipment.model + " - " + equipment.serial_number
                                        }
                                    })
                                }
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                    }),
                                }}
                                onChange={(value) => setEquipmentID(value.value)}
                            />
                        </div>
                    </div>

                    {/* SUBJECT */}
                    <div className="row">
                        <h6>Subject:</h6>
                        <div>
                            <input type="text"
                                className="form-control"
                                placeholder="Choose a short title..."
                                value={subject}
                                onChange={(e) => { setSubject(e.target.value) }}
                            />
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="row">
                        <h6>Description:</h6>
                        <div>
                            <textarea className="form-control"
                                style={{ minHeight: "300px" }}
                                placeholder="Write a description as detailed as possible in concern with the problem affecting your equipment..."
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}>
                            </textarea>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3 gap-3">
                    
                    {/* CLOUDINARY */}
                    <UploadWidget />
                    
                    {/* CREATE TICKET */}
                    <button className="btn btn-primary col-4" onClick={() => createTicket()}>Create Ticket</button>
                </div>
            </div>

        </main>
        // </div>

    )
};