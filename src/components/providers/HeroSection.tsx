import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-accent border border-primary/30 rounded-full px-5 py-2.5">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-neon"></div>
            <span className="text-sm font-bold text-primary">Топ провайдеров 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight">
            <span className="block text-foreground">Найди</span>
            <span className="block gradient-text">идеальный хостинг</span>
            <span className="block text-foreground">для своего проекта</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Сравни характеристики, цены и отзывы. Выбери лучшее решение за пару минут.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="h-14 px-8 text-base font-bold bg-primary text-background shadow-xl shadow-primary/30 hover:shadow-neon transition-all group rounded-xl"
              onClick={() => {
                const providersSection = document.getElementById('providers');
                if (providersSection) {
                  providersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Посмотреть рейтинг
              <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-2 border-border rounded-xl hover:bg-accent hover:border-primary/50 transition-all">
              <Icon name="Play" size={18} className="mr-2" />
              Как выбрать
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            {[
              { icon: 'Users', value: '2,500+', label: 'Довольных клиентов' },
              { icon: 'Star', value: '4.6', label: 'Средний рейтинг' },
              { icon: 'Shield', value: '100%', label: 'Защита данных' }
            ].map((stat, idx) => (
              <div key={idx} className="group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent border border-primary/20 rounded-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-neon transition-all">
                  <Icon name={stat.icon as any} size={24} className="text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};