import React, { useState, useContext, useEffect } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Context } from "../../store/appContext";
import { EquipmentListCard } from "../../component/equipment_list_card";

export const CustomerEquipmentList = () => {
    const { store } = useContext(Context)
    const [equipmentSelected, setEquipmentSelected] = useState(store.equipmentList);
    const [equipmentVar, setEquipmentVar] = useState([])
    
    useEffect(() => {
        if (Object.keys(equipmentSelected).length === 0) setEquipmentVar(store.equipmentList)
        else setEquipmentVar(equipmentSelected)
        }, [equipmentSelected])
    
    useEffect(() => {
        const storedEquipmentVar = window.localStorage.getItem('equipmentVar');
        if (storedEquipmentVar) setEquipmentVar(JSON.parse(storedEquipmentVar))
        }, []);

      useEffect(() => {
        window.localStorage.setItem('equipmentVar', JSON.stringify(equipmentVar));
      }, [equipmentVar]);

      const saveEquipment = (selected) => {
        const selectedEquipment = selected.map((select) => select);
        setEquipmentSelected(selectedEquipment);
    };
    
    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <div className="border-bottom mb-4 mt-3">
                    <h1>Equipment List</h1>
                </div>
                <div>
                    <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">
                        <h5 className="me-3 mt-2">Equipment:</h5>
                        <Multiselect
                            options={store.equipmentList}
                            displayValue="model"
                            placeholder="Select equipment"
                            onSelect={saveEquipment}
                            onRemove={saveEquipment}
                        />
                    </div>
                </div>
                <div className="bd-content ">
                    <div className="border rounded p-4 flex-fill">
                        <div>{console.log(equipmentVar)}
                            {Object.values(equipmentVar).length > 0 ? equipmentVar.map((item, i) => {
                                return <EquipmentListCard key={i} data={item} />
                            }) : <span>No equipment found..</span>}
                        </div>
                   </div>
                </div>
            </div>
        </main>
    );
};
