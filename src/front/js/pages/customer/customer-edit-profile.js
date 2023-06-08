import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const EditCustomerProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [title, setTitle] = useState("Profile");
    const [updateProfile, setUpdateProfile] = useState({'user_info': {}, 'customer_info': {}, 'employee_info': {}})
    const [disabled, setDisabled] = useState(false);

    const userInfo = store.userProfile.user_info;
    const customerInfo = store.userProfile.customer_info;

    const toggleTitle = () => {
        if (disabled === false) setTitle("Edit Profile");
        else setTitle("Profile")
    }
    
    const toggleProfileEdit = () => {setDisabled(!disabled)}
    
    const handleInput = (info, key) => {
        // console.log('handleInput'); //debug
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
        let newData = {...updateProfile};

        if(Object.keys(newData.user_info).length === 0) delete newData.user_info; // deletes user_info if this is empty
        userInfo.user_type !== "customer" ? delete newData.customer_info : delete newData.employee_info; // deletes customer_info or employee_info

        const response = await actions.updateUserProfile(newData);

        response[0] === 200 ? navigate('/') : alert(response[1]);
    }

    return (
        <div className="container mx-auto mt-5">
            <h2 className="mb-3 text-center d-flex justify-content-center">{title}</h2>
            <div className="border p-5 col-sm-12 col-md-8 col-lg-8 mx-auto row">
                <div className="col-6">

                    {/* COMPANY NAME */}
                    <div className="mb-2">
                        <label htmlFor="company" className="form-label">Company</label>
                        <input
                            type="text"
                            className="form-control" id="company" placeholder="Company"
                            disabled={!disabled}
                            value={updateProfile.customer_info.hasOwnProperty('company_name') ? updateProfile.customer_info.company_name : customerInfo.company_name}
                            onChange={handleInput('customer_info', 'company_name')}
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control" id="email" placeholder="Email"
                            disabled={!disabled}
                            value={ updateProfile.user_info.hasOwnProperty('email') ? updateProfile.user_info.email : userInfo.email }
                            onChange={ handleInput('user_info', 'email') }
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password" className="form-control" id="password" placeholder="Password"
                            disabled={!disabled}
                            value={ updateProfile.user_info.hasOwnProperty('password') ? updateProfile.user_info.password : userInfo.password }
                            onChange={ handleInput('user_info', 'password') }
                        />
                    </div>

                    {/* CITY + ZIPCODE*/}
                    <div className="row">
                        <div className="mb-2 col-6">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text" className="form-control" id="city" placeholder="City"
                                disabled={!disabled}
                                value={ updateProfile.customer_info.hasOwnProperty('city') ? updateProfile.customer_info.city : customerInfo.city }
                                onChange={ handleInput('customer_info', 'city') }
                            />
                        </div>

                        <div className="mb-2 col-6">
                            <label htmlFor="zipcode" className="form-label">Zip</label>
                            <input
                                type="text" className="form-control" id="zipcode" placeholder="..."
                                disabled={!disabled}
                                value={ updateProfile.customer_info.hasOwnProperty('zipcode') ? updateProfile.customer_info.zipcode : customerInfo.zipcode }
                                onChange={ handleInput('customer_info', 'zipcode') }
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">

                    {/* PHONE NUMBER */}
                    <div className="mb-2">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input 
                            type="text" className="form-control" id="phone" placeholder="Phone Number"
                            disabled={!disabled}
                            value={ updateProfile.customer_info.hasOwnProperty('phone') ? updateProfile.customer_info.phone : customerInfo.phone }
                            onChange={ handleInput('customer_info', 'phone') }
                        />
                    </div>

                    {/* CONTACT PERSON */}
                    <div className="mb-2">
                        <label htmlFor="contactPerson" className="form-label">Contact Person</label>
                        <input
                            type="text" className="form-control" id="contactPerson" placeholder="Contact Person Name"
                            disabled={!disabled}
                            value={ updateProfile.customer_info.hasOwnProperty('contact_person') ? updateProfile.customer_info.contact_person : customerInfo.contact_person ? customerInfo.contact_person : "" }
                            onChange={ handleInput('customer_info', 'contact_person') }
                        />
                    </div>

                    {/* ADDRESS 1 */}
                    <div className="mb-2">
                        <label htmlFor="address_1" className="form-label">Address 1</label>
                        <input
                            type="text" className="form-control" id="address_1" placeholder="Street..."
                            disabled={!disabled}
                            value={ updateProfile.customer_info.hasOwnProperty('address_1') ? updateProfile.customer_info.address_1 : customerInfo.address_1 }
                            onChange={ handleInput('customer_info', 'address_1') }
                        />
                    </div>

                    {/* ADDRESS 2 */}
                    <div className="mb-2">
                        <label htmlFor="address_2" className="form-label">Address 2</label>
                        <input
                            type="text" className="form-control" id="address_2" placeholder="Door number, floor"
                            disabled={!disabled}
                            value={ updateProfile.customer_info.hasOwnProperty('address_2') ? updateProfile.customer_info.address_2 : customerInfo.address_2 }
                            onChange={ handleInput('customer_info', 'address_2') }
                        />
                    </div>
                </div>

                {/* ENABLE INPUTS + SUBMIT BUTTON*/}
                <div className="d-flex align-items-end flex-column mt-3">
                    <div className="form-check">
                        <input className="form-check-input me-2" checked={disabled} onChange={toggleProfileEdit} onClick={toggleTitle} type="checkbox" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Edit Profile
                        </label>
                    </div>
                    <div className="mt-2 ">
                        <button disabled={!disabled} className="btn btn-primary" style={{ width: "100px" }} onClick={() => handleUpdateProfile()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};