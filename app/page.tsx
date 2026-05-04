"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tqgommhknafkikshzqgd.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ui5QUNbwt-e3frr1VUxjew_NA6bbBXF";
const WHATSAPP_PHONE = "905332202010";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const countries = [
  "Türkiye", "Almanya", "Fransa", "İtalya", "İspanya", "İngiltere", "ABD",
  "Kanada", "Hollanda", "Belçika", "İsviçre", "Avusturya", "İsveç",
  "Norveç", "Danimarka", "Rusya", "Japonya", "Çin", "Hindistan",
  "Brezilya", "Arjantin", "Meksika", "Avustralya", "Yunanistan",
  "Bulgaristan", "Romanya", "Polonya", "Portekiz", "İrlanda",
  "Birleşik Arap Emirlikleri", "Suudi Arabistan", "Katar", "Kuveyt"
];

export default function Page() {
  const [form, setForm] = useState({
    type: "Online Muayene Randevu",
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

    const fileName = `randevu/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("lab-files")
      .upload(fileName, file);

    if (error) {
      alert("Dosya yüklenemedi.");
      return "";
    }

    const { data } = supabase.storage
      .from("lab-files")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const send = async () => {
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
          background: linear-gradient(180deg, #f4fbfc, #eaf3f5);
          color: #102a43;
        }
        .wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
        }
        .card {
          width: 100%;
          max-width: 760px;
          background: white;
          border-radius: 28px;
          padding: 34px;
          box-shadow: 0 24px 70px rgba(16,42,67,.12);
          border: 1px solid #e3eef3;
        }
        .brand {
          text-align: center;
          color: #0097a7;
          font-weight: 900;
          letter-spacing: 4px;
          font-size: 14px;
          margin-bottom: 10px;
        }
        h1 {
          text-align: center;
          font-size: 42px;
          margin: 0 0 8px;
          color: #08233d;
        }
        .sub {
          text-align: center;
          color: #64748b;
          margin-bottom: 28px;
          line-height: 1.6;
        }
        .types {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 24px;
        }
        .typeBtn {
          border: 1px solid #d7e5ea;
          background: #f8fcfd;
          border-radius: 20px;
          padding: 22px;
          text-align: left;
          cursor: pointer;
          font-weight: 900;
          font-size: 18px;
        }
        .typeBtn.active {
          border-color: #00a8b8;
          background: #eafffd;
          box-shadow: 0 15px 35px rgba(0,168,184,.16);
        }
        .info {
          background: #f2fdff;
          border: 1px solid #cceff3;
          border-radius: 18px;
          padding: 16px;
          line-height: 1.7;
          color: #315066;
          margin-bottom: 20px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        input, textarea {
          width: 100%;
          padding: 16px;
          border: 1px solid #d7e5ea;
          border-radius: 15px;
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
          border-radius: 18px;
          padding: 16px;
        }
        .fileName {
          margin-top: 8px;
          color: #008fa3;
          font-weight: 800;
        }
        .send {
          width: 100%;
          border: none;
          margin-top: 20px;
          padding: 18px;
          border-radius: 16px;
          background: linear-gradient(135deg, #00a8b8, #007f91);
          color: white;
          font-weight: 900;
          font-size: 17px;
          cursor: pointer;
        }
        .send:disabled {
          opacity: .6;
        }
        @media(max-width: 700px) {
          .card { padding: 24px; border-radius: 22px; }
          h1 { font-size: 34px; }
          .types, .grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="wrap">
        <div className="card">
          <div className="brand">ARETEUS SAĞLIK</div>
          <h1>Randevu Talebi</h1>
          <p className="sub">
            Online muayene veya klinik görüşme için bilgilerinizi doldurunuz.
          </p>

          <div className="types">
            <button
              className={`typeBtn ${form.type === "Online Muayene Randevu" ? "active" : ""}`}
              onClick={() => setForm({ ...form, type: "Online Muayene Randevu" })}
            >
              💻 Online Muayene Randevu
            </button>

            <button
              className={`typeBtn ${form.type === "Klinik Görüşme Randevu" ? "active" : ""}`}
              onClick={() => setForm({ ...form, type: "Klinik Görüşme Randevu" })}
            >
              🏥 Klinik Görüşme Randevu
            </button>
          </div>

          <div className="info">
            <strong>Önemli Bilgiler</strong><br />
            a) Size ulaştırılacak bilgi formunu doldurunuz.<br />
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
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e: any) => setFile(e.target.files?.[0] || null)} />
              {file && <div className="fileName">Seçilen belge: {file.name}</div>}
            </div>
          </div>

          <button className="send" onClick={send} disabled={loading}>
            {loading ? "Belge yükleniyor..." : "WhatsApp ile Gönder"}
          </button>
        </div>
      </div>
    </main>
  );
}
