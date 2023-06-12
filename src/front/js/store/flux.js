const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: {},
			message: null,
			customerTickets: [],
			machineList: [],
			tickets: [],
			userProfile: {user_info : {}, customer_info : {}, employee_info : {}}
		},
		actions: {
			syncTokenFromSessionStorage: () => {
				console.log("actions: syncTokenFromSessionStorage");
				if (sessionStorage.getItem('token')) return setStore({ token: JSON.parse(sessionStorage.getItem('token')) });
			},

			syncMachineListFromSessionStorage: () => {
				console.log("actions: syncDataFromSessionStorage");
				if (sessionStorage.getItem('machineList')) return setStore({ machineList: JSON.parse(sessionStorage.getItem('machineList')) });
			},
			
			syncTicketsFromSessionStorage: () => {
				if (sessionStorage.getItem('tickets')) return setStore({ tickets: JSON.parse(sessionStorage.getItem('tickets')) });
			},

			syncUserProfileFromSessionStorage: () => {
				if (sessionStorage.getItem('userProfile')) return setStore({ userProfile: JSON.parse(sessionStorage.getItem('userProfile')) });
			},

			sessionStorageAndSetStoreDataSave: (key, data) => {
				sessionStorage.setItem([key], JSON.stringify(data));
				 setStore({ [key]: data });
				 return true;
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

					getActions().sessionStorageAndSetStoreDataSave('token', data.access_token);

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
				setStore({ userProfile: {user_info : {}, customer_info : {}, employee_info : {}}});

				return true;
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
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				getActions().sessionStorageAndSetStoreDataSave('machineList', data.machines);
			},

			customerCreateTicket: async (machineId, interventionType, subject, description) => {
				console.log("action: createCustomerTicket");
				console.log("Intervention type: ", interventionType);
				const token = getStore().token;
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						machine_id: machineId,
						intervention_type: interventionType,
						subject: subject,
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

					await getActions().sessionStorageAndSetStoreDataSave('tickets', data.tickets);
					console.log("@@@@@@@@@@@@@");
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
					const data = await response.json();

					if (response.status !== 200) {
						console.log(response.status, data.msg);
						return [response.status, data.msg];
					}

					console.log("This came from the backend", data);

					getActions().sessionStorageAndSetStoreDataSave('userProfile', data.user_profile);
					// return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
				}
			},

			updateUserProfile: async (data) => {
				console.log("action: updateUserProfile");
				const token = getStore().token;
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify(data)
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/user/profile/update", opts);
					const data = await response.json();

					if (response.status !== 200) {
						console.log(response.status, data.msg);
						return [response.status, data.msg];
					}

					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}
				catch (error) {
					console.log("There has been an error login in!", error)
				}
			},

			getAdminTickets: async () => {
				console.log("action: getAdminTickets");
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/admin/ticketlist", opts);
					console.log('response getAdminTickets', response)
					const data = await response.json();


					if (response.status !== 200) {
						console.log(response.status, data.msg);
						return [response.status, data.msg];
					}
					console.log("Getting to response");
					console.log("This came from the backend", data);

					await getActions().sessionStorageAndSetStoreDataSave('tickets', data.tickets);
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
				}
			},

			
		}
	};
};

export default getState;
