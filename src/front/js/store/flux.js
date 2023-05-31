const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: {},
			message: null,
			customerTickets: [],
			machineList: [],
			interventionType: [],
			tickets: []
		},
		actions: {
			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem('token');
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			login: async (email, password) => {
				console.log("actions: login")
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

			getMachineList: async () => {
				console.log('action: getMachineList');
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/machinelist", opts);
				if (response.status != 200) {
					alert("Something went wrong with your authorization!");
					return false;
				}

				const data = await response.json();
				console.log("action machineList return: ", data);
				setStore({ "machineList": data.machines });
				console.log(getStore().machineList);
			},

			getInterventionType: async () => {
				console.log('action: getInterventionType');
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

			customerCreateTicket: async (machineId, interventionId, description) => {
				console.log("action: createCustomerTicket");
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

			getTickets: async () => {
				console.log("action: getTickets");
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/ticketlist", opts);
					if (response.status !== 200) {
						alert("There has been some error!");
						return false;
					}
					console.log("Getting to response");
					const data = await response.json();
					console.log("This came from the backend", data);
					setStore({ "tickets": data.machines });
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
				}
			},

			getUserProfile: async () => {
				console.log("action: getUserProfile");
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/user/profile", opts);
					if (response.status !== 200) {
						alert("There has been some error!");
						return false;
					}
					console.log("Getting to response");
					const data = await response.json();
					console.log("This came from the backend", data);
					setStore({ "userProfile": data.user_profile });
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
				}
			}
		}
	};
};

export default getState;
