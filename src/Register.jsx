import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleRegister = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(credential.user, { displayName: name.trim() });

    alert("Account created successfully!");

    navigate("/account", { replace: true });
  } catch (error) {
    alert(error.message);
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

          <h1>Create your RentHouse account</h1>

          <form onSubmit={handleRegister}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              Create Account
            </button>

          </form>

          <p className="register-link">
            Already have an account?{" "}
            <a href="/login">Login</a>
          </p>

          <a href="/" className="back-home">
            ← Back to Home
          </a>

        </div>
      </div>

    </div>
  );
}

export default Register;
