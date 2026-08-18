import { useState } from "react";

const defaultHouses = [
  {
    id: 1,
    title: "Modern Family House",
    type: "House",
    location: "DHA Lahore",
    price: "Rs. 85,000 / month",
    priceNumber: 85000,
    bedrooms: 3,
    beds: "3 Bedrooms",
    baths: "2 Bathrooms",
    area: 10,
    areaText: "10 Marla",
    size: "2,250 sq ft",
    description: "Spacious family house with a car porch, kitchen, and nearby market.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    type: "Flat",
    location: "Gulberg Lahore",
    price: "Rs. 65,000 / month",
    priceNumber: 65000,
    bedrooms: 2,
    beds: "2 Bedrooms",
    baths: "2 Bathrooms",
    area: 7,
    areaText: "7 Marla",
    size: "1,400 sq ft",
    description: "Modern apartment in a secure building with parking and lift.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Comfortable Studio",
    type: "Room",
    location: "Bahria Town Lahore",
    price: "Rs. 35,000 / month",
    priceNumber: 35000,
    bedrooms: 1,
    beds: "1 Bedroom",
    baths: "1 Bathroom",
    area: 3,
    areaText: "3 Marla",
    size: "650 sq ft",
    description: "Clean studio for one person or a small family in a peaceful area.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
  },
];

function Listings() {
  const [openHouse, setOpenHouse] = useState(null);

  const savedProperties = JSON.parse(
    localStorage.getItem("rentHouseProperties") || "[]"
  );

  const allHouses = [...defaultHouses, ...savedProperties];

  function deleteProperty(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    const updatedProperties = savedProperties.filter(
      (property) => property.id !== id
    );

    localStorage.setItem(
      "rentHouseProperties",
      JSON.stringify(updatedProperties)
    );

    window.location.reload();
  }

  const search = new URLSearchParams(window.location.search);
  const locationFilter = search.get("location")?.toLowerCase() || "";
  const typeFilter = search.get("type")?.toLowerCase() || "";
  const bedroomFilter = Number(search.get("bedrooms")) || 0;
  const areaFilter = Number(search.get("area")?.replace(/\D/g, "")) || 0;
  const budgetFilter = Number(search.get("budget")?.replace(/\D/g, "")) || 0;

  const filteredHouses = allHouses.filter((house) => {
    const locationMatches = house.location.toLowerCase().includes(locationFilter);
    const typeMatches = house.type.toLowerCase().includes(typeFilter);
    const bedroomMatches = !bedroomFilter || house.bedrooms === bedroomFilter;
    const areaMatches = !areaFilter || house.area === areaFilter;
    const budgetMatches = !budgetFilter || house.priceNumber <= budgetFilter;

    return (
      locationMatches &&
      typeMatches &&
      bedroomMatches &&
      areaMatches &&
      budgetMatches
    );
  });

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
        </div>

        <button className="login-btn">Login</button>
      </nav>

      <main className="listings-page">
        <p className="small-title listings-title">FIND YOUR NEXT HOME</p>
        <h1>Available Rental Houses</h1>
        <p className="listings-text">
          {filteredHouses.length} گھر آپ کی search سے ملے ہیں۔
        </p>

        <div className="house-list">
          {filteredHouses.map((house) => (
            <article className="house-row" key={house.id}>
              <img src={house.image} alt={house.title} />

              <div className="house-info">
                <p className="house-price">{house.price}</p>
                <h2>{house.title}</h2>
                <p className="house-location">📍 {house.location}</p>
                <p className="house-details">
                  {house.beds} · {house.baths} · {house.areaText}
                </p>

                <button
                  className="view-btn"
                  onClick={() =>
                    setOpenHouse(openHouse === house.id ? null : house.id)
                  }
                >
                  {openHouse === house.id ? "Close Details" : "View Details"}
                </button>

                {openHouse === house.id && (
                  <div className="house-more">
                    <p><strong>Property type:</strong> {house.type}</p>
                    <p><strong>Property size:</strong> {house.size}</p>
                    <p><strong>Description:</strong> {house.description}</p>

                    {house.phone ? (
                      <a
                        className="contact-btn"
                        href={`https://wa.me/${house.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Contact on WhatsApp
                      </a>
                    ) : (
                      <button className="contact-btn">
                        Contact on WhatsApp
                      </button>
                    )}

                    {house.id > 1000 && (
                      <button
                        onClick={() => deleteProperty(house.id)}
                        style={{
                          marginLeft: "10px",
                          padding: "11px 16px",
                          border: "none",
                          borderRadius: "8px",
                          background: "#b83c3c",
                          color: "white",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Delete Property
                      </button>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredHouses.length === 0 && (
          <p className="no-results">
            No property matches your search. Try different options.
          </p>
        )}
      </main>
    </div>
  );
}

export default Listings;