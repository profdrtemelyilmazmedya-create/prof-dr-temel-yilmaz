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
      "2005 – İstanbul Üniversitesi İstanbul Tıp Fakültesi İç Hastalıkları Anabilim Dalı, Endokrinoloji ve Metabolizma Hastalıkları Bilim Dalı, Profesör Doktor",
      "2010 – İstanbul Üniversitesi, Diyabet Uygulama ve Araştırma Merkezi Müdürü",
      "2024 – Acıbadem Üniversitesi, DİYAM Koordinatörü",
    ],
  },
  {
    title: "Ulusal Ek Görevler",
    icon: "🏛️",
    items: [
      "İstanbul Üniversitesi Deneysel Tıp Araştırma Enstitüsü, Yönetim Kurulu Üyesi",
      "T.C. Adalet Bakanlığı Adli Tıp Kurumu, 5. İhtisas Kurulu ve Genel Kurul Üyesi",
      "TTB İstanbul Tabip Odası, Onur Kurulu Üyesi",
      "T.C. Sağlık Bakanlığı, Diyabet Danışma Kurulu Üyesi",
      "T.C. Sağlık Bakanlığı, Obezite Danışma Kurulu Üyesi",
      "Türkiye Diyabet Vakfı Başkanı",
      "Ulusal Beslenme Platformu Başkanı",
    ],
  },
  {
    title: "Uluslararası Görevler",
    icon: "🌍",
    items: [
      "1996 – BlackSeaDiab Union, Eş Başkan",
      "1997 – Kuzey Kıbrıs Ulusal Diyabet Programı, Koordinatör",
      "1998 – Azer-Turk Diab Twinning Program, Koordinatör",
      "1999 – V. St. Vincent Declaration Congress, Koordinatör",
      "1999 – European Diabetes Policy Group, Üye",
      "2020 – International Diabetes Federation European Region Executive Board",
    ],
  },
  {
    title: "Editöryel Görevler",
    icon: "📘",
    items: [
      "International Diabetes Monitor – Review Editor",
      "Dialogue, Diabetes Literature Review Service – Editorial Board",
      "Annals of Medical Sciences – Editorial Board",
      "Turkish Journal of Endocrinology – Editorial Board",
      "Turkish Journal of Endocrinology and Metabolism – Editorial Board",
      "Adli Tıp Bülteni – Editöryel Kurul",
      "Klinik Gelişim Bülteni – Review Editor",
      "Journal of Diabetes – Editorial Board",
    ],
  },
  {
    title: "Üyelikler",
    icon: "🤝",
    items: [
      "American Diabetes Association (ADA)",
      "European Association for the Study of Diabetes (EASD)",
      "International Diabetes Federation (IDF)",
      "International Diabetes Immunotherapy Group (IDIG)",
      "Türk Tabipler Birliği",
      "Türkiye Diyabet Vakfı",
      "Türkiye Endokrinoloji ve Metabolizma Derneği",
      "Türk İmmünoloji Derneği",
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
      "2000, 2002, 2006, 2007 – TURDIAB Diyabet Bilimsel Yayın Ödülü",
      "2012 – Lions Club International Presidents Awards",
      "2015 – International Diabetes Federation European Region Diabetes Award (Kanada)",
    ],
  },
  {
    title: "Bilimsel Yayınlar",
    icon: "📚",
    items: [
      "SCI ve SCIE kapsamındaki dergilerde çok sayıda yayını bulunmaktadır.",
      "Uluslararası diğer dergilerde yayımlanmış makaleleri yer almaktadır.",
      "Öne çıkan alanlar: Diyabet, Tip 1 ve Tip 2 diyabet, immünoloji, obezite, diyabet teknolojileri ve epidemiyoloji.",
    ],
  },
  {
    title: "Uzmanlık Alanları",
    icon: "💉",
    items: [
      "İç Hastalıkları",
      "Endokrinoloji ve Metabolizma Hastalıkları",
      "Diyabet",
      "İmmünoloji",
      "Diyabet teknolojileri ve tedavi sistemleri",
      "Patch pump / sensör destekli sistemler",
      "Halk sağlığı ve diyabet epidemiyolojisi",
    ],
  },
  {
    title: "Basında Biz",
    icon: "🎥",
    items: ["Prof. Dr. Temel Yılmaz: İnsülinin keşfi kadar büyük bir başarı"],
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
  const mapUrl = "https://maps.app.goo.gl/qWSuSpkmcg8MjFov8";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const formatPhone = (value: string) => {
    const n = value.replace(/\D/g, "").replace(/^0/, "").slice(0, 10);
    if (n.length <= 3) return `0(${n}`;
    if (n.length <= 6) return `0(${n.slice(0, 3)}) ${n.slice(3)}`;
    if (n.length <= 8) return `0(${n.slice(0, 3)}) ${n.slice(3, 6)} ${n.slice(6)}`;
    return `0(${n.slice(0, 3)}) ${n.slice(3, 6)} ${n.slice(6, 8)} ${n.slice(8)}`;
  };

  const formatDateTR = (value: string) => {
    if (!value) return "";
    const [y, m, d] = value.split("-").map(Number);
    const months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    const days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
    const dateObj = new Date(y, m - 1, d);
    return `${String(d).padStart(2, "0")} ${months[m - 1]} ${days[dateObj.getDay()]} ${y}`;
  };

  const sendWhatsapp = () => {
    const msg = encodeURIComponent(
      `📅 *Randevu Talebi*\n\n` +
      `👤 *Ad Soyad:* ${name}\n` +
      `📞 *Telefon:* ${phone}\n` +
      `🗓 *Tarih:* ${formatDateTR(date)}\n\n` +
      `📍 *Konum:* ${mapUrl}\n` +
      `☎️ *İletişim:* +90 533 220 20 10`
    );
    window.open(`https://wa.me/905332202010?text=${msg}`, "_blank");
  };

  return (
    <main>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Inter, Arial, Helvetica, sans-serif;
          background: linear-gradient(180deg, #f7fbfc 0%, #eef5f7 100%);
          color: #102a43;
        }

        .hero {
          position: relative;
          height: 68vh;
          min-height: 430px;
          overflow: hidden;
          background: #ecf4f6;
        }

        .slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: #ecf4f6;
          opacity: 0;
          transform: scale(1.015);
          transition: opacity 1.2s ease, transform 5s ease;
        }

        .slide.active {
          opacity: 1;
          transform: scale(1);
        }

        .heroShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(8,31,45,.14));
        }

        .dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 99px;
          background: rgba(255,255,255,.55);
          backdrop-filter: blur(12px);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background: rgba(0,168,184,.35);
          transition: .3s;
        }

        .dot.active {
          width: 30px;
          background: #00a8b8;
        }

        .intro {
          max-width: 980px;
          margin: 0 auto;
          padding: 56px 22px 20px;
          text-align: center;
        }

        .kicker {
          color: #008fa3;
          font-weight: 900;
          letter-spacing: 5px;
          text-transform: uppercase;
          font-size: 14px;
        }

        .intro h1 {
          margin: 16px 0 14px;
          font-size: clamp(36px, 6vw, 66px);
          line-height: 1.03;
          letter-spacing: -1.8px;
        }

        .intro p {
          max-width: 760px;
          margin: 0 auto;
          color: #5b6b7a;
          font-size: 19px;
          line-height: 1.75;
        }

        .quickActions {
          max-width: 860px;
          margin: 26px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 0 22px;
        }

        .quickActions a {
          text-decoration: none;
          text-align: center;
          padding: 15px 16px;
          border-radius: 16px;
          font-weight: 900;
          color: #102a43;
          background: rgba(255,255,255,.9);
          border: 1px solid #dce8ee;
          box-shadow: 0 12px 30px rgba(16,42,67,.06);
        }

        .menuGrid {
          max-width: 1120px;
          margin: 42px auto;
          padding: 0 22px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .menuWrap {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .menuCard {
          min-height: 104px;
          width: 100%;
          border: 1px solid #dce8ee;
          background: rgba(255,255,255,.92);
          border-radius: 26px;
          padding: 24px;
          text-align: left;
          box-shadow: 0 16px 36px rgba(16,42,67,.07);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 19px;
          font-weight: 900;
          color: #123047;
        }

        .menuIcon {
          min-width: 48px;
          width: 48px;
          height: 48px;
          border-radius: 18px;
          background: linear-gradient(135deg, #e8fbfd, #f3fbfc);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .menuCard.active {
          border-color: #00a8b8;
          box-shadow: 0 18px 42px rgba(0,168,184,.18);
        }

        .inlineBox, .box {
          background: rgba(255,255,255,.96);
          border: 1px solid #e4edf2;
          border-radius: 28px;
          padding: 30px;
          box-shadow: 0 18px 44px rgba(16,42,67,.08);
        }

        .inlineBox h2, .box h2 {
          margin-top: 0;
          font-size: 30px;
          letter-spacing: -0.8px;
        }

        .list {
          margin: 0;
          padding-left: 20px;
          color: #415466;
          line-height: 1.85;
          font-size: 16.5px;
        }

        .section {
          max-width: 1050px;
          margin: 42px auto 72px;
          padding: 0 22px;
        }

        .form label {
          display: block;
          margin: 16px 0 8px;
          font-weight: 900;
        }

        input {
          width: 100%;
          padding: 17px;
          border-radius: 16px;
          border: 1px solid #d9e2ec;
          font-size: 16px;
          outline: none;
          background: #fbfdfe;
        }

        input:focus {
          border-color: #00a8b8;
          box-shadow: 0 0 0 4px rgba(0,168,184,.1);
        }

        .primaryBtn, .mapBtn, .callBtn {
          display: block;
          width: 100%;
          margin-top: 18px;
          padding: 18px;
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 17px;
          font-weight: 900;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
        }

        .primaryBtn { background: linear-gradient(135deg, #00a8b8, #007f91); }
        .mapBtn { background: #102a43; }
        .callBtn { background: #18a558; }

        .video {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: 0;
          border-radius: 22px;
          margin-top: 20px;
        }

        .footer {
          text-align: center;
          padding: 32px 22px;
          color: #6b7c8f;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .hero {
            height: 38vh;
            min-height: 285px;
          }

          .intro {
            padding-top: 42px;
          }

          .intro h1 {
            font-size: 43px;
          }

          .intro p {
            font-size: 18px;
          }

          .quickActions {
            grid-template-columns: 1fr;
          }

          .menuGrid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 34px;
          }

          .menuCard {
            min-height: 96px;
            padding: 20px;
            border-radius: 22px;
            font-size: 18px;
          }

          .inlineBox, .box {
            padding: 24px;
            border-radius: 24px;
          }

          .inlineBox h2, .box h2 {
            font-size: 30px;
          }

          .list {
            font-size: 16px;
            line-height: 1.85;
          }
        }
      `}</style>

      <section className="hero">
        {slides.map((src, index) => (
          <img key={src} src={src} alt="Areteus Sağlık" className={`slide ${index === current ? "active" : ""}`} />
        ))}
        <div className="heroShade" />
        <div className="dots">
          {slides.map((_, index) => (
            <span key={index} className={`dot ${index === current ? "active" : ""}`} />
          ))}
        </div>
      </section>

      <section className="intro">
        <div className="kicker">Areteus Sağlık</div>
        <h1>Prof. Dr. Mehmet Temel Yılmaz</h1>
        <p>
          İç Hastalıkları, Endokrinoloji, Diyabet ve Metabolizma Hastalıkları alanında
          akademik birikim, klinik deneyim ve diyabet teknolojileri odağı.
        </p>
      </section>

      <section className="quickActions">
        <a href="#randevu">Randevu Talebi</a>
        <a href={mapUrl} target="_blank">Konum</a>
        <a href="tel:+905332202010">Telefon</a>
      </section>

      <section className="menuGrid">
        {sections.map((section) => (
          <div key={section.title} className="menuWrap">
            <button className={`menuCard ${open === section.title ? "active" : ""}`} onClick={() => setOpen(open === section.title ? null : section.title)}>
              <span className="menuIcon">{section.icon}</span>
              {section.title}
            </button>

            {open === section.title && (
              <div className="inlineBox">
                <h2>{section.title}</h2>
                <ul className="list">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>

                {section.title === "Basında Biz" && (
                  <iframe className="video" src="https://www.youtube.com/embed/Jx0Ew7GvLdw" title="Prof. Dr. Temel Yılmaz" allowFullScreen />
                )}

                {section.title === "İletişim" && (
                  <>
                    <a className="mapBtn" href={mapUrl} target="_blank">Google Maps ile Yol Tarifi Al</a>
                    <a className="callBtn" href="tel:+905332202010">Telefon: +90 533 220 20 10</a>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="section" id="randevu">
        <div className="box">
          <h2>Randevu Talebi</h2>

          <div className="form">
            <label>👤 Ad Soyad</label>
            <input placeholder="Ad Soyad" value={name} onChange={(e) => setName(e.target.value)} />

            <label>📞 Cep Telefonu</label>
            <input placeholder="0(5xx) xxx xx xx" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} />

            <label>🗓 Randevu Tarihi</label>
            <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />

            <button className="primaryBtn" onClick={sendWhatsapp}>WhatsApp ile Randevu Talebi Gönder</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        Areteus Sağlık · Prof. Dr. Mehmet Temel Yılmaz
      </footer>
    </main>
  );
}
