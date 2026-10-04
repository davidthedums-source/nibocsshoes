import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck, Sparkles, Layers, MousePointer2 } from 'lucide-react';
import { ASSETS, BUSINESS_INFO } from '../data/footwearData';
import { handleImageError } from '../lib/imageUtils';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  const [activePin, setActivePin] = useState<number | null>(null);

  const pins = [
    {
      id: 1,
      x: '32%',
      y: '48%',
      title: 'Upper Architecture',
      detail: 'Full-Grain Box Calf · Hand-blocked toe cap',
    },
    {
      id: 2,
      x: '62%',
      y: '72%',
      title: 'Welt & Stitching',
      detail: 'Hand-sewn 8 SPI waxed thread welt',
    },
    {
      id: 3,
      x: '80%',
      y: '55%',
      title: 'Sole & Heel',
      detail: '6.5mm Veg-tan leather sole with brass tacks',
    },
  ];

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 pb-16 lg:py-36 stripe-canvas-gradient">
      {/* Stripe-style slanted iridescent gradient light beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Slanted gradient backdrop */}
        <div className="absolute -top-40 -left-40 w-[140%] h-[700px] bg-gradient-to-r from-[#635bff]/10 via-[#c69c6d]/15 to-[#0d99ff]/10 blur-[130px] -rotate-6 transform-gpu" />
        
        {/* Figma canvas dot grid */}
        <div className="absolute inset-0 figma-dot-grid opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

        {/* Ambient glow nodes */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[#c69c6d]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#635bff]/8 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Figma-style canvas breadcrumb toolbar */}
        <div className="hidden sm:flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08] text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold"># Atelier Frame</span>
            <span className="text-neutral-600">/</span>
            <span>Sangotedo, Lagos</span>
            <span className="text-neutral-600">/</span>
            <span className="text-[#c69c6d]">Production & Bespoke</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#14ae5c]" />
              <span>Crafting Active</span>
            </div>
            <span>·</span>
            <span>100% Handcrafted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wider text-neutral-400 uppercase">
              <span className="text-[#c69c6d] font-semibold">Footwear Manufacturer</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Retail & Bespoke Sales</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Lagos, Nigeria</span>
            </div>

            {/* Main Headline with Stripe Iridescent Shimmer */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-bold tracking-tight leading-[1.06] [text-wrap:balance]">
              <span className="stripe-text-shimmer">
                CRAFTED TO MOVE WITH YOU.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl">
              NIBOCS SHOE creates and sells quality footwear, combining skilled craftsmanship, modern style and attention to detail.
            </p>

            {/* Action Buttons - Stripe elevated styling */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="group relative inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold tracking-wide text-neutral-950 bg-gradient-to-r from-[#c69c6d] via-[#d6b083] to-[#c69c6d] hover:brightness-110 active:scale-[0.98] rounded-xl transition-all duration-200 shadow-xl shadow-[#c69c6d]/20 border border-white/20 cursor-pointer"
              >
                <span>Explore Our Shoes</span>
                <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold tracking-wide text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-white/25 rounded-xl transition-all duration-200 backdrop-blur-md cursor-pointer shadow-lg shadow-black/40"
              >
                <span>Contact NIBOCS</span>
                <ArrowUpRight className="ml-2 w-4 h-4 text-neutral-400 group-hover:text-white" />
              </button>
            </div>

            {/* Stripe & Figma inspired technical spec bar */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3 sm:gap-6 text-xs">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <span className="block font-semibold text-white text-sm font-mono">Full-Grain</span>
                <span className="text-neutral-400 text-[11px]">Calfskin Leather</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <span className="block font-semibold text-white text-sm font-mono">Hand-Welted</span>
                <span className="text-neutral-400 text-[11px]">Blake & Goodyear</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <span className="block font-semibold text-white text-sm font-mono">Sangotedo</span>
                <span className="text-neutral-400 text-[11px]">Lagos Workshop</span>
              </div>
            </div>
          </div>

          {/* Right Column: Figma Interactive Canvas & High-End Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Figma Canvas Frame Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950/90 shadow-2xl group figma-panel">
                {/* Figma Canvas Header bar */}
                <div className="px-4 py-2.5 bg-neutral-900/80 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 text-neutral-300 font-medium">Sangotedo_Master_Last.canvas</span>
                  </div>
                  <span className="text-[#c69c6d] font-semibold">1440 × 960</span>
                </div>

                {/* Image Frame with interactive spec pins */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-neutral-950">
                  <img
                    src={ASSETS.hero}
                    alt="NIBOCS SHOE handcrafted luxury leather oxford and sneaker"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />

                  {/* Measured contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Interactive Dimension Pins */}
                  {pins.map((pin) => (
                    <div
                      key={pin.id}
                      style={{ top: pin.y, left: pin.x }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        type="button"
                        onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
                        className="group/pin relative flex items-center justify-center cursor-pointer"
                        title={pin.title}
                        aria-label={pin.title}
                      >
                        <span className="w-5 h-5 rounded-full bg-[#0d99ff] border-2 border-white text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-lg animate-pulse">
                          {pin.id}
                        </span>
                        <span className="absolute -inset-1 rounded-full bg-[#0d99ff]/40 blur-xs -z-10" />
                      </button>

                      {/* Detail Popover */}
                      {activePin === pin.id && (
                        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-48 p-2.5 figma-panel rounded-lg shadow-xl text-left text-xs z-30">
                          <span className="text-[10px] font-mono text-[#0d99ff] block font-bold">
                            {pin.title}
                          </span>
                          <span className="text-white text-[11px] leading-tight block mt-0.5">
                            {pin.detail}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Figma Collaborator Cursor 1: Lead Cobbler */}
                  <div className="absolute top-[28%] left-[22%] z-20 pointer-events-none hidden sm:flex items-center gap-1.5 animate-bounce">
                    <MousePointer2 className="w-4 h-4 text-[#14ae5c] fill-[#14ae5c]" />
                    <span className="px-2 py-0.5 rounded bg-[#14ae5c] text-neutral-950 font-mono text-[10px] font-bold shadow-md">
                      Tunde (Lead Cobbler)
                    </span>
                  </div>

                  {/* Figma Collaborator Cursor 2: Creative Director */}
                  <div className="absolute bottom-[35%] right-[18%] z-20 pointer-events-none hidden sm:flex items-center gap-1.5">
                    <MousePointer2 className="w-4 h-4 text-[#9747ff] fill-[#9747ff]" />
                    <span className="px-2 py-0.5 rounded bg-[#9747ff] text-white font-mono text-[10px] font-bold shadow-md">
                      Ese (Bespoke Finish)
                    </span>
                  </div>

                  {/* Bottom Canvas HUD Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 figma-panel rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-white/10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">Sangotedo Sovereign Oxford</span>
                        <span className="text-[10px] font-mono text-[#c69c6d] bg-black/40 px-1.5 py-0.5 rounded">
                          Hand-Welted
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Full-Grain Box Calf · Veg-Tan Sole · Lagos, Nigeria
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-neutral-300 self-start sm:self-auto">
                      <span className="text-[#14ae5c] font-bold">●</span> In Production
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
