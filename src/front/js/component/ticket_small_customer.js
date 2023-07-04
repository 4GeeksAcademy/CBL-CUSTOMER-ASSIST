import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { TicketStatus } from '../constants/ticket_status'

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
            <div className="card-header btn btn-light" onClick={handleModal}>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="text-start flex-grow-1 p-0">
                        <h5 className="card-title  m-0">{data.subject}</h5>
                    </div>
                    <p className={`badge m-0 text-bg-${data.status === 'New' ? TicketStatus.NEW
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
                    {/* <p className="card-text flex-grow-1 mb-0"><strong>Customer: </strong>{data.company_name}</p> */}
                    <p className="card-text flex-grow-1 mb-0"><strong>Equipment: </strong>{data.equipment.model}</p>
                    <p className="card-text flex-grow-1 mb-2"><strong>Serial Number: </strong>{data.equipment.serial_number}</p>
                </div>

                {data.employees_assigned.length > 0 ? <>
                    <hr></hr>
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center">
                        <p className="card-text mb-0 me-2"><strong>Employees assigned:</strong></p>
                        <div>
                            {data.employees_assigned.map((employee) => { return (<span key={'employee' + employee.id} className="badge text-bg-info me-1">{employee.label}</span>) })}
                        </div>
                    </div></>
                    : null
                }

                {Object.keys(data.vehicle_assigned).length > 0 ? <>
                    <hr></hr>
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center">
                        <h6 className="card-text mb-0 me-2"><strong>Vehicle assigned:</strong></h6>
                        <div>
                            <span className="badge text-bg-info me-1">{data.vehicle_assigned.label}</span>
                        </div>
                    </div></>
                    : null
                }

            </div>
            <div className="card-footer text-body-secondary d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <h6 className="card-subtitle text-body-secondary col-sm-3">Ticket #{data.id}</h6>
                <div className="vr d-none d-sm-inline-block"></div>
                <h6 className="card-subtitle text-body-secondary text-center col-sm-3">{data.intervention_type ? 'Assistance' : 'Maintenance'}</h6>
                <div className="vr d-none d-sm-inline-block"></div>
                <h6 className="card-text col-sm-3">{data.open_ticket_time}</h6>
            </div>
        </div>
    );
}