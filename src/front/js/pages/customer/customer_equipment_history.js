import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { EquipmentHistoryCard } from "../../component/equipment_history_cards";


export const CustomerEquipmentHistory = () => {
    const { store, actions } = useContext(Context)
    // console.log(store.tickets)

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <h1 className="border-bottom">Equipment History</h1>
            </div>
            <div className="bd-content">
                <div>
                    {store.customerEquipmentTickets}
                    {Object.values(store.customerEquipmentTickets).length > 0 ? store.customerEquipmentTickets.map((item, i) => {
                        return <EquipmentHistoryCard key={i} data={item} />
                    }) : <span>No equipment found..</span>}
                </div>
            </div>
        </main>
    );
};
