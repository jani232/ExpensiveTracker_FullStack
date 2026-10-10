
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        date: new Date().toISOString().split("T")[0],
      });

      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p className="auth-subtitle">
          Start managing your money with ease.
        </p>

        {error && <p className="auth-error">{error}</p>}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
          minLength={6}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Enter your password again"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
