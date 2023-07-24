import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const CustomerUpdateProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formJson, setFormJson] = useState({})
    const [profileEdit, setProfileEdit] = useState(false);

    const handleUpdateProfileForm = (e) => {
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        setFormJson(Object.fromEntries(formData.entries()));
    }

    return (
        <div className="container">
            <h3 className="mt-3">Update profile</h3>
            <hr></hr>
            <form className="row g-3 mt-3" method="post" onSubmit={handleUpdateProfileForm}>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" id="email" disabled={!profileEdit} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="companyName" className="form-label">Company name</label>
                    <input type="text" name="companyName" className="form-control" id="companyName" disabled={!profileEdit} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="number" name="phone" className="form-control" id="phone" disabled={!profileEdit} />
                </div>
                <div className="col-12">
                    <label htmlFor="adress1" className="form-label">Address</label>
                    <input type="text" name="adress1" className="form-control" id="adress1" placeholder="1234 Main St" disabled={!profileEdit} />
                </div>
                <div className="col-12">
                    <label htmlFor="adress2" className="form-label">Address 2</label>
                    <input type="text" name="address2" className="form-control" id="adress2" placeholder="Apartment, studio, or floor" disabled={!profileEdit} />
                </div>
                <div className="col-md-2">
                    <label htmlFor="zipCode" className="form-label">Zip</label>
                    <input type="text" name="zipCode" className="form-control" id="zipCode" disabled={!profileEdit} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" name="city" className="form-control" id="city" disabled={!profileEdit} />
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" onChange={() => setProfileEdit(!profileEdit)} />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Edit profile
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    )
};