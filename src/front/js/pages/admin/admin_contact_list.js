import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";

//include your index.scss file into the bundle
import "../../../styles/contact_list.css";

export const AdminContactList = () => {
    const { store, actions } = useContext(Context)
    // const [loopedList, setLoopedList] = useState([])
    // const navigate = useNavigate();
    const customer = store.contactList.customer
    const employee = store.contactList.employee
    

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">Contact List</h1>
            </div>
            <div className="bd-content">

                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="customer" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Customer</button>
                        <button className="nav-link" id="employee" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Employee</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    {/* Customers Below */}
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="customer" tabIndex="0">
                        <div className="shadow px-4 mb-5 rounded" >
                            {customer.length > 0 ? <table className="table table-hover ">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Contact Person</th>
                                        <th scope="col">Company Email</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">City</th>
                                        <th scope="col">Zipcode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.map((item, i) => {
                                        {console.log(customer)}
                                            return (
                                                <tr key={i} className="row-height nowrap">
                                                    <th scope="row">{item.id}</th>
                                                    <td className="cell-padding cell-padding-left">{item.company_name}</td>
                                                    <td className="cell-padding">{item.phone}</td>
                                                    <td className="cell-padding">{item.contact_person}</td>
                                                    <td className="cell-padding">{item.company_email}</td>
                                                    <td className="cell-padding">{item.address_1 + " " + item.address_2}</td>
                                                    <td className="cell-padding">{item.city}</td>
                                                    <td className="cell-padding cell-padding-right">{item.zipcode}</td>
                                                </tr>)
                                        })}
                                </tbody>
                            </table> : <h5 className="p-3">No contacts founds..</h5>}
                        </div>
                    </div>
                    {/* Employees Below */}
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="employee" tabIndex="0">
                    
                        <div className="shadow px-4 mb-5 rounded" >
                            {employee.length > 0 ? <table className="table table-hover ">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Surname</th>
                                        <th scope="col">Available</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employee
                                        .map((item, i) => {
                                            return (
                                                <tr key={i} className="row-height nowrap">
                                                    <th scope="row">{item.id}</th>
                                                    <td className="cell-padding cell-padding-left">{item.first_name}</td>
                                                    <td className="cell-padding">{item.last_name}</td>
                                                    <td className="cell-padding cell-padding-right">{item.available ? "Yes" : "No"}</td>
                                                </tr>)
                                        })}
                                </tbody>
                            </table> : <h5 className="p-3">No contacts founds..</h5>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
