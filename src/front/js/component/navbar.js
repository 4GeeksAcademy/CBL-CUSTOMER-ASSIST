import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

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
							<button onClick={() => actions.logout()} className="btn btn-light me-3">Logout</button>
						}
					</div>
				</div>
			</nav>

		</>
	);
};
