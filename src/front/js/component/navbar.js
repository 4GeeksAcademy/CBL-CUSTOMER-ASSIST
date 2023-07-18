import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useNavigate } from "react-router-dom";

//include your index.scss file into the bundle
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	// const [userName, setUserName] = useState("");
	const employees = ['admin', 'technician', 'engineer'];
	const userName = employees.includes(store.userProfile.user_info.user_type) ? `${store.userProfile.employee_info.first_name} ${store.userProfile.employee_info.last_name}` : store.userProfile.customer_info.company_name;
	const userType = store.userProfile.user_info ? store.userProfile.user_info.user_type : "";
	const [display, setDisplay] = useState("");

	// useEffect(() => {
	// 	if (userType !== "" && userType !== undefined) {
	// 		if (userType === "customer") setUserName(store.userProfile.customer_info.company_name)
	// 		else setUserName(`${store.userProfile.employee_info.first_name} ${store.userProfile.employee_info.last_name}`)
	// 	}
	// }, [userType, store.userProfile.employee_info.first_name])

	return (
		<header className="navbar navbar-expand-lg bd-navbar sticky-top bg-cbl" style={{minHeight: "65px"}}>
			<nav className="container-xxl flex-wrap flex-lg-nowrap align-items-center" aria-label="Main navigation">
				<div className="d-flex align-items-center me-auto">

					{/* HAMBURGER FOR SIDEBAR */}
					{'user_type' in store.userProfile.user_info
						? (<div className="bd-navbar-toggle">
							<button className="navbar-toggler p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar" aria-controls="bdSidebar" aria-label="Toggle docs navigation">
								<i className="fa-solid fa-bars"></i>
								<span className="d-none fs-6 pe-1">Browse</span>
							</button>
						</div>)
						: null}

					{/* LOGO */}
					<div>
						<span className="navbar-brand p-0 me-auto" aria-label="CBL Desk">CBL Desk</span>
					</div>
				</div>
				{userName !== "" || userName !== undefined ?
					<div className="text-white me-2 text-end  lh-1">
						<p className="m-0 fw-semibold">{userName}</p>
						<p className="m-0 fst-italic" style={{ fontSize: ".75rem" }}>{userType}</p>
					</div>
					: null
				}

				{/* Dropdown Button */}
				<div className="ml-auto">
					{!store.token
						?
						// <Link to="/login">
						// 	<button className="btn btn-light me-3">Login</button>
						// </Link>
						null
						:
						<div>
							<div className="dropdown">
								<button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<i className="fs-4 fa-regular fa-circle-user"></i>
								</button>
								<ul className="dropdown-menu dropdown-menu-end mx-0 shadow w-220px">
									<li>
										<Link className="dropdown-item d-flex gap-2 align-items-center" to={`${employees.includes(userType) ? '/employee/edit/profile' : '/customer/edit/profile'}`}>
											<i className="fa-solid fa-user-pen"></i>Edit Profile
										</Link>
									</li>
									<li><hr className="dropdown-divider" /></li>
									<li> 
									<div className="dropdown-item d-flex gap-2 align-items-center btn align-items-center"
										onClick={() => {
											// setUserName("");
											actions.logout();
											setDisplay("")
											navigate("/")
										}}><i className="fa-solid fa-circle-xmark"></i>Logout
										</div>
									</li>
								</ul>
							</div>
						</div>
					}
				</div>
			</nav>
		</header>
	);
};
