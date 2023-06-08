import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		navigate("/");
	}

	return (
		<>
			<nav className="navbar navbar-light bg-dark">
				<div className="container">
					<Link to="/">
						<button className="btn btn-light">Home/Logo</button>
					</Link>
					<div className="ml-auto">
						{!store.token ?
							<Link to="/login">
								<button className="btn btn-light me-3">Login</button>
							</Link>
							:
							<button onClick={() => handleLogout()} className="btn btn-light me-3">Logout</button>
						}
					</div>
				</div>
			</nav>

		</>
	);
};
