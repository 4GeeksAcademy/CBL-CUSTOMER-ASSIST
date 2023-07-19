import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { EquipmentHistoryCard } from "../../component/equipment_history_cards";
import { PageTitle } from "../../component/page_title";
import { NavLink, useLocation } from "react-router-dom";

export const CustomerEquipmentHistory = () => {
    const { store, actions } = useContext(Context)
    const location = useLocation();
    // console.log(store.tickets)
    console.log(location)
    return (
        <main className="bd-main order-1 pe-4">
            <div className="bd-intro">
                <NavLink to={"/customer/equipment/list"}>
                    My Equipment
                </NavLink>
                <span> / History</span>
            </div>
            <div className="bd-content">
                <div>

                    {Object.values(store.customerEquipmentTickets).length > 0 ? store.customerEquipmentTickets.map((item, i) => {
                        return <EquipmentHistoryCard key={i} data={item} />
                    }) : <span>No information found..</span>}
                </div>
            </div>
        </main>
    );
};
