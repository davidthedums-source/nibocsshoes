import React from 'react';
import { X, Sparkles, MapPin } from 'lucide-react';
import { GalleryItem } from '../data/footwearData';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative max-w-4xl w-full bg-[#111216] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-10 my-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-[16/10] bg-neutral-950 flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Details Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#c69c6d] uppercase tracking-wider block">
                {item.category} · NIBOCS SHOE Archive
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                {item.caption}
              </p>
            </div>

            <div className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 self-start sm:self-end">
              <MapPin className="w-3.5 h-3.5 text-[#c69c6d]" />
              <span>Sangotedo, Lagos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
