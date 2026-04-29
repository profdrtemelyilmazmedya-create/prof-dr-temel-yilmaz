"use client";

import { useState } from "react";
import { MapPin, MessageCircle, ChevronDown, CalendarCheck } from "lucide-react";

type Category = {
  id: string;
  title: string;
  items: string[];
};

const categories: Category[] = [
  {
    id: "egitim",
    title: "Akademik Eğitim",
    items: [
      "1976 – İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi, Doktor",
      "1981 – İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi İç Hastalıkları Anabilim Dalı, Uzman Doktor",
      "1985 – Brussels Free University, Fellowship",
      "1986 – İstanbul Üniversitesi İstanbul Tıp Fakültesi İç Hastalıkları Anabilim Dalı, Doçent Doktor",
      "1993 – İstanbul Üniversitesi İstanbul Tıp Fakültesi, Profesör Doktor",
    ],
  },
  {
    id: "gorevler",
    title: "Akademik Görevler",
    items: [
      "1994 – İstanbul Üniversitesi Deneysel Tıp Araştırma Enstitüsü, İmmünoloji Anabilim Dalı Başkanı",
      "1997 – University of London, Visiting Professor",
      "2005 – İstanbul Üniversitesi İstanbul Tıp Fakültesi İç Hastalıkları Anabilim Dalı, Endokrinoloji ve Metabolizma Hastalıkları Bilim Dalı, Profesör Doktor",
      "2010 – İstanbul Üniversitesi, Diyabet Uygulama ve Araştırma Merkezi Müdürü",
      "2024 – Acıbadem Üniversitesi, DİYAM Koordinatörü",
    ],
  },
];

export default function Home() {
  const [openCategory, setOpenCategory] = useState<string | null>("egitim");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const whatsappNumber = "905332202010";
  const address =
    "Teşvikiye, Hakkı Yeten Cd. No:17, 34365 Şişli/İstanbul Aşçıoğlu Plaza Kat:7";

  const sendAppointment = () => {
    const message = `Merhaba, randevu talebi oluşturmak istiyorum.%0A%0AAd Soyad: ${name}%0ATelefon: ${phone}%0ANot: ${note}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-900">

      {/* HERO */}
      <section className="relative min-h-[90vh] text-white">
        <img
          src="/hero.jpg"
          alt="Areteus Sağlık"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-6">
          <p className="text-sm tracking-widest mb-4">Areteus Sağlık</p>
          <h1 className="text-5xl md:text-6xl font-bold">
            Prof. Dr. Mehmet Temel Yılmaz
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-white/20 px-5 py-3 text-sm font-bold text-white backdrop-blur"
            >
              <MapPin size={18} /> Yol Tarifi
            </a>
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Akademik Profil
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category) => {
            const isOpen = openCategory === category.id;

            return (
              <div
                key={category.id}
                className="rounded-2xl bg-white shadow"
              >
                <button
                  onClick={() =>
                    setOpenCategory(isOpen ? null : category.id)
                  }
                  className="w-full flex justify-between p-5 font-bold"
                >
                  {category.title}
                  <ChevronDown
                    className={isOpen ? "rotate-180" : ""}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 border-t">
                    {category.items.map((item, i) => (
                      <p key={i} className="mb-2 text-sm">
                        • {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* RANDEVU */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Randevu Talebi
          </h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ad Soyad"
            className="w-full mb-4 p-4 border rounded-xl"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon"
            className="w-full mb-4 p-4 border rounded-xl"
          />

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Not"
            className="w-full mb-4 p-4 border rounded-xl"
          />

          <button
            onClick={sendAppointment}
            className="w-full bg-black text-white p-4 rounded-xl font-bold"
          >
            WhatsApp ile Gönder
          </button>
        </div>
      </section>

    </main>
  );
}
