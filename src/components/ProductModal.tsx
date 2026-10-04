import React from 'react';
import { X, ArrowUpRight, Check, ShieldCheck, Ruler, Layers, Sparkles } from 'lucide-react';
import { ShoeProduct } from '../data/footwearData';
import { handleImageError } from '../lib/imageUtils';

interface ProductModalProps {
  product: ShoeProduct | null;
  onClose: () => void;
  onOrder: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onOrder }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#0f1117] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 text-left my-8 figma-panel">
        {/* Figma Dialog Top Bar */}
        <div className="px-4 py-2.5 bg-neutral-900/90 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0d99ff]" />
            <span>Inspector: {product.name.replace(/\s+/g, '_')}.spec</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative aspect-[4/3] md:aspect-auto bg-neutral-950 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] md:from-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f1117]/70 pointer-events-none" />

            <div className="absolute top-4 left-4 text-xs font-mono bg-black/75 backdrop-blur-md px-3 py-1 rounded text-[#c69c6d] border border-white/10">
              {product.category}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  NIBOCS SHOE · Atelier Spec
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                  {product.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications */}
              <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Silhouette</span>
                  <span className="text-white font-medium">{product.silhouette}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Leather Type</span>
                  <span className="text-white font-medium">{product.leatherType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Construction</span>
                  <span className="text-[#c69c6d] font-medium">{product.construction}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-neutral-400">Outsole</span>
                  <span className="text-white font-medium">{product.sole}</span>
                </div>
              </div>

              {/* Color Tones */}
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block mb-1.5 uppercase tracking-wider">
                  Available Tones
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-neutral-300 font-mono"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features checkmarks */}
              <div className="pt-1 space-y-1 text-xs text-neutral-300">
                {product.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#c69c6d] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Price Status
                </span>
                <span className="text-sm font-semibold text-[#c69c6d] font-mono">
                  {product.pricePlaceholder}
                </span>
              </div>

              <a
                href={`https://wa.me/2349037880988?text=${encodeURIComponent(
                  `Hello NIBOCS SHOE! I would like to inquire about specifications and pricing for the ${product.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-gradient-to-r from-[#c69c6d] via-[#d6b083] to-[#c69c6d] hover:brightness-110 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-[#c69c6d]/20 cursor-pointer"
              >
                <span>Inquire on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
