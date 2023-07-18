import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const ProcessKnowledgeAssistanceReport = () => {
    const { store, actions } = useContext(Context);
    const actionsTaken = store.processTicket.knowledge;
    const ticketEmployee = store.processTicket.ticket_employee[0];

    return (
        <div className="mb-3">
            <h4 className="border-bottom">Assistance Report</h4>


            {/* ACTIONS TAKEN: KNOWLEDGES ADDED TO REPORT */}
            {/* TODO: is there a way to do this below without having two actionsTaken.length? */}
            {/* Because the next line just needs to be rendered one time */}
            {actionsTaken.length > 0 ? <h6 className="border-bottom">Actions taken</h6> : ""}
            {actionsTaken.length > 0 ?
                actionsTaken.map((action, i) => {
                    return (
                        <ul className="list-group mb-3" key={"ac" + i}>

                            {/* MALFUNCTION */}
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fw-medium p-1">
                                Malfunction
                                <span className="badge text-warning bg-dark rounded-pill">{action.category.description}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fst-italic p-1">
                                {action.malfunction.description}
                            </li>

                            {/* SOLUTION */}
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fw-medium p-1">
                                Solution
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fst-italic p-1">
                                {action.solution.description}
                            </li>
                        </ul>
                    )
                }) :
                null
            }

            {/* OBSERVATIONS */}
            {ticketEmployee.observations &&
            <div className="form-floating mb-1">
                <textarea className="form-control"
                    id="floatingTextarea"
                    placeholder="Leave a comment here"
                    style={{ minHeight: "500px" }}
                    disabled
                    value={ticketEmployee.observations}
                    ></textarea>
                <label htmlFor="floatingTextarea">Observations...</label>
            </div>
            }
        </div>
    );
}