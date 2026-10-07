import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Amenities } from './components/Amenities';
import { Apartments } from './components/Apartments';
import { Restaurant } from './components/Restaurant';
import { Services } from './components/Services';
import { Group } from './components/Group';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppFab } from './components/WhatsAppFab';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollReset } from './components/ScrollReset';
import { ApartmentsPage } from './pages/ApartmentsPage';

function MobileBookingBar() {
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  return (
    <div className="lg:hidden px-4 py-5 bg-white border-b border-slate-100">
      <button
        onClick={() => openBooking()}
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs uppercase tracking-[1.5px] px-5 py-4 flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        {t('hero.check')}
      </button>
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <MobileBookingBar />
      <About />
      <Amenities />
      <Apartments />
      <Restaurant />
      <Services />
      <Group />
      <Contact />
    </main>
  );
}

export function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ScrollReset />
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-sand-200 selection:text-brand-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/appartements" element={<ApartmentsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Footer />
          <ScrollToTop />
          <WhatsAppFab />
          <BookingModal />
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
}
