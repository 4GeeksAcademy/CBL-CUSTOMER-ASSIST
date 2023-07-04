import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import {TicketStatus} from '../constants/ticket_status'

export const TicketSmallCustomer = (props) => {
    const { actions, store } = useContext(Context);
    const data = props.data;

    const assignedEmployees = data.employees_assigned;
    const assignedVehicle = Object.keys(data.vehicle_assigned).length > 0 ? data.vehicle_assigned : null;

    // <<<<<<<<<<<<<<< COMMIT FROM BEN 
    const [filteredEquipment, setFilteredEquipment] = useState([])
    const knowledgeArray = filteredEquipment.length > 0 ? filteredEquipment[0].knowledge : [];

    useEffect(() => {
        setFilteredEquipment(store.tickets.filter(obj => obj.equipment.id === data.equipment.id));
    }, [])

    const handleModal = () => {
        actions.updateShowModal(data.subject, data.description, knowledgeArray);
    }
    // <<<<<<<<<<<<<<<

    const toast = (title, data) => actions.userToastAlert(title, data);

    return (
        <div className="card w-100 mb-3">
            <div className="card-header">
                <div className="d-flex flex-row justify-content-between">
                    <div className="btn p-0"><h5 className="card-title" onClick={handleModal}>{data.subject}</h5></div>
                    <p className={`badge text-bg-${data.status === 'New' ? TicketStatus.NEW
                    : data.status === 'Opened' ? TicketStatus.OPENED
                        : data.status === 'In Progress' ? TicketStatus.IN_PROGRESS
                            : data.status === 'Resolved' ? TicketStatus.RESOLVED
                                : TicketStatus.CLOSED}`}
                        role="alert">{data.status}
                    </p>
                </div>
            </div>
            <div className="card-body">
                <div className="d-flex flex-column">
                    <p className="card-text flex-grow-1 mb-0"><strong>Customer: </strong>{data.company_name}</p>
                    <p className="card-text flex-grow-1 mb-0"><strong>Equipment: </strong>{data.equipment.model}</p>
                    <p className="card-text flex-grow-1 mb-2"><strong>Serial Number: </strong>{data.equipment.serial_number}</p>
                </div>
            </div>
            <div className="card-footer text-body-secondary d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <h6 className="card-subtitle text-body-secondary">Ticket #{data.id}</h6>
                <h6 className="card-subtitle text-body-secondary text-center">{data.intervention_type ? 'Assistance' : 'Maintenance'}</h6>
                <h6 className="card-text">{data.open_ticket_time}</h6>
            </div>
        </div>
    );
}