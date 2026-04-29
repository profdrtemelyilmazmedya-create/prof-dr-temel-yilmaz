"use client";

import { useEffect, useState } from "react";

const slides = ["/hero.jpg", "/slide-1.jpg", "/slide-2.jpg", "/slide-3.jpg"];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const formatPhone = (value: string) => {
    const n = value.replace(/\D/g, "").replace(/^0/, "").slice(0, 10);

    if (n.length <= 3) return `0(${n}`;
    if (n.length <= 6) return `0(${n.slice(0, 3)}) ${n.slice(3)}`;
    if (n.length <= 8)
      return `0(${n.slice(0, 3)}) ${n.slice(3, 6)} ${n.slice(6)}`;

    return `0(${n.slice(0, 3)}) ${n.slice(3, 6)} ${n.slice(
      6,
      8
    )} ${n.slice(8)}`;
  };

  const sendWhatsapp = () => {
    const message = encodeURIComponent(
      `📅 *Randevu Talebi*\n\n👤 *Ad Soyad:* ${name}\n📞 *Telefon:* ${phone}\n🗓 *Tarih:* ${date}\n\n📍 Areteus Sağlık\n☎️ +90 533 220 20 10`
    );

    window.open(`https://wa.me/905332202010?text=${message}`, "_blank");
  };

  const menuItems = [
    "Akademik Eğitim",
    "Akademik Görevler",
    "Ödüller",
    "Yayınlar",
    "Uzmanlık Alanları",
    "İletişim",
  ];

  return (
    <main>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f5f8fa;
          color: #102a43;
        }

        .hero {
          position: relative;
          width: 100%;
          height: 82vh;
          overflow: hidden;
          background: #dde8ec;
        }

        .slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1200ms ease-in-out;
        }

        .slide.active {
          opacity: 1;
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.08),
            rgba(0,0,0,0.28)
          );
        }

        .dots {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 99px;
          background: rgba(255,255,255,0.65);
        }

        .dot.active {
          width: 30px;
          background: #00a8b8;
        }

        .intro {
          text-align: center;
          padding: 48px 22px 26px;
        }

        .intro small {
          color: #008fa3;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .intro h1 {
          margin: 14px 0 10px;
          font-size: clamp(34px, 6vw, 58px);
          line-height: 1.08;
        }

        .intro p {
          max-width: 780px;
          margin: 0 auto;
          color: #5b6b7a;
          font-size: 18px;
          line-height: 1.6;
        }

        .menu {
          max-width: 1050px;
          margin: 30px auto 20px;
          padding: 0 22px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .menu button {
          width: auto;
          padding: 13px 20px;
          border-radius: 999px;
          border: 1px solid #d7e4ea;
          background: rgba(255,255,255,0.95);
          color: #123047;
          font-size: 15px;
          font-weight: 700;
          box-shadow: 0 8px 22px rgba(16,42,67,0.06);
          cursor: pointer;
        }

        .section {
          max-width: 1050px;
          margin: 42px auto;
          padding: 0 22px;
        }

        .box {
          background: white;
          border-radius: 28px;
          padding: 34px;
          box-shadow: 0 18px 45px rgba(16,42,67,0.09);
        }

        .box h2 {
          margin-top: 0;
          font-size: 30px;
        }

        .form label {
          display: block;
          margin: 16px 0 8px;
          font-weight: 800;
        }

        input {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid #d9e2ec;
          font-size: 16px;
        }

        .whatsappButton {
          margin-top: 20px;
          width: 100%;
          padding: 17px;
          border: none;
          border-radius: 14px;
          background: #00a8b8;
          color: white;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
        }

        .video {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: 0;
          border-radius: 22px;
          overflow: hidden;
        }

        .contactText {
          color: #5b6b7a;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .hero {
            height: 46vh;
          }

          .slide {
            object-fit: cover;
          }

          .menu {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
          }

          .menu button {
            white-space: nowrap;
          }

          .box {
            padding: 24px;
            border-radius: 22px;
          }
        }
      `}</style>

      <section className="hero">
        {slides.map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Areteus Sağlık"
            className={`slide ${index === current ? "active" : ""}`}
          />
        ))}

        <div className="heroOverlay" />

        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      <section className="intro">
        <small>Areteus Sağlık</small>
        <h1>Prof. Dr. Mehmet Temel Yılmaz</h1>
        <p>
          İç Hastalıkları, Endokrinoloji, Diyabet ve Metabolizma Hastalıkları
          alanında akademik ve klinik deneyim.
        </p>
      </section>

      <section className="menu">
        {menuItems.map((item) => (
          <button key={item}>{item}</button>
        ))}
      </section>

      <section className="section">
        <div className="box">
          <h2>Randevu Talebi</h2>

          <div className="form">
            <label>👤 Ad Soyad</label>
            <input
              placeholder="Ad Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>📞 Cep Telefonu</label>
            <input
              placeholder="0(5xx) xxx xx xx"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
            />

            <label>🗓 Randevu Tarihi</label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button className="whatsappButton" onClick={sendWhatsapp}>
              WhatsApp ile Randevu Talebi Gönder
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="box">
          <h2>Basında Biz</h2>
          <h3>Prof. Dr. Temel Yılmaz: İnsülinin keşfi kadar büyük bir başarı</h3>

          <iframe
            className="video"
            src="https://www.youtube.com/embed/Jx0Ew7GvLdw"
            title="Prof. Dr. Temel Yılmaz"
            allowFullScreen
          />
        </div>
      </section>

      <section className="section">
        <div className="box">
          <h2>İletişim</h2>
          <p className="contactText">
            <strong>Adres:</strong> Teşvikiye, Hakkı Yeten Cd. No:17, 34365
            Şişli/İstanbul Aşçıoğlu Plaza Kat:7
            <br />
            <strong>WhatsApp:</strong> +90 533 220 20 10
          </p>
        </div>
      </section>
    </main>
  );
}
