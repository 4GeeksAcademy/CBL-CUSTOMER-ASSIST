import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useNavigate } from "react-router-dom";

//include your index.scss file into the bundle
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const userType = store.userProfile.user_info.user_type;
	const [display, setDisplay] = useState("");

	const renderUserType = () => {
		useEffect(() => {
			if (userType === "customer") setDisplay(store.userProfile.customer_info.company_name);
			else if (userType === "admin") setDisplay(() => {
				const adminName = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
				return adminName(store.userProfile.user_info.user_type) + " " + store.userProfile.employee_info.first_name
			})
			else if (userType === "technician") setDisplay(() => {
				const adminName = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
				return adminName(store.userProfile.user_info.user_type) + `${ store.userProfile.employee_info.first_name}`
			})
			else if ((userType === "engineer")) setDisplay(() => {
				const adminName = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
				return adminName(store.userProfile.user_info.user_type) + `${ store.userProfile.employee_info.first_name}`
			});
		},[userType])
		return <div className="text-white fs-5 p-0 me-0 me-lg-2">{display}</div>
	}

	return (
		<header className="navbar navbar-expand-lg bd-navbar sticky-top bg-secondary">
			{/* {console.log("vvvvvvvvvvvvvvvvvv")}
			{console.log(store.userProfile.employee_info.first_name)}
			{console.log("XXXXXXXXXXXXXXXXXX")}
			{console.log(store.userProfile.user_info.user_type)}
			{console.log("DISPLAY")}
			{console.log(display)} */}
			<nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap align-items-center" aria-label="Main navigation">
				<div className="d-flex align-items-center ">

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
				<div >
					<div>{renderUserType()}</div>
				</div>

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
										actions.logout();
										navigate("/")
									}} className="btn btn-light me-3">Logout</button></li>
								</ul>
							</div>
						</div>
					}
				</div>
			</nav>
		</header>
		// <nav className="navbar navbar-expand-lg bd-navbar bg-secondary">

		// 	{/* HIDDEN BUTTON FOR SIDEBAR */}
		// 	<div className="bd-navbar-toggle">
		// 		<button className="navbar-toggler p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar" aria-controls="bdSidebar" aria-label="Toggle docs navigation">
		// 			<i className="fa-solid fa-bars"></i>
		// 			<span className="d-none fs-6 pe-1">Browse</span>
		// 		</button>
		// 	</div>
		// 	<div className="container-fluid">
		// 		<span className="navbar-brand mb-0 h1">CBL Desk</span>
		// 	</div>
		// 	<div className="ml-auto">
		// 		{!store.token
		// 		?
		// 		<Link to="/login">
		// 			<button className="btn btn-light me-3">Login</button>
		// 		</Link>
		// 		: 
		// 		<div>
		// 			<div className="dropdown">
		// 				<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
		// 					<i className="fs-4 fa-regular fa-circle-user"></i>
		// 				</button>
		// 				<ul className="dropdown-menu dropdown-menu-end">
		// 					<li>
		// 						<Link to={"/edit/customer/profile"}>
		// 							<button className="dropdown-item">Edit Profile</button>
		// 						</Link>
		// 					</li>
		// 					<li><button onClick={() => {
		// 						actions.logout();
		// 						navigate("/")
		// 					}} className="btn btn-light me-3">Logout</button></li>
		// 				</ul>
		// 			</div>
		// 		</div>
		// 		}
		// 	</div>
		// </nav>

		//   <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Offcanvas navbar large">
		//     <div className="container-fluid">



		//       	<h2 className="navbar-brand" href="#">CBL DESK</h2>
		// 		<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
		// 			<span className="navbar-toggler-icon" />
		// 		</button>

		//       <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
		//         <div className="offcanvas-header">
		//           <h5 className="offcanvas-title" id="offcanvasNavbar2Label">User options</h5>
		//           <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"/>
		//         </div>
		//         <div className="offcanvas-body">
		//         {/* CONTENT IN HERE */}

		//         </div>
		//       </div>
		//     </div>
		//   </nav>
	);
};
