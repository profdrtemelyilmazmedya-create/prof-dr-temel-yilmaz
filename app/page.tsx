"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const whatsappNumber = "905332202010";

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 1) return numbers;
    if (numbers.length <= 4) return `${numbers[0]}(${numbers.slice(1)}`;
    if (numbers.length <= 7) return `${numbers[0]}(${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `${numbers[0]}(${numbers.slice(1, 4)}) ${numbers.slice(4, 7)} ${numbers.slice(7)}`;
    return `${numbers[0]}(${numbers.slice(1, 4)}) ${numbers.slice(4, 7)} ${numbers.slice(7, 9)} ${numbers.slice(9)}`;
  };

  const sendWhatsapp = () => {
    const message = encodeURIComponent(
      `Merhaba, randevu talebi oluşturmak istiyorum.\n\nAd Soyad: ${name}\nCep Telefonu: ${phone}\nRandevu Tarihi: ${date}\n\nİletişim: +90 533 220 20 10`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f6f8fb", color: "#102a43" }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }

        .hero img { width: 100%; height: auto; display: block; }

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
        }

        .intro p {
          max-width: 760px;
          margin: 0 auto;
          color: #5b6b7a;
          font-size: 18px;
          line-height: 1.6;
        }

        .section {
          max-width: 1050px;
          margin: 45px auto;
          padding: 0 22px;
        }

        .box {
          background: white;
          border-radius: 28px;
          padding: 34px;
          box-shadow: 0 18px 45px rgba(16,42,67,.09);
        }

        input {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid #d9e2ec;
          font-size: 16px;
          margin-bottom: 14px;
        }

        button {
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

        .news-frame {
          width: 100%;
          height: 620px;
          border: 1px solid #d9e2ec;
          border-radius: 22px;
          background: white;
        }

        h2 { font-size: 32px; margin-top: 0; }
        h3 { font-size: 24px; }

        @media (max-width: 768px) {
          .box { padding: 24px; border-radius: 22px; }
          .news-frame { height: 520px; }
        }
      `}</style>

      <section className="hero">
        <img src="/hero.jpg" alt="Areteus Sağlık - Prof. Dr. M. Temel Yılmaz" />
      </section>

      <section className="intro">
        <small>Areteus Sağlık</small>
        <h1>Prof. Dr. Mehmet Temel Yılmaz</h1>
        <p>
          İç Hastalıkları, Endokrinoloji, Diyabet ve Metabolizma Hastalıkları alanında
          akademik ve klinik deneyim.
        </p>
      </section>

      <section className="section" id="randevu">
        <div className="box">
          <h2>Randevu Talebi</h2>

          <input
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Cep 0(xxx) xxx xx xx"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={sendWhatsapp}>
            WhatsApp ile Randevu Talebi Gönder
          </button>
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
          <h2>Haber</h2>
          <h3>
            Prof. Dr. Temel Yılmaz: Dördüncü doz aşıya ihtiyaç olduğunu gösteren bir çalışma yok
          </h3>

          <iframe
            className="news-frame"
            src="https://t24.com.tr/koronavirus/prof-dr-temel-yilmaz-dorduncu-doz-asiya-ihtiyac-oldugunu-gosteren-bir-calisma-yok,972604"
            title="T24 Haber"
          />
        </div>
      </section>
    </main>
  );
}
