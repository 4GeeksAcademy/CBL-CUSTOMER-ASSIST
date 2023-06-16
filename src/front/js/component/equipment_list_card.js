import React from "react";

export const EquipmentList = (props) => {
    const data = props.data;
    const myModal = document.querySelector('#modalTicketInfo');

    return (
        <div className="card w-100 mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="text-start">
                    <h5 className="card-title">{data.subject}</h5>
                    <p className="card-text">Model: {data.model}</p>
                    <p className="card-text">Serial Number: {data.serial_number} </p>
                    <p className="card-text">ID: {data.id}</p>
                    <p className="card-text">IM109: {data.im109}</p>
                    <p className="card-text">History:{}</p>
                    
                </div>
                <div className="text-end">
                    <p className={`badge text-bg-${data.status === 'Opened'?'danger':data.status==='In Progress'?'warning':data.status==='Resolved'?'success':'secondary'}`} role="alert">{data.status}</p>
                    
                    {/* SELECT ONLY DISPLAYS WITH ADMIN */}
                    {/* {props.userType === "admin"
                    ?(<select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option defaultValue={true}>Assign tech/eng</option>
                        {employees.map((item, i) => {
                            return <option key={i}>{item.first_name + ' ' + item.last_name}</option>
                        })}    
                    </select>
                    )
                    :<p>-------</p>        
                    } */}
                    
                    <p className="card-text">{}</p>
                </div>
            </div>
            <div className="card-footer text-body-secondary d-flex justify-content-between">
                <div>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{}</h6>
                </div>
                <div>
                    <p className="card-text">{}</p>
                </div>
            </div>
        </div>
    );
}