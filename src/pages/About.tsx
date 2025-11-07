import { Header } from '@/components/providers/Header';
import { AboutSection } from '@/components/about/AboutSection';
import { Footer } from '@/components/providers/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
