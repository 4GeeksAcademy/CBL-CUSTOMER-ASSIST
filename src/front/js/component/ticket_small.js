import React from "react";

export const TicketSmall = (props) => {
    const data = props.data;
    console.log(data);
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
                <div>
                    <h5 className="card-title">{data.subject}</h5>
                    <p className="card-text">{data.machine.model}</p>
                    <p className="card-text">{data.machine.serial_number}</p>
                    <p className="card-text">{data.company_name}</p>
                </div>
                <div className="text-end">
                    <p className={`badge text-bg-${data.status === 'Opened'?'danger':data.status==='In Progress'?'warning':data.status==='Resolved'?'success':'secondary'}`} role="alert">{data.status}</p>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option defaultValue={true}>Assign tech/eng</option>
                        {employees.map((item, i) => {
                            return <option key={i}>{item.first_name + ' ' + item.last_name}</option>
                        })}
                    </select>
                    <p className="card-text">{data.intervention_type?'Assistance':'Maintenance'}</p>
                    <p className="card-text">{data.open_ticket_time}</p>
                </div>
            </div>
        </div>
    );
}