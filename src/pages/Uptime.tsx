import { useEffect, useState } from 'react';
import { Header } from '@/components/providers/Header';
import { UptimeChart } from '@/components/providers/UptimeChart';
import { MethodologySection } from '@/components/providers/MethodologySection';
import { Footer } from '@/components/providers/Footer';
import { providers } from '@/data/providers';

const Uptime = () => {
  const [lastCheckTime, setLastCheckTime] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    const checkUptime = async () => {
      setIsChecking(true);
      try {
        const providersToCheck = providers
          .filter(p => p.url)
          .map(p => ({ id: p.id, url: p.url! }));

        await fetch('https://functions.poehali.dev/cb148476-2d49-4e4f-8a7e-f1e399493259', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ providers: providersToCheck }),
        });

        setLastCheckTime(new Date().toLocaleTimeString('ru-RU'));
      } catch (error) {
        console.error('Ошибка проверки аптайма:', error);
      } finally {
        setIsChecking(false);
      }
    };

    const interval = setInterval(checkUptime, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <UptimeChart providers={providers} lastCheckTime={lastCheckTime} isChecking={isChecking} />
      <MethodologySection />
      <Footer />
    </div>
  );
};

export default Uptime;