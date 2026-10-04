import React from 'react';
import { MapPin, Phone, Mail, Check, Compass, Layers, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, ASSETS } from '../data/footwearData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32 relative bg-transparent border-t border-stone-200/50 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text & Values */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#8c6032] dark:text-[#c69c6d] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d99ff]" />
                <span>Atelier Profile</span>
                <span className="text-neutral-400 dark:text-neutral-600">/</span>
                <span>Sangotedo, Lagos</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-white tracking-tight [text-wrap:balance]">
                Built Around Craftsmanship.
              </h2>
            </div>

            <div className="space-y-4 text-stone-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                NIBOCS Shoes is a footwear business focused on making and selling shoes while combining craftsmanship, modern design and customer satisfaction.
              </p>
              <p className="text-stone-600 dark:text-neutral-400">
                Operating from Sangotedo in Lagos, Nigeria, our operations span complete in-house footwear manufacturing and direct consumer retail. Whether you are seeking refined formal dress shoes, everyday casual styles, or custom-commissioned footwear, each pair is crafted with careful attention to material selection and structural balance.
              </p>
            </div>

            {/* Three Foundational Pillars - Figma property cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl figma-panel border border-stone-200 dark:border-white/10 space-y-2 hover:border-[#c69c6d]/50 transition-colors">
                <span className="text-[#8c6032] dark:text-[#c69c6d] font-mono text-xs font-bold block">01 / CRAFT</span>
                <h4 className="text-stone-900 dark:text-white font-semibold text-sm">Skilled Craftsmanship</h4>
                <p className="text-stone-600 dark:text-neutral-400 text-xs leading-relaxed">Traditional shoe construction methods and hand finishing.</p>
              </div>

              <div className="p-4 rounded-xl figma-panel border border-stone-200 dark:border-white/10 space-y-2 hover:border-[#c69c6d]/50 transition-colors">
                <span className="text-[#0d99ff] font-mono text-xs font-bold block">02 / DESIGN</span>
                <h4 className="text-stone-900 dark:text-white font-semibold text-sm">Modern Style</h4>
                <p className="text-stone-600 dark:text-neutral-400 text-xs leading-relaxed">Contemporary silhouettes suited for versatile occasions.</p>
              </div>

              <div className="p-4 rounded-xl figma-panel border border-stone-200 dark:border-white/10 space-y-2 hover:border-[#c69c6d]/50 transition-colors">
                <span className="text-[#14ae5c] font-mono text-xs font-bold block">03 / SERVICE</span>
                <h4 className="text-stone-900 dark:text-white font-semibold text-sm">Customer Focus</h4>
                <p className="text-stone-600 dark:text-neutral-400 text-xs leading-relaxed">Footwear tailored around customer needs and satisfaction.</p>
              </div>
            </div>

            {/* Quick Contact & Location Marker */}
            <div className="p-4 rounded-xl figma-panel-subtle border border-stone-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-stone-700 dark:text-neutral-300">
                <MapPin className="w-4 h-4 text-[#c69c6d] shrink-0" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-4 text-stone-600 dark:text-neutral-400">
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-[#c69c6d] transition-colors font-mono">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Grid with Figma Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl figma-panel group">
              {/* Header Canvas Bar */}
              <div className="px-4 py-2.5 bg-neutral-900/90 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Hide_Inspection.raw</span>
                <span className="text-[#c69c6d]">Full-Grain Leather</span>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={ASSETS.leather}
                  alt="NIBOCS SHOE workshop materials and leather selection"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 figma-panel p-4 rounded-xl text-xs space-y-1 border border-white/10">
                  <div className="flex items-center justify-between text-neutral-300 font-mono text-[11px]">
                    <span className="font-semibold text-white">NIBOCS Shoes</span>
                    <span className="text-[#c69c6d]">Sangotedo, Lagos</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Footwear manufacturing and sales with strict material selection and meticulous finishing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
