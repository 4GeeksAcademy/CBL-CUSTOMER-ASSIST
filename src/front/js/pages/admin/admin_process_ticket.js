import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';

import { ProcessCustomerInfo } from "../../component/process_ticket/process_customer_info";
import { ProcessTicketInfo } from "../../component/process_ticket/process_ticket_info";
import { ProcessEquipmentInfoCard } from "../../component/process_ticket/process_equipment_info_card";
import { ProcessVehicleInfoCard } from "../../component/process_ticket/process_vehicle_info_card";
import { ProcessKnowledgeAssistanceReport } from "../../component/process_ticket/process_knowledge_assistance_report";
import { PageTitle } from "../../component/page_title";

export const AdminProcessTicket = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    // const location = useLocation();
    const ticket = store.processTicket;
    const ticketEmployee = store.processTicket.ticket_employee[0];
    const categoryOptions = store.categoryOptions;
    const [selectedCategoryID, setSelectedCategoryID] = useState(+(""));
    // const data = store.processTicket?.customer_info;
    const [newMalfunction, setNewMalfuntion] = useState("");
    const [newSolution, setNewSolution] = useState("");
    const [newKnowledgeDisabled, setNewKnowledgeDisabled] = useState(true);
    // const [optionCloseTicket, setOptionCloseTicket] = useState(false);

    const toast = (title, data) => actions.userToastAlert(title, data);
    const toastTitle = "Process Ticket";

    const handleCreateNewKnowledge = async () => {
        let ticketBool = !!(ticket.id && ticket.id !== "" && ticket.id !== undefined);
        let selectedCategoryBool = !!(selectedCategoryID && selectedCategoryID !== "" && selectedCategoryID !== undefined);
        let equipmentBool = !!(ticket.equipment.id && ticket.equipment.id !== "" && ticket.equipment.id !== undefined);

        if (ticketBool && selectedCategoryBool && equipmentBool) {
            const response = await actions.adminCreateProcessTicketKnowledge(newMalfunction, newSolution, selectedCategoryID, ticket.id, ticket.equipment.id);
            if (response[0] === 201) {
                toast(toastTitle, "New knowledge created successfully!");
                setNewKnowledgeDisabled(true);
                setNewMalfuntion("");
                setNewSolution("");
            }
        }
    }

    const handleCloseTicket = async () => {
        // if(ticketEmployee.observations !== "") toast(toastTitle, "Are you sure you want to close ticket?");
        // toast(toastTitle, "Closing ticket...");
        const response = await actions.setTicketStatus(ticket.id, 'closed');
        if (response[0] === 200) {
            navigate('/admin/tickets/resolved');
        }
    }

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <PageTitle title={"Process Ticket"} />
            </div>
            <div className="bd-content">
                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                <ProcessCustomerInfo />
                <ProcessTicketInfo />
                <ProcessEquipmentInfoCard />
                <ProcessVehicleInfoCard />
                <ProcessKnowledgeAssistanceReport />

                {/* CREATE NEW KNOWLEDGE */}
                {!newKnowledgeDisabled &&
                    <div>
                        <h4 className="border-bottom">Create new knowledge</h4>
                        {/* ASSIGN VEHICLES */}
                        <div className="d-flex flex-column">
                            <h6>Select category</h6>
                            <Select
                                id="selectCategory"
                                className="basic-single mb-2"
                                classNamePrefix="select"
                                isSearchable={false}
                                isClearable={true}
                                isDisabled={false}
                                // components={animatedComponents}
                                options={categoryOptions}
                                // defaultValue={assignedVehicle}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                    }),
                                }}
                                onChange={(newValue, actionMeta) => {
                                    if (actionMeta.action === 'select-option') setSelectedCategoryID(newValue.id);
                                    // if (actionMeta.action === 'clear') handleDismissVehicleFromTicket();
                                }}
                            />
                        </div>
                        <div className="form-floating mb-1">
                            <textarea className="form-control border-danger focus-ring focus-ring-danger"
                                id="newMalfunction"
                                placeholder="Leave a comment here"
                                style={{ minHeight: "200px" }}
                                value={newMalfunction}
                                onChange={(e) => setNewMalfuntion(e.target.value)}
                            ></textarea>
                            <label htmlFor="newMalfunction"
                                className="text-danger fst-italic  z-0"
                            >Malfunction</label>
                        </div>
                        <div className="form-floating mb-1">
                            <textarea className="form-control border-success focus-ring focus-ring-success"
                                id="newSolution"
                                placeholder="Leave a comment here"
                                style={{ minHeight: "200px" }}
                                value={newSolution}
                                onChange={(e) => setNewSolution(e.target.value)}
                            ></textarea>
                            <label htmlFor="newSolution"
                                className="text-success fst-italic"
                            >Solution</label>
                        </div>
                    </div>
                }
                <div className="d-flex gap-3 mt-2 mb-5">
                    {/* <Link to={"/admin/tickets/resolved"}>
                    <button type="button" className="btn btn-secondary">Go back</button>
                </Link> */}
                    {newKnowledgeDisabled ? <>
                        <button type="button"
                            className="btn btn-primary btn-sm "
                            onClick={() => setNewKnowledgeDisabled(!newKnowledgeDisabled)}
                        >Edit New Knowledge</button>
                        <button type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCloseTicket()}
                        >Close Ticket</button></>
                        :
                        <div className="d-flex gap-3">
                            <button type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => setNewKnowledgeDisabled(!newKnowledgeDisabled)}
                            >Cancel</button>
                            <button type="button"
                                className="btn btn-primary btn-sm"
                                disabled={!(newSolution !== "" && newMalfunction !== "")}
                                onClick={() => handleCreateNewKnowledge()}
                            >Create Knowledge</button>

                        </div>
                    }
                </div>
            </div>
        </main>
    );
}