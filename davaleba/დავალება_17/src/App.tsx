import { useState, useEffect } from "react";
import axios from "axios";
import type { IUser } from "./interfaces";
import "./App.css";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    axios
      .get<IUser[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("შეცდომა იუზერების წამოღებისას:", error);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-title">მომხმარებლების სია</h1>

      <input
        type="text"
        placeholder="მოძებნე იუზერი სახელით..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <div className="cards-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="no-results">მომხმარებელი ვერ მოიძებნა</p>
        )}
      </div>
    </div>
  );
}

export default App;