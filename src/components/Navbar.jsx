"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10" data-purpose="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a className="text-2xl font-bold tracking-tighter" href="#">
              <Image src="/portImage/portLogo.png" alt="Logo" width={100} height={100} />
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a className="hover:text-accent px-3 py-2 text-sm font-medium transition-colors" href="#home">Home</a>
              <a className="hover:text-accent px-3 py-2 text-sm font-medium transition-colors" href="#about">About</a>
              <a className="hover:text-accent px-3 py-2 text-sm font-medium transition-colors" href="#services">Tech Stack</a>
              <a className="hover:text-accent px-3 py-2 text-sm font-medium transition-colors" href="#skills">Skills</a>
              <a className="hover:text-accent px-3 py-2 text-sm font-medium transition-colors" href="#portfolio">Projects</a>
              <a className="hover:text-accent px-3 py-2 text-sm font-medium transition-colors" href="#contact">Contact</a>
            </div>
          </div>

          <div className="hidden md:block">
            <a className="bg-accent hover-bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-orange-600/20" href="#contact">Hire Me</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-4 transition-all">
          <a onClick={() => setIsOpen(false)} className="block hover:text-accent px-3 py-2 text-base font-medium transition-colors" href="#home">Home</a>
          <a onClick={() => setIsOpen(false)} className="block hover:text-accent px-3 py-2 text-base font-medium transition-colors" href="#about">About</a>
          <a onClick={() => setIsOpen(false)} className="block hover:text-accent px-3 py-2 text-base font-medium transition-colors" href="#services">Services</a>
          <a onClick={() => setIsOpen(false)} className="block hover:text-accent px-3 py-2 text-base font-medium transition-colors" href="#portfolio">Portfolio</a>
          <a onClick={() => setIsOpen(false)} className="block hover:text-accent px-3 py-2 text-base font-medium transition-colors" href="#contact">Contact</a>
          <div className="pt-2">
            <a onClick={() => setIsOpen(false)} className="block bg-accent hover-bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all text-center" href="#contact">Hire Me</a>
          </div>
        </div>
      )}
    </nav>
  );
}
