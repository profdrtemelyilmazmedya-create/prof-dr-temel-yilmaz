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
  {
    id: "oduller",
    title: "Ödüller",
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
    id: "kuruluslar",
    title: "Üyesi Olduğu Uluslararası Kuruluşlar",
    items: [
      "American Diabetes Association (ADA)",
      "European Association for the Study of Diabetes (EASD)",
      "International Diabetes Federation (IDF)",
      "International Diabetes Immunotherapy Group (IDIG)",
      "International Union of Immunology Societies",
      "International Endocrinology Society",
    ],
  },
  {
    id: "editorluk",
    title: "Editörü Olduğu Dergiler",
    items: [
      "International Diabetes Monitor – Review Editor",
      "Dialogue, Diabetes Literature Review Service – Editorial Board",
      "Annals of Medical Sciences – Editorial Board",
      "Turkish Journal of Endocrinology – Editorial Board",
      "Turkish Journal of Endocrinology and Metabolism – Editorial Board",
      "Adli Tıp Bülteni – Editöryel Kurul",
      "Klinik Gelişim Bülteni – Review Editor",
      "Diabetes Forum – Editöryel Kurul",
      "Türkiye Klinikleri Dergisi – Danışma Kurulu",
      "TURKDİAB Diyabet Tanı ve Tedavi Rehberi – Editöryel ve Redaksiyon Kurulu",
      "Journal of Diabetes – Editorial Board",
    ],
  },
  {
    id: "yayinlar",
    title: "Yayınlar",
    items: [
      "SCI ve SCIE kapsamındaki dergilerde çok sayıda yayını bulunmaktadır.",
      "Uluslararası diğer dergilerde yayımlanmış makaleleri yer almaktadır.",
    ],
  },
  {
    id: "uzmanlik",
    title: "Uzmanlık Alanları",
    items: [
      "Diyabet",
      "Tip 1 ve Tip 2 diyabet",
      "Endokrinoloji ve metabolizma",
      "İmmünoloji",
      "Obezite",
      "İnsülin tedavileri",
      "Diyabet teknolojileri",
      "Patch pump / sensör destekli sistemler",
      "Diyabet epidemiyolojisi",
      "Diyabet komplikasyonları ve klinik araştırmalar",
      "İç Hastalıkları",
      "Endokrinoloji ve Metabolizma Hastalıkları",
      "Halk sağlığı ve diyabet epidemiyolojisi",
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
      <section className="relative min-h-[78vh] overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 <section className="relative min-h-[90vh] text-white">
  <div className="absolute inset-0">
    <img
      src="/hero.jpg"
      alt="Areteus Sağlık"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="absolute inset-0 bg-black/40" />

  <div className="relative z-10 flex items-center justify-center min-h-[90vh] text-center px-6">
    <div>
      <p className="text-sm tracking-widest mb-4">Areteus Sağlık</p>
      <h1 className="text-5xl font-bold">Prof. Dr. Mehmet Temel Yılmaz</h1>
    </div>
  </div>
</section> bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />

        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 py-20">
          <div className="mb-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white"
            >
              <MessageCircle size={18} /> +90 533 220 20 10
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-bold text-white backdrop-blur"
            >
              <MapPin size={18} /> Yol Tarifi Al
            </a>
          </div>

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-blue-300">
            Areteus Sağlık
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
            Prof. Dr. Mehmet Temel Yılmaz
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            İç Hastalıkları, Endokrinoloji, Diyabet ve Metabolizma Hastalıkları
            alanında akademik ve klinik deneyim.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-700">
            Kategoriler
          </p>
          <h2 className="mt-3 text-4xl font-extrabold">Akademik Profil</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category) => {
            const isOpen = openCategory === category.id;

            return (
              <div
                key={category.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  onClick={() =>
                    setOpenCategory(isOpen ? null : category.id)
                  }
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="text-xl font-extrabold">{category.title}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180 text-blue-700" : "text-slate-400"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 p-6">
                    <ul className="space-y-3">
                      {category.items.map((item, index) => (
                        <li key={index} className="flex gap-3 text-slate-700">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-8 text-white">
            <h2 className="mb-4 text-3xl font-extrabold">İletişim & Adres</h2>
            <p className="mb-8 text-slate-300">{address}</p>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                className="rounded-xl bg-green-600 px-6 py-4 font-bold"
              >
                WhatsApp’a Git
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                className="rounded-xl bg-white px-6 py-4 font-bold text-slate-950"
              >
                Google Maps
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <div className="mb-6 flex items-center gap-3">
              <CalendarCheck className="text-blue-700" />
              <h2 className="text-3xl font-extrabold">Randevu Formu</h2>
            </div>

            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ad Soyad"
                className="w-full rounded-xl border border-slate-200 bg-white p-4 outline-none focus:border-blue-700"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon Numaranız"
                className="w-full rounded-xl border border-slate-200 bg-white p-4 outline-none focus:border-blue-700"
              />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Randevu notunuz"
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white p-4 outline-none focus:border-blue-700"
              />
              <button
                onClick={sendAppointment}
                className="w-full rounded-xl bg-slate-950 px-6 py-4 font-extrabold text-white hover:bg-blue-700"
              >
                WhatsApp ile Randevu Talebi Gönder
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Prof. Dr. Mehmet Temel Yılmaz
      </footer>
    </main>
  );
}
