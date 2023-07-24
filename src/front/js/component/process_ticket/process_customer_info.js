import React, { useContext } from "react";
import { Context } from "../../store/appContext";

export const ProcessCustomerInfo = () => {
    const { store, actions } = useContext(Context);
    const data = store.processTicket?.customer_info;

    return (
        <div className="mb-3">
            <h4 className="border-bottom">Customer Information</h4>
            <div className="d-flex flex-wrap">
                <div className="col-12 col-sm-6">
                    <div className="col-12">
                        <h6><i className="fa-regular fa-building me-1"></i><strong>Company name</strong></h6>
                        <p>{data.company_name}</p>
                    </div>
                    <div className="col-12">
                        <h6><i className="fa-solid fa-location-dot me-1"></i><strong>Address</strong></h6>
                        <p>{data.address_1}, {data.address_2}</p>
                        <p>{data.city} {data.zipcode}</p>
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                    <div className="col-12">
                        <h6><i className="fa-solid fa-user me-1"></i><strong>Contact Person</strong></h6>
                        <p>{data.contact_person}</p>
                    </div>
                    <div className="col-12">
                        <h6><i className="fa-solid fa-square-phone me-1"></i><strong>Phone</strong></h6>
                        <p>{data.phone}</p>
                    </div>
                    <div className="col-12">
                        <h6><i className="fa-solid fa-at me-1"></i><strong>Email</strong></h6>
                        <p>{data.company_email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}