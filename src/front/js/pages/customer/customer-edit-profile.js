import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";


export const EditCustomerProfile = () => {
    const { store, actions } = useContext(Context);
    const [editProfile, setEditProfile] = useState(store.userProfile)
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState("Profile");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [company, setCompany] = useState("");
    // const [city, setCity] = useState("");
    // const [phone, setPhone] = useState("");
    // const [addressOne, setAddressOne] = useState("");
    // const [addressTwo, setAddressTwo] = useState("");
    // const [contactPerson, setContactPerson] = useState("");
    // const [zip, setZip] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        actions.getUserProfile()
    }, [store.userProfile])

    const toggleProfileEdit = () => {
        setDisabled(!disabled)
    }

    const toggleTitle = () => {
        if (disabled === false) setTitle("Edit Profile");
        else setTitle("Profile")
    }

    const sendNewCustomer = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company: company,
                email: email,
                password: password,
                city: city,
                phone: phone,
                address: address,
                zip: zip
            })
        });
        if (response.ok) {
            navigate("/")
        }
    }

    return (
        <div className="container mx-auto mt-5">
            <h2 className="mb-3 text-center d-flex justify-content-center">{title}</h2>
            <div className="border p-5 col-sm-12 col-md-8 col-lg-8 mx-auto row">
                <div className="col-6">
                    <div className="mb-2">
                        <label htmlFor="company" className="form-label">Company</label>
                        <input type="text" disabled={!disabled} value={editProfile.company_name} className="form-control" id="company" placeholder="Company"
                            onChange={(e) => {
                                setEditProfile({ ...editProfile, company_name: e.target.value })
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" disabled={!disabled} value={editProfile.user_info.email} className="form-control" id="email" placeholder="Email"
                            onChange={(e) => {
                                setEditProfile({ ...editProfile, user_info: { email: e.target.value } })
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" disabled={!disabled} value={editProfile.user_info.password} className="form-control" id="password" placeholder="Password"
                            onChange={(e) => {
                                setEditProfile({ ...editProfile, user_info: { password: e.target.value } })
                            }} />
                    </div>
                    <div className="row">
                        <div className="mb-2 col-6">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" disabled={!disabled} value={editProfile.city} className="form-control" id="city" placeholder="City"
                                onChange={(e) => {
                                    setEditProfile({ ...editProfile, city: e.target.value })
                                }} />
                        </div>
                        <div className="mb-2 col-6">
                            <label htmlFor="zip" className="form-label">Zip</label>
                            <input type="text" disabled={!disabled} value={editProfile.zipcode} className="form-control" id="zip" placeholder="..."
                                onChange={(e) => {
                                    setEditProfile({ ...editProfile, zipcode: e.target.value })
                                }} />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-2">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" disabled={!disabled} value={editProfile.phone} className="form-control" id="phoneNumber" placeholder="Phone Number"
                            onChange={(e) => {
                                setEditProfile({ ...editProfile, phone: e.target.value })
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="contactPerson" className="form-label">Contact Person</label>
                        <input type="text" disabled={!disabled} value={editProfile.contact_person} className="form-control" id="contactPerson" placeholder="Name"
                            onChange={(e) => {
                                setEditProfile({ ...editProfile, contact_person: e.target.value })
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="addressOne" className="form-label">Address 1</label>
                        <input type="text" disabled={!disabled} value={editProfile.address_1} className="form-control" id="addressOne" placeholder="123 Main Street"
                            onChange={(e) => {
                                setEditProfile({ ...editProfile, address_1: e.target.value })
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="addressTwo" className="form-label">Address 2</label>
                        <input type="text" disabled={!disabled} value={editProfile.address_2} className="form-control" id="addressTwo" placeholder="Door number, floor"
                            onChange={(e) => {
                                setEditProfile({ ...editProfile, address_2: e.target.value })
                            }} />
                    </div>

                </div>
                <div className="d-flex align-items-end flex-column mt-3">
                    <div className="form-check">
                        <input className="form-check-input me-2" checked={disabled} onChange={toggleProfileEdit} onClick={toggleTitle} type="checkbox" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Edit Profile
                        </label>
                    </div>
                    <div className="mt-2 ">
                        <button disabled={!disabled} className="btn btn-primary" style={{ width: "100px" }} onClick={() => sendNewCustomer()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};