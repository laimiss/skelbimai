import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import UserRemoveButton from "./UserRemoveButton";

const UsersList = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
        console.log(json);
      }
    };
    fetchUsers();
  }, [user.token]);
  return (
    <div className="useriai">
      <h5>Users</h5>
      <ul>
        {users &&
          users.map((u) => (
            <li key={u._id}>
              {u.email}
              <UserRemoveButton id={u._id}></UserRemoveButton>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default UsersList;
