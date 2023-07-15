import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const toast = (title, data) => actions.userToastAlert(title, data);

    const userLogin = async () => {
        const response = await actions.login(email, password);
        if (response[0]) {
            const userType = response[1];

            // navigate("/loading");
            await actions.getUserProfile();

            if (store.userProfile.user_info.user_type === "customer") {
                await actions.getCustomerEquipment();
                await actions.getCustomerTickets();
                navigate("/customer/dashboard");
            }
            if (store.userProfile.user_info.user_type === "admin") {
                // await actions.getAdminUserList();        #
                // await actions.getAdminTickets();         #
                // await actions.getAdminEquipment();
                // await actions.getCategories();
                // await actions.getAvailableEmployees();   #
                // await actions.getAvailableVehicles();    #
                // await actions.getContactList();
                navigate("/admin/dashboard");
            }
            if (userType === "technician" || userType === 'engineer') {
                // await actions.getEmployeeAssignedTicket();
                // await actions.getCategories();
                // await actions.getKnowledgeList();
                navigate("/employee/dashboard");
            }
        } else if (!response[0]) {
            actions.logout();
            navigate("/");
        }
    }

    return (
        <main className="bd-main">
            <div className="border mt-5 p-5 col-sm-12 col-md-4 mx-auto shadow rounded">
                <h2 className="mb-5 text-center fw-bold">LOGIN</h2>

                {/* EMAIL */}
                <div className="form-floating">
                    <input type="email"
                        className="form-control text-center fw-semibold fs-5 mb-2"
                        id="emailInput"
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    <label className="text-secondary" htmlFor="emailInput"><i className="fa-solid fa-envelope me-2"></i>Email</label>
                </div>

                {/* PASSWORD */}
                <div className="form-floating">
                    <input type="password"
                        className="form-control text-center fs-5 fw-semibold"
                        id="passwordInput"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <label className="text-secondary" htmlFor="passwordInput"><i className="fa-solid fa-lock me-2"></i>Password</label>
                </div>

                <div className="mt-5 text-center">
                    <button className="btn btn-primary btn-lg w-100" onClick={() => userLogin()}>Submit</button>
                </div>
            </div>
        </main>
    );
};
