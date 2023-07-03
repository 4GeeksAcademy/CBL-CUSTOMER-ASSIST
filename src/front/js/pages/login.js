import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const userLogin = async () => {
        const response = await actions.login(email, password);
        if (response) {
            // navigate("/loading");
            await actions.getUserProfile();
            
            if (store.userProfile.user_info.user_type === "customer") {
                await actions.getCustomerEquipment();
                await actions.getCustomerTickets();
                navigate("/customer/dashboard");
            }
            if (store.userProfile.user_info.user_type === "admin") {
                await actions.getAdminUserList();
                await actions.getAdminTickets();
                await actions.getAdminEquipment();
                await actions.getAvailableEmployees();
                navigate("/admin/dashboard");
            }
        }
    }

    return (
        <main className="bd-main">
            {/* <div className="d-flex col-6 justify-content-center mx-auto mb-4">
                <h1>Welcome back</h1>
            </div> */}
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
        </main>
    );
};
