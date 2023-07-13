import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const CustomerEditProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [title, setTitle] = useState("Profile");
    const [updateProfile, setUpdateProfile] = useState({ 'user_info': {}, 'customer_info': {}, 'employee_info': {} })
    const [editProfile, setEditProfile] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const userInfo = store.userProfile.user_info;
    const customerInfo = store.userProfile.customer_info;

    const toggleTitle = () => {
        if (disabled === false) setTitle("Edit Profile");
        else setTitle("Profile")
    }

    const toggleProfileEdit = () => { setDisabled(!disabled) }

    const handleInput = (info, key) => {
        return (e) => {
            // const input = { ...updateProfile[info], [key]: e.target.value };
            // const inputs = { ...updateProfile, [info]: input };
            // setUpdateProfile(inputs);

            setUpdateProfile({
                ...updateProfile, [info]: {
                    ...updateProfile[info],
                    [key]: e.target.value
                }
            });
        }
    }

    const handleUpdateProfile = async () => {
        let newData = { ...updateProfile };

        // check for empty keys and delete them
        for (const key of Object.keys(newData)) {
            console.count("empty");
            if (Object.keys(newData[key]).length === 0) delete newData[key];
        }

        // only submits data if the object is not empty
        if (Object.keys(newData).length !== 0) {
            console.log('submit')
            const response = await actions.updateUserProfile(newData);
            if (response[0] === 200) {
                await actions.updateUserProfileLocally(newData);
                actions.userToastAlert("Profile", "Profile updated successfully!");
                navigate('/customer/dashboard');
                return true;
            }
            alert(response[1]);
        } else {
            alert('No data to update');
        }

    }

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h3 className="border-bottom">{!editProfile ? title : 'Edit ' + title}</h3>
            </div>
            <div className="bd-content">
                <form onSubmit={e => e.preventDefault()} noValidate>

                    {/* AUTHENTICATION INFO */}
                    <h5 className="mt-1 mb-0">Authentication Info</h5>
                    <hr className="mt-0"></hr>
                    <div className="row g-2 mb-2">

                        {/* EMAIL */}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="userEmailInput"
                                    placeholder="your.email@adress.com"
                                    disabled={!editProfile}
                                    value={updateProfile.user_info.hasOwnProperty('email') ? updateProfile.user_info.email : userInfo.email}
                                    onChange={handleInput('user_info', 'email')} />
                                <label htmlFor="userEmailInput">User email address</label>
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="your.password"
                                    disabled={!editProfile}
                                    value={updateProfile.user_info.hasOwnProperty('password') ? updateProfile.user_info.password : userInfo.password}
                                    onChange={handleInput('user_info', 'password')} />
                                <label htmlFor="passwordInput">Login Password</label>
                            </div>
                        </div>
                    </div>

                    {/* COMPANY INFO */}
                    <h5 className="mt-5 mb-0">Company Info</h5>
                    <hr className="mt-0"></hr>

                    <div className="row g-2 mb-2">

                        {/* COMPANY NAME */}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    placeholder="Company name"
                                    disabled={!editProfile}
                                    value={updateProfile.customer_info.hasOwnProperty('company_name') ? updateProfile.customer_info.company_name : customerInfo.company_name}
                                    onChange={handleInput('customer_info', 'company_name')}
                                    required />
                                <label htmlFor="companyName">Company Name</label>
                            </div>
                        </div>

                        {/* CONTACT PERSON */}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactPerson"
                                    placeholder="Contact person name"
                                    disabled={!editProfile}
                                    value={updateProfile.customer_info.hasOwnProperty('contact_person') ? updateProfile.customer_info.contact_person : customerInfo.contact_person ? customerInfo.contact_person : ""}
                                    onChange={handleInput('customer_info', 'contact_person')} />
                                <label htmlFor="contactPerson">Contact person</label>
                            </div>
                        </div>
                    </div>

                    <div className="row g-2 mb-2">

                        {/* CITY + ZIPCODE*/}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder="Enter city"
                                    disabled={!editProfile}
                                    value={updateProfile.customer_info.hasOwnProperty('city') ? updateProfile.customer_info.city : customerInfo.city}
                                    onChange={handleInput('customer_info', 'city')}
                                    required />
                                <label htmlFor="city">City</label>
                            </div>
                        </div>


                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zipcode"
                                    placeholder="Enter zipcode"
                                    disabled={!editProfile}
                                    value={updateProfile.customer_info.hasOwnProperty('zipcode') ? updateProfile.customer_info.zipcode : customerInfo.zipcode}
                                    onChange={handleInput('customer_info', 'zipcode')}
                                    required />
                                <label htmlFor="zipcode">Zipcode</label>
                            </div>
                        </div>
                    </div>

                    <div className="row g-2 mb-2">

                        {/* COMPANY EMAIL */}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="companyEmail"
                                    placeholder="company.email@adress.com"
                                    disabled={!editProfile}
                                    value={updateProfile.customer_info.hasOwnProperty('company_email') ? updateProfile.customer_info.company_email : customerInfo.company_email}
                                    onChange={handleInput('customer_info', 'company_email')} />
                                <label htmlFor="companyEmail">Company email address</label>
                            </div>
                        </div>

                        {/* PHONE NUMBER */}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Phone number"
                                    disabled={!editProfile}
                                    value={updateProfile.customer_info.hasOwnProperty('phone') ? updateProfile.customer_info.phone : customerInfo.phone}
                                    onChange={handleInput('customer_info', 'phone')} />
                                <label htmlFor="phone">Phone number</label>
                            </div>
                        </div>
                    </div>

                    <div className="row g-2 mb-2">

                        {/* ADDRESS 1 */}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address_1"
                                    placeholder="Street..."
                                    disabled={!editProfile}
                                    value={updateProfile.customer_info.hasOwnProperty('address_1') ? updateProfile.customer_info.address_1 : customerInfo.address_1}
                                    onChange={handleInput('customer_info', 'address_1')} />
                                <label htmlFor="address_1">Adress 1</label>
                            </div>
                        </div>

                        {/* ADDRESS 2 */}
                        <div className="col-12 col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address_2"
                                    placeholder="Street..."
                                    disabled={!editProfile}
                                    value={updateProfile.customer_info.hasOwnProperty('address_2') ? updateProfile.customer_info.address_2 : customerInfo.address_2}
                                    onChange={handleInput('customer_info', 'address_2')} />
                                <label htmlFor="address_2">Adress 2</label>
                            </div>
                        </div>
                    </div>


                    {/* ENABLE INPUTS + SUBMIT BUTTON*/}
                    <div className="d-flex align-items-end flex-column mt-3">
                        <div className="form-check">
                            <input className="form-check-input me-2" checked={editProfile} onChange={() => setEditProfile(!editProfile)} type="checkbox" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Edit Profile
                            </label>
                        </div>
                        <div className="mt-2 ">
                            <button disabled={!editProfile} className="btn btn-primary" style={{ width: "100px" }} onClick={() => handleUpdateProfile()}>Submit</button>
                        </div>
                    </div>
                </form >
            </div >
        </main >
    );
};