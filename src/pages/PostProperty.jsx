import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

function PostProperty() {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [language, setLanguage] = useState("en");

  const [form, setForm] = useState({
    location: "",
    type: "",
    rent: "",
    bedrooms: "",
    area: "",
    phone: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const text =
    language === "ur"
      ? {
          home: "ہوم",
          houses: "گھر",
          post: "گھر شامل کریں",
          title: "اپنی پراپرٹی کرائے پر لگائیں",
          subtitle:
            "اپنی پراپرٹی کی معلومات درج کریں اور نئے کرایہ داروں تک پہنچیں۔",
          location: "لوکیشن / علاقہ",
          propertyType: "پراپرٹی کی قسم",
          rent: "ماہانہ کرایہ",
          bedrooms: "بیڈ رومز",
          area: "پراپرٹی ایریا",
          phone: "WhatsApp نمبر",
          description: "پراپرٹی کی تفصیل",
          optional: "اختیاری",
          listingFee: "لسٹنگ فیس",
          feeText: "آپ کی پراپرٹی کے رقبے کے مطابق فیس",
          submitPay: "جمع کریں اور ادائیگی کریں",
          success: "آپ کی پراپرٹی کامیابی سے جمع ہو گئی ہے۔",
          viewHouses: "گھر دیکھیں",
        }
      : {
          home: "Home",
          houses: "Houses",
          post: "Post Property",
          title: "List Your Property",
          subtitle:
            "Add your property details and reach potential tenants.",
          location: "Location / Area",
          propertyType: "Property Type",
          rent: "Monthly Rent",
          bedrooms: "Bedrooms",
          area: "Property Area",
          phone: "WhatsApp Number",
          description: "Property Description",
          optional: "Optional",
          listingFee: "Listing Fee",
          feeText: "Fee based on your property area",
          submitPay: "Submit & Pay",
          success: "Your property has been submitted successfully.",
          viewHouses: "View Houses",
        };

  function changeForm(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function calculateListingFee(areaText) {
    const area = parseFloat(areaText);

    if (!area || area <= 0) return 300;
    if (area <= 3) return 300;
    if (area <= 5) return 500;
    if (area <= 10) return 1000;
    if (area <= 15) return 1500;
    if (area <= 20) return 2000;

    return 3000;
  }

  async function submitProperty(event) {
    event.preventDefault();

    if (!user) {
      alert("Please log in before posting a property.");
      navigate("/login");
      return;
    }

    const listingFee = calculateListingFee(form.area);

    try {
      await addDoc(collection(db, "properties"), {
        location: form.location,
        type: form.type,
        rent: form.rent,
        bedrooms: form.bedrooms,
        area: form.area,
        phone: form.phone,
        description:
          form.description || "No additional description provided.",
        listingFee: listingFee,
        paymentStatus: "pending",
        imageUrl: form.imageUrl.trim(),
        ownerId: user.uid,
        ownerName: user.displayName || "RentHouse member",
        ownerEmail: user.email,
        createdAt: new Date(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error adding property:", error);
      alert(error.message);
    }
  }

  const currentFee = calculateListingFee(form.area);

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "15px 17px",
    marginTop: "9px",
    border: "1px solid #d7dee7",
    borderRadius: "12px",
    background: "#f8fafc",
    color: "#172033",
    fontSize: "15px",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "15px",
    fontWeight: "700",
    color: "#263449",
  };

  return (
    <div
      className="app"
      dir={language === "ur" ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f8fb 0%, #eef4f7 100%)",
        color: "#172033",
      }}
    >
      <nav
        className="navbar"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e3e8ee",
        }}
      >
        <div
          className="logo"
          style={{
            color: "#132238",
            fontWeight: "800",
          }}
        >
          Rent<span style={{ color: "#159a91" }}>House</span>
        </div>

        <div className="nav-links">
          <a href="/">{text.home}</a>
          <a href="/houses">{text.houses}</a>
          <a href="/post-property">{text.post}</a>
        </div>

        <div className="language-switch">
          <button
            type="button"
            className={
              language === "en"
                ? "language-btn active-language"
                : "language-btn"
            }
            onClick={() => setLanguage("en")}
          >
            English
          </button>

          <button
            type="button"
            className={
              language === "ur"
                ? "language-btn active-language"
                : "language-btn"
            }
            onClick={() => setLanguage("ur")}
          >
            اردو
          </button>
        </div>
      </nav>

      <main
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          padding: "60px 20px 80px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "38px",
          }}
        >
          <h1
            style={{
              margin: "0",
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "#142238",
            }}
          >
            {text.title}
          </h1>

          <p
            style={{
              color: "#687588",
              fontSize: "16px",
            }}
          >
            {text.subtitle}
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              maxWidth: "600px",
              margin: "50px auto",
              padding: "50px 30px",
              background: "#ffffff",
              borderRadius: "22px",
              textAlign: "center",
            }}
          >
            <h2>{text.success}</h2>

            <a href="/houses">{text.viewHouses} →</a>
          </div>
        ) : (
          <form
            onSubmit={submitProperty}
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "35px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(270px, 1fr))",
                gap: "24px",
              }}
            >
              <div>
                <label style={labelStyle}>{text.location}</label>

                <input
                  name="location"
                  value={form.location}
                  required
                  onChange={changeForm}
                  placeholder="Example: DHA Lahore"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  {text.propertyType}
                </label>

                <input
                  name="type"
                  value={form.type}
                  required
                  onChange={changeForm}
                  placeholder="House, Flat, Room..."
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{text.rent}</label>

                <input
                  name="rent"
                  value={form.rent}
                  required
                  onChange={changeForm}
                  placeholder="Example: 85000"
                  inputMode="numeric"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  {text.bedrooms}
                </label>

                <input
                  name="bedrooms"
                  value={form.bedrooms}
                  required
                  onChange={changeForm}
                  placeholder="Example: 3"
                  inputMode="numeric"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: "26px" }}>
              <label style={labelStyle}>{text.area}</label>

              <input
                name="area"
                value={form.area}
                required
                onChange={changeForm}
                placeholder="Example: 10 Marla"
                style={inputStyle}
              />

              <p>Enter your property area in Marla.</p>
            </div>

            <div style={{ marginTop: "25px" }}>
              <label style={labelStyle}>Property Image URL ({text.optional})</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={changeForm}
                placeholder="https://example.com/your-property.jpg"
                type="url"
                style={inputStyle}
              />
              <p>Paste a public image link to show your own property photo.</p>
            </div>

            <div style={{ marginTop: "25px" }}>
              <label style={labelStyle}>{text.phone}</label>

              <input
                name="phone"
                value={form.phone}
                required
                onChange={changeForm}
                placeholder="Example: 0300 1234567"
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: "25px" }}>
              <label style={labelStyle}>
                {text.description} ({text.optional})
              </label>

              <textarea
                name="description"
                value={form.description}
                rows="5"
                onChange={changeForm}
                placeholder="Write complete details about your property..."
                style={inputStyle}
              />
            </div>

            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                borderRadius: "18px",
                background: "#142238",
                color: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{text.listingFee}</strong>
                <p>{text.feeText}</p>
              </div>

              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "800",
                }}
              >
                Rs. {currentFee.toLocaleString()}
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "22px",
                padding: "17px",
                border: "none",
                borderRadius: "13px",
                background: "#159a91",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              {text.submitPay} →
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

export default PostProperty;
