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

    const toast = (data) => actions.userToastAlert("Employee assignment", data);

    const handleModal = () => {
        console.log(data);
        // actions.updateShowModal(data.subject, data.description);
    }

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



    return (
        <div className="card w-100 mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="text-start">
                    <div className="btn p-0"><h5 className="card-title" onClick={handleModal}>{data.subject}</h5></div>
                    <p className="card-text">{data.equipment.model}</p>
                    <p className="card-text">{data.equipment.serial_number}</p>
                    {/* <p className="card-text">{data.company_name}</p> */}

                </div>
                <div className="text-end">
                    <p className={`badge text-bg-${data.status === 'Opened' ? 'danger' : data.status === 'In Progress' ? 'warning' : data.status === 'Resolved' ? 'success' : 'secondary'}`} role="alert">{data.status}</p>

                    {/* SELECT ONLY DISPLAYS WITH ADMIN */}
                    {props.userType === "admin"
                        ? (
                            <div className="d-flex mb-3">

                                {/* ASSIGN TECHNICIAN/ENGINEER */}
                                <div
                                    className="input-group-text rounded-end-0"
                                    style={{ background: "var(--bs-primary-bg-subtle)", color: "var(--bs-primary-text-emphasis)", borderColor: "var(--bs-primary-border-subtle)" }}>
                                    Assign Tech/Eng.
                                </div>
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
                                            // borderColor: state.isFocused ? 'grey' : 'var(--bs-primary-border-subtle)',
                                            borderColor: 'var(--bs-primary-border-subtle)',
                                            borderRadius: '0 4px 4px 0',
                                            minWidth: '225px'
                                        }),
                                    }}
                                    onChange={(newValue, actionMeta) => {
                                        if (actionMeta.action === 'select-option') handleAssignEmployeeToTicket(newValue);
                                        if (actionMeta.action === 'remove-value' || actionMeta.action === 'pop-value') handleDismissEmployeeFromTicket(newValue);
                                    }}
                                />
                            </div>
                        )
                        : <p>-------</p>
                    }
                    <p className="card-text">{data.intervention_type ? 'Assistance' : 'Maintenance'}</p>
                </div>
            </div>
            <div className="card-footer text-body-secondary d-flex align-items-center justify-content-between">
                <div>
                    <h6 className="card-subtitle text-body-secondary">{data.company_name}</h6>
                </div>
                <div>
                    <p className="card-text">{data.open_ticket_time}</p>
                </div>
            </div>
        </div>
    );
}