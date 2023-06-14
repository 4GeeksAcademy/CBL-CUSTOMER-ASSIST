import React, { useState, useContext, useEffect } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Context } from "../../store/appContext";
import { EquipmentList } from "../../component/equipment_list_card";

export const CustomerEquipmentList = () => {
    const { store, actions } = useContext(Context)
    const [equipment, setEquipment] = useState(store.equipmentList);
    const [equipmentOptions] = useState(store.equipmentList);
    const [equipmentVar, setEquipmentVar] = useState([])
    const [getTicket, setGetTicket] = useState(store.tickets)
    const [find, setFind] = useState([{}])

    useEffect(() => {
        if (Object.keys(equipment).length === 0) setEquipmentVar(equipmentOptions)
        else setEquipmentVar(equipment)
        console.log("------------------->" + equipmentVar)
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
                        {equipmentVar > 0 ? Object.values(equipmentVar).map((item, i) => {
                            return <EquipmentList key={i} data={item} />
                        }) : <p>No equipment listed</p>}




                    </div>
                </div>
            </div>
        </div>
    );
};