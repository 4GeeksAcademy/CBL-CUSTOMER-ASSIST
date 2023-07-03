import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export const TicketSmall = (props) => {
    const { actions, store } = useContext(Context);
    const data = props.data;
    const availableEmployees = props.availableEmployees;
    const isDisabledStatus = ['Resolved', 'Closed'];
    const isDisabled = isDisabledStatus.includes(data.status) ? true : false;
    const animatedComponents = makeAnimated();
    const [selectedEmployeeIDs, setSelectedEmployeeIDs] = useState(data.employees_assigned);
    const [assignedEmployees, setAssignedEmployees] = useState(data.employees_assigned);
    // 
    const [filteredEquipment, setFilteredEquipment] = useState([])
    const knowledgeArray = filteredEquipment.length > 0 ? filteredEquipment[0].knowledge : [];

    useEffect(() => {
        setFilteredEquipment(store.tickets.filter(obj => obj.equipment.id === data.equipment.id));
    }, [])

    const handleModal = () => {
        actions.updateShowModal(data.subject, data.description, knowledgeArray);
    }
    //   


    const toast = (data) => actions.userToastAlert("Employee assignment", data);

    const handleAssignEmployeeToTicket = async (employee) => {
        const ticketID = data.id;
        const oldEmployees = selectedEmployeeIDs;

        // get employee to dismiss
        const employeeToAssign = employee.filter(item => !(oldEmployees.some((e) => e.id === item.id)));

        // get employee id
        const employeeID = employeeToAssign.map(employee => employee.id);

        const response = await actions.assignEmployeeToTicket(employeeID, ticketID);
        if (response[0] === 200) {
            toast(`Assigned ${employeeToAssign[0].label} to ticket number ${ticketID}`);
            setSelectedEmployeeIDs(employee);
            updateEmployeesAssignedStoreSessionStorage(employee);
        }
        else {
            alert(response[1]);
        }
    }

    const handleDismissEmployeeFromTicket = async (employee) => {
        const ticketID = data.id;
        const oldEmployees = selectedEmployeeIDs;

        // get the employee to dismiss
        const employeeToDismiss = oldEmployees.filter(item => !(employee.some((e) => e.id === item.id)));

        // get employee id
        const employeeID = employeeToDismiss.map(employee => employee.id);

        const response = await actions.dismissEmployeeFromTicket(employeeID, ticketID);
        if (response[0] === 200) {
            toast(`Dismissed ${employeeToDismiss[0].label} from ticket number ${ticketID}`);
            setSelectedEmployeeIDs(employee);
            updateEmployeesAssignedStoreSessionStorage(employee);
        }
        else {
            alert(response[1]);
        }
    }

    const updateEmployeesAssignedStoreSessionStorage = (employees) => {
        const newTickets = [...store.tickets];

        // updates employees_assigned in ticket  
        newTickets.map((ticket) => { if (ticket.id == data.id) ticket.employees_assigned = employees });

        // update available_employees
        actions.getAvailableEmployees();

        // updates store and sessionStorage tickets
        actions.sessionStorageAndSetStoreDataSave("tickets", newTickets);
    }

    const handleAssignVehicleToTicket = (vehicles) => {
        toast('Assign Vehicle');
    }

    const handleDismissVehicleFromTicket = (vehicles) => {
        toast('Dismiss Vehicle');

    }

    return (
        <div className="card w-100 mb-3">
            <div className="card-header">
                <div className="d-flex flex-row justify-content-between">
                    <div className="btn p-0"><h5 className="card-title" onClick={handleModal}>{data.subject}</h5></div>
                    <p className={`badge text-bg-${data.status === 'Opened' ? 'danger' : data.status === 'In Progress' ? 'warning' : data.status === 'Resolved' ? 'success' : 'secondary'}`} role="alert">{data.status}</p>
                </div>
            </div>
            <div className="card-body">
                <div className="d-flex flex-column">
                    <p className="card-text flex-grow-1 mb-0"><strong>Customer: </strong>{data.company_name}</p>
                    <p className="card-text flex-grow-1 mb-0"><strong>Equipment: </strong>{data.equipment.model}</p>
                    <p className="card-text flex-grow-1 mb-2"><strong>Serial Number: </strong>{data.equipment.serial_number}</p>
                </div>

                <div>
                    {/* SELECT ONLY DISPLAYS WITH ADMIN */}
                    {props.userType === "admin"
                        ? (
                            <div className="d-flex flex-column mb-3">
                                <hr></hr>

                                {/* ASSIGN VEHICLES */}
                                <div className="d-flex flex-column">
                                    <h6>Assign Vehicle</h6>
                                    <Select
                                        className="basic-single mb-2"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        isDisabled={isDisabled}
                                        components={animatedComponents}
                                        // defaultValue={}
                                        // options={}
                                        isMulti
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                            }),
                                        }}
                                        onChange={(newValue, actionMeta) => {
                                            if (actionMeta.action === 'select-option') handleAssignVehicleToTicket(newValue);
                                            if (actionMeta.action === 'remove-value' || actionMeta.action === 'pop-value') handleDismissVehicleFromTicket(newValue);
                                        }}
                                    />
                                </div>
                                {/* ASSIGN TECHNICIAN/ENGINEER */}
                                <div className="d-flex flex-column">
                                    <h6>Assign Technician/Engineer</h6>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={assignedEmployees}
                                        isSearchable={false}
                                        options={availableEmployees}
                                        components={animatedComponents}
                                        isDisabled={isDisabled}
                                        isClearable={false}
                                        isMulti
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                            }),
                                        }}
                                        onChange={(newValue, actionMeta) => {
                                            if (actionMeta.action === 'select-option') handleAssignEmployeeToTicket(newValue);
                                            if (actionMeta.action === 'remove-value' || actionMeta.action === 'pop-value') handleDismissEmployeeFromTicket(newValue);
                                        }}
                                    />
                                </div>
                            </div>
                        )
                        : <p>-------</p>
                    }
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