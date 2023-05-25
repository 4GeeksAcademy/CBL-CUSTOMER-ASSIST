import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const MachineList = () => {
    const navigate = useNavigate();
    const [machine, setMachine] = useState(null)
    const [search, setSearch] = useState([])


    useEffect(() => {

    }, [search])


    const fetchMachine = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/${id}");
        if (response.ok) {
            const data = await response.json();
            setMachine(data)
        } else {
            console.error('Error:', response.status);
        }
    }

    return (
        <div className="container">
            <div className="border-bottom mb-4 mt-3">
                <h1>Machine List</h1>
            </div>

            <div>
                <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto d-flex ">

                    <input type="text" {/*onChange={search}*/} placeholder="Search object" />

                    <select id="inputState" className="form-select">
                        <option>Machines...</option>
                        <option>...</option>
                    </select>
                    {/* onChange={() => {
                       fetchMachine(id) 
                    }} /> */}
                </div>
            </div>
            <div className="d-flex">
                <div className="me-3"><h5>Description:</h5></div>
                <div className="border rounded p-5 flex-fill"></div>
                <ul>
                    {search.map((object) => (
                        <li key={object.id} onClick={() => fetchMachine(object)}>
                            {object.name}
                        </li>
                    ))}
                </ul>
            </div>


        </div>

    )
};