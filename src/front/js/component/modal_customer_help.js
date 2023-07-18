import React, { useContext } from "react";
import { Context } from "../../store/appContext";

export const ModalCustomerHelp = () => {
    const { store, actions } = useContext(Context);
    const data = store.assignedTicket.equipment.knowledge;
// Component for models helps can delete
    return (
        <div>
            
            <div id="modalCustomerHelp" className="modal fade modal-fullscreen" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Help</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Map data or display info */}
                            <img/>
                            <img/>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


