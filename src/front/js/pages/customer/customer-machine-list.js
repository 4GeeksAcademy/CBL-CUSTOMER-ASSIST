import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';

export const CustomerMachineList = () => {
    const navigate = useNavigate();
    const [machine, setMachine] = useState({})
    const [search, setSearch] = useState(null)
    const machineData = [{ Machine: 'A Machine 1', Name: "Smasher", id: 1 }, { Machine: 'B Machine 2', Name: "Braker", id: 2 }, { Machine: 'C Machine 3', Name: "Cutter", id: 3 }, { Machine: 'Z Machine 3', Name: "Slicer", id: 4 }];
    const [machineOptions, setMachineOptions] = useState(machineData);


    // useEffect(() => {

    // }, [search])


    const fetchMachine = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/${id}");
        if (response.ok) {
            const data = await response.json();
            setMachine(data)
        } else {
            console.error('Error:', response.status);
        }
    }

    const saveMachine = (selected) => {
        const selectedMachine = selected.map((select) => select.Machine);
        setMachine(selectedMachine)

    }


    return (
        <div className="container">
            <div className="border-bottom mb-4 mt-3">
                <h1>Machine List</h1>
            </div>

            <div>
                <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">

                    <h5 className="me-3 mt-2">Machine:</h5>
                    <Multiselect options={machineOptions} displayValue="Machine" placeholder="Select machine"
                        onSelect={saveMachine} onRemove={saveMachine} />
                </div>
            </div>
            <div className="d-flex">

                <div className="me-3"><h5>Description:</h5></div>

                <div className="border rounded p-4 flex-fill">
                    <ul>
                        {machine && Object.entries(machine).map(([key, value]) => (
                            <li key={key}>
                                {key}: {value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </div>

    )
};