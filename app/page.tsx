export default function Home() {
  return (
    <main style={{ margin: 0, fontFamily: "sans-serif" }}>
      
      {/* NAVBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
          color: "white",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          Areteus Sağlık
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <span>Hakkında</span>
          <span>Hizmetler</span>
          <span>İletişim</span>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ARKA PLAN */}
        <img
          src="/hero.jpg"
          alt="hero"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* GRADIENT OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1))",
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "80px",
            transform: "translateY(-50%)",
            color: "white",
            maxWidth: "500px",
          }}
        >
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Areteus Sağlık
          </h1>

          <p style={{ fontSize: "20px", marginBottom: "30px" }}>
            Prof. Dr. M. Temel Yılmaz
          </p>

          <button
            style={{
              padding: "12px 24px",
              backgroundColor: "#00b7cc",
              border: "none",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Randevu Al
          </button>
        </div>
      </div>
    </main>
  );
}
