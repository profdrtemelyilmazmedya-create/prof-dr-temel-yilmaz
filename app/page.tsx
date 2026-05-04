"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tqgommhknafkikshzqgd.supabase.co",
  "sb_publishable_Ui5QUNbwt-e3frr1VUxjew_NA6bbBXF"
);

const WHATSAPP_PHONE = "905332202010";

const countries = [
  "Türkiye", "Almanya", "Fransa", "İtalya", "İspanya", "İngiltere", "ABD",
  "Kanada", "Hollanda", "Belçika", "İsviçre", "Avusturya", "İsveç",
  "Norveç", "Danimarka", "Rusya", "Japonya", "Çin", "Hindistan",
  "Brezilya", "Arjantin", "Meksika", "Avustralya", "Yunanistan",
  "Bulgaristan", "Romanya", "Polonya", "Portekiz", "İrlanda",
  "Birleşik Arap Emirlikleri", "Suudi Arabistan", "Katar", "Kuveyt"
];

export default function Home() {
  const [form, setForm] = useState({
    type: "",
    country: "",
    city: "",
    name: "",
    phone: "",
    email: "",
    age: "",
    note: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadFile = async () => {
    if (!file) return "";

    const filePath = `randevu-belgeleri/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("lab-files")
      .upload(filePath, file);

    if (error) {
      alert("Belge yüklenemedi.");
      return "";
    }

    const { data } = supabase.storage
      .from("lab-files")
      .getPublicUrl(filePath);

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
        type: form.type,
        country: form.country,
        city: form.city,
        name: form.name,
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
E-posta: ${form.email}
Yaş: ${form.age}
Ülke: ${form.country}
Şehir: ${form.city}
Özel Not: ${form.note}

Belge Linki: ${fileUrl || "Belge yüklenmedi"}
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

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: linear-gradient(180deg, #eef7f9 0%, #ffffff 40%, #f6fbfc 100%);
          color: #08233d;
        }

        .page {
          max-width: 1040px;
          margin: 0 auto;
          padding: 48px 22px 70px;
          text-align: center;
        }

        .topShape {
          width: 260px;
          height: 54px;
          border-radius: 99px;
          margin: 0 auto 55px;
          background: rgba(255,255,255,.85);
          box-shadow: 0 14px 40px rgba(16,42,67,.08);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
        }

        .dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(0,168,184,.35);
        }

        .pill {
          width: 78px;
          height: 20px;
          border-radius: 99px;
          background: #00a8b8;
        }

        .kicker {
          color: #0097a7;
          letter-spacing: 9px;
          font-size: 22px;
          font-weight: 900;
          margin-bottom: 25px;
        }

        h1 {
          font-size: clamp(48px, 8vw, 88px);
          line-height: 1.02;
          margin: 0 0 28px;
          color: #06264a;
          letter-spacing: -3px;
        }

        .intro {
          max-width: 820px;
          margin: 0 auto 65px;
          color: #607080;
          font-size: clamp(22px, 3vw, 34px);
          line-height: 1.75;
          font-weight: 500;
        }

        .sectionTitle {
          font-size: clamp(28px, 4vw, 40px);
          margin: 0 0 30px;
          color: #06264a;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 42px;
          margin: 0 auto 36px;
          max-width: 940px;
        }

        .card {
          border: 2px solid #dcecef;
          background: rgba(255,255,255,.82);
          border-radius: 34px;
          padding: 52px 34px 48px;
          min-height: 360px;
          cursor: pointer;
          box-shadow: 0 18px 48px rgba(16,42,67,.07);
          transition: .25s ease;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .card.active {
          border-color: #00a8b8;
          box-shadow: 0 24px 60px rgba(0,168,184,.18);
          background: linear-gradient(180deg, #ffffff, #f0feff);
        }

        .icon {
          font-size: 92px;
          margin-bottom: 30px;
        }

        .onlineIcon {
          color: #00a8b8;
        }

        .clinicIcon {
          color: #46aa69;
        }

        .card h3 {
          font-size: 32px;
          margin: 0 0 20px;
          color: #06264a;
        }

        .card p {
          margin: 0;
          color: #6b7886;
          font-size: 22px;
          line-height: 1.45;
        }

        .formBox {
          max-width: 940px;
          margin: 34px auto 0;
          background: white;
          border: 1px solid #e2edf1;
          border-radius: 32px;
          padding: 34px;
          box-shadow: 0 24px 70px rgba(16,42,67,.1);
          text-align: left;
        }

        .info {
          background: #f2fdff;
          border: 1px solid #cceff3;
          border-radius: 22px;
          padding: 20px;
          line-height: 1.7;
          color: #315066;
          margin-bottom: 22px;
          font-size: 16px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        input, textarea {
          width: 100%;
          padding: 18px;
          border-radius: 18px;
          border: 1px solid #d7e5ea;
          font-size: 16px;
          outline: none;
          background: #fbfdfe;
        }

        input:focus, textarea:focus {
          border-color: #00a8b8;
          box-shadow: 0 0 0 4px rgba(0,168,184,.1);
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        .full {
          grid-column: 1 / -1;
        }

        .fileBox {
          border: 1px dashed #00a8b8;
          background: #f2fdff;
          border-radius: 20px;
          padding: 18px;
        }

        .fileName {
          margin-top: 10px;
          color: #008fa3;
          font-weight: 800;
        }

        .send {
          width: 100%;
          border: none;
          margin-top: 22px;
          padding: 20px;
          border-radius: 18px;
          background: linear-gradient(135deg, #00a8b8, #007f91);
          color: white;
          font-weight: 900;
          font-size: 18px;
          cursor: pointer;
        }

        .send:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        @media(max-width: 760px) {
          .page {
            padding: 35px 18px 50px;
          }

          .topShape {
            margin-bottom: 38px;
          }

          .kicker {
            font-size: 15px;
            letter-spacing: 6px;
          }

          h1 {
            font-size: 50px;
            letter-spacing: -1.5px;
          }

          .intro {
            font-size: 22px;
            margin-bottom: 48px;
          }

          .cards {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .card {
            min-height: 280px;
            padding: 38px 24px;
          }

          .icon {
            font-size: 74px;
          }

          .card h3 {
            font-size: 28px;
          }

          .card p {
            font-size: 19px;
          }

          .formBox {
            padding: 24px;
            border-radius: 26px;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="page">
        <div className="topShape">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="pill"></div>
          <div className="dot"></div>
        </div>

        <div className="kicker">ARETEUS SAĞLIK</div>

        <h1>
          Prof. Dr. Mehmet
          <br />
          Temel Yılmaz
        </h1>

        <p className="intro">
          İç Hastalıkları, Endokrinoloji, Diyabet ve Metabolizma Hastalıkları alanında
          akademik birikim, klinik deneyim ve diyabet teknolojileri odağı.
        </p>

        <h2 className="sectionTitle">Randevu Tipini Seçiniz</h2>

        <div className="cards">
          <button
            className={`card ${form.type === "Online Randevu" ? "active" : ""}`}
            onClick={() => setForm({ ...form, type: "Online Randevu" })}
          >
            <div className="icon onlineIcon">💻</div>
            <h3>Online Randevu</h3>
            <p>Görüntülü görüşme ile online randevu alın.</p>
          </button>

          <button
            className={`card ${form.type === "Klinik Randevu" ? "active" : ""}`}
            onClick={() => setForm({ ...form, type: "Klinik Randevu" })}
          >
            <div className="icon clinicIcon">🏥</div>
            <h3>Klinik Randevu</h3>
            <p>Kliniğimizde yüz yüze randevu alın.</p>
          </button>
        </div>

        {form.type && (
          <div className="formBox">
            <div className="info">
              <strong>Önemli Bilgiler</strong>
              <br />
              a) Size ulaştırılacak bilgi formunu doldurunuz.
              <br />
              b) Son 6 aylık biyokimya ve radyolojik tetkikleri paylaşınız.
            </div>

            <div className="grid">
              <input name="country" list="countries" placeholder="Ülke seçiniz" value={form.country} onChange={update} />
              <datalist id="countries">
                {countries.map((c) => <option key={c} value={c} />)}
              </datalist>

              <input name="city" placeholder="Şehir" value={form.city} onChange={update} />
              <input name="name" placeholder="Ad Soyad *" value={form.name} onChange={update} />
              <input name="phone" placeholder="Mobil Telefon *" value={form.phone} onChange={update} />
              <input name="email" placeholder="E-posta" value={form.email} onChange={update} />
              <input name="age" placeholder="Yaş" value={form.age} onChange={update} />

              <textarea className="full" name="note" placeholder="Özel Not" value={form.note} onChange={update} />

              <div className="fileBox full">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e: any) => setFile(e.target.files?.[0] || null)}
                />
                {file && <div className="fileName">Seçilen belge: {file.name}</div>}
              </div>
            </div>

            <button className="send" onClick={send} disabled={loading}>
              {loading ? "Belge yükleniyor..." : "WhatsApp ile Gönder"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
