import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <>
            <SideNav className="bg-dark"
                onSelect={selected => {
                    console.log(selected)
                    navigate('/' + selected)
                }}>

                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="tickets">
                    {/* TICKET */}
                    <NavItem eventKey="tickets">
                        <NavIcon><i className="fa-solid fa-ticket" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Ticket</NavText>
                        <NavItem eventKey="dashboard">
                            <NavText>Dashboard</NavText>
                        </NavItem>
                        <NavItem eventKey="ticket-create">
                            <NavText>Create Ticket</NavText>
                        </NavItem>
                        <NavItem eventKey="ticket-history">
                            <NavText>Ticket History</NavText>
                        </NavItem>
                        <NavItem eventKey="ticket-search">
                            <NavText>Search</NavText>
                        </NavItem>
                    </NavItem>
                    {/* CUSTOMER */}
                    <NavItem eventKey="customer">
                        <NavIcon><i className="fa-solid fa-user" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Customer</NavText>
                        <NavItem eventKey="customer-create">
                            <NavText>Create Customer</NavText>
                        </NavItem>
                        <NavItem eventKey="customer-edit">
                            <NavText>Edit Customer</NavText>
                        </NavItem>
                        <NavItem eventKey="customer-search">
                            <NavText>Search</NavText>
                        </NavItem>
                    </NavItem>
                    {/* TECHNICIAN */}
                    <NavItem eventKey="technician">
                        <NavIcon><i className="fa-solid fa-user-tie" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Technician</NavText>
                        <NavItem eventKey="technician-create">
                            <NavText>Create Technician</NavText>
                        </NavItem>
                        <NavItem eventKey="technician-edit">
                            <NavText>Edit Technician</NavText>
                        </NavItem>
                        <NavItem eventKey="technician-search">
                            <NavText>Search</NavText>
                        </NavItem>
                    </NavItem>
                    {/* ADMIN */}
                    <NavItem eventKey="admin">
                        <NavIcon><i className="fa-solid fa-user-gear" style={{ fontSize: "1.5em" }}></i></NavIcon>
                        <NavText>Admin</NavText>
                        <NavItem eventKey="admin-create">
                            <NavText>Create Admin</NavText>
                        </NavItem>
                        <NavItem eventKey="admin-edit">
                            <NavText>Create Admin</NavText>
                        </NavItem>
                        <NavItem eventKey="admin-search">
                            <NavText>Search</NavText>
                        </NavItem>
                    </NavItem>

                </SideNav.Nav>


                {/* <div className="container">
                        <Link to="/">
                            <button className="btn btn-primary">Home</button>
                        </Link>
                    </div>
                </div> */}

            </SideNav>

        </>
    );
};