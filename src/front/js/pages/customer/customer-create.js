import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";


export const CreateCustomer = () => {

    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const navigate = useNavigate();

    const sendNewCustomer = () => {
        return
    }

    return (
        <>
            <div className="container mx-auto mt-5">
                <h2 className="mb-3 text-center d-flex justify-content-center">Create Customer</h2>
                <div className="border p-5 col-sm-12 col-md-8 col-lg-8 mx-auto row ">
                    <div className="col-6">
                        <div className="mb-2">
                            <label htmlFor="formGroupExampleInput" className="form-label">Company</label>
                            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Company"
                                onChange={(e) => {
                                    setCompany(e.target.value)
                                }} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="formGroupExampleInput3" className="form-label">Password</label>
                            <input type="password" className="form-control" id="formGroupExampleInput3" placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="formGroupExampleInput4" className="form-label">City</label>
                            <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="City"
                                onChange={(e) => {
                                    setCity(e.target.value)
                                }} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-2">
                            <label htmlFor="formGroupExampleInput5" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="formGroupExampleInput5" placeholder="Phone Number"
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                }} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="formGroupExampleInput6" className="form-label">Address</label>
                            <input type="text" className="form-control" id="formGroupExampleInput6" placeholder="1234 Main street"
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="formGroupExampleInput7" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="formGroupExampleInput7" placeholder="..."
                                onChange={(e) => {
                                    setZip(e.target.value)
                                }} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto">
                        <label htmlFor="inputState" className="form-label">Machine List</label>
                        <select id="inputState" className="form-select">
                            <option>Choose...</option>
                            <option>...</option>
                        </select>
                        {/* onChange={(e) => {
                            setMachine(e.target.value)
                        }} />  */}
                    </div>
                </div>
                
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary " onClick={() => sendNewCustomer()}>Submit</button>
                </div>
            </div>
        </>
    );
};