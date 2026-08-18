import { useState } from "react";

function Home() {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    bedrooms: "",
    area: "",
    budget: "",
  });

  function changeFilter(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  }

  function searchHouses(event) {
    event.preventDefault();

    const searchText = new URLSearchParams(filters).toString();
    window.location.href = `/houses?${searchText}`;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          Rent<span>House</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/houses">Houses</a>
          <a href="/post-property">Post Property</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="login-btn">Login</button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="small-title">FIND YOUR PERFECT HOME</p>

          <h1>
            Find a place you’ll <span>love to live</span>
          </h1>

          <p className="description">
            Discover comfortable rental homes, apartments, and rooms near you.
          </p>

          <form className="search-box" onSubmit={searchHouses}>
            <div>
              <label>Location</label>
              <input
                list="locations"
                name="location"
                value={filters.location}
                onChange={changeFilter}
                placeholder="City or area لکھیں"
              />
            </div>

            <div>
              <label>Property Type</label>
              <input
                list="property-types"
                name="type"
                value={filters.type}
                onChange={changeFilter}
                placeholder="House, flat..."
              />
            </div>

            <div>
              <label>Bedrooms</label>
              <input
                list="bedroom-options"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={changeFilter}
                placeholder="مثلاً 3"
              />
            </div>

            <div>
              <label>House Area</label>
              <input
                list="area-options"
                name="area"
                value={filters.area}
                onChange={changeFilter}
                placeholder="مثلاً 10 Marla"
              />
            </div>

            <div>
              <label>Monthly Budget</label>
              <input
                list="budget-options"
                name="budget"
                value={filters.budget}
                onChange={changeFilter}
                placeholder="مثلاً 85000"
              />
            </div>

            <button className="login-btn" type="submit">
              Search
            </button>

            <datalist id="locations">
              <option value="Lahore" />
              <option value="Karachi" />
              <option value="Islamabad" />
              <option value="Rawalpindi" />
            </datalist>

            <datalist id="property-types">
              <option value="House" />
              <option value="Flat" />
              <option value="Apartment" />
              <option value="Room" />
            </datalist>

            <datalist id="bedroom-options">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              <option value="4" />
              <option value="5" />
            </datalist>

            <datalist id="area-options">
              <option value="3 Marla" />
              <option value="5 Marla" />
              <option value="7 Marla" />
              <option value="10 Marla" />
              <option value="12 Marla" />
              <option value="15 Marla" />
              <option value="20 Marla" />
            </datalist>

            <datalist id="budget-options">
              <option value="30000" />
              <option value="50000" />
              <option value="70000" />
              <option value="100000" />
              <option value="150000" />
            </datalist>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;