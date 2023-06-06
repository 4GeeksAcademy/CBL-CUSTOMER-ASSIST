import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";


export const EmployeeCreate = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // const registerNewUser = async () => {
    //     const response = await fetch(process.env.BACKEND_URL + "/api/user", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             email: email,
    //             password: password
    //         })
    //     });
    //     if (response.ok) {
    //         navigate("/")
    //     }
    // }

    return (
        <div className="container mx-auto mt-5">
            <h2 className="mb-3 text-center d-flex justify-content-center">Create Employee</h2>
            <div className="border p-5 col-sm-12 col-md-8 col-lg-8 mx-auto row ">
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                        <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary " onClick={() => registerNewUser()}>Submit</button>
            </div>

        </div>
    );
};