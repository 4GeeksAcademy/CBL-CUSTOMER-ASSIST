const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			userType: null,
			message: null,
			customerTickets: [],
			equipmentList: [],
			tickets: [],
			userProfile: {user_info : {}, customer_info : {}, employee_info : {}},
			customerEquipmentTickets: [],
			user: null,
			modalTitle: null,
			modalBody: null,
			liveToastHeader: null,
			liveToastBody: null,
			userList: []
		}, 
		actions: {
			syncTokenFromSessionStorage: () => {
				if (sessionStorage.getItem('token')) return setStore({ token: JSON.parse(sessionStorage.getItem('token')) });
			},

			syncEquipmentListFromSessionStorage: () => {
				if (sessionStorage.getItem('equipmentList')) return setStore({ equipmentList: JSON.parse(sessionStorage.getItem('equipmentList')) });
			},

			syncUserListFromSessionStorage: () => {
				if (sessionStorage.getItem('userList')) return setStore({ userList: JSON.parse(sessionStorage.getItem('userList')) });
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
						return false;
					}


					await getActions().sessionStorageAndSetStoreDataSave('token', data.access_token);
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
				setStore({ equipmentList: [] });
				setStore({ interventionType: [] });
				setStore({ tickets: [] });
				setStore({ userProfile: { user_info: {}, customer_info: {}, employee_info: {} } });

				return true;
			},

			getCustomerEquipment: async () => {
				console.log('action: getCustomerEquipment');
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/customer/equipment", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				getActions().sessionStorageAndSetStoreDataSave('equipmentList', data.equipments);
				// needs to have error handle
			},

			getAdminEquipment: async () => {
				console.log('action: getAdminEquipment');
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/admin/equipments", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				getActions().sessionStorageAndSetStoreDataSave('equipmentList', data.equipments);
				// needs to have error handle
			},

			customerCreateTicket: async (equipmentId, interventionType, subject, description) => {
				console.log("action: createCustomerTicket");
				const token = getStore().token;
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						equipment_id: equipmentId,
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
						// return [response.status, data.msg];
						return false;
					}
					console.log("This came from the backend", data);

					if ('tickets' in data) await getActions().sessionStorageAndSetStoreDataSave('tickets', data.tickets);
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

			updateUserProfileLocally: (data) => {
				let newUserProfile = {};
				Object.assign(newUserProfile, getStore().userProfile);
				
				const infoKeys = Object.keys(getStore().userProfile);

				const updateValues = (infos, data) => {
					infos.map((info) => {
						if(info in data) {
							Object.keys(data[info]).map((key) => {
								newUserProfile[info][key] = data[info][key];
							})
						}
					});
					getActions().sessionStorageAndSetStoreDataSave('userProfile', newUserProfile);
				}

				updateValues(infoKeys, data)
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

					// if(response.status === 304) return true;

					const data = await response.json();

					if (response.status !== 200) {
						console.log(response.status, data.msg);
						return [response.status, data.msg];
					}
					console.log("Getting to response Admin tickets");
					console.log("This came from the backend", data);

					if ('tickets' in data) await getActions().sessionStorageAndSetStoreDataSave('tickets', data.tickets);
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
				}
			},

			getCustomerEquipmentTickets: (data) => {
				setStore({customerEquipmentTickets: data})
			},

			userToastAlert: (header, body) => {
				setStore(
					{
						liveToastHeader: header,
						liveToastBody: body
					}
				);

				const liveToast = document.getElementById('liveToast');
				const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);

				toastBootstrap.show();
			},

			updateShowModal: (title, body) => {
				const myModal = document.querySelector('#modalTicketInfo');

				setStore(
					{
						modalTitle: title,
						modalBody: body
					}
				);

				new bootstrap.Modal(myModal).toggle();
			},

			getAdminUserList: async () => {
				console.log('action: getAdminUserList');
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/admin/user/list", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				getActions().sessionStorageAndSetStoreDataSave('userList', data.users);
				// needs to have error handle
			},
		}
	};
};

export default getState;
