import React, { useState } from "react";
import { Multiselect } from 'multiselect-react-dropdown';

export const CustomerMachineList = () => {

    const [machine, setMachine] = useState({});
    const [arrMachine, setArrMachine] = useState([]);

    const machineData = [
        { id: 1, name: 'Z Machine', age: 25 },
        { id: 2, name: 'B Mchine', age: 30 },
        { id: 3, name: 'K Machine', age: 35 },
    ];
    const [machineOptions] = useState(machineData);

    const saveMachine = (selected) => {
        const selectedMachine = selected.map((select) => select);
        setMachine(selectedMachine);
        console.log(machine);
    };

    return (
        <div className="container">
            <div className="border-bottom mb-4 mt-3">
                <h1>Machine List</h1>
            </div>

            <div>
                <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">
                    <h5 className="me-3 mt-2">Machine:</h5>
                    <Multiselect
                        options={machineOptions}
                        displayValue="name"
                        placeholder="Select machine"
                        onSelect={saveMachine}
                        onRemove={saveMachine}
                    />
                </div>
            </div>

            <div className="d-flex">
                <div className="me-3">
                    <h5>Description:</h5>
                </div>

                <div className="border rounded p-4 flex-fill">

                    <div>
                        {machine.length > 0 ? Object.values(machine).map((item, i) => (
                            <div key={i}>

                                <div className="accordion" id={`accordionPanelsStayOpenExample-${item.id}`}>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse-${item.id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse-${item.id}`}>
                                                <p> {item.name}</p>
                                            </button>
                                        </h2>
                                        <div id={`panelsStayOpen-collapse-${item.id}`} className="accordion-collapse collapse show">
                                            <div className="accordion-body">
                                                <p>Name: {item.name}</p>
                                                <p>Age: {item.age}</p>
                                                <p>ID: {item.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : ""}
                    </div>

                </div>
            </div>
        </div>
    );
};