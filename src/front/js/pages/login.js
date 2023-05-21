import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const userLogin = async () => {
        await actions.login(email, password);
        navigate("/")
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center mx-auto mb-4">
                <h1>Welome back</h1>
            </div>
            <div className="border p-5 col-sm-12 col-md-8 col-lg-8 mx-auto ">
                <h2 className="mb-3 text-center">Login into your account</h2>
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
                <button className="btn btn-primary" onClick={() => userLogin()}>Submit</button>
            </div>

        </div>
    );
};
