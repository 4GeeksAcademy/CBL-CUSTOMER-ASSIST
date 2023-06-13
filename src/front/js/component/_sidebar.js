import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <SideNav
                className="bg-dark"
                onSelect={selected => {
                    console.log(selected);
                    navigate('/' + selected);
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="tickets">
                    {/********* TICKET *********/}
                    <NavItem eventKey="tickets">
                        <NavIcon><i className="fa-solid fa-ticket" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Ticket</NavText>
                        <NavItem eventKey="customer/dashboard">
                            <NavText>Dashboard</NavText>
                        </NavItem>
                        {/* Customer creates a ticket below */}
                        <NavItem eventKey="customer/create/ticket">
                            <NavText>Create Ticket</NavText>
                        </NavItem>
                        <NavItem eventKey="customer/equipment/list">
                            <NavText>Equipment List</NavText>
                        </NavItem>
                        <NavItem eventKey="ticket-search">
                            <NavText>Search</NavText>
                        </NavItem>
                    </NavItem>
                    {/********* CUSTOMER  *********/}
                    <NavItem eventKey="customer">
                        <NavIcon><i className="fa-solid fa-user" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Customer</NavText>
                        {/* Admin creates a new customer below */}
                        <NavItem eventKey="customer/create">
                            <NavText>Create Customer</NavText>
                        </NavItem>
                        <NavItem eventKey="customer-edit">
                            <NavText>Edit Customer</NavText>
                        </NavItem>
                    </NavItem>
                    {/********* TECHNICIAN *********/}
                    <NavItem eventKey="technician">
                        <NavIcon><i className="fa-solid fa-user-tie" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Technician</NavText>
                        <NavItem eventKey="tech/create">
                            <NavText>Create Technician</NavText>
                        </NavItem>
                        <NavItem eventKey="tech">
                            <NavText>Edit Technician</NavText>
                        </NavItem>
                    </NavItem>
                    {/********* ADMIN *********/}  
                    <NavItem eventKey="admin">
                        <NavIcon><i className="fa-solid fa-user-gear" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Admin</NavText>
                        <NavItem eventKey="admin/dashboard">
                            <NavText>Dashboard</NavText>
                        </NavItem>
                        <NavItem eventKey="admin/create">
                            <NavText>Create Admin</NavText>
                        </NavItem>
                        <NavItem eventKey="admin/edit/admin">
                            <NavText>Edit Admin</NavText>
                        </NavItem>
                    </NavItem>
                    {/********* Equipment *********/}
                    <NavItem eventKey="admin">
                        <NavIcon><i className="fa-solid fa-gears" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Equipment</NavText>
                        <NavItem eventKey="equipment">
                            <NavText>Equipment</NavText>
                        </NavItem>
                        <NavItem eventKey="equipment">
                            <NavText>Equipment</NavText>
                        </NavItem>
                        <NavItem eventKey="equipment">
                            <NavText>Equipment</NavText>
                        </NavItem>
                    </NavItem>

                </SideNav.Nav>
            </SideNav>
        </>
    );
};