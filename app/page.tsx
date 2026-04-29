"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const slides = ["/hero.jpg", "/slide-1.jpg", "/slide-2.jpg", "/slide-3.jpg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
  });

  const formatPhone = (value: string) => {
    let numbers = value.replace(/\D/g, "");
    numbers = numbers.substring(0, 10);

    let formatted = "0";
    if (numbers.length > 0) formatted += "(" + numbers.substring(0, 3);
    if (numbers.length >= 3) formatted += ") " + numbers.substring(3, 6);
    if (numbers.length >= 6) formatted += " " + numbers.substring(6, 8);
    if (numbers.length >= 8) formatted += " " + numbers.substring(8, 10);

    return formatted;
  };

  const sendWhatsApp = () => {
    const message =
      `📅 *Randevu Talebi*\n\n` +
      `👤 *Ad Soyad:* ${form.name}\n` +
      `📞 *Telefon:* ${form.phone}\n` +
      `🗓 *Tarih:* ${form.date}`;

    window.open(
      `https://wa.me/905332202010?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <main className="font-sans">

      {/* SLIDER */}
      <section className="relative h-screen">
        {slides.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* text */}
        <div className="absolute bottom-20 left-10 text-white">
          <h1 className="text-5xl font-bold">Areteus Sağlık</h1>
          <p className="mt-2 text-xl">Prof. Dr. M. Temel Yılmaz</p>

          <button
            onClick={() =>
              document.getElementById("randevu")?.scrollIntoView()
            }
            className="mt-6 bg-cyan-600 px-6 py-3 rounded-xl"
          >
            Randevu Al
          </button>
        </div>
      </section>

      {/* MENÜ (PRO) */}
      <section className="p-8 grid md:grid-cols-3 gap-6 bg-gray-100">

        {[
          { title: "Akademik Eğitim", icon: "🎓" },
          { title: "Akademik Görevler", icon: "🩺" },
          { title: "Ödüller", icon: "🏅" },
          { title: "Yayınlar", icon: "📚" },
          { title: "Uzmanlık Alanları", icon: "💉" },
          { title: "İletişim", icon: "📍" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
          </div>
        ))}
      </section>

      {/* RANDEVU */}
      <section id="randevu" className="p-10 bg-white max-w-xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">Randevu Talebi</h2>

        <input
          placeholder="Ad Soyad"
          className="w-full p-3 mb-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="0(5xx) xxx xx xx"
          className="w-full p-3 mb-3 border rounded"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: formatPhone(e.target.value),
            })
          }
        />

        <input
          type="date"
          className="w-full p-3 mb-4 border rounded"
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <button
          onClick={sendWhatsApp}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          WhatsApp ile Gönder
        </button>
      </section>

      {/* BASINDA BİZ */}
      <section className="p-10 bg-gray-100">

        <h2 className="text-2xl font-bold mb-6">Basında Biz</h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* video */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="mb-2 font-semibold">
              İnsülinin keşfi kadar büyük başarı
            </h3>

            <iframe
              className="w-full aspect-video rounded"
              src="https://www.youtube.com/embed/Jx0Ew7GvLdw"
              allowFullScreen
            />
          </div>

          {/* haber */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="mb-2 font-semibold">
              4. doz aşı açıklaması
            </h3>

            <iframe
              className="w-full h-[400px] rounded"
              src="https://t24.com.tr/koronavirus/prof-dr-temel-yilmaz-dorduncu-doz-asiya-ihtiyac-oldugunu-gosteren-bir-calisma-yok,972604"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
