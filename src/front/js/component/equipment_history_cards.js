import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";


export const EquipmentHistoryCard = (props) => {
    const [button, setButton] = useState(true)

    const data = props.data;
    // const myModal = document.querySelector('#modalTicketInfo');
    const solutions = data.knowledge
    
    return (
        <div className="card w-100 mb-3 shadow rounded">
            <div className="card-body d-flex justify-content-between ">
                <div className="text-start">
                    <h5 className="card-text">Ticket ID: {data.id}</h5>
                    <p className="card-text">Subject: {data.subject} </p>
                </div>
                <div className="text-end">
                    <p className="card-text">Equipment ID: {data.equipment.id}</p>
                    <p className="card-text">IM109: {data.equipment.im109}</p>
                </div>
            </div>
            <div className="d-flex justify-content-center btn-group" role="group">
                <div data-bs-target={"#exampleModal" + data.id} data-bs-toggle="modal" className=" border-end card-footer text-body-secondary d-flex justify-content-center btn btn-secondary border border-0 border-top" onClick={
                    () => setButton(true)
                }>
                    <h6 className="card-subtitle my-1 text-body-secondary">View Description</h6>
                </div>
                <div data-bs-target={"#exampleModal" + data.id} data-bs-toggle="modal" className="card-footer text-body-secondary d-flex justify-content-center btn btn-secondary border border-0 border-top" onClick={
                    () => setButton(false)
                }>
                    <h6 className="card-subtitle my-1 text-body-secondary">View Solution</h6>
                </div>
            </div>
            <div className="modal fade" id={"exampleModal" + data.id} tabIndex="-1" aria-labelledby={"exampleModalLabel" + data.id} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={"exampleModalLabel" + data.id}>{button ? <div className="fs-3">Description</div> : <div className="fs-3">Solution</div>}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {button ? data.description :  solutions.length > 0 ? solutions.map((item, index) => {
                                return ( 
                                    <ul className="list-group mb-3 shadow-sm" key={item.id}>
                                        <li className="list-group-item d-flex text-danger fw-semibold justify-content-between align-items-center list-group-item-secondary">
                                            Malfunction {item.malfunction.id}
                                            <span className="badge text-warning bg-dark rounded-pill">{item.category.description}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center list-group-item">
                                            {item.malfunction.description}
                                        </li>   
                                        <li className="list-group-item d-flex text-success fw-semibold justify-content-between align-items-center list-group-item">
                                            Solution {item.solution.id}
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center list-group-item">
                                            {item.solution.description}  
                                        </li>
                                    </ul>
                                );
                            }) :
                            (
                            <div>No solution history for this equipment..</div>
                            )
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}