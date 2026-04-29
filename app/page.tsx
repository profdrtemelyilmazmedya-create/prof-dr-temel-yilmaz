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
      `Merhaba, randevu talebi oluşturmak istiyorum.\n\nAd Soyad: ${name}\nCep: ${phone}\nTarih: ${date}\n\nİletişim: +90 533 220 20 10`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main>
      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: Arial; background:#f6f8fb; }

        /* NAVBAR */
        .nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 24px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #eee;
        }

        .nav h2 {
          margin: 0;
          font-size: 20px;
        }

        .menu {
          display: flex;
          gap: 18px;
        }

        .menu a {
          text-decoration: none;
          color: #102a43;
          font-weight: 600;
        }

        .menu a:hover {
          color: #00a8b8;
        }

        /* HERO */
        .hero img {
          width: 100%;
          margin-top: 60px;
        }

        .section {
          max-width: 1000px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .box {
          background: white;
          padding: 30px;
          border-radius: 24px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
        }

        input {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid #ddd;
          margin-bottom: 12px;
        }

        button {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 12px;
          background: #00a8b8;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        iframe {
          width: 100%;
          border-radius: 20px;
        }

        @media(max-width:768px){
          .menu { display:none; } /* mobilde sade olsun */
        }
      `}</style>

      {/* NAVBAR */}
      <div className="nav">
        <h2>Areteus Sağlık</h2>
        <div className="menu">
          <a href="#hakkinda">Hakkında</a>
          <a href="#randevu">Randevu</a>
          <a href="#basin">Basında Biz</a>
          <a href="#haber">Haber</a>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <img src="/hero.jpg" />
      </div>

      {/* HAKKINDA */}
      <div className="section" id="hakkinda">
        <div className="box">
          <h2>Hakkında</h2>
          <p>
            Prof. Dr. Mehmet Temel Yılmaz, Endokrinoloji ve Diyabet alanında uzun yıllara dayanan akademik ve klinik deneyime sahiptir.
          </p>
        </div>
      </div>

      {/* RANDEVU */}
      <div className="section" id="randevu">
        <div className="box">
          <h2>Randevu Talebi</h2>

          <input placeholder="Ad Soyad" value={name} onChange={(e)=>setName(e.target.value)} />
          <input placeholder="Cep 0(xxx) xxx xx xx" value={phone} onChange={(e)=>setPhone(formatPhone(e.target.value))} />
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />

          <button onClick={sendWhatsapp}>
            WhatsApp ile Randevu Talebi Gönder
          </button>
        </div>
      </div>

      {/* BASINDA BİZ */}
      <div className="section" id="basin">
        <div className="box">
          <h2>Basında Biz</h2>
          <h3>İnsülinin keşfi kadar büyük başarı</h3>

          <iframe
            height="400"
            src="https://www.youtube.com/embed/Jx0Ew7GvLdw"
          />
        </div>
      </div>

      {/* HABER */}
      <div className="section" id="haber">
        <div className="box">
          <h2>Haber</h2>
          <h3>Dördüncü doz aşı hakkında açıklama</h3>

          <iframe
            height="500"
            src="https://t24.com.tr/koronavirus/prof-dr-temel-yilmaz-dorduncu-doz-asiya-ihtiyac-oldugunu-gosteren-bir-calisma-yok,972604"
          />
        </div>
      </div>

    </main>
  );
}
