import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Calendar, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/footwearData';
import { LiveWorkshopMap } from './LiveWorkshopMap';

interface ContactProps {
  initialSubject?: string;
  onOpenScheduleAppointment?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenScheduleAppointment }) => {
  return (
    <section id="contact" className="py-20 lg:py-32 relative bg-transparent border-t border-stone-200/50 dark:border-white/[0.08]">
      {/* Background soft ambient gradient */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#c69c6d]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#8c6032] dark:text-[#c69c6d] uppercase">
            <span>Atelier & Workshop</span>
            <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-600">·</span>
            <span>Direct Contact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-stone-900 dark:text-white tracking-tight">
            Connect with NIBOCS SHOE.
          </h2>

          <p className="text-stone-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Visit our Sangotedo workshop, consult directly with our master shoemakers, or reach out for custom bespoke commissions, ready collections, and corporate manufacturing.
          </p>
        </div>

        {/* Contact Grid: Direct Channels & Workshop Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact & Atelier Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Atelier Identity Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#c69c6d] uppercase">
                  Sangotedo Workshop
                </span>
                <h3 className="text-2xl font-serif font-semibold text-white tracking-wide mt-0.5">
                  NIBOCS SHOE
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Handcrafted Footwear Manufacturing & Sales
                </p>
              </div>

              <div className="pt-2 space-y-3.5 text-xs text-neutral-300">
                {/* Location */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/80 border border-white/5">
                  <div className="p-2 rounded-lg bg-neutral-800 text-[#c69c6d] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Workshop Address</span>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/80 border border-white/5">
                  <div className="p-2 rounded-lg bg-neutral-800 text-[#c69c6d] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Visiting Hours</span>
                    <p className="text-neutral-400 text-xs mt-0.5">
                      Monday – Saturday: 8:00 AM – 6:00 PM
                    </p>
                    <p className="text-neutral-500 text-[11px] mt-0.5">
                      Walk-ins & scheduled fittings welcome
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-neutral-900/80 border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-800 text-[#c69c6d] shrink-0 group-hover:bg-[#c69c6d]/20 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-neutral-400 text-[11px] block">Direct Phone</span>
                      <a
                        href={`tel:${BUSINESS_INFO.phone}`}
                        className="text-white hover:text-[#c69c6d] font-semibold text-sm font-mono transition-colors"
                      >
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Call
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-neutral-900/80 border border-white/5 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-800 text-[#c69c6d] shrink-0 group-hover:bg-[#c69c6d]/20 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-neutral-400 text-[11px] block">Inquiries Email</span>
                      <a
                        href={`mailto:${BUSINESS_INFO.email}`}
                        className="text-white hover:text-[#c69c6d] font-semibold text-xs sm:text-sm transition-colors break-all"
                      >
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                  </div>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 space-y-2.5">
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] rounded-xl shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-neutral-950 bg-[#c69c6d] hover:bg-[#d8b082] rounded-xl transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Atelier</span>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 border border-white/10 hover:border-white/20 rounded-xl transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Atelier Guarantees / Service Highlights */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#c69c6d]">
                <ShieldCheck className="w-4 h-4" />
                <span>NIBOCS SHOE Workshop Standards</span>
              </div>
              <ul className="text-xs text-neutral-400 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" />
                  <span>Bespoke foot measurement & wooden last sculpting</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" />
                  <span>Premium full-grain leather selection & sole customization</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]" />
                  <span>Corporate bulk production & nationwide delivery across Nigeria</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Prominent Live Workshop Map & Visiting Guide */}
          <div className="lg:col-span-7 space-y-6">
            <LiveWorkshopMap />

            {/* Visit & Appointment Guide Card */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c69c6d]" />
                  Visiting the NIBOCS SHOE Workshop
                </h4>
                <span className="text-[11px] font-mono text-[#14ae5c] bg-[#14ae5c]/10 px-2 py-0.5 rounded border border-[#14ae5c]/20">
                  Open for Visits
                </span>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                Our workshop is located inside Cannan Estate along the Sangotedo Lekki-Epe corridor. Clients are welcome to visit to inspect leather swatches, try sample lasts, discuss bespoke commissions, or pick up finished footwear.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/5">
                  <span className="text-[#c69c6d] font-semibold block text-[11px] uppercase tracking-wider">Step 1</span>
                  <p className="text-neutral-300 font-medium mt-1">Contact Ahead</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Let us know your arrival time via WhatsApp or call.</p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/5">
                  <span className="text-[#c69c6d] font-semibold block text-[11px] uppercase tracking-wider">Step 2</span>
                  <p className="text-neutral-300 font-medium mt-1">Estate Gate Entry</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Cannan Estate security access to DKK Street.</p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/5">
                  <span className="text-[#c69c6d] font-semibold block text-[11px] uppercase tracking-wider">Step 3</span>
                  <p className="text-neutral-300 font-medium mt-1">Workshop Fitting</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Direct consult and bespoke fitting with our artisans.</p>
                </div>
              </div>

              {onOpenScheduleAppointment && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenScheduleAppointment}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#c69c6d] hover:bg-[#d8b082] text-neutral-950 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Workshop Fitting Online</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
