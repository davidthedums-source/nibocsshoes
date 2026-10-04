import React from 'react';
import { ArrowUpRight, Check, Sliders, Palette, Ruler, Sparkles, Layers } from 'lucide-react';
import { ASSETS } from '../data/footwearData';

interface CustomShoesProps {
  onRequestCustom: () => void;
}

export const CustomShoes: React.FC<CustomShoesProps> = ({ onRequestCustom }) => {
  const customFeatures = [
    {
      title: 'Individual Measurements',
      desc: 'Foot length, width, and instep calibrated to your anatomy.',
      icon: <Ruler className="w-4 h-4 text-[#c69c6d]" />,
      tag: 'Scale 1:1',
    },
    {
      title: 'Curated Leather Selection',
      desc: 'Select from black box calf, cognac crust, pebbled grain, or suede.',
      icon: <Palette className="w-4 h-4 text-[#c69c6d]" />,
      tag: 'Raw Hides',
    },
    {
      title: 'Personalized Details',
      desc: 'Choice of welt style, brass hardware, bespoke patina hues, and sole profile.',
      icon: <Sliders className="w-4 h-4 text-[#c69c6d]" />,
      tag: 'Custom Spec',
    },
  ];

  return (
    <section id="custom-shoes" className="py-24 lg:py-32 relative bg-transparent overflow-hidden border-t border-b border-stone-200/50 dark:border-white/[0.08]">
      {/* Background glow and subtle geometric lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#c69c6d]/8 rounded-full blur-[150px]" />
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-[#635bff]/6 rounded-full blur-[140px]" />
        <div className="absolute inset-0 figma-canvas-grid opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Dark Editorial Showcase Image in Figma Frame */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl group figma-panel">
              {/* Header Canvas Bar */}
              <div className="px-4 py-2.5 bg-neutral-900/90 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c69c6d]" />
                  Bespoke_Commission.instance
                </span>
                <span className="text-[#0d99ff]">Sangotedo Atelier</span>
              </div>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-neutral-950">
                <img
                  src={ASSETS.custom}
                  alt="NIBOCS SHOE Bespoke Custom Footwear"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim and badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-xs text-neutral-300 figma-panel p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px] mb-1">
                    <span className="text-[#c69c6d] font-bold">Hand-Dyed Patina</span>
                    <span>Individual Last Creation</span>
                  </div>
                  <p className="text-white text-xs leading-relaxed">
                    Every custom commission is tailored around your individual aesthetic and posture.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Footwear Proposition */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#8c6032] dark:text-[#c69c6d] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" />
                <span>Personalised Footwear Atelier</span>
                <span className="text-neutral-400 dark:text-neutral-600">/</span>
                <span>Bespoke Engineering</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-white tracking-tight [text-wrap:balance]">
                Your Style. Your Shoes.
              </h2>

              <p className="text-base text-stone-700 dark:text-neutral-300 leading-relaxed max-w-xl">
                Looking for a unique color combination, specific sizing considerations, or an exclusive silhouette? Customers can contact NIBOCS SHOE about personalised or custom footwear tailored precisely to their preferences.
              </p>
            </div>

            {/* Custom Features List - Figma Property cards */}
            <div className="space-y-3 pt-2">
              {customFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="p-4 rounded-xl figma-panel flex items-start justify-between gap-4 border border-white/10 hover:border-[#c69c6d]/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 shrink-0">
                      {feat.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{feat.title}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[#0d99ff] bg-[#0d99ff]/10 px-2 py-0.5 rounded border border-[#0d99ff]/20 shrink-0 hidden sm:inline-block">
                    {feat.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onRequestCustom}
                className="group relative inline-flex items-center justify-center px-7 py-4 text-sm font-semibold tracking-wide text-neutral-950 bg-gradient-to-r from-[#c69c6d] via-[#d6b083] to-[#c69c6d] hover:brightness-110 active:scale-[0.98] rounded-xl transition-all duration-200 shadow-xl shadow-[#c69c6d]/20 border border-white/20 cursor-pointer"
              >
                <span>Request Custom Shoes</span>
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
