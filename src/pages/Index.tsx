import { Header } from '@/components/providers/Header';
import { HeroSection } from '@/components/providers/HeroSection';
import { ProvidersSection } from '@/components/providers/ProvidersSection';
import { GuideSection } from '@/components/providers/GuideSection';
import { Footer } from '@/components/providers/Footer';
import { providers } from '@/data/providers';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProvidersSection providers={providers} />
      <GuideSection />
      <Footer />
    </div>
  );
};

export default Index;