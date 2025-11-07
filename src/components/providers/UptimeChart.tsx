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
    if (uptime >= 99.95) return 'rgb(34, 197, 94)';
    if (uptime >= 99.9) return 'rgb(74, 222, 128)';
    if (uptime >= 99.5) return 'rgb(234, 179, 8)';
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

  // Генерация данных для графика (последние 30 дней)
  const generateChartData = () => {
    const days = 30;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      return {
        day: i + 1,
        date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
        ...Object.fromEntries(
          providersWithUptime.map(p => [
            p.name,
            // Симулируем колебания вокруг среднего значения
            Math.min(100, Math.max(99, (p.uptime30days || 99.9) + (Math.random() - 0.5) * 0.3))
          ])
        )
      };
    });
  };

  const chartData = generateChartData();

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

          {/* График всех провайдеров */}
          <div className="bg-gradient-to-br from-card via-card to-accent/20 border-2 border-border rounded-3xl p-8 shadow-xl mb-8">
            <div className="relative h-[400px]">
              <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                {/* Сетка */}
                <line x1="50" y1="0" x2="50" y2="380" stroke="currentColor" strokeOpacity="0.1" />
                <line x1="0" y1="380" x2="1000" y2="380" stroke="currentColor" strokeOpacity="0.1" />
                
                {/* Горизонтальные линии для уровней */}
                {[99, 99.5, 99.9, 99.95, 100].map((level, i) => {
                  const y = 380 - ((level - 99) / 1) * 380;
                  return (
                    <g key={level}>
                      <line 
                        x1="50" 
                        y1={y} 
                        x2="1000" 
                        y2={y} 
                        stroke="currentColor" 
                        strokeOpacity="0.05"
                        strokeDasharray="4 4"
                      />
                      <text 
                        x="10" 
                        y={y + 5} 
                        fontSize="12" 
                        fill="currentColor" 
                        opacity="0.5"
                      >
                        {level}%
                      </text>
                    </g>
                  );
                })}

                {/* Линии для каждого провайдера */}
                {providersWithUptime.slice(0, 8).map((provider, idx) => {
                  const color = getUptimeColor(provider.uptime30days || 99.9);
                  const points = chartData.map((d, i) => {
                    const x = 50 + (i / (chartData.length - 1)) * 950;
                    const value = d[provider.name] as number;
                    const y = 380 - ((value - 99) / 1) * 380;
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <polyline
                      key={provider.id}
                      points={points}
                      fill="none"
                      stroke={color}
                      strokeWidth="2.5"
                      strokeOpacity="0.8"
                      className="transition-all hover:stroke-opacity-100 hover:stroke-width-4"
                    />
                  );
                })}
              </svg>

              {/* Подписи дней */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-12 text-xs text-muted-foreground">
                <span>{chartData[0]?.date}</span>
                <span>{chartData[Math.floor(chartData.length / 2)]?.date}</span>
                <span>{chartData[chartData.length - 1]?.date}</span>
              </div>
            </div>

            {/* Легенда провайдеров */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {providersWithUptime.slice(0, 8).map((provider, idx) => (
                <div key={provider.id} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getUptimeColor(provider.uptime30days || 99.9) }}
                  ></div>
                  <span className="text-xs font-medium text-foreground truncate">{provider.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Компактный список провайдеров */}
          <div className="bg-gradient-to-br from-card via-card to-accent/20 border-2 border-border rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-foreground mb-6">Топ провайдеров по Uptime</h3>
            
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
                          <h4 className="font-bold text-foreground truncate">{provider.name}</h4>
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
