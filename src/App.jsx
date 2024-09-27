import { useEffect, useState } from 'react'
import Header from "./components/Header/Header";
import Main from "./components/Main/Main.jsx";

import './App.css'

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status"); // Default grouping is by status
  const [ordering, setOrdering] = useState("title"); // Default ordering is by title
  console.log("grouping", grouping);
  console.log(ordering);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);

    };
    fetchTickets();
  }, []);

  return (
    <>
      <div className="app">
        <Header
          onGroupingChange={setGrouping}
          onOrderingChange={setOrdering}
        />
        <Main
          tickets={tickets}
          users={users}
          grouping={grouping}
          ordering={ordering}
        />
      </div>
    </>
  )
}

export default App
