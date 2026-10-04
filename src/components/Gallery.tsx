import React, { useState } from 'react';
import { Maximize2, Sparkles, Filter } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/footwearData';

interface GalleryProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Finished Shoes', 'Shoe Production', 'Leather & Materials', 'Craftsmanship'];

  const filteredItems = activeTab === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="gallery" className="py-20 lg:py-32 relative bg-transparent border-t border-b border-stone-200/50 dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#8c6032] dark:text-[#c69c6d] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d99ff]" />
              <span>Visual Archive</span>
              <span className="text-neutral-400 dark:text-neutral-600">/</span>
              <span>Atelier Media Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
              Craftsmanship In Every Angle.
            </h2>
            <p className="text-stone-600 dark:text-neutral-400 text-sm sm:text-base max-w-xl">
              An intimate look at finished shoes, production stages, raw leather materials, and artisan welt stitching from our workshop in Lagos.
            </p>
          </div>

          {/* Figma Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/70 dark:bg-[#12141a] border border-stone-300 dark:border-white/10 rounded-xl overflow-x-auto max-w-full shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeTab === cat
                    ? 'bg-gradient-to-r from-[#c69c6d] to-[#d4af82] text-neutral-950 font-bold shadow-md shadow-[#c69c6d]/20'
                    : 'text-stone-700 dark:text-neutral-300 hover:text-stone-950 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group stripe-card-glow rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-neutral-950 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Figma-style layer tag */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  {item.category}
                </div>

                {/* Lightbox trigger icon */}
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/75 backdrop-blur-md text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom caption block */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1 text-left">
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#c69c6d] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
