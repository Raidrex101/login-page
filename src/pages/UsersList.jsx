import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "bootstrap";
import Toolbar from "../components/Toolbar";
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [checkBox, setCheckBox] = useState(true)

  const toggleUsers = () => {
    const checkBoxes = document.querySelectorAll("input[type=checkbox]")

    checkBoxes.forEach((checkbox) => {
      checkbox.checked = !checkBox
      setCheckBox(!checkBox)
    })
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://login-page-backend-i5bh.onrender.com/users",
          {
            method: "GET",
            headers: {
              "x-auth-token": token,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();

          data.sort((a, b) => a.name.localeCompare(b.name));

          setUsers(data);
        } else {
          setError("Error getting users");
        }
      } catch (error) {
        setError("server error: " + error);
      }
    };
    fetchUsers();

    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    )

    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, [navigate]);

  const getTimeElapsed = (lastLogin) => {
    if (!lastLogin) return "N/A";

    const lastLoginDate = new Date(lastLogin);
    const now = new Date();
    const timeDiff = now - lastLoginDate;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day(s) ago`;
    if (hours > 0) return `${hours} hour(s) ago`;
    if (minutes > 0) return `${minutes} minute(s) ago`;
    return `Less than a minute ago`;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <Toolbar />
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <button className="btn btn-primary" onClick={toggleUsers}>
                {checkBox ? (
                  <i className="bi bi-list-check"></i>
                ) : (
                  <i className="bi bi-arrow-bar-down"></i>
                )}
              </button>
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Last Seen</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {checkBox && (
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={user.id}
                  />
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td
                  className="cursor-pointer"
                  data-bs-toggle="tooltip"
                  title={formatDate(user.last_login)}
                >
                  {getTimeElapsed(user.last_login)}
                </td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UsersList;
