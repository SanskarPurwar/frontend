import Card from ".././Card/Card.jsx";
import "./Main.css"
function Main({ tickets, users, grouping, ordering }) {

    const statuses = ["Todo", "In progress", "Done", "Canceled", "Backlog"];

    const groupTickets = (tickets, grouping) => {
        switch (grouping) {
            case "status":
                // Group tickets by status, ensuring all statuses are present even if empty
                return statuses.reduce((acc, status) => {
                    acc[status] = tickets.filter(ticket => ticket.status === status);
                    return acc;
                }, {});
            case "priority":
                return {
                    Urgent: tickets.filter(ticket => ticket.priority === 4),
                    High: tickets.filter(ticket => ticket.priority === 3),
                    Medium: tickets.filter(ticket => ticket.priority === 2),
                    Low: tickets.filter(ticket => ticket.priority === 1),
                    "No Priority": tickets.filter(ticket => ticket.priority === 0),
                };
            case "user":
                // Map userId from tickets to user names from the users array
                return groupByUser(tickets, users);
            default:
                return {};
        }
    };

    // Function to group tickets by user
    const groupByUser = (tickets, users) => {
        const userMap = {};
      
        // Initialize userMap with user ids and empty arrays
        users.forEach(user => {
            userMap[user.id] = {
                name: user.name,
                tickets: [] // Empty array for each user
            };
        });

        tickets.forEach(ticket => {
            if (userMap[ticket.userId]) {
                userMap[ticket.userId].tickets.push(ticket);
            }
        });

        return userMap; // Return user map with tickets assigned
    };


    // Function to sort tickets based on the selected ordering option
    const sortTickets = (tickets, ordering) => {
        return tickets.sort((a, b) => {
            if (ordering === "title") {
                return a.title.localeCompare(b.title); // String comparison
            } else if (ordering === "priority") {
                return b.priority - a.priority; // Numerical comparison, descending
            }
            return 0;
        });
    };

    // Get grouped tickets based on the selected grouping option
    const groupedTickets = groupTickets(tickets, grouping);


    return (
        <div className="board-container">
            {Object.keys(groupedTickets).map(group => (
                <div key={group} className="board-column">
                    <h3>{grouping === "user" ? groupedTickets[group].name : group}</h3>
                    <div className="tickets-container">
                        {Array.isArray(groupedTickets[group]) ? (
                            groupedTickets[group].length > 0 ? (
                                sortTickets(groupedTickets[group], ordering).map(ticket => (
                                    <Card key={ticket.id} ticket={ticket} />
                                ))
                            ) : (
                                <p>No tickets</p>
                            )
                        ) : (
                            groupedTickets[group].tickets.length > 0 ? (
                                sortTickets(groupedTickets[group].tickets, ordering).map(ticket => (
                                    <Card key={ticket.id} ticket={ticket} />
                                ))
                            ) : (
                                <p>No tickets</p>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Main;
