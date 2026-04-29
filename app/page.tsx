export default function Home() {
  return (
    <main style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f6f3ef" }}>
      <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        <img
          src="/hero.jpg"
          alt="Areteus Sağlık"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,.25), rgba(0,0,0,.55))",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "8%",
            bottom: "12%",
            color: "white",
            maxWidth: 560,
          }}
        >
          <h1 style={{ fontSize: "clamp(44px, 8vw, 82px)", lineHeight: 1, margin: 0 }}>
            Areteus<br />Sağlık
          </h1>
          <p style={{ fontSize: "clamp(22px, 4vw, 34px)", marginTop: 22 }}>
            Prof. Dr. M. Temel Yılmaz
          </p>
          <a
            href="#randevu"
            style={{
              display: "inline-block",
              marginTop: 20,
              padding: "16px 28px",
              background: "#00b7cc",
              color: "white",
              textDecoration: "none",
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            Randevu Al
          </a>
        </div>
      </section>

      <section style={{ padding: "60px 22px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
          }}
        >
          {["Hakkında", "Akademik Eğitim", "Akademik Görevler", "Ödüller", "Yayınlar", "Uzmanlık Alanları", "İletişim", "Randevu"].map((item) => (
            <div
              key={item}
              style={{
                background: "white",
                padding: 28,
                borderRadius: 22,
                boxShadow: "0 12px 30px rgba(0,0,0,.08)",
                fontSize: 22,
                fontWeight: 800,
                color: "#123047",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
