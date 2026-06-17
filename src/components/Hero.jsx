"use client";

import Image from 'next/image';
import { Send } from 'lucide-react';
import TypewriterText from './TypewriterText';

export default function Hero() {
  const profileImageUrl = "/portImage/cartoonImage.png";

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden" data-purpose="hero-section" id="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <p className="text-accent font-semibold tracking-widest uppercase mb-4">Hello, I Am</p>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
              Samia Islam <br />
              <span className="text-accent">Setu</span>
            </h1>
            <p className="text-accent font-medium tracking-widest uppercase mb-4 min-h-[1.5em]">
              <TypewriterText />
            </p>
            <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed">
              Passionate about building modern, scalable web applications with clean code and great user experiences.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="/Resume.pdf" target="_blank" download className="bg-accent hover:bg-accent text-white px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-600/20">
                Resume
              </a>
              <a
                href="#contact"
                className="border border-white/20 hover:border-accent hover:text-accent px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 justify-center transform hover:-translate-y-1"
              >
                <Send className="w-5 h-5 fill-current" /> Contact me
              </a>
            </div>
          </div>
          {/* Profile Image Container */}
          <div className="flex-1 relative">
            <div className="relative w-72 h-96 lg:w-96 lg:h-[500px] mx-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white/5">
              <Image
                alt="Fatema Tuj Zohura"
                className="object-cover"
                src={profileImageUrl}
                fill
                priority
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>


    </section>
  );
}
