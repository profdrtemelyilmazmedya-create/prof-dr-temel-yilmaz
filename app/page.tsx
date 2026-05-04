"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tqgommhknafkikshzqgd.supabase.co",
  "sb_publishable_Ui5QUNbwt-e3frr1VUxjew_NA6bbBXF"
);

const countries = [
  "Türkiye","Almanya","Fransa","İtalya","İspanya","İngiltere","ABD","Kanada",
  "Hollanda","Belçika","İsviçre","Avusturya","İsveç","Norveç","Danimarka",
  "Rusya","Japonya","Çin","Hindistan","Brezilya","Arjantin","Meksika",
  "Avustralya","Yeni Zelanda"
];

export default function Page() {
  const [form, setForm] = useState({
    type: "Online",
    country: "",
    city: "",
    name: "",
    phone: "",
    email: "",
    age: "",
    note: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [filtered, setFiltered] = useState<string[]>(countries);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if(name === "country"){
      const f = countries.filter(c =>
        c.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(f);
    }
  };

  const uploadFile = async () => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("lab-files")
      .upload(fileName, file);

    if (error) {
      alert("Dosya yüklenemedi ❌");
      return null;
    }

    const { data } = supabase.storage
      .from("lab-files")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const sendWhatsApp = async () => {
    const fileUrl = await uploadFile();

    const phone = "905XXXXXXXXX";

    const text = `
Randevu Talebi

Tür: ${form.type}
Ad: ${form.name}
Telefon: ${form.phone}
Email: ${form.email}
Yaş: ${form.age}
Ülke: ${form.country}
Şehir: ${form.city}
Not: ${form.note}
Dosya: ${fileUrl || "Yok"}
`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex justify-center items-center">
      <div className="w-full max-w-xl bg-white text-black p-6 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold mb-6 text-center">Randevu</h1>

        <div className="flex gap-2 mb-4">
          <button onClick={()=>setForm({...form,type:"Online"})}
            className={`px-4 py-2 rounded ${form.type==="Online"?"bg-black text-white":"border"}`}>
            Online
          </button>
          <button onClick={()=>setForm({...form,type:"Klinik"})}
            className={`px-4 py-2 rounded ${form.type==="Klinik"?"bg-black text-white":"border"}`}>
            Klinik
          </button>
        </div>

        <input name="country" placeholder="Ülke"
          onChange={handleChange}
          className="w-full p-2 border mb-1" />

        {form.country && (
          <div className="bg-white border max-h-32 overflow-auto mb-2">
            {filtered.map((c,i)=>(
              <div key={i}
                onClick={()=>setForm({...form,country:c})}
                className="p-2 hover:bg-gray-200 cursor-pointer">
                {c}
              </div>
            ))}
          </div>
        )}

        <input name="city" placeholder="Şehir"
          onChange={handleChange}
          className="w-full p-2 border mb-2" />

        <input name="name" placeholder="Ad Soyad"
          onChange={handleChange}
          className="w-full p-2 border mb-2" />

        <input name="phone" placeholder="Telefon"
          onChange={handleChange}
          className="w-full p-2 border mb-2" />

        <input name="email" placeholder="E-posta"
          onChange={handleChange}
          className="w-full p-2 border mb-2" />

        <input name="age" placeholder="Yaş"
          onChange={handleChange}
          className="w-full p-2 border mb-2" />

        <textarea name="note" placeholder="Not"
          onChange={handleChange}
          className="w-full p-2 border mb-2" />

        <input type="file"
          onChange={(e:any)=>setFile(e.target.files[0])}
          className="mb-3" />

        <button
          onClick={sendWhatsApp}
          className="w-full bg-black text-white py-3 rounded-xl">
          Gönder
        </button>

      </div>
    </div>
  );
}
