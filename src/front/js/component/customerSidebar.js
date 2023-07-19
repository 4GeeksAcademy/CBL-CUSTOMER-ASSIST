import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useNavigate, useLocation, NavLink } from "react-router-dom";

export const CustomerSidebar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	return (
		<div className="offcanvas-lg offcanvas-start border-end h-100" tabIndex="-1" id="bdSidebar" aria-labelledby="bdSidebarOffcanvasLabel">
			<div className="offcanvas-header border-bottom bg-sidebar">
				<h5 className="offcanvas-title" id="bdSidebarOffcanvasLabel">Customer options</h5>
				<button type="button" className="btn-close bg-button-white" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdSidebar"></button>
			</div>

			<div className="offcanvas-body">
				<nav className="bd-links w-100" id="bd-docs-nav" aria-label="Docs navigation">
					<ul className="bd-links-nav d-flex flex-column list-unstyled mb-0 pb-3 pb-md-2">

						{/* DASHBOARD */}
						<li className="bd-links-group"
							data-bs-target="#bdSidebar"
							data-bs-dismiss="offcanvas">
							<NavLink className="d-flex py-2 sidebar-main-option text-decoration-none" to={'customer/dashboard'}>
								<strong className="d-flex w-100 align-items-center fw-semibold">
									<i className={`fa-solid fa-gauge-high bi me-2 ${location.pathname === "/customer/dashboard" ? "sidebar-icon" : ""}`}></i>Dashboard
								</strong>
							</NavLink>
						</li>

						{/* TICKETS */}
						<li className="bd-links-group"
							data-bs-target="#bdSidebar"
							data-bs-dismiss="offcanvas">
							<NavLink className="d-flex py-2 sidebar-main-option text-decoration-none" to={'/customer/create/ticket'}>
								<strong className="d-flex w-100 align-items-center fw-semibold">
									<i className={`fa-solid fa-ticket bi me-2 ${location.pathname === "/customer/create/ticket" ? "sidebar-icon" : ""}`}></i>Create Ticket
								</strong>
							</NavLink>
						</li>

						{/* EQUIPMENTS */}
						<li className="bd-links-group"
						data-bs-target="#bdSidebar"
						data-bs-dismiss="offcanvas">
							<NavLink className="d-flex py-2 sidebar-main-option text-decoration-none" to={'/customer/equipment/list'}>
								<strong className="d-flex w-100 align-items-center fw-semibold">
									<i className={`fa-solid fa-gears bi me-2 ${location.pathname === "/customer/equipment/list" ? "sidebar-icon" : ""}`}></i>My Equipment
								</strong>
							</NavLink>
							{/* <ul className="list-unstyled fw-normal pb-2 small">
								<li><span className="bd-links-link d-inline-block rounded">Create Ticket</span></li>
							</ul> */}
						</li>
						{/* Help */}
						{/* <li className="bd-links-group py-2" data-bs-target="#bdSidebar" data-bs-dismiss="offcanvas">
							<Link className="link" to={'/customer/help/guide'}>
								<strong className="bd-links-heading d-flex w-100 align-items-center fw-semibold">
									<i className="fa-solid fa-circle-question me-1" style={{ color: "blue" }}></i>Help
								</strong>
							</Link>
						</li> */}
					</ul>
				</nav>
			</div>
		</div>
	);
};
