import { useState } from 'react';
import { Provider } from './types';
import Icon from '@/components/ui/icon';

interface UptimeChartProps {
  providers: Provider[];
  lastCheckTime?: string;
}

export const UptimeChart = ({ providers, lastCheckTime }: UptimeChartProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const providersWithUptime = providers
    .filter(p => p.uptime30days !== undefined)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (b.uptime30days || 0) - (a.uptime30days || 0));

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.95) return 'rgb(249, 115, 22)';
    if (uptime >= 99.9) return 'rgb(251, 146, 60)';
    if (uptime >= 99.5) return 'rgb(253, 186, 116)';
    return 'rgb(239, 68, 68)';
  };

  const getDowntimeMinutes = (uptime: number) => {
    const totalMinutes = 30 * 24 * 60;
    const uptimeMinutes = (totalMinutes * uptime) / 100;
    const downtimeMinutes = totalMinutes - uptimeMinutes;
    
    if (downtimeMinutes < 1) return '< 1 мин';
    if (downtimeMinutes < 60) return `${Math.round(downtimeMinutes)} мин`;
    return `${Math.round(downtimeMinutes / 60)} ч`;
  };

  const trackClick = async (providerId: number) => {
    try {
      await fetch('https://functions.poehali.dev/d0b8e2ce-45c2-4ab9-8d08-baf03c0268f4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider_id: providerId,
        }),
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleProviderClick = async (provider: Provider) => {
    if (provider.url) {
      trackClick(provider.id);
      window.location.href = provider.url;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-accent border border-orange-500/30 rounded-full px-5 py-2.5">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-orange-600">Мониторинг доступности</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
              Uptime провайдеров за 30 дней
            </h2>
            <p className="text-xl text-muted-foreground">
              Реальная статистика доступности серверов
            </p>
          </div>

          {/* Компактный список провайдеров */}
          <div className="bg-gradient-to-br from-card via-card to-accent/20 border-2 border-border rounded-3xl p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Топ провайдеров по Uptime</h3>
                {lastCheckTime && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Последняя проверка: {lastCheckTime}
                  </p>
                )}
              </div>
              
              <div className="relative w-full sm:w-80">
                <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Найти провайдера..."
                  className="w-full pl-12 pr-12 h-12 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm text-foreground placeholder:text-muted-foreground font-semibold hover:border-primary/50 hover:shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-accent rounded-lg transition-colors"
                  >
                    <Icon name="X" size={18} className="text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {providersWithUptime.map((provider, index) => {
                const uptime = provider.uptime30days || 0;
                const downtimeText = getDowntimeMinutes(uptime);
                
                return (
                  <div 
                    key={provider.id} 
                    className="group bg-background border border-border rounded-xl p-4 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-white border border-primary/10 flex items-center justify-center">
                          <img 
                            src={provider.logo} 
                            alt={provider.name} 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <button
                            onClick={() => handleProviderClick(provider)}
                            className="font-bold text-foreground truncate hover:text-primary transition-colors flex items-center gap-1 group/name"
                          >
                            {provider.name}
                            <Icon name="ExternalLink" size={14} className="opacity-0 group-hover/name:opacity-100 transition-opacity" />
                          </button>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Простой: {downtimeText}</span>
                            <span>•</span>
                            <span>SLA: {provider.serviceGuarantees.uptimeSLA}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-black text-foreground">
                          {uptime.toFixed(2)}%
                        </div>
                        {index < 3 && (
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">#{index + 1}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                  <span className="text-xs font-bold text-muted-foreground">≥ 99.95%</span>
                </div>
                <div className="text-sm text-foreground">Отличный</div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400"></div>
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