"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tqgommhknafkikshzqgd.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ui5QUNbwt-e3frr1VUxjew_NA6bbBXF";
const WHATSAPP_PHONE = "905332202010";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const slides = ["/hero.jpg", "/slide-1.jpg", "/slide-2.jpg", "/slide-3.jpg"];

const countries = [
  "Türkiye", "Almanya", "Fransa", "İtalya", "İspanya", "İngiltere", "ABD",
  "Kanada", "Hollanda", "Belçika", "İsviçre", "Avusturya", "İsveç",
  "Norveç", "Danimarka", "Rusya", "Japonya", "Çin", "Hindistan",
  "Brezilya", "Arjantin", "Meksika", "Avustralya", "Yunanistan",
  "Bulgaristan", "Romanya", "Polonya", "Portekiz", "İrlanda",
  "Birleşik Arap Emirlikleri", "Suudi Arabistan", "Katar", "Kuveyt"
];

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
      "2010 – İstanbul Üniversitesi, Diyabet Uygulama ve Araştırma Merkezi Müdürü",
      "2024 – Acıbadem Üniversitesi, DİYAM Koordinatörü",
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
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    type: "",
    country: "",
    city: "",
    name: "",
    phone: "",
    email: "",
    age: "",
    meeting: "WhatsApp",
    note: "",
  });

  const mapUrl = "https://maps.app.goo.gl/qWSuSpkmcg8MjFov8";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const update = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadFile = async () => {
    if (!file) return "";

    const cleanName = file.name.replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ._-]/g, "-");
    const filePath = `randevu-belgeleri/${Date.now()}-${cleanName}`;

    const { error } = await supabase.storage
      .from("lab-files")
      .upload(filePath, file);

    if (error) {
      alert("Belge yüklenemedi. Supabase Storage policy ayarını kontrol edin.");
      return "";
    }

    const { data } = supabase.storage.from("lab-files").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const send = async () => {
    if (!form.type) {
      alert("Lütfen randevu tipini seçiniz.");
      return;
    }

    if (!form.name || !form.phone) {
      alert("Ad Soyad ve Telefon zorunludur.");
      return;
    }

    setLoading(true);

    const fileUrl = await uploadFile();

    await supabase.from("appointments").insert([
      {
        appointment_type: form.type,
        meeting_preference: form.type === "Online Randevu" ? form.meeting : "",
        country: form.country,
        city: form.city,
        full_name: form.name,
        phone: form.phone,
        email: form.email,
        age: form.age,
        note: form.note,
        file_url: fileUrl,
      },
    ]);

    const message = `
${form.type}

Ad Soyad: ${form.name}
Telefon: ${form.phone}
E-posta: ${form.email || "Belirtilmedi"}
Yaş: ${form.age || "Belirtilmedi"}
${form.type === "Online Randevu" ? `Görüşme Tercihi: ${form.meeting}` : ""}
Ülke: ${form.country || "Belirtilmedi"}
Şehir: ${form.city || "Belirtilmedi"}
Özel Not: ${form.note || "Belirtilmedi"}

Belge: ${fileUrl ? "Sisteme yüklendi. Admin panelden görüntülenebilir." : "Belge yüklenmedi."}
`;

    window.open(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setLoading(false);
  };

  return (
    <main>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
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
        .slide.active { opacity: 1; transform: scale(1); }
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
        }
        .dot.active { width: 30px; background: #00a8b8; }
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
          color: #06264a;
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
        .menuWrap { display: flex; flex-direction: column; gap: 14px; }
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
          color: #06264a;
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
        .appointmentTitle { text-align: center; margin-bottom: 24px; }
        .appointmentTitle h2 {
          font-size: 34px;
          margin-bottom: 8px;
          color: #06264a;
        }
        .appointmentTitle p {
          margin: 0;
          color: #64748b;
          font-size: 16px;
        }
        .appointmentCards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 36px;
          margin: 24px 0 28px;
        }
        .appointmentCard {
          border: 2px solid #dcecef;
          background: rgba(255,255,255,.88);
          border-radius: 30px;
          padding: 42px 28px;
          cursor: pointer;
          text-align: center;
          box-shadow: 0 16px 38px rgba(16,42,67,.07);
          transition: .25s ease;
          min-height: 300px;
        }
        .appointmentCard:hover { transform: translateY(-3px); }
        .appointmentCard.selected {
          border-color: #00a8b8;
          box-shadow: 0 22px 52px rgba(0,168,184,.2);
          background: linear-gradient(135deg, #eafffd, #ffffff);
        }
        .appointmentIcon { font-size: 74px; margin-bottom: 22px; }
        .appointmentCard h3 {
          margin: 0 0 12px;
          font-size: 28px;
          color: #06264a;
        }
        .appointmentCard p {
          margin: 0;
          color: #5b6b7a;
          line-height: 1.55;
          font-size: 18px;
        }
        .formGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .form label {
          display: block;
          margin: 16px 0 8px;
          font-weight: 900;
        }
        input, select, textarea {
          width: 100%;
          padding: 17px;
          border-radius: 16px;
          border: 1px solid #d9e2ec;
          font-size: 16px;
          outline: none;
          background: #fbfdfe;
          font-family: inherit;
        }
        textarea {
          min-height: 120px;
          resize: vertical;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #00a8b8;
          box-shadow: 0 0 0 4px rgba(0,168,184,.1);
        }
        .full { grid-column: 1 / -1; }
        .fileBox {
          border: 1px dashed #00a8b8;
          background: #f2fdff;
          border-radius: 18px;
          padding: 18px;
        }
        .fileName {
          margin-top: 10px;
          color: #008fa3;
          font-weight: 800;
          font-size: 14px;
        }
        .infoBox {
          background: #f2fdff;
          border: 1px solid #cceff3;
          border-radius: 20px;
          padding: 18px;
          margin-bottom: 20px;
          color: #315066;
          line-height: 1.7;
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
        .primaryBtn:disabled { opacity: .55; cursor: not-allowed; }
        .mapBtn { background: #102a43; }
        .callBtn { background: #18a558; }
        .footer {
          text-align: center;
          padding: 32px 22px;
          color: #6b7c8f;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .hero { height: 38vh; min-height: 285px; }
          .intro { padding-top: 42px; }
          .intro h1 { font-size: 43px; }
          .intro p { font-size: 18px; }
          .quickActions, .menuGrid, .appointmentCards, .formGrid {
            grid-template-columns: 1fr;
          }
          .menuGrid { gap: 16px; margin-top: 34px; }
          .menuCard {
            min-height: 96px;
            padding: 20px;
            border-radius: 22px;
            font-size: 18px;
          }
          .inlineBox, .box { padding: 24px; border-radius: 24px; }
          .appointmentCard {
            min-height: 245px;
            padding: 34px 22px;
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
            <button
              className={`menuCard ${open === section.title ? "active" : ""}`}
              onClick={() => setOpen(open === section.title ? null : section.title)}
            >
              <span className="menuIcon">{section.icon}</span>
              {section.title}
            </button>

            {open === section.title && (
              <div className="inlineBox">
                <h2>{section.title}</h2>
                <ul className="list">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>

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
          <div className="appointmentTitle">
            <h2>Randevu Tipini Seçiniz</h2>
            <p>Online görüşme veya klinik randevu için aşağıdan seçim yapınız.</p>
          </div>

          <div className="appointmentCards">
            <button
              type="button"
              className={`appointmentCard ${form.type === "Online Randevu" ? "selected" : ""}`}
              onClick={() => setForm({ ...form, type: "Online Randevu" })}
            >
              <div className="appointmentIcon">💻</div>
              <h3>Online Randevu</h3>
              <p>Görüntülü görüşme ile online randevu alın.</p>
            </button>

            <button
              type="button"
              className={`appointmentCard ${form.type === "Klinik Randevu" ? "selected" : ""}`}
              onClick={() => setForm({ ...form, type: "Klinik Randevu" })}
            >
              <div className="appointmentIcon">🏥</div>
              <h3>Klinik Randevu</h3>
              <p>Kliniğimizde yüz yüze randevu alın.</p>
            </button>
          </div>

          {form.type && (
            <div className="form">
              <div className="infoBox">
                <strong>Önemli Bilgiler</strong>
                <br />
                a) Size ulaştırılacak bilgi formunu doldurunuz.
                <br />
                b) Son 6 aylık biyokimya ve radyolojik tetkikleri paylaşınız.
              </div>

              <div className="formGrid">
                <div>
                  <label>🌍 Ülke</label>
                  <input name="country" list="countries" placeholder="Ülke seçiniz" value={form.country} onChange={update} />
                  <datalist id="countries">
                    {countries.map((c) => <option key={c} value={c} />)}
                  </datalist>
                </div>

                <div>
                  <label>🏙️ Şehir</label>
                  <input name="city" placeholder="Şehir" value={form.city} onChange={update} />
                </div>

                <div>
                  <label>👤 Ad Soyad *</label>
                  <input name="name" placeholder="Ad Soyad" value={form.name} onChange={update} />
                </div>

                <div>
                  <label>📞 Mobil Telefon *</label>
                  <input name="phone" placeholder="0(5xx) xxx xx xx" value={form.phone} onChange={update} />
                </div>

                <div>
                  <label>📧 E-posta</label>
                  <input name="email" placeholder="ornek@mail.com" value={form.email} onChange={update} />
                </div>

                <div>
                  <label>🎂 Yaş</label>
                  <input name="age" placeholder="Yaş" value={form.age} onChange={update} />
                </div>

                {form.type === "Online Randevu" && (
                  <div className="full">
                    <label>💬 Görüşme Tercihi</label>
                    <select name="meeting" value={form.meeting} onChange={update}>
                      <option>WhatsApp</option>
                      <option>Zoom</option>
                      <option>Apple FaceTime</option>
                    </select>
                  </div>
                )}

                <div className="full">
                  <label>📝 Özel Not</label>
                  <textarea name="note" placeholder="Özel notunuzu yazınız" value={form.note} onChange={update} />
                </div>

                <div className="full">
                  <label>📎 Belge Yükle</label>
                  <div className="fileBox">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e: any) => setFile(e.target.files?.[0] || null)}
                    />
                    {file && <div className="fileName">Seçilen belge: {file.name}</div>}
                  </div>
                </div>
              </div>

              <button className="primaryBtn" onClick={send} disabled={loading}>
                {loading ? "Belge yükleniyor..." : "WhatsApp ile Randevu Talebi Gönder"}
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        Areteus Sağlık · Prof. Dr. Mehmet Temel Yılmaz
      </footer>
    </main>
  );
}
