const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			userType: null,
			message: null,
			customerTickets: [],
			equipmentList: [],
			customer_media: [],
			tickets: [],
			manufacturerAddress: "Mecânica Exacta, S.A., Rua António Gomes da Cruz, São Paio de Oleiros", // TODO
			assignedTicket: {
				customer: {
					authentication: {},
				},
				equipment: {
					knowledge: [],
				},
				ticket: {
					customer_media: [],
				},
				vehicle_assigned: {},
				ticket_employee: []
			},
			processTicket: {
				customer_info: {},
				customer_media: [],
				equipment: {
					knowledge: []
				},
				vehicle_assigned: {},
				knowledge: [],
				ticket_employee: [
					{observations: null}
				]
			},
			categoryOptions: [],
			knowledgeList: [],
			userProfile: { user_info: {user_type: ""}, customer_info: {company_name: ""}, employee_info: {first_name: "", last_name: ""} },
			customerEquipmentTickets: [],
			user: null,
			modalTitle: null,
			modalBody: null,
			modalEquipment: null,
			liveToastHeader: null,
			liveToastBody: null,
			userList: [],
			ticketStage: 0,
			availableEmployees: [],
			availableVehicles: [],
			contactList: { customer: [], employee: [] }
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

			syncAvailableEmployeeFromSessionStorage: () => {
				if (sessionStorage.getItem('availableEmployees')) return setStore({ availableEmployees: JSON.parse(sessionStorage.getItem('availableEmployees')) });
			},

			syncAvailableVehiclesFromSessionStorage: () => {
				if (sessionStorage.getItem('availableVehicles')) return setStore({ availableVehicles: JSON.parse(sessionStorage.getItem('availableVehicles')) });
			},

			syncCategoryOptionsFromSessionStorage: () => {
				if (sessionStorage.getItem('categoryOptions')) return setStore({ categoryOptions: JSON.parse(sessionStorage.getItem('categoryOptions')) });
			},

			syncKnowledgeListFromSessionStorage: () => {
				if (sessionStorage.getItem('knowledgeList')) return setStore({ knowledgeList: JSON.parse(sessionStorage.getItem('knowledgeList')) });
			},

			syncContactListFromSessionStorage: () => {
				if (sessionStorage.getItem('contactList')) return setStore({ contactList: JSON.parse(sessionStorage.getItem('contactList')) })
			},

			syncAssignedTicketFromLocalStorage: () => {
				if (localStorage.getItem('assignedTicket')) return setStore({ assignedTicket: JSON.parse(localStorage.getItem('assignedTicket')) });
			},

			syncProcessTicketFromSessionStorage: () => {
				if (sessionStorage.getItem('processTicket')) return setStore({ processTicket: JSON.parse(sessionStorage.getItem('processTicket')) })
			},

			syncContactListFromSessionStorage: () => {
				if (sessionStorage.getItem('contactList')) return setStore({ contactList: JSON.parse(sessionStorage.getItem('contactList')) })
			},

			sessionStorageAndSetStoreDataSave: (key, data) => {
				sessionStorage.setItem([key], JSON.stringify(data));
				setStore({ [key]: data });
				return true;
			},

			localStorageAndSetStoreDataSave: (key, data) => {
				localStorage.setItem([key], JSON.stringify(data));
				setStore({ [key]: data });
				return true;
			},

			setTicketStage: (value, local = true) => {
				console.log('debug')
				setStore({ ticketStage: value });
				if (local) localStorage.setItem('ticketStage', JSON.stringify(value));
			},

			resetAssignedTicket: () => {
				setStore({ assignedTicket: {} });
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
						return ([response.status, 'Bad user email or password!']);
					}


					await getActions().sessionStorageAndSetStoreDataSave('token', data.access_token);
					return ([response.status, data.user_type]);
				}
				catch (error) {
					// console.log("Contact service support", error);
					return (["error", error]);
				}
			},


			logout: () => {
				console.log("Logout: erasing user data!")
				sessionStorage.clear();

				setStore({ token: null });
				setStore({ equipmentList: [] });
				setStore({ interventionType: [] });
				setStore({ tickets: [] });
				setStore({ userProfile: { user_info: {user_type: ""}, customer_info: {company_name: ""}, employee_info: {first_name: "", last_name: ""} } });

				return true;
			},

			getCustomerEquipment: async () => {
				console.log('action: getCustomerEquipment');
				const token = JSON.parse(sessionStorage.getItem('token'));
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
				const token = JSON.parse(sessionStorage.getItem('token'));
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

			customerCreateTicket: async (equipmentId, interventionType, subject, description, customerMedia) => {
				console.log("action: createCustomerTicket");
				const token = JSON.parse(sessionStorage.getItem('token'));
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
						description: description,
						customer_media: customerMedia
					})
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/customer/create/ticket", opts);
					const data = await response.json();

					if (response.status !== 201) {
						alert("There has been some error!");
						return false;
					}

					// create a copy of tickets
					// and adds new ticket to tickets
					const newTickets = [...getStore().tickets];
					newTickets.push(data.ticket);

					// update tickets
					getActions().sessionStorageAndSetStoreDataSave('tickets', newTickets);

					return true;
				}
				catch (error) {
					console.log("error: ", error);
					console.log("There has been an error login in!");
				}
			},

			adminCreateTicket: async (equipmentId, interventionType, subject, description, customerId) => {
				console.log("action: adminCreateTicket");
				const token = JSON.parse(sessionStorage.getItem('token'));
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
						customer_id: customerId,
						description: description
					})
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/admin/create/ticket", opts);
					const data = await response.json();
					console.log("response", response)
					if (response.status !== 201) {
						alert("There has been some error!");
						return false;
					}

					// create a copy of tickets
					// and adds new ticket to tickets
					const newTickets = [...getStore().tickets];
					newTickets.push(data.ticket);

					// update tickets
					getActions().sessionStorageAndSetStoreDataSave('tickets', newTickets);

					return true;
				}
				catch (error) {
					console.log("error: ", error);
					console.log("There has been an error login in!");
				}
			},

			setTicketStatus: async (ticketID, status) => {
				console.log("action: setTicketStatus");
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						"ticket_id": ticketID,
						"status": status
					})
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/set/ticket/status", opts);
					const data = await response.json();

					if (response.status !== 200) {
						console.log(response.status, data.msg);
						return [response.status, data.msg];
					}

					// Technician/Engineer updating ticket status
					const employeesSetStatus = ['technician', 'engineer'];
					if (employeesSetStatus.includes(getStore().userProfile.user_info.user_type)) {
						console.log('assignedTicket')
						// create a copy of assignedTicket
						const newAssignedTicket = { ...getStore().assignedTicket };

						// update ticket status value
						newAssignedTicket.ticket.status = status;

						// update tickets
						getActions().localStorageAndSetStoreDataSave('assignedTicket', newAssignedTicket);

						return [response.status, data.msg];
					}

					// Admin updating ticket status
					const adminSetStatus = ['admin'];
					if (adminSetStatus.includes(getStore().userProfile.user_info.user_type)) {
						// create a copy of tickets
						const newTickets = [...getStore().tickets];

						// update ticket status
						newTickets.map(ticket => {
							if (ticket.id === ticketID) ticket.status = status;
						});

						// update tickets
						getActions().sessionStorageAndSetStoreDataSave('tickets', newTickets);

						return [response.status, data.msg];
					}
				}
				catch (error) {
					console.log("There has been an error!", error)
				}
			},

			getCustomerTickets: async () => {
				console.log("action: getCustomerTickets");
				const token = JSON.parse(sessionStorage.getItem('token'));
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
				const token = JSON.parse(sessionStorage.getItem('token'));

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
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
					return false;
				}
			},

			updateUserProfile: async (data) => {
				console.log("action: updateUserProfile");
				const token = JSON.parse(sessionStorage.getItem('token'));
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
						if (info in data) {
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
				const token = JSON.parse(sessionStorage.getItem('token'));
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

					if ('tickets' in data) await getActions().sessionStorageAndSetStoreDataSave('tickets', data.tickets);
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
				}
			},

			getEmployeeAssignedTicket: async () => {
				console.log("action: getEmployeeAssignedTicket");
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				};
				const response = await fetch(process.env.BACKEND_URL + "api/employee/assigned/ticket", opts);
				if (response.status === 204) {
					getActions().localStorageAndSetStoreDataSave('assignedTicket', {});
					return [204, 'No tickets assigned or in progress.']
				}

				const data = await response.json();


				if (response.status !== 200) {

					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				if ('assigned_ticket' in data) await getActions().localStorageAndSetStoreDataSave('assignedTicket', data.assigned_ticket);
				return true;
			},

			getEmployeeResolvedTicket: async () => {
				console.log("action: getEmployeeResolvedTicket");
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				};
				const response = await fetch(process.env.BACKEND_URL + "api/employee/resolved/ticket", opts);
				if (response.status === 204) {
					getActions().sessionStorageAndSetStoreDataSave('resolvedTicket', {});
					return [204, 'No tickets assigned or in progress.']
				}

				const data = await response.json();


				if (response.status !== 200) {

					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				console.log("Getting to response Employee assigned ticket");
				console.log("This came from the backend", data);

				if ('assigned_ticket' in data) await getActions().localStorageAndSetStoreDataSave('assignedTicket', data.assigned_ticket);
				return true;
			},

			getCustomerEquipmentTickets: (data) => {
				setStore({ customerEquipmentTickets: data })
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

			updateShowModal: (subject, description, knowledgeArray = null) => {
				const myModal = document.querySelector('#modalTicketInfo');

				setStore(
					{
						modalTitle: subject,
						modalBody: description,
						modalEquipment: knowledgeArray
					}
				);

				new bootstrap.Modal(myModal).toggle();
			},

			startProcessTicket: (data) => {
				setStore({ processTicket: data });
				getActions().sessionStorageAndSetStoreDataSave('processTicket', data);
			},

			getAdminUserList: async () => {
				console.log('action: getAdminUserList');
				const token = JSON.parse(sessionStorage.getItem('token'));
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

			getAvailableEmployees: async () => {
				console.log('action: getAvailableEmployees');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/available/employees", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				getActions().sessionStorageAndSetStoreDataSave('availableEmployees', data.available_employees);
				// needs to have error handle
			},

			setEmployeeVehicleAvailable: async (employeeID, vehicleID) => {
				console.log('action: toggleEmployeeAvailable');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						"employee_id": employeeID,
						"vehicle_id":  vehicleID
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/set/employee/vehicle/available", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			assignEmployeeToTicket: async (employeeID, ticketID) => {
				console.log('action: assignEmployeeToTicket');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'employee_ids': employeeID,
						'ticket_id': ticketID
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/assign/employee/ticket", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			dismissEmployeeFromTicket: async (employeeIDs, ticketID) => {
				console.log('action: dismissEmployeeFromTicket');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'employee_ids': employeeIDs,
						'ticket_id': ticketID
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/dismiss/employee/ticket", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			getAvailableVehicles: async () => {
				console.log('action: getAvailableVehicles');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/admin/available/vehicles", opts);
				const data = await response.json();


				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				getActions().sessionStorageAndSetStoreDataSave('availableVehicles', data.available_vehicles);
				// needs to have error handle
			},

			assignVehicleToTicket: async (assignVehicleID, dismissVehicleID, ticketID) => {
				console.log('action: assignVehicleToTicket');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'assign_vehicle_id': assignVehicleID,
						'dismiss_vehicle_id': dismissVehicleID,
						'ticket_id': ticketID
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/assign/vehicle/ticket", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			dismissVehicleFromTicket: async (dismissVehicleID, ticketID) => {
				console.log('action: dismissVehicleFromTicket');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'dismiss_vehicle_id': dismissVehicleID,
						'ticket_id': ticketID
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/dismiss/vehicle/ticket", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			getCategories: async () => {
				console.log("action: getCategories");
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/employee/categories", opts);
					const data = await response.json();

					if (response.status !== 200) {
						console.log(response.status, data.msg);
						return [response.status, data.msg];
					}

					getActions().sessionStorageAndSetStoreDataSave('categoryOptions', data.categories);
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
					return false;
				}
			},

			getKnowledgeList: async () => {
				console.log("action: getKnowledgeList");
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					}
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/knowledge/list", opts);
					const data = await response.json();

					if (response.status !== 200) {
						console.log(response.status, data.msg);
						return [response.status, data.msg];
					}

					getActions().sessionStorageAndSetStoreDataSave('knowledgeList', data.knowledge_list);
					return true;
				}
				catch (error) {
					console.log("There has been an error login in!", error)
					return false;
				}
			},

			setStartInterventionDate: async (ticketEmployeeID, startInterventionDate) => {
				console.log('action: setStartInterventionDate');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'ticket_employee_id': ticketEmployeeID,
						'start_intervention_date': startInterventionDate
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/set/start/intervention/date", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			setEndInterventionDate: async (ticketEmployeeID, endInterventionDate) => {
				console.log('action: setEndInterventionDate');
				console.log('t_e_id', ticketEmployeeID)
				console.log('end', endInterventionDate)
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'ticket_employee_id': ticketEmployeeID,
						'end_intervention_date': endInterventionDate
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/set/end/intervention/date", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			saveKilometers: async (ticketID, kilometersOnLeave, kilometersOnArrival) => {
				console.log('action: saveKilometers');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'ticket_id': ticketID,
						'km_on_leave': kilometersOnLeave,
						'km_on_arrival': kilometersOnArrival
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/save/kilometers", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			saveActionsTaken: async (ticketID, equipmentID, knowledges) => {
				console.log('action: saveActionsTaken');

				// object creation to bulk save on database
				const ticketKnowledges = knowledges.map(knowledge =>
				({
					"ticket_id": ticketID,
					"equipment_id": equipmentID,
					"knowledge_id": knowledge.id
				})
				);

				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'ticket_knowledges': ticketKnowledges
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/save/actions/taken", opts);
				const data = await response.json();

				if (response.status !== 201) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			saveObservationsValue: async (ticketEmployeeID, observations) => {
				console.log('action: saveObservations');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'ticket_employee_id': ticketEmployeeID,
						'observations': observations,
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/save/observations", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

			getContactList: async () => {
				console.log('action: getContactList');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + token
					}
				}
				const response = await fetch(process.env.BACKEND_URL + "api/admin/contact/list", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				getActions().sessionStorageAndSetStoreDataSave('contactList', data);
				// needs to have error handle
			},

			adminCreateProcessTicketKnowledge: async (malfunctionDescription, solutionDescription, categoryID, ticketID, equipmentID) => {
				console.log('action: adminCreateProcessTicketKnowledge');

				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						"malfunction_description": malfunctionDescription,
						"solution_description": solutionDescription,
						"category_id": categoryID,
						"ticket_id": ticketID,
						"equipment_id": equipmentID
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/admin/create/knowledge", opts);
				const data = await response.json();

				if (response.status !== 201) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				const newProcessTicket = {...getStore().processTicket};
				newProcessTicket.knowledge.push(data.new_knowledge);

				getActions().sessionStorageAndSetStoreDataSave('processTicket', newProcessTicket);

				return [response.status, data.msg];
			},

			setCustomerMedia: (customerMedia) => {
				setStore({customer_media: customerMedia});
			},

			saveCustomerMedia: async (ticketID, customerMediaURLS) => {
				console.log('action: saveCustomerMedia');
				const token = JSON.parse(sessionStorage.getItem('token'));
				const opts = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({
						'ticket_id': ticketID,
						'customer_media': customerMediaURLS
					})
				}
				const response = await fetch(process.env.BACKEND_URL + "api/save/customer/media", opts);
				const data = await response.json();

				if (response.status !== 200) {
					console.log(response.status, data.msg);
					return [response.status, data.msg];
				}

				return [response.status, data.msg];
			},

		}
	};
};

export default getState;