import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, Mail, Compass, Layers, Database, Sun, Moon } from 'lucide-react';
import { BUSINESS_INFO } from '../data/footwearData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenOrderModal: (preselectedProduct?: string) => void;
  onOpenDatabase?: () => void;
  onOpenAppointment?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal,
  onOpenDatabase,
  onOpenAppointment,
  activeSection,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Shoes', href: '#shoes' },
    { label: 'Studio', href: '#studio' },
    { label: 'Custom Shoes', href: '#custom-shoes' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? theme === 'dark'
              ? 'py-2.5 bg-[#090a0d]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40'
              : 'py-2.5 bg-[#faf7f2]/90 backdrop-blur-xl border-b border-stone-300/70 shadow-xl shadow-stone-900/10'
            : 'py-4 sm:py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark with Figma-inspired frame badge */}
            <div className="flex items-center gap-3">
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, '#home')}
                className="group flex items-center gap-2 font-bold tracking-tight"
              >
                <span className={`text-xl sm:text-2xl font-serif tracking-widest transition-colors ${
                  theme === 'dark'
                    ? 'text-[#f5f5f7] group-hover:text-[#c69c6d]'
                    : 'text-stone-900 group-hover:text-[#8c6032]'
                }`}>
                  NIBOCS Shoes
                </span>
              </a>

              {/* Figma-style subtle frame canvas indicator */}
              <div className={`hidden xl:flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border ${
                theme === 'dark'
                  ? 'bg-white/[0.04] border-white/[0.08] text-neutral-400'
                  : 'bg-stone-900/[0.04] border-stone-300 text-stone-600'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#14ae5c] animate-pulse" />
                <span>Atelier Live</span>
              </div>
            </div>

            {/* Zone 2: Clean text navigation links */}
            <nav className={`hidden lg:flex items-center gap-6 xl:gap-7 text-xs sm:text-sm font-medium ${
              theme === 'dark' ? 'text-neutral-300' : 'text-stone-700'
            }`}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative py-1 transition-all duration-150 whitespace-nowrap ${
                      isActive
                        ? 'text-[#c69c6d] font-semibold'
                        : theme === 'dark'
                          ? 'text-neutral-300 hover:text-white'
                          : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c69c6d] to-[#e4c7a5] rounded-full shadow-[0_0_8px_rgba(198,156,109,0.5)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Primary action & mobile trigger */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Theme Toggle Button (Light & Dark Mode) */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} background mode`}
                title={`Switch to ${theme === 'dark' ? 'Light Atelier' : 'Dark Atelier'}`}
                className={`p-2 rounded-xl transition-all duration-200 cursor-pointer border flex items-center gap-1.5 ${
                  theme === 'dark'
                    ? 'bg-neutral-900/90 text-amber-300 border-white/10 hover:border-amber-400/40 hover:bg-neutral-800'
                    : 'bg-white/90 text-stone-800 border-stone-300 shadow-sm hover:border-[#c69c6d] hover:bg-stone-50'
                }`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-800" />
                )}
                <span className="text-[11px] font-medium hidden md:inline">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </button>

              {onOpenDatabase && (
                <button
                  type="button"
                  onClick={onOpenDatabase}
                  className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-xl border transition-colors cursor-pointer ${
                    theme === 'dark'
                      ? 'text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border-white/10'
                      : 'text-stone-700 hover:text-stone-950 bg-white/70 hover:bg-white border-stone-300 shadow-sm'
                  }`}
                  title="View Atelier Database"
                >
                  <Database className="w-3.5 h-3.5 text-[#c69c6d]" />
                  <span>Database</span>
                </button>
              )}

              {/* Direct Tap to Call button (prominent) */}
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold rounded-xl border transition-all shadow-sm ${
                  theme === 'dark'
                    ? 'text-neutral-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border-white/15 hover:border-[#c69c6d]/50'
                    : 'text-stone-800 hover:text-stone-950 bg-white/90 hover:bg-stone-50 border-stone-300 hover:border-[#8c6032]'
                }`}
                title={`Call NIBOCS Shoes: ${BUSINESS_INFO.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#c69c6d] shrink-0" />
                <span className="font-bold">{BUSINESS_INFO.phone}</span>
              </a>

              {/* Stripe-style glowing CTA button */}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="hidden sm:inline-flex items-center justify-center px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-neutral-950 bg-gradient-to-r from-[#c69c6d] via-[#d4af82] to-[#c69c6d] hover:brightness-110 active:scale-[0.98] rounded-xl transition-all duration-200 shadow-md shadow-[#c69c6d]/20 border border-white/20 whitespace-nowrap cursor-pointer"
              >
                <span>Contact</span>
                <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Mobile menu hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-neutral-300 hover:text-white hover:bg-white/5'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/50'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={`fixed top-0 right-0 bottom-0 w-full max-w-xs border-l p-6 flex flex-col justify-between overflow-y-auto transition-colors ${
            theme === 'dark'
              ? 'bg-[#0f1117] border-white/10 text-white'
              : 'bg-[#faf7f2] border-stone-300 text-stone-900 shadow-2xl'
          }`}>
            <div className="space-y-6 pt-12">
              <div className={`border-b pb-4 ${theme === 'dark' ? 'border-white/10' : 'border-stone-300'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-serif font-bold tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-stone-900'
                  }`}>
                    NIBOCS Shoes
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    theme === 'dark'
                      ? 'text-[#c69c6d] bg-white/5 border-white/10'
                      : 'text-[#8c6032] bg-stone-200/60 border-stone-300'
                  }`}>
                    Lagos, NG
                  </span>
                </div>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-600'}`}>
                  Handcrafted Footwear & Manufacturing
                </p>

                {/* Prominent Tap to Call in Drawer Header */}
                <div className="mt-3">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-xl bg-gradient-to-r from-[#c69c6d] to-[#d8b082] text-neutral-950 shadow-md shadow-[#c69c6d]/20 active:scale-[0.98] transition-transform"
                    title={`Call ${BUSINESS_INFO.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-950" />
                    <span>Call Now: {BUSINESS_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Theme Selector in Mobile Menu */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-stone-200/50 border-stone-300'
              }`}>
                <span className="text-xs font-medium">Atelier Atmosphere</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    theme === 'dark'
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : 'bg-stone-800 text-stone-100 border border-stone-700'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'text-neutral-200 hover:text-[#c69c6d] hover:bg-white/5'
                        : 'text-stone-800 hover:text-[#8c6032] hover:bg-stone-200/70'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="pt-2 space-y-2">
                {onOpenDatabase && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenDatabase();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-mono font-medium text-neutral-300 bg-white/5 border border-white/10 rounded-xl transition-colors cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5 text-[#c69c6d]" />
                    <span>Open Atelier Database</span>
                  </button>
                )}

                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-neutral-950 bg-gradient-to-r from-[#c69c6d] to-[#d4af82] rounded-xl transition-colors cursor-pointer shadow-lg shadow-[#c69c6d]/20"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-neutral-400">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 text-neutral-300 hover:text-[#c69c6d] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c69c6d]" />
                <span className="font-mono">{BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 text-neutral-300 hover:text-[#c69c6d] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#c69c6d]" />
                <span>{BUSINESS_INFO.email}</span>
              </a>
              <p className="text-[11px] text-neutral-500 leading-relaxed pt-1">
                {BUSINESS_INFO.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
