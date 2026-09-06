import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);

      alert("Login successful!");

      navigate("/account", { replace: true });
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-page">

      <nav className="navbar">
        <div className="logo">RentHouse</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-box">

          <h1>Login to your RentHouse account</h1>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="login-submit">
              Login
            </button>

          </form>

          <p className="register-link">
            Don't have an account?{" "}
            <a href="/register">Create Account</a>
          </p>

          <a href="/" className="back-home">
            ← Back to Home
          </a>

        </div>
      </div>

    </div>
  );
}

export default Login;
