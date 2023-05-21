const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			token: null,

			user: {}

		},

		actions: {

			// login: async (email, password) => {
			// 	const response = await fetch(process.env.BACKEND_URL + "/api/login", {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		},
			// 		body: JSON.stringify({
			// 			email: email,
			// 			password: password
			// 		})
			// 	});
			// 	if (response.ok) {
			// 		const data = await response.json();
			// 		localStorage.setItem("token", data.token);
			// 		setStore({ token: data.token })
			// 		return true;
			// 	}
			// }

		}
	};
};

export default getState;
