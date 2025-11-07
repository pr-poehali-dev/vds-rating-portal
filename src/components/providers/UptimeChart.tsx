import { Provider } from './types';
import Icon from '@/components/ui/icon';

interface UptimeChartProps {
  providers: Provider[];
}

export const UptimeChart = ({ providers }: UptimeChartProps) => {
  const providersWithUptime = providers
    .filter(p => p.uptime30days !== undefined)
    .sort((a, b) => (b.uptime30days || 0) - (a.uptime30days || 0));

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.95) return 'bg-green-500';
    if (uptime >= 99.9) return 'bg-green-400';
    if (uptime >= 99.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getUptimeGradient = (uptime: number) => {
    if (uptime >= 99.95) return 'from-green-500 to-green-600';
    if (uptime >= 99.9) return 'from-green-400 to-green-500';
    if (uptime >= 99.5) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  const getDowntimeMinutes = (uptime: number) => {
    const totalMinutes = 30 * 24 * 60;
    const uptimeMinutes = (totalMinutes * uptime) / 100;
    const downtimeMinutes = totalMinutes - uptimeMinutes;
    
    if (downtimeMinutes < 1) return '< 1 мин';
    if (downtimeMinutes < 60) return `${Math.round(downtimeMinutes)} мин`;
    return `${Math.round(downtimeMinutes / 60)} ч`;
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-accent border border-green-500/30 rounded-full px-5 py-2.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-green-600">Мониторинг доступности</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
              Uptime провайдеров за 30 дней
            </h2>
            <p className="text-xl text-muted-foreground">
              Реальная статистика доступности серверов
            </p>
          </div>

          <div className="bg-gradient-to-br from-card via-card to-accent/20 border-2 border-border rounded-3xl p-8 shadow-xl">
            <div className="space-y-4">
              {providersWithUptime.map((provider, index) => {
                const uptime = provider.uptime30days || 0;
                const downtimeText = getDowntimeMinutes(uptime);
                
                return (
                  <div 
                    key={provider.id} 
                    className="group bg-background border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-white border border-primary/10 flex items-center justify-center">
                          <img 
                            src={provider.logo} 
                            alt={provider.name} 
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-foreground mb-1">{provider.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="Clock" size={14} className="text-primary" />
                              <span>Простой: {downtimeText}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="TrendingUp" size={14} className="text-green-500" />
                              <span>SLA: {provider.serviceGuarantees.uptimeSLA}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 text-right">
                        <div className="text-3xl font-black text-foreground mb-1">
                          {uptime.toFixed(2)}%
                        </div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${
                          index === 0 ? 'bg-green-500/20 text-green-600' : 'bg-accent text-muted-foreground'
                        }`}>
                          {index === 0 && <Icon name="Trophy" size={12} />}
                          <span className="text-xs font-bold">
                            {index === 0 ? 'Лучший' : `#${index + 1}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${getUptimeGradient(uptime)} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                        style={{ width: `${uptime}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className="font-semibold">99.9%</span>
                      <span>100%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs font-bold text-muted-foreground">≥ 99.95%</span>
                </div>
                <div className="text-sm text-foreground">Отличный</div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs font-bold text-muted-foreground">≥ 99.9%</span>
                </div>
                <div className="text-sm text-foreground">Хороший</div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs font-bold text-muted-foreground">≥ 99.5%</span>
                </div>
                <div className="text-sm text-foreground">Средний</div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs font-bold text-muted-foreground">&lt; 99.5%</span>
                </div>
                <div className="text-sm text-foreground">Низкий</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};