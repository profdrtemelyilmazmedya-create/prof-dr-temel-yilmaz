"use client";

import { useEffect, useState } from "react";

const slides = ["/hero.jpg", "/slide-1.jpg", "/slide-2.jpg", "/slide-3.jpg"];

const sections = [
  {
    title: "Akademik Eğitim ve Unvanlar",
    icon: "🎓",
    items: [
      "1976 – İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi, Doktor",
      "1981 – İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi İç Hastalıkları Anabilim Dalı, Uzman Doktor",
      "1985 – Brussels Free University, Fellowship",
      "1986 – İstanbul Üniversitesi İstanbul Tıp Fakültesi İç Hastalıkları Anabilim Dalı, Doçent Doktor",
      "1993 – İstanbul Üniversitesi İstanbul Tıp Fakültesi, Profesör Doktor",
    ],
  },
  {
    title: "Akademik ve İdari Görevler",
    icon: "🩺",
    items: [
      "1994 – İstanbul Üniversitesi Deneysel Tıp Araştırma Enstitüsü, İmmünoloji Anabilim Dalı Başkanı",
      "1997 – University of London, Visiting Professor",
      "2005 – İstanbul Üniversitesi İstanbul Tıp Fakültesi İç Hastalıkları AD, Endokrinoloji ve Metabolizma Hastalıkları BD",
      "2010 – İstanbul Üniversitesi, Diyabet Uygulama ve Araştırma Merkezi Müdürü",
      "2024 – Acıbadem Üniversitesi, DİYAM Koordinatörü",
    ],
  },
  {
    title: "Ulusal / Uluslararası Görevler",
    icon: "🌍",
    items: [
      "Türkiye Diyabet Vakfı Başkanı",
      "Diyabet Araştırma ve Uygulamaları Derneği Başkanı",
      "T.C. Sağlık Bakanlığı Diyabet Danışma Kurulu Üyesi",
      "2020 – International Diabetes Federation European Region Executive Board",
    ],
  },
  {
    title: "Ödüller",
    icon: "🏅",
    items: [
      "1987 – Eczacıbaşı Bilimsel Araştırma Ödülü",
      "1989 – WHO Regional Office for Europe Grant",
      "1995 – IDF / Eli Lilly Fund Grants",
      "2000 – TURDIAB 2000 Diyabet Proje Ödülü",
      "2015 – International Diabetes Federation European Region Diabetes Award",
    ],
  },
  {
    title: "Bilimsel Yayınlar",
    icon: "📚",
    items: [
      "SCI ve SCIE kapsamındaki dergilerde çok sayıda yayını bulunmaktadır.",
      "Uluslararası dergilerde yayımlanmış bilimsel makaleleri yer almaktadır.",
    ],
  },
  {
    title: "Uzmanlık Alanları",
    icon: "💉",
    items: [
      "Diyabet",
      "Tip 1 ve Tip 2 diyabet",
      "Endokrinoloji ve Metabolizma Hastalıkları",
      "İmmünoloji",
      "Obezite",
      "İnsülin tedavileri",
      "Diyabet teknolojileri",
      "Patch pump / sensör destekli sistemler",
      "Halk sağlığı ve diyabet epidemiyolojisi",
    ],
  },
  {
    title: "Basında Biz",
    icon: "🎥",
    items: [
      "Prof. Dr. Temel Yılmaz: İnsülinin keşfi kadar büyük bir başarı",
    ],
  },
  {
    title: "İletişim",
    icon: "📍",
    items: [
      "Teşvikiye, Hakkı Yeten Cd. No:17, 34365 Şişli/İstanbul Aşçıoğlu Plaza Kat:7",
      "+90 533 220 20 10",
    ],
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<string | null>("Akademik Eğitim ve Unvanlar");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const address =
    "Teşvikiye, Hakkı Yeten Cd. No:17, 34365 Şişli İstanbul Aşçıoğlu Plaza Kat:7";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4200);

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
      `📅 *Randevu Talebi*\n\n👤 *Ad Soyad:* ${name}\n📞 *Telefon:* ${phone}\n🗓 *Tarih:* ${date}\n\n📍 *Areteus Sağlık*\n☎️ +90 533 220 20 10`
    );

    window.open(`https://wa.me/905332202010?text=${message}`, "_blank");
  };

  return (
    <main>
      <style>{`
        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f6f8fb;
          color: #102a43;
        }

        .hero {
          position: relative;
          height: 72vh;
          min-height: 480px;
          overflow: hidden;
          background: #eaf2f4;
        }

        .slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: #f4f7f8;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }

        .slide.active { opacity: 1; }

        .dots {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 99px;
          background: rgba(0,168,184,.35);
        }

        .dot.active {
          width: 30px;
          background: #00a8b8;
        }

        .intro {
          text-align: center;
          padding: 46px 22px 22px;
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
          max-width: 760px;
          margin: 0 auto;
          color: #5b6b7a;
          font-size: 18px;
          line-height: 1.6;
        }

        .menuGrid {
          max-width: 1050px;
          margin: 34px auto;
          padding: 0 22px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .menuWrap {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .menuCard {
          min-height: 96px;
          border: 1px solid #dce8ee;
          background: white;
          border-radius: 22px;
          padding: 22px;
          text-align: left;
          box-shadow: 0 10px 28px rgba(16,42,67,.07);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 18px;
          font-weight: 800;
          color: #123047;
        }

        .menuCard span {
          min-width: 42px;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: #eaf8fa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .menuCard.active {
          border-color: #00a8b8;
          box-shadow: 0 16px 36px rgba(0,168,184,.18);
        }

        .inlineBox {
          background: white;
          border-radius: 22px;
          padding: 24px;
          box-shadow: 0 14px 34px rgba(16,42,67,.08);
          border: 1px solid #e4edf2;
        }

        .inlineBox h2 {
          margin-top: 0;
          font-size: 26px;
        }

        .section {
          max-width: 1050px;
          margin: 38px auto;
          padding: 0 22px;
        }

        .box {
          background: white;
          border-radius: 28px;
          padding: 34px;
          box-shadow: 0 18px 45px rgba(16,42,67,.09);
        }

        .box h2 { margin-top: 0; font-size: 30px; }

        .list {
          margin: 0;
          padding-left: 20px;
          color: #415466;
          line-height: 1.8;
          font-size: 16px;
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

        .primaryBtn,
        .mapBtn,
        .callBtn {
          display: block;
          width: 100%;
          margin-top: 18px;
          padding: 17px;
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 17px;
          font-weight: 800;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
        }

        .primaryBtn { background: #00a8b8; }
        .mapBtn { background: #102a43; }
        .callBtn { background: #18a558; }

        .video {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: 0;
          border-radius: 22px;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .hero {
            height: 42vh;
            min-height: 300px;
          }

          .menuGrid {
            grid-template-columns: 1fr;
          }

          .menuCard {
            min-height: 92px;
            padding: 18px;
            border-radius: 18px;
            font-size: 17px;
          }

          .box,
          .inlineBox {
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

      <section className="menuGrid">
        {sections.map((section) => (
          <div key={section.title} className="menuWrap">
            <button
              className={`menuCard ${open === section.title ? "active" : ""}`}
              onClick={() =>
                setOpen(open === section.title ? null : section.title)
              }
            >
              <span>{section.icon}</span>
              {section.title}
            </button>

            {open === section.title && (
              <div className="inlineBox">
                <h2>{section.title}</h2>

                <ul className="list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                {section.title === "Basında Biz" && (
                  <iframe
                    className="video"
                    src="https://www.youtube.com/embed/Jx0Ew7GvLdw"
                    title="Prof. Dr. Temel Yılmaz"
                    allowFullScreen
                  />
                )}

                {section.title === "İletişim" && (
                  <>
                    <a
                      className="mapBtn"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        address
                      )}`}
                      target="_blank"
                    >
                      Google Maps ile Yol Tarifi Al
                    </a>

                    <a className="callBtn" href="tel:+905332202010">
                      WhatsApp / Telefon: +90 533 220 20 10
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
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

            <button className="primaryBtn" onClick={sendWhatsapp}>
              WhatsApp ile Randevu Talebi Gönder
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
