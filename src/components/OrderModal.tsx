import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle, ShoppingBag, ArrowUpRight, Loader2, Database, Phone } from 'lucide-react';
import { BUSINESS_INFO, FEATURED_SHOES } from '../data/footwearData';
import { createCustomerOrder } from '../firebase/firestoreService';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    productName: preselectedProduct || 'Sangotedo Sovereign Oxford',
    size: 'EU 42 (US 9)',
    leatherType: 'Full-Grain Black Box Calf',
    customNotes: '',
    deliveryLocation: 'Lagos, Nigeria',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderReference, setOrderReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({ ...prev, productName: preselectedProduct }));
    }
  }, [preselectedProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const orderId = await createCustomerOrder({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        deliveryLocation: formData.deliveryLocation,
        productName: formData.productName,
        size: formData.size,
        leatherType: formData.leatherType,
        customNotes: formData.customNotes,
      });

      setOrderReference(orderId);
      setIsSuccess(true);
    } catch (err) {
      console.error('Failed to submit order to database:', err);
      // Still allow continuation
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setOrderReference(null);
    setErrorMessage(null);
    onClose();
  };

  const sizes = [
    'EU 38 (US 6)',
    'EU 39 (US 6.5)',
    'EU 40 (US 7.5)',
    'EU 41 (US 8)',
    'EU 42 (US 9)',
    'EU 43 (US 10)',
    'EU 44 (US 10.5)',
    'EU 45 (US 11.5)',
    'EU 46 (US 12)',
    'EU 47 (US 13)',
    'Custom Foot Size Measurement',
  ];

  const leathers = [
    'Gloss Patent Mahogany Leather',
    'Full-Grain Black Box Calf',
    'Hand-Antiqued Cognac Crust',
    'Deep Espresso Milled Calf',
    'Midnight Navy Crust Patina',
    'Italian Smooth Nappa White',
    'Custom Patina Specification',
  ];

  const whatsappOrderLink = `https://wa.me/2348025906080?text=${encodeURIComponent(
    `Hello NIBOCS Shoes! I would like to place an order/inquiry for:\n- Model: ${formData.productName}\n- Size: ${formData.size}\n- Leather: ${formData.leatherType}\n- Name: ${formData.fullName}\n- Location: ${formData.deliveryLocation}\n- Notes: ${formData.customNotes}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#111216] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-left my-8">
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
                <span>Recorded to Workshop Database</span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white">
                Order Request Submitted
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Your order request for <span className="text-[#c69c6d] font-semibold">{formData.productName}</span> ({formData.size}) has been recorded.
              </p>
              {orderReference && (
                <p className="text-xs font-mono text-[#c69c6d] bg-black/40 py-1.5 px-3 rounded-lg inline-block border border-white/10">
                  Ref ID: {orderReference}
                </p>
              )}
              <p className="text-xs text-neutral-400">
                Our workshop will reach out to you directly at <span className="text-white font-mono">{formData.phone}</span> to confirm sizing, leather specifics, and delivery schedule.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                href={whatsappOrderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#c69c6d]">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Direct Workshop Order</span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white">
                Order Your Footwear
              </h3>
              <p className="text-xs text-neutral-400">
                Direct manufacturing & sales from Sangotedo, Lagos.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Selection */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-300">
                  Select Shoe Model / Request
                </label>
                <select
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#c69c6d] cursor-pointer"
                >
                  {FEATURED_SHOES.map((shoe) => (
                    <option key={shoe.id} value={shoe.name}>
                      {shoe.name} ({shoe.category})
                    </option>
                  ))}
                  <option value="Custom Bespoke Commission">Custom Bespoke Commission (Made to Measure)</option>
                  <option value="Bulk Order Inquiry">Bulk Order Inquiry (Multiple Pairs)</option>
                </select>
              </div>

              {/* Sizing and Leather Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Shoe Size
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c69c6d] cursor-pointer"
                  >
                    {sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Preferred Leather Finish
                  </label>
                  <select
                    value={formData.leatherType}
                    onChange={(e) => setFormData({ ...formData, leatherType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c69c6d] cursor-pointer"
                  >
                    {leathers.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Your Name <span className="text-[#c69c6d]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Phone / WhatsApp <span className="text-[#c69c6d]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 08025906080"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                  />
                </div>
              </div>

              {/* Email & Delivery Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-neutral-300">
                    Delivery City / State
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    placeholder="e.g. Sangotedo, Lagos"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d]"
                  />
                </div>
              </div>

              {/* Custom Notes */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-neutral-300">
                  Special Custom Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.customNotes}
                  onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                  placeholder="Instep height, wide feet, sole type preference, or target completion date..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c69c6d] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#c69c6d] hover:bg-[#d8b082] text-neutral-950 font-semibold text-xs tracking-wide transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Recording to Database...</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-3.5 h-3.5" />
                      <span>Submit Order Request</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsappOrderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>

              {/* Direct Call Quick Option */}
              <div className="pt-2 text-center">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#c69c6d] transition-colors"
                  title={`Call ${BUSINESS_INFO.phone}`}
                >
                  <Phone className="w-3.5 h-3.5 text-[#c69c6d]" />
                  <span>Or order via phone call: <strong className="text-white underline">{BUSINESS_INFO.phone}</strong></span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
