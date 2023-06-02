const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: {},
			message: null,
			customerTickets: [],
			machineList: [],
			interventionType: [],
			tickets: [],
			userProfile: {
				"address_1": "123 Main Street",
				"address_2": "Building 789, 2nd Floor",
				"city": "New York",
				"company_name": "Automotive Parts",
				"contact_person": null,
				"id": 1,
				"phone": "5551234567",
				"user_info": {
					"customer_id": 1,
					"email": "customer1@email.com",
					"password": "customer1",
					"employee_id": null,
					"id": 4,
					"user_type": "customer",
					"user_type_id": 4
				},
				"zipcode": 12345
			}
		},
		actions: {
			syncTokenFromSessionStorage: () => {
				console.log("actions: syncTokenFromSessionStorage");
				if (sessionStorage.getItem('token')) return setStore({ token: JSON.parse(sessionStorage.getItem('token')) });
				// const token = sessionStorage.getItem('token');
				// if (token && token != "" && token != undefined) setStore({ token: token });
			},

			syncMachineListFromSessionStorage: () => {
				console.log("actions: syncDataFromSessionStorage");
				if (sessionStorage.getItem('machineList')) return setStore({ machineList: JSON.parse(sessionStorage.getItem('machineList')) });
			},

			syncInterventionTypeFromSessionStorage: () => {
				if (sessionStorage.getItem('interventionType')) return setStore({ interventionType: JSON.parse(sessionStorage.getItem('interventionType')) });
			},

			syncTicketsFromSessionStorage: () => {
				if (sessionStorage.getItem('tickets')) return setStore({ tickets: JSON.parse(sessionStorage.getItem('tickets')) });
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
					const data = await response.json();

					if (response.status !== 200) {
						console.log(data.msg);
						return false;
					}

					console.log("This came from the backend", data);
					sessionStorage.setItem("token", JSON.stringify(data.access_token));
					setStore({ token: data.access_token })
					return true;
				}
				catch (error) {
					console.log("Contact service support", error);
					return "error";
				}
			},


			logout: () => {
				console.log("Logout: erasing user data!")
				sessionStorage.clear();
				setStore({ token: null });
				setStore({ machineList: [] });
				setStore({ interventionType: [] });
				setStore({ tickets: [] });

				return true;
			},

			// getMessage: async () => {
			// 	const token = getStore().token;
			// 	const opts = {
			// 		headers: {
			// 			"Authorization": "Bearer " + token
			// 		}
			// 	}
			// 	const response = await fetch(process.env.BACKEND_URL + "api/hello", opts);
			// 	if (response.status != 200) {
			// 		alert("Something went wrong with your authorization!");
			// 		return false;
			// 	}

			// 	const data = await response.json();
			// 	setStore({ "message": data.message });
			// 	console.log(getStore().message);
			// },

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
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				sessionStorage.setItem('machineList', JSON.stringify(data.machines));
				setStore({ "machineList": JSON.parse(sessionStorage.getItem('machineList')) });
				console.log(getStore().machineList); // delete
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
				const data = await response.json();

				if (response.status != 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				sessionStorage.setItem('interventionType', JSON.stringify(data.intervention_type));
				setStore({ "interventionType": JSON.parse(sessionStorage.getItem('interventionType')) });
				console.log(getStore().interventionType); // delete

				// setStore({ "interventionType": data.intervention_type });
				// return true;
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
					const data = await response.json();

					if (response.status !== 200) {
						console.log(response.status, data.msg);
						return [response.status, data.msg];
					}
					console.log("Getting to response");
					console.log("This came from the backend", data);

					sessionStorage.setItem('tickets', JSON.stringify(data.tickets));
					setStore({ "tickets": JSON.parse(sessionStorage.getItem('tickets')) });
					console.log(getStore().tickets); // delete
					// setStore({ "tickets": data.machines });
					// return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
				}
			},

			getUserProfile: async () => {
				console.log("action: getUserProfile");
				console.log(token)
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
