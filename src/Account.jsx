import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

function Account() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    getDocs(query(collection(db, "properties"), where("ownerId", "==", user.uid)))
      .then((snapshot) => setProperties(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))))
      .catch(() => setProperties([]));
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-box">
            <h1>Please Login</h1>
            <p>You need to login to view your account.</p>

            <button
              className="login-submit"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <nav className="navbar">
        <div className="logo">
          Rent<span>House</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/houses">Houses</a>
          <a href="/post-property">Post Property</a>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-box">
          <h1>My Account</h1>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p><strong>Name:</strong> {user.displayName || "RentHouse member"}</p>
          <h2 style={{ marginTop: "28px" }}>My Listings</h2>
          {properties.length ? properties.map((property) => (
            <p key={property.id} style={{ marginTop: "10px" }}>
              <Link to={`/houses/${property.id}`}>{property.type || "Property"} — {property.location || "Location"}</Link>
            </p>
          )) : <p style={{ marginTop: "10px" }}>You have not posted a property yet.</p>}

          <Link className="back-home" to="/post-property">Post a property →</Link>

          <button className="login-submit" onClick={handleLogout}>
            Logout
          </button>

          <br />

          <a href="/" className="back-home">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Account;
