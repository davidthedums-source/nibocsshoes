import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedShoes } from './components/FeaturedShoes';
import { AtelierStudio } from './components/AtelierStudio';
import { Craftsmanship } from './components/Craftsmanship';
import { CustomShoes } from './components/CustomShoes';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { WhyLibocs } from './components/WhyLibocs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { OrderModal } from './components/OrderModal';
import { LightboxModal } from './components/LightboxModal';
import { AtelierDatabaseModal } from './components/AtelierDatabaseModal';
import { ScheduleAppointmentModal } from './components/ScheduleAppointmentModal';
import { AuthProvider } from './firebase/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ShoeCraftBackground } from './components/ShoeCraftBackground';
import { ShoeProduct, GalleryItem } from './data/footwearData';
import { MessageCircle } from 'lucide-react';

function AtelierApp() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<ShoeProduct | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderProductName, setOrderProductName] = useState('');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [databaseModalOpen, setDatabaseModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  // Active section intersection observer
  useEffect(() => {
    const sectionIds = ['home', 'about', 'shoes', 'studio', 'craftsmanship', 'custom-shoes', 'services', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOrderModal = (productName = '') => {
    setOrderProductName(productName);
    setOrderModalOpen(true);
  };

  return (
    <div className={`min-h-screen relative font-sans selection:bg-[#c69c6d] selection:text-black transition-colors duration-500 ${
      theme === 'dark' ? 'text-[#f4f4f5]' : 'text-stone-900'
    }`}>
      {/* Live Animated Background for all sections */}
      <ShoeCraftBackground />

      {/* Main Layer with transparent backdrops */}
      <div className="relative z-10">
        {/* Top Sticky Navigation */}
        <Navbar
          activeSection={activeSection}
          onOpenOrderModal={handleOpenOrderModal}
          onOpenDatabase={() => setDatabaseModalOpen(true)}
          onOpenAppointment={() => setAppointmentModalOpen(true)}
        />

        <main>
          {/* 03 — Hero Section */}
          <Hero
            onExploreClick={() => handleScrollTo('shoes')}
            onContactClick={() => handleScrollTo('contact')}
          />

          {/* 08 — About NIBOCS SHOE (Editorial-style) */}
          <About />

          {/* 05 — Featured Shoes Showcase */}
          <FeaturedShoes
            onSelectProduct={(product) => setSelectedProduct(product)}
            onOrderProduct={(name) => handleOpenOrderModal(name)}
          />

          {/* Figma & Stripe Interactive Atelier Studio */}
          <AtelierStudio
            onCommissionSpec={(spec) => handleOpenOrderModal(spec)}
          />

          {/* 06 — Craftsmanship (From Material to Masterpiece) */}
          <Craftsmanship />

          {/* 07 — Custom Shoes Section */}
          <CustomShoes
            onRequestCustom={() => handleOpenOrderModal('Custom Bespoke Commission')}
          />

          {/* 09 — Services */}
          <Services
            onSelectService={(serviceTitle) => handleOpenOrderModal(`Service: ${serviceTitle}`)}
          />

          {/* 10 — Gallery */}
          <Gallery
            onOpenLightbox={(item) => setLightboxItem(item)}
          />

          {/* 11 — Why NIBOCS SHOE */}
          <WhyLibocs />

          {/* 12 — Contact Section with Map & Appointment Booking */}
          <Contact
            onOpenScheduleAppointment={() => setAppointmentModalOpen(true)}
          />
        </main>

        {/* 13 — Footer */}
        <Footer
          onOpenOrderModal={() => handleOpenOrderModal()}
          onOpenDatabase={() => setDatabaseModalOpen(true)}
        />

        {/* Floating WhatsApp Action */}
        <div className="fixed bottom-6 right-6 z-30">
          <a
            href="https://wa.me/2349037880988?text=Hello%20NIBOCS%20SHOE%2C%20I%20would%20like%20to%20inquire%20about%20your%20footwear."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group flex items-center gap-2 p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-neutral-950 font-semibold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="hidden sm:inline font-bold">Chat with NIBOCS</span>
          </a>
        </div>

        {/* Modals */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrder={(productName) => handleOpenOrderModal(productName)}
        />

        <OrderModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          preselectedProduct={orderProductName}
        />

        <LightboxModal
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />

        {/* Atelier Database Management Modal */}
        <AtelierDatabaseModal
          isOpen={databaseModalOpen}
          onClose={() => setDatabaseModalOpen(false)}
        />

        {/* Schedule Workshop Appointment Modal */}
        <ScheduleAppointmentModal
          isOpen={appointmentModalOpen}
          onClose={() => setAppointmentModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AtelierApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
