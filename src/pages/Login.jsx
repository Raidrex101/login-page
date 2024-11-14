import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("https://login-page-backend-i5bh.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/users");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server error: " + error.message);
    }
  };

  return (
    <main className="form-signin m-auto position-absolute top-50 start-50 translate-middle">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <h1 className="h3 mb-3 fw-normal text-center">
          Sign in to your account
        </h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
            required
          />
          <label htmlFor="email">E-mail </label>
        </div>

        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>

      <div className="input mb-3 d-flex pt-3">
        <input className="form-check-input ms-2" type="checkbox" id="rememberMe" />
        <p className =  "ms-3">Remember me</p>
      </div>

      <p className="text-center mt-5">
        Don&apos;t have an account? <Link to="/">Create an account</Link>
      </p>
    </main>
  );
};

export default Login;
