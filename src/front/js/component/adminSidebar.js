import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const AdminSidebar = () => {
	const { store, actions } = useContext(Context);
	// const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	
	return (
		<div className="offcanvas-lg offcanvas-start border-end h-100" tabIndex="-1" id="bdSidebar" aria-labelledby="bdSidebarOffcanvasLabel">
			<div className="offcanvas-header border-bottom bg-body-secondary">
				<h5 className="offcanvas-title" id="bdSidebarOffcanvasLabel">Admin options</h5>
				<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdSidebar"></button>
			</div>

			<div className="offcanvas-body">
				<nav className="bd-links w-100" id="bd-docs-nav" aria-label="Docs navigation">
					<ul className="bd-links-nav list-unstyled mb-0 pb-3 pb-md-2 pe-lg-2">

						{/* DASHBOARD */}
						<li className={`bd-links-group py-2 ${location === "/admin/dashboard" ? "active" : ""}`} data-bs-target="#bdSidebar" data-bs-dismiss="offcanvas">
							<Link className="text-decoration-none sidebar-main-option" to={'/admin/dashboard'}>
								<strong className="bd-links-heading d-flex w-100 align-items-center fw-semibold">
									<i className="fa-solid fa-gauge-high bi me-2 sidebar-icon"></i>Dashboard
								</strong>
							</Link>
						</li>

						{/* TICKETS */}
						<li className="bd-links-group py-2" data-bs-target="#bdSidebar" data-bs-dismiss="offcanvas">
							<Link className="text-decoration-none sidebar-main-option" to={'admin/tickets'}>
								<strong className="bd-links-heading d-flex w-100 align-items-center fw-semibold">
									<i className="fa-solid fa-ticket bi me-2" style={{ color: "#210b61" }}></i>Tickets
								</strong>
							</Link>
							<ul className="list-unstyled fw-normal pb-2 small">
								<Link to={'/admin/tickets/new'}>
									<li><span className="bd-links-link d-inline-block rounded">New</span></li>
								</Link>
								<Link to={'/admin/tickets/opened'}>
									<li><span className="bd-links-link d-inline-block rounded">Opened</span></li>
								</Link>
								<Link to={'/admin/tickets/inprogress'}>
									<li><span className="bd-links-link d-inline-block rounded">In Progress</span></li>
								</Link>
								<Link to={'/admin/tickets/resolved'}>
									<li><span className="bd-links-link d-inline-block rounded">Resolved</span></li>
								</Link>
								{/* <Link to={'/admin/create/ticket'}>
									<li><strong><span className="bd-links-link d-inline-block rounded">Create Ticket</span></strong></li>
								</Link> */}
							</ul>
						</li>
						
						
						{/* USERS */}
						<li className="bd-links-group py-2" data-bs-target="#bdSidebar" data-bs-dismiss="offcanvas">
							<Link className="text-decoration-none sidebar-main-option" to={'admin/contact/list'}>
								<strong className="bd-links-heading d-flex w-100 align-items-center fw-semibold">
									<i className="fa-solid fa-users bi me-2" style={{ color: "#210b61" }}></i>Users
								</strong>
							</Link>
							{/* <ul className="list-unstyled fw-normal pb-2 small">
								<Link to={'admin/contact/list'}>
									<li><span className="bd-links-link d-inline-block rounded">All Users</span></li>
								</Link> */}
								{/* <Link to={'create/customer'}>
									<li><span className="bd-links-link d-inline-block rounded">Create Customer</span></li>
								</Link>
								<Link to={'create/employee'}>
									<li><span className="bd-links-link d-inline-block rounded">Create Employee</span></li>
								</Link> */}
							{/* </ul> */}
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};
