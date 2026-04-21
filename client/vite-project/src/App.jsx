import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>User</h1>
      <ul>
        {user.map((user) => (
          <li key={user.id}>
            {[
              user.name,
              " - ",
              user.email,
              " - ",
              new Date(user.createdAt).toLocaleDateString(),
            ]}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
