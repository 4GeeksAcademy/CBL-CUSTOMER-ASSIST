import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useNavigate, NavLink, useLocation } from "react-router-dom";

export const EmployeeSidebar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();
	const userType = store.userProfile.user_info.user_type;

	return (
		<div className="offcanvas-lg offcanvas-start border-end h-100" tabIndex="-1" id="bdSidebar" aria-labelledby="bdSidebarOffcanvasLabel">
			<div className="offcanvas-header border-bottom bg-sidebar">
				<h5 className="offcanvas-title" id="bdSidebarOffcanvasLabel">{userType === 'Technician' ? 'Technician' : 'Engineer'} options</h5>
				<button type="button" className="btn-close bg-button-white" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdSidebar"></button>
			</div>

			<div className="offcanvas-body">
				<nav className="bd-links w-100" id="bd-docs-nav" aria-label="Docs navigation">
					<ul className="bd-links-nav d-flex flex-column list-unstyled mb-0 pb-3 pb-md-2">

						{/* DASHBOARD */}
						<li className={`bd-links-group py-2 sidebar-main-option ${location.pathname === "/employee/dashboard" ? "active" : ""}`}
							data-bs-target="#bdSidebar"
							data-bs-dismiss="offcanvas">
							<NavLink className="text-decoration-none" to={'employee/dashboard'}>
							<strong className="d-flex w-100 align-items-center fw-semibold">
							<i className={`fa-solid fa-gauge-high bi me-2 ${location.pathname === "/employee/dashboard" ? "sidebar-icon" : ""}`}></i>Dashboard
								</strong>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};
