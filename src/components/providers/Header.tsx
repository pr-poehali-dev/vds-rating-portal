import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const Header = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-card/60 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-2xl blur-xl opacity-50 shadow-neon"></div>
              <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                <Icon name="Zap" className="text-background" size={22} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">top-vds</h1>
              <p className="text-xs text-muted-foreground font-medium">Топ хостингов</p>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/uptime" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
              <Icon name="Activity" size={14} />
              Аптайм
            </a>
            <a 
              href="#compare" 
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const providersSection = document.querySelector('[id="providers"]');
                if (providersSection) {
                  providersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    const compareButton = document.querySelector('[class*="Сравнить"]') as HTMLElement;
                    if (compareButton) {
                      compareButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 500);
                }
              }}
            >
              Сравнение
            </a>
            <Button className="bg-primary text-background font-bold shadow-lg shadow-primary/30 hover:shadow-neon transition-all">
              Начать
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};