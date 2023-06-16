import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const EmployeeEditProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [title, setTitle] = useState("Profile");
    const [updateProfile, setUpdateProfile] = useState({ 'user_info': {}, 'customer_info': {}, 'employee_info': {} })
    const [editProfile, setEditProfile] = useState(false);

    const userInfo = store.userProfile.user_info;
    const employeeInfo = store.userProfile.employee_info;

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

        // // check for empty keys and delete them
        // for (const key of Object.keys(newData)) {
        //     if (Object.keys(newData[key]).length === 0) delete newData[key];
        // }

        // // only submits data if the object is not empty
        // if (Object.keys(newData).length !== 0) {
        //     const response = await actions.updateUserProfile(newData);
        //     response[0] === 200 ? navigate('/') : alert(response[1]);
        // } else {
        //     alert('No data to update');
        // }

    }

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">{!editProfile? title : 'Edit ' + title }</h1>
                {/* <h3>Tickets:</h3> */}
            </div>
            <div className="bd-content">

                {/* USER INFO */}
                <h5 className="mt-5 mb-0">User info</h5>
                <hr className="mt-0"></hr>
                <div className="row g-2">

                    {/* EMAIL */}
                    <div className="col-12 col-md-6">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="emailInput" placeholder="your.email@adress.com"
                               disabled={!editProfile}
                               value={updateProfile.user_info.hasOwnProperty('email') ? updateProfile.user_info.email : userInfo.email}
                               onChange={handleInput('user_info', 'email')}/>
                            <label htmlFor="emailInput">Email address</label>
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="col-12 col-md-6">
                        <div className="form-floating">
                            <input type="password" className="form-control" id="passwordInput" placeholder="your.password"
                               disabled={!editProfile}
                               value={updateProfile.user_info.hasOwnProperty('password') ? updateProfile.user_info.password : userInfo.password}
                               onChange={handleInput('user_info', 'password')}/>
                            <label htmlFor="passwordInput">Password</label>
                        </div>
                    </div>

                    {/* USER TYPE */}
                    <div className="col-12 col-md-6">
                        <div className="form-floating">
                            <select className="form-select" id="userTypeSelect" disabled={!editProfile}>
                                <option defaultValue={true}>Select a type for this user</option>
                                <option value="1">Admin</option>
                                <option value="2">Engineer</option>
                                <option value="3">Technician</option>
                            </select>
                            <label htmlFor="userTypeSelect">User type</label>
                        </div>
                    </div>
                </div>

                {/* EMPLOYEE INFO */}
                <h5 className="mt-5 mb-0">Employee info</h5>
                <hr className="mt-0"></hr>
                <div className="row g-2">

                    {/* FIRST NAME */}
                    <div className="col-12 col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="firstNameInput" placeholder="your first name"
                            disabled={!editProfile}
                            value={updateProfile.employee_info.hasOwnProperty('first_name') ? updateProfile.employee_info.first_name : employeeInfo.first_name}
                            onChange={handleInput('employee_info', 'first_name')}/>
                            <label htmlFor="firstNameInput">First Name</label>
                        </div>
                    </div>

                    {/* LAST NAME */}
                    <div className="col-12 col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="lastNameInput" placeholder="your last name"
                            disabled={!editProfile}
                            value={updateProfile.employee_info.hasOwnProperty('last_name') ? updateProfile.employee_info.last_name : employeeInfo.last_name}
                            onChange={handleInput('employee_info', 'last_name')}/>
                            <label htmlFor="lastNameInput">Last Name</label>
                        </div>
                    </div>
                </div>
                
                {/* ENABLE INPUTS + SUBMIT BUTTON*/}
                <div className="row g-2">
                    {/* <div className="col-md"> */}

                    <div className="d-flex align-items-end flex-column mt-3">
                        <div className="form-check">
                            <input className="form-check-input me-2" checked={editProfile} onChange={() => setEditProfile(!editProfile)} type="checkbox" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Edit Profile</label>
                        </div>
                        <div className="mt-2 ">
                            <button disabled={!editProfile} className="btn btn-primary" style={{ width: "100px" }} onClick={() => handleUpdateProfile()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};