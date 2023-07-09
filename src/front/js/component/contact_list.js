import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";



export const ContactList = (props) => {
    const { store, actions } = useContext(Context);
    const [button, setButton] = useState(true)

    const data = props.data;



    return (
        <div className="">

            {store.contactList.length > 0 ? <table className="table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name / First Name</th>
                        <th>Phone Number / Last Name</th>
                        <th>Contact Person/Phone Number</th>
                        <th>Address / Available</th>
                        <th>City</th>
                        <th>Zipcode</th>
                    </tr>
                </thead>
                <tbody>

                    {store.contactList.map((item, i) => {
                        return (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.}</td>
                                <td>{item.}</td>
                                <td>{item.}</td>
                                <td>{item.}</td>
                                <td>{item.}</td>
                                <td>{item.}</td>
                            </tr>)
                    })}
                </tbody>
            </table> : <h5 className="p-3">No contacts founds..</h5>}

        </div>
    );
}