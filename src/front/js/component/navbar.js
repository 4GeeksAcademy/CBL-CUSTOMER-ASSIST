import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-light bg-dark">
				<div className="container">
					<Link to="/">
						<button className="btn btn-light">Home/Logo</button>
					</Link>
					<div className="ml-auto">
						<Link to="/login">
							<button className="btn btn-light me-3">Login</button>
						</Link>
					</div>
				</div>
			</nav>

		</>
	);
};
