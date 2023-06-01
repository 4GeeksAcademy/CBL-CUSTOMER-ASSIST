import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<>
			<nav className="navbar navbar-light bg-dark">
				<div className="container">
					<Link to="/">
						<button className="btn btn-light"><i className="fa-solid fa-house"></i></button>
					</Link>
					<div className="ml-auto">
						{!store.token ?
							<Link to="/login">
								<button className="btn btn-light me-3">Login</button>
							</Link>
							: <div>
								<div className="dropdown">
									<button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
										<i className="fs-4 fa-regular fa-circle-user"></i>
									</button>
									<ul className="dropdown-menu">
										<li><a className="dropdown-item" href="/edit/customer/profile">Edit Profile</a></li>
										<li><button onClick={() => {
											actions.logout();
											navigate("/")
										}} className="btn btn-light me-3">Logout</button></li>
									</ul>
								</div>
							</div>
						}
					</div>
				</div>
			</nav>

		</>
	);
};
