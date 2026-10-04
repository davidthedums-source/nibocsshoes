import React from 'react';
import { Award, Compass, Eye, HeartHandshake } from 'lucide-react';
import { WHY_LIBOCS } from '../data/footwearData';

export const WhyLibocs: React.FC = () => {
  const icons = [
    <Award className="w-5 h-5 text-[#c69c6d]" key="1" />,
    <Compass className="w-5 h-5 text-[#c69c6d]" key="2" />,
    <Eye className="w-5 h-5 text-[#c69c6d]" key="3" />,
    <HeartHandshake className="w-5 h-5 text-[#c69c6d]" key="4" />,
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-transparent border-t border-b border-stone-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#8c6032] dark:text-[#c69c6d] uppercase">
            <span>Core Standards</span>
            <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-600">·</span>
            <span>Why Choose Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-stone-900 dark:text-white tracking-tight">
            Footwear Defined by Integrity.
          </h2>

          <p className="text-stone-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Four guiding principles behind every pair created at NIBOCS Shoes.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_LIBOCS.map((point, index) => (
            <div
              key={point.number}
              className="p-6 sm:p-7 rounded-2xl figma-panel border border-stone-200 dark:border-white/5 hover:border-[#c69c6d]/50 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-neutral-900 border border-stone-200 dark:border-white/10 group-hover:bg-[#c69c6d]/10 transition-colors">
                    {icons[index]}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8c6032] dark:text-[#c69c6d]">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-white group-hover:text-[#8c6032] dark:group-hover:text-[#c69c6d] transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-sm font-medium text-stone-700 dark:text-neutral-300 leading-snug">
                    {point.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-white/5">
                <p className="text-xs text-stone-600 dark:text-neutral-400 leading-relaxed">
                  {point.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
