import { useState } from "react";

function PostProperty() {
  const [submitted, setSubmitted] = useState(false);
  const [language, setLanguage] = useState("en");
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    rent: "",
    bedrooms: "",
    area: "",
    phone: "",
    description: "",
  });

  const text =
    language === "ur"
      ? {
          home: "ہوم",
          houses: "گھر",
          post: "گھر شامل کریں",
          title: "اپنا گھر کرایے پر لگائیں",
          subtitle: "اپنے گھر کی مکمل معلومات درج کریں۔",
          propertyTitle: "گھر کا عنوان",
          location: "علاقہ",
          propertyType: "پراپرٹی کی قسم",
          rent: "ماہانہ کرایہ",
          bedrooms: "بیڈ رومز",
          area: "گھر کا رقبہ",
          phone: "WhatsApp نمبر",
          description: "گھر کی تفصیل (اختیاری)",
          submit: "Property Submit کریں",
          success: "آپ کی property Houses page میں شامل ہو گئی ہے۔",
        }
      : {
          home: "Home",
          houses: "Houses",
          post: "Post Property",
          title: "List Your Property",
          subtitle: "Enter your property details to reach potential tenants.",
          propertyTitle: "Property Title",
          location: "Location / Area",
          propertyType: "Property Type",
          rent: "Monthly Rent",
          bedrooms: "Bedrooms",
          area: "Property Area",
          phone: "WhatsApp Number",
          description: "Property Description (Optional)",
          submit: "Submit Property",
          success: "Your property has been added to the Houses page.",
        };

  function changeForm(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function submitProperty(event) {
    event.preventDefault();

    const newProperty = {
      id: Date.now(),
      title: form.title,
      type: form.type,
      location: form.location,
      price: `Rs. ${form.rent} / month`,
      priceNumber: Number(form.rent.replace(/\D/g, "")),
      bedrooms: Number(form.bedrooms),
      beds: `${form.bedrooms} Bedrooms`,
      baths: "Not added",
      area: Number(form.area.replace(/\D/g, "")),
      areaText: form.area,
      size: "Not added",
      description: form.description || "No additional description provided.",
      phone: form.phone,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    };

    const oldProperties = JSON.parse(
      localStorage.getItem("rentHouseProperties") || "[]"
    );

    localStorage.setItem(
      "rentHouseProperties",
      JSON.stringify([...oldProperties, newProperty])
    );

    setSubmitted(true);
  }

  return (
    <div className="app" dir={language === "ur" ? "rtl" : "ltr"}>
      <nav className="navbar">
        <div className="logo">
          Rent<span>House</span>
        </div>

        <div className="nav-links">
          <a href="/">{text.home}</a>
          <a href="/houses">{text.houses}</a>
          <a href="/post-property">{text.post}</a>
        </div>

        <div className="language-switch">
          <button
            type="button"
            className={language === "en" ? "language-btn active-language" : "language-btn"}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          <button
            type="button"
            className={language === "ur" ? "language-btn active-language" : "language-btn"}
            onClick={() => setLanguage("ur")}
          >
            اردو
          </button>
        </div>
      </nav>

      <main className="post-page">
        <div className="post-heading">
          <p className="small-title listings-title">RENT HOUSE</p>
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </div>

        {submitted ? (
          <div className="success-message">
            ✓ {text.success}
            <br />
            <br />
            <a href="/houses">View Houses</a>
          </div>
        ) : (
          <form className="post-form" onSubmit={submitProperty}>
            <div>
              <label>{text.propertyTitle}</label>
              <input name="title" required onChange={changeForm} placeholder="Example: 10 Marla Family House" />
            </div>

            <div>
              <label>{text.location}</label>
              <input name="location" required onChange={changeForm} placeholder="Example: DHA Lahore" />
            </div>

            <div>
              <label>{text.propertyType}</label>
              <input name="type" required onChange={changeForm} placeholder="House, Flat, Room..." />
            </div>

            <div>
              <label>{text.rent}</label>
              <input name="rent" required onChange={changeForm} placeholder="Example: 85000" />
            </div>

            <div>
              <label>{text.bedrooms}</label>
              <input name="bedrooms" required onChange={changeForm} placeholder="Example: 3" />
            </div>

            <div>
              <label>{text.area}</label>
              <input name="area" required onChange={changeForm} placeholder="Example: 10 Marla" />
            </div>

            <div className="full-field">
              <label>{text.phone}</label>
              <input name="phone" required onChange={changeForm} placeholder="Example: 0300 1234567" />
            </div>

            <div className="full-field">
              <label>{text.description}</label>
              <textarea
                name="description"
                rows="5"
                onChange={changeForm}
                placeholder="Write complete details, or leave this empty..."
              />
            </div>

            <div className="full-field">
              <button className="submit-property-btn" type="submit">
                {text.submit}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default PostProperty;