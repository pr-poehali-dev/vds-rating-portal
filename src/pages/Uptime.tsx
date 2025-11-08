import { Header } from '@/components/providers/Header';
import { UptimeChart } from '@/components/providers/UptimeChart';
import { MethodologySection } from '@/components/providers/MethodologySection';
import { Footer } from '@/components/providers/Footer';
import { providers } from '@/data/providers';

const Uptime = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <UptimeChart providers={providers} />
      <MethodologySection />
      <Footer />
    </div>
  );
};

export default Uptime;