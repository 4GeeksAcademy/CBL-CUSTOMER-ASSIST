import React from "react";

export const TicketSmall = (props) => {
    const data = props.data;
    const myModal = document.querySelector('#modalTicketInfo');

    const handleModal = () => {
        let modalTitle = document.querySelector('.modal-title');
        let modalBody = document.querySelector('.modal-body');

        modalTitle.innerHTML = data.subject;
        modalBody.innerHTML = data.description;

        new bootstrap.Modal(myModal).toggle();
    }

    const employees = [{
            "first_name": "Josh",
            "last_name": "Worly"
        },
        {
            "first_name": "Peter",
            "last_name": "Panic"
        },
        {
            "first_name": "Manuel",
            "last_name": "Mojito"
        }
    ];

    return (
        <div className="card w-100 mb-3">
            <div className="card-body d-flex justify-content-between">
                <div className="text-start">
                    <h5 className="card-title" onClick={handleModal}>{data.subject}</h5>
                    <p className="card-text">{data.equipment.model}</p>
                    <p className="card-text">{data.equipment.serial_number}</p>
                    {/* <p className="card-text">{data.company_name}</p> */}
                    
                </div>
                <div className="text-end">
                    <p className={`badge text-bg-${data.status === 'Opened'?'danger':data.status==='In Progress'?'warning':data.status==='Resolved'?'success':'secondary'}`} role="alert">{data.status}</p>
                    
                    {/* SELECT ONLY DISPLAYS WITH ADMIN */}
                    {props.userType === "admin"
                    ?(<select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option defaultValue={true}>Assign tech/eng</option>
                        {employees.map((item, i) => {
                            return <option key={i}>{item.first_name + ' ' + item.last_name}</option>
                        })}    
                    </select>
                    )
                    :<p>-------</p>
                    }
                    
                    <p className="card-text">{data.intervention_type?'Assistance':'Maintenance'}</p>
                </div>
            </div>
            <div className="card-footer text-body-secondary d-flex justify-content-between">
                <div>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{data.company_name}</h6>
                </div>
                <div>
                    <p className="card-text">{data.open_ticket_time}</p>
                </div>
            </div>
        </div>
    );
}