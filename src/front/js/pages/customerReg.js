import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";


export const CustomerReg = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");

    const navigate = useNavigate();

    const registerNewUser = async () => {
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
            navigate("/login")
        }
    }

    return (
        <div className="container mx-auto mt-5">
            <h2 className="mb-3 text-center d-flex justify-content-center">Create Customer</h2>
            <div className="border p-5 col-sm-12 col-md-8 col-lg-8 mx-auto row ">
                <div className="col-6">
                    <div className="mb-2">
                        <label htmlFor="formGroupExampleInput" className="form-label">Company</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Company"
                            onChange={(e) => {
                                setCompany(e.target.value)
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="formGroupExampleInput3" className="form-label">Password</label>
                        <input type="password" className="form-control" id="formGroupExampleInput3" placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="formGroupExampleInput4" className="form-label">City</label>
                        <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="City"
                            onChange={(e) => {
                                setCity(e.target.value)
                            }} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-2">
                        <label htmlFor="formGroupExampleInput5" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="formGroupExampleInput5" placeholder="Phone Number"
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="formGroupExampleInput6" className="form-label">Address</label>
                        <input type="text" className="form-control" id="formGroupExampleInput6" placeholder="1234 Main street"
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="formGroupExampleInput7" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="formGroupExampleInput7" placeholder="..."
                            onChange={(e) => {
                                setZip(e.target.value)
                            }} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 p-3 col-sm-12 col-md-8 col-lg-8 mx-auto">
                    <label htmlFor="formGroupExampleInput8" className="form-label">Machine List</label>
                    <select id="inputState" className="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                    {/* onChange={(e) => {
                            setMachine(e.target.value)
                        }} /> */}
                </div>
                {/* <label for="inputState" class="form-label">State</label>
                    <select id="inputState" class="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                    </select>
                </div> */}
            </div>

            {/* <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary " onClick={() => registerNewUser()}>Submit</button>
            </div>

        </div>
    );
};