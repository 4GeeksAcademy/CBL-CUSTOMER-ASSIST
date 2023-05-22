const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: {}
		},
		actions: {
			login: async (email, password) => {
				// const response = await fetch(process.env.BACKEND_URL + "/api/login", {
				const response = await fetch("https://cl4ud3pt-friendly-memory-6xrqpvq6vjx354r4-3001.preview.app.github.dev/" + "api/token", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				if (response.ok) {
					const data = await response.json();
					console.log("cheguei à resposta ok")
					console.log(data)
					// localStorage.setItem("token", data.token);
					// setStore({ token: data.token })
					return true;
				}
			}

		}
	};
};

export default getState;
