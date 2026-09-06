import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PostProperty from "./pages/PostProperty";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/houses" element={<Listings />} />
        <Route path="/houses/:id" element={<PropertyDetails />} />
        <Route path="/post-property" element={<PostProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
