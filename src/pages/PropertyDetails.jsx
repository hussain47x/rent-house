import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";

const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperty() {
      try {
        const snapshot = await getDoc(doc(db, "properties", id));
        if (!snapshot.exists()) {
          setError("This property is no longer available.");
          return;
        }
        setProperty({ id: snapshot.id, ...snapshot.data() });
      } catch {
        setError("We could not load this property. Please try again.");
      }
    }
    loadProperty();
  }, [id]);

  if (error) return <main className="detail-page"><h1>{error}</h1><Link to="/houses">← Back to houses</Link></main>;
  if (!property) return <main className="detail-page"><p>Loading property…</p></main>;

  const phone = String(property.phone || "").replace(/\D/g, "");
  const rent = Number(String(property.rent || "").replace(/\D/g, ""));
  return (
    <main className="detail-page">
      <Link className="back-home" to="/houses">← Back to houses</Link>
      <article className="detail-card">
        <img src={property.imageUrl || fallbackImage} alt={`${property.type || "Rental"} in ${property.location || "Pakistan"}`} />
        <div>
          <p className="small-title">FOR RENT · {property.type || "Property"}</p>
          <h1>{property.type || "Property"} in {property.location || "your area"}</h1>
          <p className="detail-price">Rs. {rent.toLocaleString()} / month</p>
          <p>📍 {property.location}</p>
          <p>{property.bedrooms || "—"} bedrooms · {property.area || "Area not added"}</p>
          <h2>Description</h2>
          <p>{property.description || "No additional description provided."}</p>
          {phone ? <a className="contact-btn" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">Contact on WhatsApp</a> : <p>Contact number has not been provided.</p>}
        </div>
      </article>
    </main>
  );
}

export default PropertyDetails;
