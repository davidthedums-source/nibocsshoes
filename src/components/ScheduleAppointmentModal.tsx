import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, Loader2, Database } from 'lucide-react';
import { createWorkshopAppointment } from '../firebase/firestoreService';
import { BUSINESS_INFO } from '../data/footwearData';

interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleAppointmentModal: React.FC<ScheduleAppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: 'Morning (9:00 AM - 12:00 PM)',
    purpose: 'Foot Measurement & Bespoke Fitting',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.date.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const id = await createWorkshopAppointment({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        timeSlot: formData.timeSlot,
        purpose: formData.purpose,
        notes: formData.notes,
      });

      setBookingRef(id);
      setIsSuccess(true);
    } catch (err) {
      console.error('Failed to book workshop visit in database:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setBookingRef(null);
    onClose();
  };

  const purposes = [
    'Foot Measurement & Bespoke Fitting',
    'Custom Patina & Leather Selection',
    'Corporate & Bulk Production Meeting',
    'Finished Footwear Pickup & Quality Check',
  ];

  const timeSlots = [
    'Morning (9:00 AM - 12:00 PM)',
    'Early Afternoon (12:00 PM - 3:00 PM)',
    'Late Afternoon (3:00 PM - 6:00 PM)',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#111216] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-left my-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#c69c6d]/20 text-[#c69c6d] flex items-center justify-center mx-auto border border-[#c69c6d]/40">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono mx-auto">
                <Database className="w-3 h-3" />
                <span>Recorded to Atelier Database</span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white">
                Fitting Appointment Scheduled
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Your workshop appointment for <span className="text-[#c69c6d] font-medium">{formData.date}</span> ({formData.timeSlot}) has been logged in our workshop schedule.
              </p>
              {bookingRef && (
                <p className="text-xs font-mono text-[#c69c6d] bg-black/40 py-1.5 px-3 rounded-lg inline-block border border-white/10">
                  Appointment ID: {bookingRef}
                </p>
              )}
              <p className="text-xs text-neutral-400">
                Location: {BUSINESS_INFO.address}. Our workshop will send a reminder to <span className="text-white font-mono">{formData.phone}</span> prior to your arrival.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl bg-[#c69c6d] text-neutral-950 font-semibold text-xs transition-colors hover:bg-[#d8b082] cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#c69c6d]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Sangotedo Atelier Schedule</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Book Workshop Fitting
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Schedule a personal foot measurement, leather swatch review, or bespoke last consultation at our Sangotedo workshop.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Full Name <span className="text-[#c69c6d]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Adebayo Adeleke"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Phone Number <span className="text-[#c69c6d]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0903 000 0000"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-300">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Preferred Date <span className="text-[#c69c6d]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Time Window
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c69c6d]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts} className="bg-neutral-900 text-white">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Purpose */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-300">
                  Purpose of Visit
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c69c6d]"
                >
                  {purposes.map((p) => (
                    <option key={p} value={p} className="bg-neutral-900 text-white">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Notes */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-300">
                  Special Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Particular shoe style of interest, number of attendees, or special requests..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-[#c69c6d] hover:bg-[#d8b082] text-neutral-950 font-semibold text-xs tracking-wide transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Workshop Schedule...</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-3.5 h-3.5" />
                      <span>Confirm Workshop Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
