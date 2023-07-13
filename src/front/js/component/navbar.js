import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useNavigate } from "react-router-dom";

//include your index.scss file into the bundle
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const userType = store.userProfile.user_info ? store.userProfile.user_info.user_type : "";
	const [display, setDisplay] = useState("");

	useEffect(() => {
		if(userType !== "" && userType !== undefined){
			if (userType === "customer") setUserName(store.userProfile.customer_info.company_name)
			else setUserName(`${store.userProfile.employee_info.first_name} ${store.userProfile.employee_info.last_name}`  )
		}
	}, [userType])

	return (
		<header className="navbar navbar-expand-lg bd-navbar sticky-top bg-secondary">
			<nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap align-items-center" aria-label="Main navigation">
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
						<span className="navbar-brand p-0 me-0 me-lg-2" aria-label="CBL Desk">CBL Desk</span>
					</div>
				</div>
				{/* User Name & Type */}
				{/* <div >
					<div>{renderUserType()}</div>
				</div> */}
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
								<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<i className="fs-4 fa-regular fa-circle-user"></i>
								</button>
								<ul className="dropdown-menu dropdown-menu-end">
									<li>
										<Link to={`${userType === 'admin' ? '/admin/edit/profile' : userType === 'engineer' || userType === 'technician' ? '/employee/edit/profile' : '/customer/edit/profile'}`}>
											<button className="dropdown-item">Edit Profile</button>
										</Link>
									</li>
									<li><button onClick={() => {
										setUserName("");
										actions.logout();
										setDisplay("")
										navigate("/")
									}} className="btn btn-light me-3">Logout</button></li>
								</ul>
							</div>
						</div>
					}
				</div>
			</nav>
		</header>
	);
};
