import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { TicketStatusColor } from '../constants/ticket_status_color';
import { useNavigate } from "react-router-dom";


export const TicketSmallEmployee = (props) => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const ticketStage = store.ticketStage;
    const ticket = props.data.ticket;
    const customer = props.data.customer;
    const equipment = props.data.equipment;
    const vehicleAssigned = props.data.vehicle_assigned;

    const toast = (title, data) => actions.userToastAlert(title, data);

    const handleModal = () => {
        actions.updateShowModal(ticket.subject, ticket.description, equipment.knowledge);
    }

    const handleBtnSetTicketStatus = async (ticketID, status) => {
        console.log('btnStartAssistance');
        const response = await actions.setTicketStatus(ticketID, status);

        if (response) {
            toast('Ticket Status', `Updated ticket number ${ticketID} to ${status}`);
        }
        else {
            toast('Warning', 'There was some problem trying to set ticket status.');
        }
    }

    const handleTicketAssistance = async () => {
        toast('Navigate', "Let's go to ticket assistance page!");
        if (ticketStage <= 1) await actions.setTicketStage(1);
        navigate("/employee/ticket/assistance");
    }

    return (
        <div className="card w-100 mb-3">
            <div className="card-header btn btn-light" onClick={() => handleModal()}>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="text-start flex-grow-1 p-0">
                        <h5 className="card-title  m-0">{ticket.subject}</h5>
                    </div>
                    <p className={`badge m-0 text-bg-${ticket.status === 'New' ? TicketStatusColor.NEW
                        : ticket.status === 'Opened' ? TicketStatusColor.OPENED
                            : ticket.status === 'In Progress' ? TicketStatusColor.IN_PROGRESS
                                : ticket.status === 'Resolved' ? TicketStatusColor.RESOLVED
                                    : TicketStatusColor.CLOSED}`}
                        role="alert">{ticket.status}
                    </p>
                </div>
            </div>
            <div className="card-body">
                <div className="d-flex flex-column">
                    <p className="card-text flex-grow-1 mb-0"><strong>Customer: </strong>{customer.company_name}</p>
                    <p className="card-text flex-grow-1 mb-0"><strong>Equipment: </strong>{equipment.model}</p>
                    <p className="card-text flex-grow-1 mb-2"><strong>Serial Number: </strong>{equipment.serial_number}</p>
                </div>

                {/* <hr></hr>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center">
                    <p className="card-text mb-0 me-2"><strong>Employees assigned:</strong></p>
                    <div>
                        {data.employees_assigned.map((employee) => { return (<span key={'employee' + employee.id} className="badge text-bg-info me-1">{employee.label}</span>) })}
                    </div>
                </div> */}


                <hr></hr>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center">
                    <h6 className="card-text mb-0 me-2"><strong>Vehicle assigned:</strong></h6>
                    <div>
                        <span className="badge text-bg-info me-1">{vehicleAssigned.label}</span>
                    </div>
                </div>

                {/* BUTTON TO SET TICKET TO 'IN PROGRESS' STATE*/}
                {ticket.status === 'Opened' ? <>
                    <hr></hr>
                    <div className="mt-3">
                        <button type="button"
                            className="btn btn-primary shadow-sm fw-medium btn-sm w-100"
                            onClick={() => handleBtnSetTicketStatus(ticket.id, 'In Progress')}
                        >»» Start Assistance »»</button>
                    </div></>
                    : null
                }

                {/* BUTTON MULTIFUNCTION: OPEN TICKET REPORT*/}
                {ticket.status === 'In Progress' ? <>
                    <hr></hr>
                    <div className="mt-3">
                        <button type="button"
                            className="btn btn-success shadow-sm fw-medium btn-sm w-100"
                            onClick={() => handleTicketAssistance()}
                        >»» Open Ticket Report »»</button>
                    </div></>
                    : null
                }
            </div>
            <div className="card-footer text-body-secondary d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <h6 className="card-subtitle text-body-secondary col-sm-3">Ticket #{ticket.id}</h6>
                <div className="vr d-none d-sm-inline-block"></div>
                <h6 className="card-subtitle text-body-secondary text-center col-sm-3">{ticket.intervention_type ? 'Assistance' : 'Maintenance'}</h6>
                <div className="vr d-none d-sm-inline-block"></div>
                <h6 className="card-text col-sm-3">{ticket.open_ticket_time}</h6>
            </div>
        </div>
    );
}