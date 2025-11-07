import { Header } from '@/components/providers/Header';
import { PrivacySection } from '@/components/privacy/PrivacySection';
import { Footer } from '@/components/providers/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrivacySection />
      <Footer />
    </div>
  );
};

export default Privacy;
