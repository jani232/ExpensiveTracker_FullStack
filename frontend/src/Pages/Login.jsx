
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const message = location.state?.message;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await loginUser({
        email: email.trim(),
        password,
      });

      // Store only non-sensitive user details for this browser tab.
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
        })
      );

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">
          Log in to manage your expenses.
        </p>

        {message && <p className="auth-success">{message}</p>}
        {error && <p className="auth-error">{error}</p>}

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
