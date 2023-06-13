import React, { useState, useContext, useEffect } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Context } from "../../store/appContext";

export const CustomerEquipmentList = () => {
    const { store, actions } = useContext(Context)
    const [equipment, setEquipment] = useState(store.equipmentList);
    const [equipmentOptions] = useState(store.equipmentList);
    const [equipmentVar, setEquipmentVar] = useState([])

    useEffect(() => {
        if (Object.keys(equipment).length === 0) setEquipmentVar(equipmentOptions)
        else setEquipmentVar(equipment)
    }, [equipment])

    const saveEquipment = (selected) => {
        const selectedEquipment = selected.map((select) => select);
        setEquipment(selectedEquipment);
    };

    return (
        <div className="container">
            <div className="border-bottom mb-4 mt-3">
                <h1>Equipment List</h1>
            </div>

            <div>
                <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">
                    <h5 className="me-3 mt-2">Equipment:</h5>
                    <Multiselect
                        options={equipmentOptions}
                        displayValue="model"
                        placeholder="Select equipment"
                        onSelect={saveEquipment}
                        onRemove={saveEquipment}
                    />
                </div>
            </div>

            <div className="d-flex">

                <div className="border rounded p-4 flex-fill">

                    <div>
                        {Object.values(equipmentVar).map((item, i) => (
                            <div key={i}>

                                <div className="accordion" id={`accordionPanelsStayOpenExample-${item.id}`}>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse-${item.id}`} aria-expanded="flase" aria-controls={`panelsStayOpen-collapse-${item.id}`}>
                                                <p> {item.model}</p>
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapse-${item.id}`} className="accordion-collapse collapse">
                                            <div className="accordion-body">
                                                <p>ID: {item.id}</p>
                                                <p>Serial Number: {item.serial_number}</p>
                                                <p>Model: {item.model} </p>
                                                <p>im109: {item.im109} </p>
                                                <p>Tickets: { } </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};