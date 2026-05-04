"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tqgommhknafkikshzqgd.supabase.co",
  "sb_publishable_Ui5QUNbwt-e3frr1VUxjew_NA6bbBXF"
);

const countries = [
  "Türkiye","Almanya","Fransa","İspanya","İtalya","İngiltere",
  "ABD","Hollanda","Belçika","İsviçre","Avusturya","İsveç",
  "Norveç","Danimarka","Kanada","Avustralya","Rusya"
];

export default function Page() {
  const [type, setType] = useState("online");
  const [meeting, setMeeting] = useState("");
  const [country, setCountry] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleCountry = (val: string) => {
    setCountry(val);
    setFiltered(
      countries.filter(c =>
        c.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  const uploadFile = async () => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("lab-files")
      .upload(fileName, file);

    if (error) return null;

    const { data } = supabase.storage
      .from("lab-files")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const fileUrl = await uploadFile();

    await supabase.from("appointments").insert([
      {
        appointment_type: type,
        meeting_preference: meeting,
        country,
        full_name: e.target.name.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        note: e.target.note.value,
        file_url: fileUrl
      }
    ]);

    alert("Randevu gönderildi ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-900">
          Prof. Dr. Mehmet Temel Yılmaz
        </h1>

        <p className="text-gray-600 mt-4">
          İç Hastalıkları, Endokrinoloji ve Diyabet
        </p>

        {/* TYPE */}
        <div className="flex gap-4 mt-6">
          <button onClick={()=>setType("online")} className="border p-3 rounded w-full">Online</button>
          <button onClick={()=>setType("klinik")} className="border p-3 rounded w-full">Klinik</button>
        </div>

        {/* MEETING */}
        {type === "online" && (
          <div className="mt-4 flex gap-2">
            {["WhatsApp","Zoom","FaceTime"].map(m=>(
              <button key={m} onClick={()=>setMeeting(m)} className="border px-3 py-2 rounded">
                {m}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">

          {/* COUNTRY */}
          <input
            value={country}
            onChange={(e)=>handleCountry(e.target.value)}
            placeholder="Ülke"
            className="border w-full p-2 rounded"
          />

          {filtered.length > 0 && (
            <div className="border rounded text-left">
              {filtered.map(c=>(
                <div key={c}
                  onClick={()=>{setCountry(c);setFiltered([])}}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {c}
                </div>
              ))}
            </div>
          )}

          <input name="name" placeholder="Ad Soyad" className="border w-full p-2 rounded"/>
          <input name="phone" placeholder="Telefon" className="border w-full p-2 rounded"/>
          <input name="email" placeholder="E-posta" className="border w-full p-2 rounded"/>

          <textarea name="note" placeholder="Not" className="border w-full p-2 rounded"/>

          <input type="file" onChange={(e)=>setFile(e.target.files?.[0] || null)} />

          {file && (
            <p className="text-sm text-gray-500">
              {file.name.length > 20
                ? file.name.substring(0,20)+"..."
                : file.name}
            </p>
          )}

          <button className="bg-blue-600 text-white p-3 rounded w-full">
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
