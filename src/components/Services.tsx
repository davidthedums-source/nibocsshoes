import React from 'react';
import { ArrowUpRight, Factory, Sparkles, ShoppingBag, Compass, UserCheck, Users } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/footwearData';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const serviceIcons: Record<string, React.ReactNode> = {
    'shoe-manufacturing': <Factory className="w-5 h-5 text-[#c69c6d]" />,
    'custom-shoe-making': <Sparkles className="w-5 h-5 text-[#c69c6d]" />,
    'footwear-sales': <ShoppingBag className="w-5 h-5 text-[#c69c6d]" />,
    'shoe-design': <Compass className="w-5 h-5 text-[#c69c6d]" />,
    'personalised-footwear': <UserCheck className="w-5 h-5 text-[#c69c6d]" />,
    'bulk-orders': <Users className="w-5 h-5 text-[#c69c6d]" />,
  };

  return (
    <section id="services" className="py-20 lg:py-32 relative bg-transparent border-t border-b border-stone-200/50 dark:border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#635bff]/6 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#8c6032] dark:text-[#c69c6d] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" />
            <span>Capabilities & Solutions</span>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <span>End-to-End Service</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
            Footwear Services Built for You.
          </h2>

          <p className="text-stone-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            From single bespoke commissions to high-capacity manufacturing, NIBOCS SHOE delivers excellence at every tier of footwear production.
          </p>
        </div>

        {/* 6-Card Services Grid - Stripe glowing bento cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.title)}
              className="group stripe-card-glow rounded-2xl p-7 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-5">
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-stone-100 dark:bg-neutral-900 border border-stone-200 dark:border-white/10 group-hover:bg-[#c69c6d]/10 group-hover:border-[#c69c6d]/30 transition-colors">
                    {serviceIcons[service.id]}
                  </div>
                  <span className="text-xs font-mono text-stone-500 dark:text-neutral-400 bg-stone-200/50 dark:bg-white/[0.03] px-2 py-0.5 rounded border border-stone-300 dark:border-white/[0.06]">
                    0{index + 1}
                  </span>
                </div>

                {/* Service Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-white group-hover:text-[#8c6032] dark:group-hover:text-[#c69c6d] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <ul className="space-y-2 pt-3 border-t border-stone-200 dark:border-white/5 text-xs text-stone-600 dark:text-neutral-400">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Action */}
              <div className="pt-6 mt-4 flex items-center justify-between text-xs text-stone-500 dark:text-neutral-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors border-t border-stone-200 dark:border-white/[0.04]">
                <span className="font-medium font-mono text-[11px]">Inquire Specification</span>
                <div className="p-1.5 rounded-lg bg-stone-200 dark:bg-white/5 group-hover:bg-[#c69c6d] group-hover:text-neutral-950 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
