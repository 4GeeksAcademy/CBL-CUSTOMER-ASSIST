import React, { useContext } from "react";
import { Context } from "../../store/appContext";

export const ModalEquipmentHistory = () => {
    const { store, actions } = useContext(Context);
    const data = store.assignedTicket.equipment.knowledge;

    return (
        <div>
            {/* MODAL EQUIPMENT HISTORY*/}
            <div id="modalEquipmentHistory" className="modal fade modal-fullscreen" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Equipment History</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {data.length > 0 ?
                                data.map((item) => {
                                    return (
                                        <ul className="list-group mb-3" key={item.id}>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                                                Malfunction {item.malfunction.id}
                                                <span className="badge text-warning bg-dark rounded-pill">{item.category.description}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                                                {item.malfunction.description}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                                                Solution {item.solution.id}
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                                                {item.solution.description}
                                            </li>
                                        </ul>
                                    )
                                }) :
                                <div>No historical available for this equipment!</div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


