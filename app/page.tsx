"use client";

import { useEffect, useState } from "react";

const slides = ["/hero.jpg", "/slide-1.jpg", "/slide-2.jpg", "/slide-3.jpg"];

const sections = [
  {
    title: "Akademik Eğitim ve Unvanlar",
    icon: "🎓",
    items: [
      "1976 – İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi, Doktor",
      "1981 – Uzman Doktor",
      "1985 – Brussels Free University",
      "1993 – Profesör Doktor",
    ],
  },
  {
    title: "Akademik ve İdari Görevler",
    icon: "🩺",
    items: ["İstanbul Üniversitesi", "University of London"],
  },
  {
    title: "Ödüller",
    icon: "🏅",
    items: ["Uluslararası Diyabet Ödülü"],
  },
  {
    title: "Uzmanlık Alanları",
    icon: "💉",
    items: ["Diyabet", "Endokrinoloji", "İnsülin Tedavileri"],
  },
  {
    title: "Basında Biz",
    icon: "🎥",
    items: ["İnsülinin keşfi kadar büyük başarı"],
  },
  {
    title: "İletişim",
    icon: "📍",
    items: ["Şişli / İstanbul"],
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
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
    const n = value.replace(/\D/g, "").slice(0, 10);

    if (n.length <= 3) return `0(${n}`;
    if (n.length <= 6) return `0(${n.slice(0, 3)}) ${n.slice(3)}`;
    if (n.length <= 8)
      return `0(${n.slice(0, 3)}) ${n.slice(3, 6)} ${n.slice(6)}`;
    return `0(${n.slice(0, 3)}) ${n.slice(3, 6)} ${n.slice(
      6,
      8
    )} ${n.slice(8)}`;
  };

  const formatDateTR = (value: string) => {
    if (!value) return "";

    const [y, m, d] = value.split("-").map(Number);

    const months = [
      "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
      "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"
    ];

    const days = [
      "Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"
    ];

    const dateObj = new Date(y, m - 1, d);

    return `${d} ${months[m - 1]} ${days[dateObj.getDay()]} ${y}`;
  };

  const sendWhatsapp = () => {
    const msg = encodeURIComponent(
      `📅 *Randevu Talebi*\n\n` +
      `👤 *Ad Soyad:* ${name}\n` +
      `📞 *Telefon:* ${phone}\n` +
      `🗓 *Tarih:* ${formatDateTR(date)}\n\n` +
      `📍 *Konum:* https://maps.app.goo.gl/qWSuSpkmcg8MjFov8`
    );

    window.open(`https://wa.me/905332202010?text=${msg}`, "_blank");
  };

  return (
    <main>
      <style>{`
        body { margin:0; font-family:Arial; background:#f6f8fb;}

        .hero {
          height:60vh;
          position:relative;
          overflow:hidden;
        }

        .slide {
          position:absolute;
          width:100%;
          height:100%;
          object-fit:contain;
          opacity:0;
          transition:1s;
        }

        .active { opacity:1; }

        .menu {
          padding:20px;
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .card {
          background:white;
          padding:18px;
          border-radius:18px;
          box-shadow:0 10px 20px rgba(0,0,0,.06);
          cursor:pointer;
        }

        .box {
          background:white;
          padding:20px;
          border-radius:18px;
          margin-top:10px;
        }

        input {
          width:100%;
          padding:14px;
          margin-top:10px;
          border-radius:10px;
          border:1px solid #ccc;
        }

        button {
          width:100%;
          margin-top:15px;
          padding:15px;
          border:none;
          background:#00a8b8;
          color:white;
          border-radius:10px;
          font-weight:bold;
        }
      `}</style>

      {/* SLIDER */}
      <section className="hero">
        {slides.map((s, i) => (
          <img
            key={i}
            src={s}
            className={`slide ${i === current ? "active" : ""}`}
          />
        ))}
      </section>

      {/* MENÜ */}
      <section className="menu">
        {sections.map((s) => (
          <div key={s.title}>
            <div className="card" onClick={() => setOpen(open === s.title ? null : s.title)}>
              {s.icon} {s.title}
            </div>

            {open === s.title && (
              <div className="box">
                {s.items.map((i) => (
                  <div key={i}>{i}</div>
                ))}

                {s.title === "Basında Biz" && (
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/Jx0Ew7GvLdw"
                  />
                )}

                {s.title === "İletişim" && (
                  <>
                    <a href="https://maps.app.goo.gl/qWSuSpkmcg8MjFov8">
                      Google Maps Aç
                    </a>
                    <br />
                    <a href="tel:+905332202010">
                      Telefon: 0533 220 20 10
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* FORM */}
      <section className="menu">
        <div className="box">
          <h3>Randevu Talebi</h3>

          <input
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />

          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={sendWhatsapp}>
            WhatsApp ile Gönder
          </button>
        </div>
      </section>
    </main>
  );
}
