const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: {},
			message: null,
			customerTickets: [],
			machineList: [],
			interventionType: []
		},
		actions: {
			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem('token');
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/token", opts);
					if (response.status !== 200) {
						alert("There has been some error!");
						return false;
					}

					const data = await response.json();
					console.log("This came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!")
				}
			},

			logout: () => {
				sessionStorage.removeItem('token');
				console.log("Login out")
				setStore({ token: null });
			},

			getMessage: async () => {
				const token = getStore().token;
				const opts = {
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/hello", opts);
				if (response.status != 200) {
					alert("Something went wrong with your authorization!");
					return false;
				}

				const data = await response.json();
				setStore({ "message": data.message });
				console.log(getStore().message);
			},

			getMachineList: async (customerId) => {
				console.log('getMachineList');
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/machinelist/" + customerId, opts);
				if (response.status != 200) {
					alert("Something went wrong with your authorization!");
					return false;
				}

				const data = await response.json();
				console.log(data);
				setStore({ "machineList": data.machines });
				console.log(getStore().machineList);
			},

			getInterventionType: async () => {
				console.log('getInterventionType');
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/interventiontype", opts);
				if (response.status != 200) {
					alert("Something went wrong with your authorization!");
					return false;
				}

				const data = await response.json();
				console.log(data.intervention_type);
				setStore({ "interventionType": data.intervention_type });
				console.log(getStore().interventionType);
			},

			createCustomerTicket: async (machineId, interventionId, description) => {
				const token = getStore().token;
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						machine_id: machineId,
						intervention_id: interventionId,
						description: description
					})
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/customer/create/ticket", opts);
					if (response.status !== 201) {
						alert("There has been some error!");
						return false;
					}

					const data = await response.json();
					console.log("This came from the backend", data);
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!")
				}
			},
		}
	};
};

export default getState;
