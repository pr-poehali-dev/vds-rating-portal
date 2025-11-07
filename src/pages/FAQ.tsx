import { Header } from '@/components/providers/Header';
import { FAQSection } from '@/components/providers/FAQSection';
import { Footer } from '@/components/providers/Footer';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default FAQ;
