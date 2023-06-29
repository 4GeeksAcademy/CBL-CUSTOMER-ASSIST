import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Buffer } from "buffer";

export const KnowledgeAssistanceReport = (props) => {
    const { store, actions } = useContext(Context);
    const ticketStage = store.ticketStage;
    const categoryOptions = props.categoryOptions;
    const knowledges = props.knowledges;
    const customerInfo = props.customerInfo;
    const animatedComponents = makeAnimated();
    const [knowledgeFilter, setKnowledgeFilter] = useState([]);
    const [actionsTaken, setActionsTaken] = useState([]);
    const [editObservations, setEditObservations] = useState(false);
    const [observationsValue, setObservationsValue] = useState("");
    const [enableCloseReportButton, setEnableCloseReportButton] = useState(false);
    const [customerUserPassword, setCustomerUserPassword] = useState("");

    useEffect(() => {
        (actionsTaken.length > 0 || observationsValue.length > 0) && !editObservations ? setEnableCloseReportButton(true) : setEnableCloseReportButton(false);
    }, [actionsTaken, observationsValue])

    const handleFilters = (options) => {
        const filter = options.map((opt) => opt.value);
        setKnowledgeFilter(filter);
    }

    const handleAddKnowledgeToReport = (knowledge) => {
        if (!actionsTaken.includes(knowledge)) setActionsTaken(actionsTaken => [...actionsTaken, knowledge]);
    }

    const handleEditObservations = () => {
        setEditObservations(!editObservations);
        enableCloseReportButton ? setEnableCloseReportButton(!enableCloseReportButton)
            : !enableCloseReportButton && actionsTaken.length > 0 || observationsValue.length > 0 ? setEnableCloseReportButton(!enableCloseReportButton)
                : setEnableCloseReportButton(false);
    }

    const handleObservationsValue = (value) => {
        setObservationsValue(value)
    }

    const handleCloseReport = () => {
        actions.setTicketStage(4);
    }

    const handleCustomerReportAproval = () => {
        const encodedString = Buffer.from(customerUserPassword).toString('base64');
        encodedString === customerInfo.authentication.password ? actions.setTicketStage(5) : console.log('Not aproved!');
    }

    return (
        <div className="mb-3">
            <h4 className="border-bottom">Assistance Report</h4>

            {/* MULTISELECT CATEGORIES */}
            <div className="d-flex mb-3">
                <div
                    className="input-group-text rounded-end-0"
                    style={{ background: "var(--bs-primary-bg-subtle)", color: "var(--bs-primary-text-emphasis)", borderColor: "var(--bs-primary-border-subtle)" }}>
                    Knowledge base
                </div>
                <Select
                    className="react-select-container w-100"
                    placeholder="Select categories..."
                    id="selectCategories"
                    closeMenuOnSelect={false}
                    blurInputOnSelect={false}
                    components={animatedComponents}
                    isDisabled={ticketStage >= 5}
                    // defaultValue={[categoryOptions[0]]}
                    isMulti
                    options={categoryOptions}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            // borderColor: state.isFocused ? 'grey' : 'var(--bs-primary-border-subtle)',
                            borderColor: 'var(--bs-primary-border-subtle)',
                            borderRadius: '0 4px 4px 0'
                        }),
                    }}
                    onChange={(optionsSelected) => handleFilters(optionsSelected)}
                />
            </div>

            {/* FILTERED KNOWLEDGES */}
            <div>
                {knowledges.length > 0 ?
                    knowledges
                        .filter(knowledge => knowledgeFilter.includes(knowledge.category))
                        .map((knowledge) => {
                            return (
                                <ul className="list-group mb-3 shadow" key={knowledge.id}>

                                    {/* MALFUNCTION */}
                                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fw-medium p-1">
                                        Malfunction
                                        <span className="badge text-warning bg-dark rounded-pill">{knowledge.category}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fst-italic p-1">
                                        {knowledge.malfunction}
                                    </li>

                                    {/* SOLUTION */}
                                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fw-medium p-1">
                                        Solution
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fst-italic p-1">
                                        {knowledge.solution}
                                        <span
                                            className="btn badge text-bg-primary"
                                            onClick={() => handleAddKnowledgeToReport(knowledge)}
                                        >Add to report</span>
                                    </li>
                                </ul>
                            )
                        }) :
                    null
                }
            </div>

            {/* ACTIONS TAKEN: KNOWLEDGES ADDED TO REPORT */}
            {/* TODO: is there a way to do this below without having two actionsTaken.length? */}
            {/* Because the next line just needs to be rendered one time */}
            {actionsTaken.length > 0 ? <h6 className="border-bottom">Actions taken</h6> : ""}
            {actionsTaken.length > 0 ?
                actionsTaken.map((action, i) => {
                    return (
                        <ul className={`list-group mb-3 ${knowledgeFilter.length > 0 ? "opacity-50" : null}`} key={action.id}>

                            {/* MALFUNCTION */}
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fw-medium p-1">
                                Malfunction
                                <span className="badge text-warning bg-dark rounded-pill">{action.category}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fst-italic p-1">
                                {action.malfunction}
                            </li>

                            {/* SOLUTION */}
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fw-medium p-1">
                                Solution
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fst-italic p-1">
                                {action.solution}
                            </li>
                        </ul>
                    )
                }) :
                null
            }

            {/* OBSERVATIONS */}
            <div className="form-floating mb-1">
                <textarea className="form-control"
                    id="floatingTextarea"
                    placeholder="Leave a comment here"
                    style={{ minHeight: "500px" }}
                    disabled={!editObservations}
                    value={observationsValue}
                    onChange={(e) => handleObservationsValue(e.target.value)}
                ></textarea>
                <label htmlFor="floatingTextarea">Observations...</label>
            </div>

            {/* BUTTON EDIT OBSERVATIONS TEXTAREA */}
            {ticketStage === 3 ?
                <div className="form-check">
                    <input
                        className="form-check-input me-2"
                        checked={editObservations}
                        value={observationsValue}
                        onChange={() => handleEditObservations()}
                        type="checkbox"
                        id="editObservations"
                    />
                    <label className="form-check-label" htmlFor="editObservations">Edit Observations</label>
                </div> :
                null
            }

            {/* BUTTON CLOSE REPORT */}
            {ticketStage === 3 ?
                <button type="button" className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#actionsTakenAndObservationsReportConfirmation"
                    style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}
                    disabled={!enableCloseReportButton}>
                    Close Report
                </button> :
                null
            }

            {/* BUTTON CUSTOMER APROVAL */}
            {ticketStage === 4 ?
                <button type="button" className="btn btn-success"
                    data-bs-toggle="modal" data-bs-target="#customerReportAproval"
                    style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}>
                    Customer Aproval
                </button> :
                null
            }

            {/* MODAL TO CONFIRM ACTIONS TAKEN AND OBSERVATIONS BY TECHNICIAN/ENGINEER */}
            <div className="modal fade" id="actionsTakenAndObservationsReportConfirmation" tabIndex="-1" aria-labelledby="customerReportAprovalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="customerReportAprovalLabel">Customer Assistance Report Aproval Authentication</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Have all actions taken and notes been added to the report?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={() => handleCloseReport()}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL FOR CUSTOMER REPORT APROVAL */}
            <div className="modal fade" id="customerReportAproval" tabIndex="-1" aria-labelledby="actionsTakenAndObservationsReportConfirmationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="actionsTakenAndObservationsReportConfirmationLabel">Actions taken in Report</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* CUSTOMER USER EMAIL */}
                            <div className="form-floating mb-3">
                                <input type="email"
                                    className="form-control"
                                    id="customerUserEmail"
                                    placeholder="name@example.com"
                                    value={customerInfo.authentication.user_email}
                                    disabled
                                />
                                <label htmlFor="customerUserEmail">Customer User Email</label>
                            </div>

                            {/* CUSTOMER USER PASSWORD */}
                            <div className="form-floating">
                                <input type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={customerUserPassword}
                                    onChange={(e) => setCustomerUserPassword(e.target.value)}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick={() => handleCustomerReportAproval()}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}