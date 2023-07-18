import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { TicketStatusColor } from '../constants/ticket_status_color';
import { useNavigate } from "react-router-dom";

export const TicketSmall = (props) => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const data = props.data;
    const ticketID = data.id;
    const isDisabledStatus = ['New'];
    const isDisabledProcessingTicket = ['Resolved']
    const isDisabled = !isDisabledStatus.includes(data.status) ? true : false;
    const animatedComponents = makeAnimated();

    const availableEmployees = props.availableEmployees;
    const assignedEmployees = data.employees_assigned;
    const [selectedEmployees, setSelectedEmployees] = useState(data.employees_assigned);

    const assignedVehicle = Object.keys(data.vehicle_assigned).length > 0 ? data.vehicle_assigned : null;
    const [availableVehicles, setAvailableVehicles]
        = useState(props.availableVehicles.length > 0 ? props.availableVehicles
            : Object.keys(data.vehicle_assigned).length > 0 ? [data.vehicle_assigned]
                : null);
    const [selectedVehicle, setSelectedVehicle] = useState(data.vehicle_assigned);
    const [vehicleIsDisabled, setVehicleIsDisabled] = useState(isDisabled);

    const [btnOpenTicketDisabled, setBtnOpenTicketDisabled] = useState(true);

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

    // handling assign vehicles disabled state
    useEffect(() => {
        if (props.availableVehicles.length > 0) {
            setAvailableVehicles(props.availableVehicles);
            setVehicleIsDisabled(false);
        }
        if (props.availableVehicles.length === 0) setAvailableVehicles([selectedVehicle]);
        if (props.availableVehicles.length === 0 && Object.keys(data.vehicle_assigned).length === 0 && Object.keys(selectedVehicle).length === 0) setVehicleIsDisabled(true);
    }, [props.availableVehicles])

    // handling button to Open Ticket disabled state
    useEffect(() => {
        const conditions = !!(Object.keys(selectedVehicle).length > 0 && selectedEmployees.length > 0);
        conditions ? setBtnOpenTicketDisabled(false) : setBtnOpenTicketDisabled(true)
    }, [selectedVehicle, selectedEmployees])

    const toast = (title, data) => actions.userToastAlert(title, data);

    const handleAssignEmployeeToTicket = async (employee) => {
        const oldEmployees = selectedEmployees;

        // get employee to assign
        const employeeToAssign = employee.filter(item => !(oldEmployees.some((e) => e.id === item.id)));

        // get employee id
        const employeeID = employeeToAssign.map(employee => employee.id);

        const response = await actions.assignEmployeeToTicket(employeeID, ticketID);
        if (response[0] === 200) {
            toast('Employee assign', `Assigned ${employeeToAssign[0].label} to ticket number ${ticketID}`);
            setSelectedEmployees(employee);
            updateEmployeesAssignedStoreSessionStorage(employee);
        }
        else {
            alert(response[1]);
        }
    }

    const handleDismissEmployeeFromTicket = async (employee) => {
        const oldEmployees = selectedEmployees;

        // get the employee to dismiss
        const employeeToDismiss = oldEmployees.filter(item => !(employee.some((e) => e.id === item.id)));

        // get employee id
        const employeeID = employeeToDismiss.map(employee => employee.id);

        const response = await actions.dismissEmployeeFromTicket(employeeID, ticketID);
        if (response[0] === 200) {
            toast('Employee dismiss', `Dismissed ${employeeToDismiss[0].label} from ticket number ${ticketID}`);
            setSelectedEmployees(employee);
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

    const handleBtnSetTicketStatus = async (status) => {
        console.log('btnOpenTicket');
        const response = await actions.setTicketStatus(ticketID, status);

        if (response[0] === 200) {
            toast('Ticket Status', `Updated ticket number ${ticketID} to ${status}`);
            navigate("/admin/dashboard")
            // setSelectedVehicle(vehicle);
            // updateVehicleAssignedStoreSessionStorage(vehicle, ticketID);
        }
        else {
            toast('Warning', 'There was some problem trying to set ticket status.');
        }
    }

    const handleProcessTicket = async () => {
        await actions.startProcessTicket(data);
        navigate("/admin/process/ticket")
    }

    return (
        <div className="card w-100 mb-3">
            <div className="card-header btn btn-light" onClick={handleModal}>
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="text-start flex-grow-1 p-0">
                        <h5 className="card-title m-0">{data.subject}</h5>
                    </div>
                    <p className={`badge m-0 text-bg-${data.status === 'New' ? TicketStatusColor.NEW
                        : data.status === 'Opened' ? TicketStatusColor.OPENED
                            : data.status === 'In Progress' ? TicketStatusColor.IN_PROGRESS
                                : data.status === 'Resolved' ? TicketStatusColor.RESOLVED
                                    : TicketStatusColor.CLOSED}`}
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

                <div>
                    <div className="d-flex flex-column mb-0">
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

                        {/* BUTTON TO SET TICKET TO 'OPEN' STATE */}
                        {isDisabledStatus.includes(data.status) ?
                            <div className="mt-3">
                                <button type="button"
                                    className={`btn ${btnOpenTicketDisabled ? 'btn-light text-body-tertiary' : 'btn-warning shadow-sm fw-medium'} btn-sm w-100`}
                                    disabled={btnOpenTicketDisabled}
                                    onClick={() => handleBtnSetTicketStatus('Opened')}
                                >»» Open ticket »»</button>
                            </div>
                            : null}

                        {/* BUTTON TO START PROCESSING TICKET */}
                        {isDisabledProcessingTicket.includes(data.status) ?
                            <div className="mt-3">
                                <button type="button"
                                    className={`btn btn-warning shadow-sm fw-medium btn-sm w-100`}
                                    onClick={() => handleProcessTicket()}
                                >»» Process ticket »»</button>
                            </div>
                            : null}
                    </div>
                </div>
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