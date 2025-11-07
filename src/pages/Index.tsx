import { Header } from '@/components/providers/Header';
import { HeroSection } from '@/components/providers/HeroSection';
import { ProvidersSection } from '@/components/providers/ProvidersSection';
import { GuideSection } from '@/components/providers/GuideSection';
import { ContactForm } from '@/components/contact/ContactForm';
import { Footer } from '@/components/providers/Footer';
import { providers } from '@/data/providers';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProvidersSection providers={providers} />
      <GuideSection />
      <section id="contact" className="py-16 bg-accent/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;