import React, { useState } from 'react';
import { ArrowUpRight, Eye, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { CATEGORIES, FEATURED_SHOES, ShoeProduct } from '../data/footwearData';

interface FeaturedShoesProps {
  onSelectProduct: (product: ShoeProduct) => void;
  onOrderProduct?: (productName: string) => void;
}

export const FeaturedShoes: React.FC<FeaturedShoesProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredShoes = selectedCategory === 'All'
    ? FEATURED_SHOES
    : FEATURED_SHOES.filter(
        (shoe) =>
          shoe.category === selectedCategory ||
          shoe.allCategories.includes(selectedCategory)
      );

  return (
    <section id="shoes" className="py-20 lg:py-32 relative bg-transparent border-t border-b border-stone-200/50 dark:border-white/[0.08]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#635bff]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#c69c6d]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#8c6032] dark:text-[#c69c6d] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" />
              <span>Production Catalog</span>
              <span className="text-neutral-400 dark:text-neutral-600">/</span>
              <span>Lagos Ready & Bespoke</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
              Footwear Made With Purpose.
            </h2>
            <p className="text-stone-600 dark:text-neutral-400 text-sm sm:text-base max-w-xl">
              Each silhouette is conceived for durability, refined aesthetics, and everyday movement. Browse our ready-to-order models or commission a bespoke pair.
            </p>
          </div>

          <div className="text-xs text-stone-700 dark:text-neutral-400 font-mono flex items-center gap-2 self-start md:self-end px-3 py-1.5 rounded-lg bg-white/60 dark:bg-white/[0.03] border border-stone-300 dark:border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-[#14ae5c]" />
            <span>{filteredShoes.length} Handcrafted Models</span>
          </div>
        </div>

        {/* Category Filter - Figma Segmented Component Tabs */}
        <div className="relative mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/70 dark:bg-[#12141a] border border-stone-300 dark:border-white/10 rounded-xl w-max max-w-full shadow-inner">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#c69c6d] to-[#d4af82] text-neutral-950 font-bold shadow-md shadow-[#c69c6d]/20'
                      : 'text-stone-700 dark:text-neutral-300 hover:text-stone-950 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shoes Grid - Stripe glowing bento cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredShoes.map((shoe) => (
            <div
              key={shoe.id}
              className="group stripe-card-glow rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative overflow-hidden bg-neutral-950 aspect-[4/3] flex items-center justify-center">
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101217] via-transparent to-transparent opacity-70" />

                {/* Figma-style layer tag */}
                <div className="absolute top-3 left-3 text-[10px] font-mono tracking-wider text-neutral-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  {shoe.category}
                </div>

                {/* Hover Quick Actions */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(shoe)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/90 text-white hover:bg-[#c69c6d] hover:text-black transition-all shadow-xl cursor-pointer border border-white/10 text-xs font-semibold"
                    title="View Details"
                    aria-label={`View details for ${shoe.name}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 dark:text-white group-hover:text-[#8c6032] dark:group-hover:text-[#c69c6d] transition-colors line-clamp-1">
                    {shoe.name}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {shoe.description}
                  </p>
                </div>

                {/* Figma Micro-spec property box */}
                <div className="p-2.5 rounded-lg bg-stone-100/80 dark:bg-white/[0.02] border border-stone-200 dark:border-white/[0.05] space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between text-stone-600 dark:text-neutral-400">
                    <span>Upper:</span>
                    <span className="text-stone-900 dark:text-neutral-200 font-medium truncate max-w-[150px]">{shoe.leatherType}</span>
                  </div>
                  <div className="flex justify-between text-stone-600 dark:text-neutral-400">
                    <span>Welt:</span>
                    <span className="text-[#8c6032] dark:text-[#c69c6d] font-medium">{shoe.construction}</span>
                  </div>
                </div>

                {/* Price Placeholder & Action Buttons */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-200 dark:border-white/[0.06]">
                  <div>
                    <span className="block text-[10px] text-stone-500 dark:text-neutral-400 uppercase font-mono tracking-wider">Status</span>
                    <span className="text-xs sm:text-sm font-semibold text-[#8c6032] dark:text-[#c69c6d] font-mono tabular-nums">
                      {shoe.pricePlaceholder}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(shoe)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 dark:text-neutral-300 hover:text-stone-950 dark:hover:text-white border border-stone-300 dark:border-white/10 hover:border-stone-400 dark:hover:border-white/30 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#c69c6d]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
