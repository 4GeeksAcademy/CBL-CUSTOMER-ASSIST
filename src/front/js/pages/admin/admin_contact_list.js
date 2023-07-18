import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { PageTitle } from "../../component/page_title";
import { Link, useNavigate } from "react-router-dom";

//include your index.scss file into the bundle
import "../../../styles/contact_list.css";

export const AdminContactList = () => {
    const { store, actions } = useContext(Context)
    const [searchName, setSearchName] = useState("")
    const customer = store.contactList.customer
    const employee = store.contactList.employee

    const handleSearch = (event) => {
        setSearchName(event.target.value);
    }

    const filterCustomer = customer.filter(item =>
        item.company_name.toLowerCase().includes(searchName.toLowerCase()));
    
    const filterEmployees = employee.filter(item =>
        item.first_name.toLowerCase().includes(searchName.toLowerCase()));
    
    useEffect(()=>{
        actions.getContactList();
    }, []);


    // console.log(filterEmployees)
    return (
        <main className="bd-main order-1">
            {/* <div className="bd-intro">
                <PageTitle title={"All Users"} />
            </div> */}
            <div className="bd-content">
                <div className="d-flex justify-content-center">
                    <div className="input-group mb-2 w-25">
                        <div className="form-floating">
                            <input
                                type="text"
                                id="floatingInput"
                                className="form-control "
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="Search"
                                value={searchName}
                                onChange={handleSearch}
                            />
                            <label htmlFor="floatingInput"><i className="fa-solid fa-magnifying-glass" />    Search</label>
                        </div>
                    </div>
                </div>
                <div className="table-parent">
                    <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="customer"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-home"
                                type="button"
                                role="tab"
                                aria-controls="nav-home"
                                aria-selected="true"
                            >
                                Customer
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="employee"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-profile"
                                type="button"
                                role="tab"
                                aria-controls="nav-profile"
                                aria-selected="false"
                            >
                                Employee
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="nav-tabContent">
                        {/* Customers Below */}
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="customer" tabIndex="0">
                            <div className="shadow px-4 mb-5 rounded table-container" >
                                {customer.length > 0 ? <table className="table table-hover fixed-height">
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
                                        {filterCustomer
                                            .map((item, i) => {
                                                return (
                                                    <tr key={item.id} className="row-height nowrap">
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

                            <div className="shadow w-100 px-4 mb-5 rounded table-container" >
                                {employee.length > 0 ? <table className="table table-hover fixed-height">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Surname</th>
                                            <th scope="col">Available</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterEmployees
                                            .map((item, i) => {
                                                return (
                                                    <tr key={item.id} className="row-height nowrap">
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
            </div>
        </main>
    );
};
