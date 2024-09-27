import Card from ".././Card/Card.jsx";
import "./Main.css"
import Dot3 from "../../assets/3 dot menu.svg"
import add from "../../assets/add.svg"
import cancelled from '../../assets/Cancelled.svg'
import Done from '../../assets/Done.svg'
import InProgress from '../../assets/in-progress.svg'
import Todo from '../../assets/To-do.svg'
import Backlog from '../../assets/Backlog.svg'
import High from '../../assets/Img - High Priority.svg'
import Medium from '../../assets/Img - Medium Priority.svg'
import Low from '../../assets/Img - Low Priority.svg'
import NoPriority from '../../assets/No-priority.svg'
import Urgent from '../../assets/SVG - Urgent Priority colour.svg'



function Main({ tickets, users, grouping, ordering }) {

    const statuses = ["Todo", "In progress", "Done", "Cancelled", "Backlog"];
    const status_img = {
        "Todo" : Todo,
        "In progress" : InProgress,
        "Done" : Done,
        "Cancelled" :  cancelled ,
        "Backlog" : Backlog
    }

    const priority_img = {
        "Urgent" : Urgent,
        "High": High,
        "Medium": Medium,
        "Low": Low,
        "No Priority": NoPriority
    }

    const groupTickets = (tickets, grouping) => {
        switch (grouping) {
            case "status":
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
                tickets: []
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

                    <div className="flex_around">
                        <div id="flex_gap">
                            { grouping === "status" && 
                            <img src={status_img[group]} alt="" /> }

                            {
                                grouping === "priority" && 
                                <img src={priority_img[group]} alt="" />
                            } 

                            <h3>{grouping === "user" ? groupedTickets[group].name : group}</h3>

                        </div>
                        <div>
                            <img src={add} alt="" />
                            <img src={Dot3} alt="" />
                        </div>
                    </div>

                    
                    <div className="tickets-container">
                        {Array.isArray(groupedTickets[group]) ? (
                            groupedTickets[group].length > 0 ? (
                                sortTickets(groupedTickets[group], ordering).map(ticket => (
                                    <Card key={ticket.id} ticket={ticket} />
                                ))
                            ) : (
                                <p></p>
                            )
                        ) : (
                            groupedTickets[group].tickets.length > 0 ? (
                                sortTickets(groupedTickets[group].tickets, ordering).map(ticket => (
                                    <Card key={ticket.id} ticket={ticket} />
                                ))
                            ) : (
                                <p></p>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Main;
