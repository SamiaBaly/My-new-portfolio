"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Briefcase, Copy, Check } from 'lucide-react';

export default function About() {
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const aboutImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBcL6LGKXj-g-eHnNBQESNMsAVazMQhvjXb2OsTpdWipCCyJyU-S1kmiAeoBkTyDwzXIPb4P-0wt9HF6W49H-ruuDhxKv2uqH0ZWw0ZlA1sepq2SORCj-LlhJ4dBAcmWu-j1826DhBbzVqem8cWok-26Qt3Mf8TAnaHH9oaWR4mUFpS0H_beD7hbfAxeISTttmHXwrEZCcsYabvaRyc8aYEc_O88S8lopDUqoLtdlDse6E2bqghUivjd5swTPnb7Ag6j5WlWFfScQ";

  return (
    <section className="py-24 bg-zinc-950" data-purpose="about-me" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 h-[500px]">
              <Image
                alt="About Fatema"
                className="object-contain"
                src="/portImage/portLogo.png"
                fill
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">About <span className="text-accent">Me</span></h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>I'm a passionate Full Stack Web Developer with experience in React, Next.js, Node.js, Express.js, and MongoDB. I enjoy building modern, responsive, and user-friendly web applications that solve real-world problems through clean and efficient code.</p>
              <p>I'm constantly learning new technologies and improving my skills to stay up to date with the latest industry trends. I enjoy taking on new challenges, collaborating on meaningful projects, and creating digital experiences that make a positive impact.</p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                {/* Email */}
                <div className="relative group cursor-pointer" onClick={() => handleCopy("fatema@portfolio.com", "email")}>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-accent" />
                    <p className="text-white font-bold">Email</p>
                  </div>
                  <p className="text-accent flex items-center gap-1 group-hover:underline">
                    samiabaly116@gmail.com
                    {copiedText === "email" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </p>
                </div>

                {/* Phone */}
                <div className="relative group cursor-pointer" onClick={() => handleCopy("+123 456 7890", "phone")}>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="w-4 h-4 text-accent" />
                    <p className="text-white font-bold">Phone</p>
                  </div>
                  <p className="text-accent flex items-center gap-1 group-hover:underline">
                    01782839236
                    {copiedText === "phone" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </p>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-accent" />
                    <p className="text-white font-bold">Location</p>
                  </div>
                  <p className="text-accent">Muladi, Barishal, Bangladesh</p>
                </div>

                {/* Experience */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-accent" />
                    <p className="text-white font-bold">Experience</p>
                  </div>
                  <p className="text-accent">6+ Month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
