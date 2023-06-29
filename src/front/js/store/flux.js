import equipmentPhotoUrl from "../../assets/img/dm160.jpg";
import vehiclePhotoUrl from "../../assets/img/8568jn.jpeg";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			userType: null,
			message: null,
			customerTickets: [],
			equipmentList: [],
			tickets: [],
			manufacturerAddress: "Mecânica Exacta, S.A., Rua António Gomes da Cruz, São Paio de Oleiros", // TODO
			assignedTicket: {
				"id": 11,
				"status": "Opened",
				"intervention_type": true,
				"subject": "Main motor doesn't start",
				"description": "After main switch turned on and after all safety validations, the main motor doesn't start!",
				"vehicle": { // TODO
					licence_plate: "85-68-JN",
					model: "Megane",
					maker: "Renault",
					photo: vehiclePhotoUrl
				},
				"customer": {
					id: 1,
					company_name: "Automotive Parts",
					phone: 5551234567,
					contact_person: "Abe Lashtar",
					address_1: "R. Vale do Grou",
					address_2: "1378",
					zipcode: "3754-908",
					city: "Águeda",
					company_email: "automotive.parts@email.com",
					customer_email: "customer1@email.com",
					authentication: { // TODO
						user_email: "customer1@email.com",
						password: "Y3VzdG9tZXIx"
					}
				},
				"equipment": {
					"id": 4,
					"serial_number": "AA0101",
					"model": "CC63",
					"im109": 101,
					"photo": equipmentPhotoUrl, // TODO: IMPROVEMENT
					"knowledge": [
						{
							"id": 16,
							"category": {
								"id": 2,
								"description": "Mechanical"
							},
							"malfunction": {
								"id": 3,
								"description": "Malfunction 3"
							},
							"solution": {
								"id": 3,
								"description": "Solution 3"
							}
						},
						{
							"id": 17,
							"category": {
								"id": 2,
								"description": "Mechanical"
							},
							"malfunction": {
								"id": 6,
								"description": "Malfunction 6"
							},
							"solution": {
								"id": 6,
								"description": "Solution 6"
							}
						}
					]
				},
			},
			categoryOptions: [ // TODO
				{
					"label": "Electrical",
					"value": "Electrical"
				},
				{
					"label": "Mechanical",
					"value": "Mechanical"
				},
				{
					"label": "Software",
					"value": "Software"
				}
			],
			knowledges: [ // TODO
				{
					"category": "Electrical",
					"id": 1,
					"malfunction": "Malfunction lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum      1",
					"solution": "Solution lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lolorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  1"
				},
				{
					"category": "Electrical",
					"id": 2,
					"malfunction": "Malfunction 2",
					"solution": "Solution 2"
				},
				{
					"category": "Mechanical",
					"id": 3,
					"malfunction": "Malfunction 3",
					"solution": "Solution 3"
				},
				{
					"category": "Software",
					"id": 4,
					"malfunction": "Malfunction 4",
					"solution": "Solution 4"
				},
				{
					"category": "Mechanical",
					"id": 5,
					"malfunction": "Malfunction 5",
					"solution": "Solution 5"
				},
				{
					"category": "Mechanical",
					"id": 6,
					"malfunction": "Malfunction 6",
					"solution": "Solution 6"
				},
				{
					"category": "Software",
					"id": 7,
					"malfunction": "Malfunction 7",
					"solution": "Solution 7"
				},
				{
					"category": "Electrical",
					"id": 8,
					"malfunction": "Malfunction 8",
					"solution": "Solution 8"
				},
				{
					"category": "Software",
					"id": 9,
					"malfunction": "Malfunction 9",
					"solution": "Solution 9"
				},
				{
					"category": "Mechanical",
					"id": 10,
					"malfunction": "Malfunction 10",
					"solution": "Solution 10"
				}
			],
			userProfile: {user_info : {}, customer_info : {}, employee_info : {}},
			customerEquipmentTickets: [],
			user: null,
			modalTitle: null,
			modalBody: null,
			liveToastHeader: null,
			liveToastBody: null,
			userList: [],
			ticketStage: 1
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

			setTicketStage: (value) => {
				setStore({ticketStage: value});
				localStorage.setItem('ticketStage', value);
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
					const data = await response.json();
					
					if (response.status !== 201) {
						alert("There has been some error!");
						return false;
					}
					
					const newTickets = [];
					Object.assign(newTickets, getStore().tickets);
					newTickets.push(data.ticket);
					getActions().sessionStorageAndSetStoreDataSave('tickets', newTickets);
					
					return true;
				}
				catch (error) {
					console.log("error: ", error);
					console.log("There has been an error login in!");
				}
			},

			getCustomerTickets: async () => {
				console.log("action: getCustomerTickets");
				const token = getStore().token;
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/customer/tickets", opts);
					const data = await response.json();

					if (response.status !== 200) {
						console.log(response.status, data.msg);
						// return [response.status, data.msg];
						return false;
					}
					console.log("This came from the backend", data);
					
					// TODO: instead of store.tickets change to store.customerTickets
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
					const response = await fetch(process.env.BACKEND_URL + "api/admin/tickets", opts);

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
