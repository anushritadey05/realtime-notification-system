import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // store JWT token
      localStorage.setItem(
        "token",
        res.data.token
      );

      console.log("Login successful");

      // navigate to dashboard
      navigate("/dashboard");

    } catch (error) {

      console.log(error.response.data);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  };

  return (

    <div>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

        <br />
        <br />

        <button onClick={() => navigate("/register")}>
            Create Account
        </button>

      </form>

    </div>

  );
}

export default Login;