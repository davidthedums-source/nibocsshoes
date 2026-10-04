import React from 'react';
import { Phone, Mail, MapPin, ArrowUpRight, Database } from 'lucide-react';
import { BUSINESS_INFO } from '../data/footwearData';

interface FooterProps {
  onOpenOrderModal: () => void;
  onOpenDatabase?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal, onOpenDatabase }) => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Shoes', href: '#shoes' },
    { label: 'Custom Shoes', href: '#custom-shoes' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-100/80 dark:bg-black/80 backdrop-blur-md border-t border-stone-300 dark:border-white/10 pt-16 pb-12 text-stone-600 dark:text-neutral-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-200 dark:border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="text-2xl font-serif font-bold text-stone-900 dark:text-white tracking-widest hover:text-[#8c6032] dark:hover:text-[#c69c6d] transition-colors"
            >
              NIBOCS SHOE
            </a>
            <p className="text-sm text-stone-800 dark:text-neutral-300 font-medium">
              Crafted footwear. Modern style. Made with purpose.
            </p>
            <p className="text-xs text-stone-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Footwear manufacturing, bespoke shoe making, and direct sales located in Sangotedo, Cannan Estate, Lagos, Nigeria.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-950 bg-[#c69c6d] hover:bg-[#d8b082] rounded-lg transition-colors cursor-pointer"
              >
                <span>Contact Workshop</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {onOpenDatabase && (
                <button
                  type="button"
                  onClick={onOpenDatabase}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-stone-700 dark:text-neutral-300 hover:text-stone-950 dark:hover:text-white bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-stone-300 dark:border-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-[#c69c6d]" />
                  <span>Atelier Database</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-white">
              Contact & Workshop
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c69c6d] shrink-0 mt-0.5" />
                <span className="text-stone-700 dark:text-neutral-300">{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c69c6d] shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-stone-700 dark:text-neutral-300 hover:text-stone-950 dark:hover:text-white font-mono"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c69c6d] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-stone-700 dark:text-neutral-300 hover:text-stone-950 dark:hover:text-white break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-neutral-400">
          <p>© 2026 NIBOCS SHOE. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Lagos, Nigeria</span>
            <span>·</span>
            <span>Handcrafted Footwear</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
