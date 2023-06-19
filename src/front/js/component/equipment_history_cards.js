import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";


export const EquipmentHistoryCard = (props) => {
    
    const data = props.data;
    const myModal = document.querySelector('#modalTicketInfo');

    return (
        <div className="card w-100 mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="text-start">
                    <h5 className="card-text">Model: {data.model}</h5>
                    <p className="card-text">Serial Number: {data.serial_number} </p>
                </div>
                <div className="text-end">
                    <p className="card-text">ID: {data.id}</p>
                    <p className="card-text">IM109: {data.im109}</p>
                </div>
            </div>
            <Link to={'/customer/equipment/history'} style={{ textDecoration: 'none' }}>
                <div className="card-footer text-body-secondary d-flex justify-content-center btn btn-secondary border border-0 border-top">
                    <h6 className="card-subtitle my-1 text-body-secondary">View Description</h6>
                </div>
            </Link>
        </div>         
    );
}