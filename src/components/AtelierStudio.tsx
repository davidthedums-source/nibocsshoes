import React, { useState } from 'react';
import { Sliders, ArrowUpRight, Palette, Layers, Ruler, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/footwearData';
import { handleImageError } from '../lib/imageUtils';

interface AtelierStudioProps {
  onCommissionSpec: (specDetails: string) => void;
}

export const AtelierStudio: React.FC<AtelierStudioProps> = ({ onCommissionSpec }) => {
  const [selectedSilhouette, setSelectedSilhouette] = useState('Plain-Toe Derby');
  const [selectedLeather, setSelectedLeather] = useState('Obsidian Box Calf');
  const [selectedSole, setSelectedSole] = useState('Veg-Tan Leather Sole');
  const [selectedWelt, setSelectedWelt] = useState('Goodyear 360°');
  const [selectedSize, setSelectedSize] = useState('EU 42');
  const [monogram, setMonogram] = useState('LBC');

  const silhouettes = [
    { name: 'Plain-Toe Derby', category: 'Men\'s Formal', image: ASSETS.menDerby },
    { name: 'Utility Ribbed Sneaker', category: 'Casual Streetwear', image: ASSETS.casualSneaker },
    { name: 'Women\'s Tassel Loafer', category: 'Women\'s Elegance', image: ASSETS.femaleLoafer },
    { name: 'Bespoke Commission Shoe', category: 'Custom Artisanal', image: ASSETS.custom },
  ];

  const leathers = [
    { name: 'Tactical Canvas Twill', color: '#1a1b1f', desc: 'Heavy-duty vulcanized weave' },
    { name: 'Patent Mahogany Glaze', color: '#4a1515', desc: 'High-gloss burnished patent' },
    { name: 'Obsidian Box Calf', color: '#161616', desc: 'Smooth, mirror-shine capable' },
    { name: 'Antiqued Cognac', color: '#8a4b18', desc: 'Hand-dyed layered patina' },
    { name: 'Espresso Milled', color: '#3d2516', desc: 'Supple, pebbled touch' },
    { name: 'Tuscan Cream Nappa', color: '#d8ccb8', desc: 'Ultra-soft glove feel' },
  ];

  const soles = [
    { name: 'Veg-Tan Leather Sole', desc: '6.5mm stacked leather with brass tacks' },
    { name: 'Commando Lugged Rubber', desc: 'All-weather traction & shock cushioning' },
    { name: 'Dainite Studded Sole', desc: 'Discreet profile with weather resistance' },
  ];

  const welts = ['Goodyear 360°', 'Blake-Rapid Precision', 'Norwegian Storm Welt'];
  const sizes = ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45', 'Bespoke Size'];

  const currentImage = silhouettes.find((s) => s.name === selectedSilhouette)?.image || ASSETS.hero;

  const currentSpecSummary = `${selectedSilhouette} · ${selectedLeather} · ${selectedSole} · ${selectedWelt} · Size: ${selectedSize}`;

  const whatsappStudioLink = `https://wa.me/2349037880988?text=${encodeURIComponent(
    `Hello NIBOCS SHOE! I configured a bespoke pair on the Atelier Studio:\n- Silhouette: ${selectedSilhouette}\n- Leather: ${selectedLeather}\n- Sole: ${selectedSole}\n- Welt: ${selectedWelt}\n- Size: ${selectedSize}\n- Monogram: ${monogram}\n\nPlease provide quotation and lead time.`
  )}`;

  return (
    <section id="studio" className="py-24 lg:py-32 relative bg-[#090a0e] border-t border-b border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none figma-canvas-grid opacity-25" />
      <div className="absolute top-1/4 right-10 w-[550px] h-[400px] bg-[#635bff]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-[#c69c6d]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#c69c6d] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#0d99ff]" />
              <span>Interactive Atelier Studio</span>
              <span className="text-neutral-600">/</span>
              <span>Figma & Stripe Powered Design</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Design Your Footwear Instance.
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
              Customize silhouettes, raw leather hides, sole profiles, and welting specifications in real time. Order your configuration directly from our Lagos artisans.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg figma-panel text-xs font-mono text-neutral-300 self-start md:self-auto border border-white/10">
            <span className="text-[#0d99ff]">Properties:</span>
            <span>Live Inspector Active</span>
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Canvas Viewport (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="figma-panel rounded-2xl overflow-hidden border border-white/15 relative">
              {/* Top Canvas Bar */}
              <div className="px-4 py-3 bg-neutral-900/90 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#0d99ff]" />
                    {selectedSilhouette}
                  </span>
                  <span className="text-neutral-500">|</span>
                  <span className="text-neutral-400 text-[11px]">{selectedLeather}</span>
                </div>

                <span className="px-2 py-0.5 rounded bg-[#c69c6d]/20 text-[#c69c6d] text-[10px] font-bold">
                  Scale: 1:1 Anatomical
                </span>
              </div>

              {/* Main Shoe Image Canvas */}
              <div className="relative aspect-[16/10] bg-neutral-950 flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={currentImage}
                  alt={selectedSilhouette}
                  className="w-full h-full object-cover object-center rounded-xl transition-all duration-500"
                  onError={handleImageError}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Live Specification Tags overlay */}
                <div className="absolute top-4 left-4 p-3 figma-panel rounded-xl text-xs space-y-1 border border-white/10">
                  <div className="flex items-center gap-2 text-neutral-300 font-mono text-[11px]">
                    <span className="text-[#0d99ff] font-bold">ID:</span>
                    <span>LBC-{selectedSilhouette.slice(0, 3).toUpperCase()}-2026</span>
                  </div>
                  <p className="text-[11px] text-white font-semibold">
                    {selectedWelt} Welting
                  </p>
                </div>

                {/* Monogram stamp preview */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg figma-panel text-xs font-mono border border-white/10 flex items-center gap-2">
                  <span className="text-neutral-400 text-[11px]">Embossed Stamp:</span>
                  <span className="text-[#c69c6d] font-bold tracking-widest uppercase">
                    {monogram || 'LBC'}
                  </span>
                </div>
              </div>

              {/* Canvas Controls Toolbar */}
              <div className="p-4 sm:p-6 bg-neutral-900/60 border-t border-white/[0.08] space-y-5">
                {/* 1. Silhouette Selector Tabs */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-neutral-300">
                    1. Select Base Silhouette
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {silhouettes.map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedSilhouette(item.name)}
                        className={`p-2.5 rounded-xl text-left transition-all border text-xs cursor-pointer ${
                          selectedSilhouette === item.name
                            ? 'bg-[#c69c6d]/15 border-[#c69c6d] text-white shadow-sm'
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className="font-semibold block truncate">{item.name}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">{item.category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Leather Swatch Palette */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-neutral-300">
                    2. Leather Selection & Tanning
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {leathers.map((l) => (
                      <button
                        key={l.name}
                        type="button"
                        onClick={() => setSelectedLeather(l.name)}
                        className={`p-2.5 rounded-xl text-left transition-all border text-xs cursor-pointer ${
                          selectedLeather === l.name
                            ? 'bg-neutral-800 border-[#c69c6d] text-white'
                            : 'bg-neutral-950/60 border-white/[0.06] text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block"
                            style={{ backgroundColor: l.color }}
                          />
                          <span className="font-semibold text-white truncate text-[11px]">{l.name}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400 block line-clamp-1">{l.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Sole Profile & Welting */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-neutral-300">
                      3. Outsole Architecture
                    </label>
                    <select
                      value={selectedSole}
                      onChange={(e) => setSelectedSole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c69c6d] cursor-pointer"
                    >
                      {soles.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-neutral-300">
                      4. Welt Construction
                    </label>
                    <select
                      value={selectedWelt}
                      onChange={(e) => setSelectedWelt(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c69c6d] cursor-pointer"
                    >
                      {welts.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inspector Panel (4 Cols on lg, 4 on xl) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            {/* Figma-Style Property Inspector Sheet */}
            <div className="figma-panel rounded-2xl p-6 border border-white/15 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0d99ff]" />
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    Design Inspector
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                  v2026.1
                </span>
              </div>

              {/* Property Key-Value Pairs */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Silhouette</span>
                  <span className="text-white font-medium text-right">{selectedSilhouette}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Leather Hide</span>
                  <span className="text-white font-medium text-right">{selectedLeather}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Construction</span>
                  <span className="text-[#c69c6d] font-semibold text-right">{selectedWelt}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Outsole</span>
                  <span className="text-white font-medium text-right">{selectedSole}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Atelier Origin</span>
                  <span className="text-neutral-300 text-right">Sangotedo, Lagos</span>
                </div>
              </div>

              {/* Interactive Sizing & Monogram Fields */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                    Select Target Size
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#c69c6d] text-neutral-950 font-bold'
                            : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                    Custom Monogram Stamp (Initials)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    placeholder="e.g. LBC"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-white font-mono text-xs uppercase tracking-widest focus:outline-none focus:border-[#c69c6d]"
                  />
                </div>
              </div>

              {/* Stripe-style Quotation & Ordering Box */}
              <div className="pt-4 border-t border-white/[0.08] space-y-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono">Quotation Status:</span>
                    <span className="text-[#c69c6d] font-mono font-bold">Bespoke Quotation</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Handmade in our Lagos workshop. Production timeline: 7–14 days.
                  </p>
                </div>

                {/* Primary Buttons */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onCommissionSpec(currentSpecSummary)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#c69c6d] via-[#d6b083] to-[#c69c6d] hover:brightness-110 text-neutral-950 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#c69c6d]/20 cursor-pointer transition-all"
                  >
                    <span>Commission This Spec</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={whatsappStudioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Spec to WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
