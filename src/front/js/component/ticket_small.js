import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export const TicketSmall = (props) => {
    const { actions, store } = useContext(Context);
    const data = props.data;
    const isDisabledStatus = ['Resolved', 'Closed'];
    const isDisabled = isDisabledStatus.includes(data.status) ? true : false;
    const animatedComponents = makeAnimated();

    const availableEmployees = props.availableEmployees;
    const assignedEmployees = data.employees_assigned;
    const [selectedEmployeeIDs, setSelectedEmployeeIDs] = useState(data.employees_assigned);

    const assignedVehicle = Object.keys(data.vehicle_assigned).length > 0 ? data.vehicle_assigned : null;
    const [availableVehicles, setAvailableVehicles]
        = useState(props.availableVehicles.length > 0 ? props.availableVehicles
            : Object.keys(data.vehicle_assigned).length > 0 ? [data.vehicle_assigned]
                : null);
    const [selectedVehicle, setSelectedVehicle] = useState(data.vehicle_assigned);
    const [vehicleIsDisabled, setVehicleIsDisabled] = useState(isDisabled);

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

    useEffect(()=>{
        if (props.availableVehicles.length > 0) setAvailableVehicles(props.availableVehicles);
        if (props.availableVehicles.length === 0) setAvailableVehicles([selectedVehicle]);
        if (props.availableVehicles.length === 0 && Object.keys(data.vehicle_assigned).length === 0 && Object.keys(selectedVehicle).length === 0) setVehicleIsDisabled(true);
    }, [props.availableVehicles])

    const toast = (title, data) => actions.userToastAlert(title, data);

    const handleAssignEmployeeToTicket = async (employee) => {
        const ticketID = data.id;
        const oldEmployees = selectedEmployeeIDs;

        // get employee to assign
        const employeeToAssign = employee.filter(item => !(oldEmployees.some((e) => e.id === item.id)));

        // get employee id
        const employeeID = employeeToAssign.map(employee => employee.id);

        const response = await actions.assignEmployeeToTicket(employeeID, ticketID);
        if (response[0] === 200) {
            toast('Employee assign', `Assigned ${employeeToAssign[0].label} to ticket number ${ticketID}`);
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
            toast('Employee dismiss', `Dismissed ${employeeToDismiss[0].label} from ticket number ${ticketID}`);
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

    const handleAssignVehicleToTicket = async (vehicle) => {
        const ticketID = data.id;
        const newVehicleID = vehicle.id;
        const newVehicleLabel = vehicle.label;
        const dismissVehicleID = selectedVehicle.id ? selectedVehicle.id : false;

        // if there are no available vehicles, it will display the same vehicle
        // as option and it will not assign or dismiss
        if (newVehicleID === dismissVehicleID) {
            setSelectedVehicle(vehicle);
            return;
        }

        const response = await actions.assignVehicleToTicket(newVehicleID, dismissVehicleID, ticketID);
        if (response[0] === 200) {
            toast('Vehicle assign', `Assigned ${newVehicleLabel} to ticket number ${ticketID}`);
            setSelectedVehicle(vehicle);
            updateVehicleAssignedStoreSessionStorage(vehicle, ticketID);
        }
        else {
            alert(response[1]);
        }
    }

    const handleDismissVehicleFromTicket = async () => {
        const ticketID = data.id;
        const dismissVehicleID = selectedVehicle.id;
        const dismissVehicleLabel = selectedVehicle.label;

        const response = await actions.dismissVehicleFromTicket(dismissVehicleID, ticketID);
        if (response[0] === 200) {
            toast('Vehicle dismiss', `Dismissed ${dismissVehicleLabel} from ticket number ${ticketID}`);
            setSelectedVehicle({});
            updateVehicleAssignedStoreSessionStorage({}, ticketID);
        }
        else {
            alert(response[1]);
        }
    }

    const updateVehicleAssignedStoreSessionStorage = (vehicle, ticketID) => {
        const newTickets = [...store.tickets];

        console.log('update sessionStorage')

        // updates vehicle_assigned in ticket  
        newTickets.map((ticket) => { if (ticket.id == ticketID) ticket.vehicle_assigned = vehicle });

        // update global available_vehicles
        actions.getAvailableVehicles();

        // updates store and sessionStorage tickets
        actions.sessionStorageAndSetStoreDataSave("tickets", newTickets);
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
                                        id="assignVehicle"
                                        className="basic-single mb-2"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={true}
                                        isDisabled={isDisabled || vehicleIsDisabled}
                                        components={animatedComponents}
                                        options={availableVehicles}
                                        defaultValue={assignedVehicle}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                            }),
                                        }}
                                        onChange={(newValue, actionMeta) => {
                                            if (actionMeta.action === 'select-option') handleAssignVehicleToTicket(newValue);
                                            if (actionMeta.action === 'clear') handleDismissVehicleFromTicket();
                                        }}
                                    />
                                </div>
                                {/* ASSIGN TECHNICIAN/ENGINEER */}
                                <div className="d-flex flex-column">
                                    <h6>Assign Technician/Engineer</h6>
                                    <Select
                                        id="assignEmployee"
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        isDisabled={isDisabled}
                                        components={animatedComponents}
                                        options={availableEmployees}
                                        defaultValue={assignedEmployees}
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