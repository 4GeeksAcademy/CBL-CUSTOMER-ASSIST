import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Dashboard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getMessage();
    });
    return (
        <>
            <div className="container my-3">
                <div >
                    <h1>Dashboard</h1>
                </div>
                <div className="d-flex justify-content-evenly mt-4">
                    <h5>Customer</h5>
                    <h5>Created</h5>
                    <h5>Technician</h5>
                    <h5>Status</h5>
                    <h5>Priority</h5>
                </div>
            </div>
        </>
    );
};
