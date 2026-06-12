import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function Dashboard() {

  const [user, setUser] = useState(null);

  // notifications list
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {

    // remove token
    localStorage.removeItem("token");

    // redirect to login
    window.location.href = "/";

  };

  useEffect(() => {

    // socket connection
    const token = localStorage.getItem("token");

    const socket = io("http://localhost:5000", {
        auth: {
            token
        }
    });

    // socket connected
    socket.on("connect", () => {

      console.log("Socket connected:", socket.id);

    });

    // listen for realtime notifications
    socket.on("new_notification", (data) => {

      console.log("Notification received:", data);

      // add new notification at top
      setNotifications((prev) => [
        data.message,
        ...prev
      ]);

    });

    const fetchProfile = async () => {

      try {

        // get JWT token
        const token = localStorage.getItem("token");

        // no token
        if (!token) {

          window.location.href = "/";

          return;

        }

        // protected API request
        const res = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: token
            }
          }
        );

        console.log(res.data);

        // store user info
        setUser(res.data.user);

      } catch (error) {

        console.log(error.response?.data);

        // invalid token
        localStorage.removeItem("token");

        window.location.href = "/";

      }

    };

    fetchProfile();

    // cleanup socket
    return () => {

      socket.disconnect();

    };

  }, []);

  return (

    <div>

      <h1>Dashboard</h1>

      {/* Notifications Section */}

      <div>

        <h3>Live Notifications</h3>

        {
          notifications.length === 0 ? (

            <p>No notifications yet</p>

          ) : (

            notifications.map((note, index) => (

              <div key={index}>

                <p>{note}</p>

                <hr />

              </div>

            ))

          )
        }

      </div>

      <br />

      {/* User Section */}

      {
        user ? (

          <div>

            <h3>User Information</h3>

            <p>ID: {user.id}</p>

            <p>Email: {user.email}</p>

            <br />

            <button onClick={handleLogout}>
              Logout
            </button>

          </div>

        ) : (

          <p>Loading...</p>

        )
      }

    </div>

  );
}

export default Dashboard;