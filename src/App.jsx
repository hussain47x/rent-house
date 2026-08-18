import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PostProperty from "./pages/PostProperty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/houses" element={<Listings />} />
        <Route path="/post-property" element={<PostProperty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;