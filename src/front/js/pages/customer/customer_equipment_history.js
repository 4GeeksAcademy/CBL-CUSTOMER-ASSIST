import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { EquipmentHistoryCard } from "../../component/equipment_history_cards";
import { PageTitle } from "../../component/page_title";


export const CustomerEquipmentHistory = () => {
    const { store, actions } = useContext(Context)
    // console.log(store.tickets)

    return (
        <main className="bd-main order-1">
            <div className="bd-intro">
                <PageTitle title={"Equipment History"} />
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
