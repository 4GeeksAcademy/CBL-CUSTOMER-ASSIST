import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { TicketStatusColor } from '../constants/ticket_status_color'

export const TicketSmallCustomer = (props) => {
    const { actions, store } = useContext(Context);
    const data = props.data;

    // TODO: verify use
    const assignedEmployees = data.employees_assigned;
    const assignedVehicle = Object.keys(data.vehicle_assigned).length > 0 ? data.vehicle_assigned : null;

    const [filteredEquipment, setFilteredEquipment] = useState([])
    const knowledgeArray = filteredEquipment.length > 0 ? filteredEquipment[0].knowledge : [];

    useEffect(() => {
        setFilteredEquipment(store.tickets.filter(obj => obj.equipment.id === data.equipment.id));
    }, [])

    const handleModal = () => {
        actions.updateShowModal(data.subject, data.description, knowledgeArray);
    }

    const toast = (title, data) => actions.userToastAlert(title, data);

    const handleStatusColor = (status) => {
        if (status === "New") return TicketStatusColor.NEW;
        if (status === "Opened") return TicketStatusColor.OPENED;
        if (status === "In Progress") return TicketStatusColor.IN_PROGRESS;
        if (status === "Resolved") return TicketStatusColor.RESOLVED;
        if (status === "Closed") return TicketStatusColor.CLOSED;
    }

    return (
        <div className="card w-100 mb-5"
            style={{
                borderColor: handleStatusColor(data.status),
            }}>
            <div className="card-header btn text-white"
                style={{
                    backgroundColor: handleStatusColor(data.status),
                }}
                onClick={handleModal}>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="text-start flex-grow-1 p-0">
                        <h5 className="card-title  m-0">{data.subject}</h5>
                    </div>
                    <p className="badge m-0  text-warning bg-dark"
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
            <div className="card-footer d-flex flex-column flex-sm-row align-items-center justify-content-between text-white"
                style={{
                    backgroundColor: handleStatusColor(data.status),
                }}>
                <h6 className="card-subtitle col-sm-3">Ticket #{data.id}</h6>
                <div className="vr d-none d-sm-inline-block"></div>
                <h6 className="card-subtitle text-center col-sm-3">{data.intervention_type ? 'Assistance' : 'Maintenance'}</h6>
                <div className="vr d-none d-sm-inline-block"></div>
                <h6 className="card-text col-sm-3">{data.open_ticket_time}</h6>
            </div>
        </div>
    );
}