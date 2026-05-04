"use client";

import { useState } from "react";

const SUPABASE_URL = "https://tqgommhknafkikshzqgd.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ui5QUNbwt-e3frr1VUxjew_NA6bbBXF";
const WHATSAPP_PHONE = "905332202010";

export default function Home() {
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File) => {
    const fileName = Date.now() + "-" + file.name;

    const res = await fetch(
      `${SUPABASE_URL}/storage/v1/object/lab-files/${fileName}`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: file,
      }
    );

    if (!res.ok) throw new Error("Upload hatası");

    return `${SUPABASE_URL}/storage/v1/object/public/lab-files/${fileName}`;
  };

  const send = async () => {
    if (!type || !name || !phone) {
      alert("Zorunlu alanları doldur");
      return;
    }

    setLoading(true);

    let fileUrl = "";

    try {
      if (file) {
        fileUrl = await uploadFile(file);
      }

      const message =
        type === "online"
          ? `ONLINE RANDEVU

Ülke: ${country}
Şehir: ${city}
Ad Soyad: ${name}
Telefon: ${phone}
E-posta: ${email}
Yaş: ${age}
Not: ${note}

Belge: ${fileUrl || "Yok"}`
          : `KLİNİK RANDEVU

Ad Soyad: ${name}
Telefon: ${phone}
E-posta: ${email}
Yaş: ${age}
Not: ${note}

Belge: ${fileUrl || "Yok"}`;

      window.open(
        `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
      );
    } catch (e) {
      alert("Hata oluştu");
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Randevu</h1>

      <button onClick={() => setType("online")}>Online</button>
      <button onClick={() => setType("klinik")}>Klinik</button>

      {type && (
        <>
          {type === "online" && (
            <>
              <input
                placeholder="Ülke"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                placeholder="Şehir"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </>
          )}

          <input
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Yaş"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <textarea
            placeholder="Not"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button onClick={send}>
            {loading ? "Yükleniyor..." : "Gönder"}
          </button>
        </>
      )}
    </main>
  );
}
