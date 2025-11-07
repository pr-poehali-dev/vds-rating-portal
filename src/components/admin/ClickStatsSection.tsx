import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { providers } from '@/data/providers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ClickStats {
  provider_id: number;
  clicks: number;
  first_click: string | null;
  last_click: string | null;
}

interface DailyStats {
  provider_id: number;
  date: string;
  clicks: number;
}

interface ClickStatsSectionProps {
  clickStats: ClickStats[];
  isLoadingStats: boolean;
  dailyStats: DailyStats[];
  isLoadingDaily: boolean;
  period: '1' | '7' | '30';
  onPeriodChange: (period: '1' | '7' | '30') => void;
}

export const ClickStatsSection = ({
  clickStats,
  isLoadingStats,
  dailyStats,
  isLoadingDaily,
  period,
  onPeriodChange
}: ClickStatsSectionProps) => {
  const getProviderName = (providerId: number) => {
    const provider = providers.find(p => p.id === providerId);
    return provider?.name || `Provider #${providerId}`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Icon name="MousePointerClick" size={24} className="text-primary" />
          Статистика переходов на сайты провайдеров
        </h2>
        {!isLoadingStats && (
          <div className="bg-primary/10 border-2 border-primary/30 rounded-xl px-6 py-3">
            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Всего переходов</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-primary">
                {clickStats.reduce((sum, s) => sum + s.clicks, 0)}
              </span>
              <span className="text-sm text-muted-foreground">
                {(() => {
                  const total = clickStats.reduce((sum, s) => sum + s.clicks, 0);
                  return total === 1 ? 'переход' : total < 5 ? 'перехода' : 'переходов';
                })()}
              </span>
            </div>
          </div>
        )}
      </div>
      {isLoadingStats ? (
        <div className="flex items-center justify-center py-8">
          <Icon name="Loader2" size={32} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {clickStats.map((stat) => {
            const totalClicks = clickStats.reduce((sum, s) => sum + s.clicks, 0);
            const percentage = totalClicks > 0 ? ((stat.clicks / totalClicks) * 100).toFixed(1) : '0';
            
            return (
              <Card key={stat.provider_id} className="border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-foreground">{getProviderName(stat.provider_id)}</h3>
                    <Badge className="bg-primary/10 text-primary border-primary/30">
                      {percentage}%
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-black text-primary">{stat.clicks}</span>
                    <span className="text-sm text-muted-foreground">
                      {stat.clicks === 1 ? 'переход' : stat.clicks < 5 ? 'перехода' : 'переходов'}
                    </span>
                  </div>
                  {stat.last_click && (
                    <div className="text-xs text-muted-foreground">
                      Последний: {new Date(stat.last_click).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            Динамика переходов
          </h3>
          <div className="flex gap-2">
            <Button
              variant={period === '1' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPeriodChange('1')}
              className="font-semibold"
            >
              День
            </Button>
            <Button
              variant={period === '7' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPeriodChange('7')}
              className="font-semibold"
            >
              Неделя
            </Button>
            <Button
              variant={period === '30' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPeriodChange('30')}
              className="font-semibold"
            >
              Месяц
            </Button>
          </div>
        </div>
        {isLoadingDaily ? (
          <div className="flex items-center justify-center py-8">
            <Icon name="Loader2" size={32} className="animate-spin text-primary" />
          </div>
        ) : (
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={(() => {
                    const dateMap = new Map<string, any>();
                    
                    dailyStats.forEach(stat => {
                      if (!dateMap.has(stat.date)) {
                        dateMap.set(stat.date, { date: stat.date });
                      }
                      const providerName = getProviderName(stat.provider_id);
                      dateMap.get(stat.date)![providerName] = stat.clicks;
                    });
                    
                    return Array.from(dateMap.values()).sort((a, b) => 
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                    ).map(item => ({
                      ...item,
                      date: new Date(item.date).toLocaleDateString('ru-RU', { 
                        day: '2-digit', 
                        month: '2-digit' 
                      })
                    }));
                  })()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  {providers.map((provider, idx) => (
                    <Line
                      key={provider.id}
                      type="monotone"
                      dataKey={provider.name}
                      stroke={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][idx % 4]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
