'use client';

import { useState } from "react";
import emailjs from "emailjs-com";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ji1aywl",
        "template_prw20dr",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "NywTcVdM3hdhAxwf_"
      )
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => setStatus(null), 4000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus(null), 4000);
      });
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-24 text-white"
    >
      <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-center">
        Contact Me
      </h2>

      <p className="text-gray-400 mb-12 text-center max-w-xl">
        Have a project, idea, or collaboration in mind?  
        Feel free to reach out — I’d love to connect.
      </p>

      <form
        onSubmit={sendEmail}
        className="w-full max-w-lg space-y-5 relative z-10"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Your Message"
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-gray-400 text-sm text-center">
        <p>
          Email: <span className="text-white">indrajeetgangawane08@gmail.com</span>
        </p>
        <p>
          Phone: <span className="text-white">+91 7020242878</span>
        </p>
      </div>

      {/* 🔔 Modern Toast Notification */}
      {status && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-6 py-4 rounded-xl shadow-lg backdrop-blur-md border
            ${
              status === "success"
                ? "bg-green-500/10 border-green-400/30 text-green-300"
                : "bg-red-500/10 border-red-400/30 text-red-300"
            } animate-slide-in`}
          >
            <p className="font-medium">
              {status === "success"
                ? "Message sent successfully 🚀"
                : "Failed to send message ❌"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
