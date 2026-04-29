"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const whatsappNumber = "905332202010";

  const sendWhatsapp = () => {
    const message = encodeURIComponent(
      `Merhaba, randevu talebi oluşturmak istiyorum.\n\nAd Soyad: ${name}\nTelefon: ${phone}\nNot: ${note}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const cards = [
    "Akademik Eğitim",
    "Akademik Görevler",
    "Ödüller",
    "Yayınlar",
    "Uzmanlık Alanları",
    "İletişim",
  ];

  return (
    <main className="site">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }

        .site {
          font-family: Arial, sans-serif;
          background: #f6f8fb;
          color: #102a43;
        }

        .hero {
          width: 100%;
          background: #eef3f5;
        }

        .hero img {
          width: 100%;
          height: auto;
          display: block;
        }

        .intro {
          padding: 44px 22px 20px;
          text-align: center;
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
          line-height: 1.05;
        }

        .intro p {
          max-width: 760px;
          margin: 0 auto;
          color: #5b6b7a;
          font-size: 18px;
          line-height: 1.6;
        }

        .cards {
          max-width: 1120px;
          margin: 35px auto;
          padding: 0 22px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .card {
          background: white;
          border: 1px solid #e6edf2;
          border-radius: 22px;
          padding: 26px;
          min-height: 130px;
          box-shadow: 0 14px 35px rgba(16,42,67,.07);
        }

        .card span {
          font-size: 28px;
        }

        .card h3 {
          margin: 16px 0 0;
          font-size: 21px;
        }

        .appointment {
          max-width: 900px;
          margin: 50px auto 80px;
          padding: 34px;
          background: white;
          border-radius: 28px;
          box-shadow: 0 18px 45px rgba(16,42,67,.09);
        }

        .appointment h2 {
          margin-top: 0;
          font-size: 32px;
        }

        .form {
          display: grid;
          gap: 14px;
        }

        input, textarea {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid #d9e2ec;
          font-size: 16px;
        }

        button {
          padding: 17px;
          border: none;
          border-radius: 14px;
          background: #00a8b8;
          color: white;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
        }

        .contact {
          margin-top: 18px;
          color: #5b6b7a;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .cards {
            grid-template-columns: 1fr;
          }

          .card {
            min-height: auto;
            padding: 22px;
            border-radius: 18px;
          }

          .appointment {
            margin: 30px 18px 60px;
            padding: 24px;
          }
        }
      `}</style>

      <section className="hero">
        <img src="/hero.jpg" alt="Areteus Sağlık - Prof. Dr. M. Temel Yılmaz" />
      </section>

      <section className="intro">
        <small>Areteus Sağlık</small>
        <h1>Prof. Dr. Mehmet Temel Yılmaz</h1>
        <p>
          İç Hastalıkları, Endokrinoloji, Diyabet ve Metabolizma Hastalıkları
          alanında akademik ve klinik deneyim.
        </p>
      </section>

      <section className="cards">
        {cards.map((item, i) => (
          <div className="card" key={item}>
            <span>{["🩺", "🎓", "🏅", "📚", "💉", "📍"][i]}</span>
            <h3>{item}</h3>
          </div>
        ))}
      </section>

      <section className="appointment">
        <h2>Randevu Talebi</h2>

        <div className="form">
          <input
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Telefon Numaranız"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Randevu notunuz"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button onClick={sendWhatsapp}>
            WhatsApp ile Randevu Talebi Gönder
          </button>
        </div>

        <div className="contact">
          <strong>Adres:</strong> Teşvikiye, Hakkı Yeten Cd. No:17, 34365
          Şişli/İstanbul Aşçıoğlu Plaza Kat:7
          <br />
          <strong>WhatsApp:</strong> +90 533 220 20 10
        </div>
      </section>
    </main>
  );
}
