"use client";

import { useState } from 'react';
import { Mail, MapPin, Twitter, Instagram, Send, CheckCircle, Linkedin, Github, GithubIcon } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.subject || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", subject: "", message: "" });
        // Reset status back to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection.");
    }
  };

  return (
    <section className="py-24 bg-zinc-950" data-purpose="contact-me" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Let's <span className="text-accent">Connect</span></h2>
            <p className="text-gray-400 mb-12 text-lg">
              Have a project in mind? Let's work together to build something extraordinary. I'm currently available for freelance projects and full-time opportunities.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Email Me</h4>
                  <p className="text-gray-400">samiabaly116@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Visit Me</h4>
                  <p className="text-gray-400">Muladi, Barishal, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
                href="https://www.linkedin.com/in/samia-baly/"
                aria-label="Twitter"
              >
                <Linkedin className="w-5 h-5 fill-current" />
              </a>
              <a
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-300"
                href="https://github.com/SamiaBaly"
                aria-label="Instagram"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-10 rounded-3xl relative overflow-hidden">
            {status === "success" && (
              <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in z-10">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 max-w-sm">Thank you for reaching out. Samia will get back to you as soon as possible.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-2.5 animate-fade-in">
                  <span className="text-red-500 font-bold shrink-0">⚠️</span>
                  <p className="leading-relaxed">{errorMessage}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white outline-none"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white outline-none"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white outline-none"
                  type="text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white outline-none resize-none"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-accent hover-bg-accent py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 disabled:opacity-50 text-white"
              >
                {status === "sending" ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
