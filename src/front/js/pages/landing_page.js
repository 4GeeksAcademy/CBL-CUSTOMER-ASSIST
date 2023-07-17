import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/landing.css"

export const LandingPage = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const toast = (title, data) => actions.userToastAlert(title, data);

    const userLogin = async (e) => {
        e.preventDefault();
        const response = await actions.login(email, password);
        if (response[0]) {
            const userType = response[1];

            // navigate("/loading");
            await actions.getUserProfile();

            if (store.userProfile.user_info.user_type === "customer") {
                navigate("/customer/dashboard");
            }
            if (store.userProfile.user_info.user_type === "admin") {
                navigate("/admin/dashboard");
            }
            if (userType === "technician" || userType === 'engineer') {
                navigate("/employee/dashboard");
            }
        } else if (!response[0]) {
            actions.logout();
            navigate("/");
        }
    }


    return (
        <main className="d-flex flex-row vh-100 main-landing align-items-center">
            <div className="w-100 bg-dark p-5 pb-2" style={{ "--bs-bg-opacity": ".75" }}>
                <div className="description d-flex flex-column align-items-center col-12 mb-5">
                    <h1 className="fw-bold">Mecânica Exacta, S.A.</h1>
                    <h3>Ticketing Customer Support</h3>
                </div>
                <div className="form-signin d-flex flex-column align-items-center  col-12">
                    <form className="d-flex flex-column align-items-center col-12">
                        <h1 className="h3 mb-3 fw-normal text-warning">Please login</h1>

                        <div className="form-floating col-5">
                            <input type="email"
                                className="form-control"
                                id="emailInput" placeholder="name@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            <label htmlFor="emailInput">Email address</label>
                        </div>
                        <div className="form-floating col-5">
                            <input type="password"
                                className="form-control"
                                id="passwordInput"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            <label htmlFor="passwordInput">Password</label>
                        </div>

                        {/* <div className="form-check text-start my-3 text-white">
                            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember me
                            </label>
                        </div> */}
                        <button className="btn btn-primary col-5 mt-3 mb-4 py-2"
                            type="submit"
                            onClick={userLogin}
                        >Login</button>
                        <figure className="mt-5 mb-3 text-white">
                            <blockquote className="blockquote">
                                <p>© 2023 - powered by CBL Desk</p>
                            </blockquote>
                            <figcaption className="blockquote-footer text-white">
                                For Makers - To Customers
                            </figcaption>
                        </figure>
                    </form>
                </div>
            </div>
        </main>
    );
}