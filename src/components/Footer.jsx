import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5" data-purpose="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-gray-500">
              © {new Date().getFullYear()} Samia Islam Setu. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8">
            <a className="text-gray-500 hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="text-gray-500 hover:text-white transition-colors" href="#">Terms of Service</a>
          </div>

          <div className="flex items-center">
            <span className="text-accent flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> in Muladi, Barishal, Bangladesh
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
