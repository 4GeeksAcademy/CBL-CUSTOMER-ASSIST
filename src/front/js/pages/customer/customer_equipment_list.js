import React, { useState, useContext, useEffect } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Context } from "../../store/appContext";
import { EquipmentListCard } from "../../component/equipment_list_card";
import { PageTitle } from "../../component/page_title";
import { useLocation } from "react-router-dom";
import EquipmentIMG from "../../../assets/img/help_description/Equipment-IMG.png";
import EquipmentDescription from "../../../assets/img/help_description/Equipment-History-Google-Docs.png";

export const CustomerEquipmentList = () => {
    const { actions, store } = useContext(Context);
    const location = useLocation();
    const [equipmentSelected, setEquipmentSelected] = useState(store.equipmentList);
    const [equipmentVar, setEquipmentVar] = useState([]);

    useEffect(() => {
        if (Object.keys(equipmentSelected).length === 0) setEquipmentVar(store.equipmentList)
        else setEquipmentVar(equipmentSelected)
    }, [equipmentSelected])

    useEffect(() => {
        actions.getCustomerEquipment();
        const storedEquipmentVar = sessionStorage.getItem('equipmentVar');
        if (storedEquipmentVar) setEquipmentVar(JSON.parse(storedEquipmentVar))
    }, []);

    useEffect(() => {
        sessionStorage.setItem('equipmentVar', JSON.stringify(equipmentVar));
    }, [equipmentVar]);

    const saveEquipment = (selected) => {
        const selectedEquipment = selected.map((select) => select);
        setEquipmentSelected(selectedEquipment);
    };

    return (
        <main className="bd-main order-1">
            <div className="bd-intro border-bottom d-flex justify-content-end">
                {/* <h2>Equipment List</h2> */}
                {/* <div className="bd-intro">
                <PageTitle title={"Equipment List"} />
            </div> */}
                {/* <!-- Button trigger modal --> */}
                <div>
                    <strong typeof="button" className="bd-links-heading btn d-flex w-100 align-items-center fw-semibold" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i className="fa-solid fa-circle-question me-1" style={{ color: "blue" }}></i>Help
                    </strong>
                </div>
            </div>
            <div className="bd-content">
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
                        <div>
                            {Object.values(equipmentVar).length > 0 ? equipmentVar.map((item, i) => {
                                return <EquipmentListCard key={i} data={item} />
                            }) : <span>No equipment found..</span>}
                        </div>
                    </div>
                </div>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Equipment List Explained</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex">
                            <div >
                                <img className="p-2 me-4 border rounded-3" src={EquipmentDescription} />
                            </div>
                            <div >
                                <img className="border rounded-3" style={{ height: "620px", width: "1200px" }} src={EquipmentIMG} />
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
