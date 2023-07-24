# Final Project
## CBL Desk - Customer Support Ticket System

By using this ticket system and collecting information on their equipment history, manufacturers will be able to provide a more effective and optimized support to the customer’s equipment, as they will be able to analyze the intervention history that has been carried out on the same or similar type of equipment, thus predicting with more accuracy and speed, the solutions needed to solve the problem.

## Funcionalities
### 1) Users

There are four default user types: Admin; Engineer; Technician; Customer.

### 2) Tickets
Different ticket status for each ticket stage:
- New (when customer creates a new ticket)
- Opened (when admin assigns a tech/eng to the ticket)
- In Progress (when tech/eng start assistance)
- Resolved (when tech/eng finish assistance)
- Closed (when admin processes the resolved ticket)

### 3) Knowledge base
A database where collected data from assistances it's stored. It will be used for statistical data so that manufacturer could study and optimize their product/equipment production and also better optimize assistances by providing a know-how repairing equipment solutions.

### 4) API's
- Google Maps API: get routes, distance and travel time for tech/eng assistance report.
- Cloudinary API: storage of photos added by the customer upon new ticket creation. Also for equipment and vehicle photo storage.

### 5) Technologies
1. React
2. Bootstrap
3. Flask

## Main flow
1) customer create a ticket
2) admin assigns vehicle and tech/eng
3) tech/eng opens ticket and start assistance
4) tech/eng fills in report with all the data needed explaining what where the malfunctions encountered and solutions implemented
5) tech/eng closes report
6) customer report aproval by authenticating with his credentials
7) tech/eng finishes assistance
8) admin processes ticket

## Future features
1. UI/UX improvement
2. Data analyze to get statistical info about equipments to help the maker understand where they need to improve the equipments
3. Websockets integration for realtime data update
4. Notifications API integration for ticket stage user notification