import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface VisitorStats {
  total_unique_visitors: number;
  period_unique_visitors: number;
  daily_stats: { date: string; visitors: number }[];
}

interface ClickStats {
  provider_id: number;
  clicks: number;
  first_click: string | null;
  last_click: string | null;
}

interface VisitorStatsSectionProps {
  visitorStats: VisitorStats | null;
  isLoadingVisitors: boolean;
  isLoadingStats: boolean;
  clickStats: ClickStats[];
  period: '1' | '7' | '30';
}

export const VisitorStatsSection = ({
  visitorStats,
  isLoadingVisitors,
  isLoadingStats,
  clickStats,
  period
}: VisitorStatsSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Users" size={24} className="text-primary" />
        Уникальные посетители сайта
      </h2>
      {isLoadingVisitors ? (
        <div className="flex items-center justify-center py-8">
          <Icon name="Loader2" size={32} className="animate-spin text-primary" />
        </div>
      ) : visitorStats ? (
        <>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="Globe" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Всего</div>
                    <div className="text-2xl font-black text-primary">{visitorStats.total_unique_visitors}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">За всё время</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-secondary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">За период</div>
                    <div className="text-2xl font-black text-secondary">{visitorStats.period_unique_visitors}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {period === '1' ? 'За последние 24 часа' : period === '7' ? 'За последние 7 дней' : 'За последние 30 дней'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="Activity" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Средний рост</div>
                    <div className="text-2xl font-black text-primary">
                      {visitorStats.daily_stats.length > 0 
                        ? Math.round(visitorStats.period_unique_visitors / visitorStats.daily_stats.length)
                        : 0}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Новых в день</p>
              </CardContent>
            </Card>
          </div>

          {!isLoadingStats && (
            <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-orange-500/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                      <Icon name="Target" size={32} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        Конверсия посетителей в переходы
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-black text-orange-500">
                          {visitorStats.period_unique_visitors > 0
                            ? ((clickStats.reduce((sum, s) => sum + s.clicks, 0) / visitorStats.period_unique_visitors) * 100).toFixed(1)
                            : '0.0'}%
                        </span>
                        <div className="text-sm text-muted-foreground">
                          <div>{clickStats.reduce((sum, s) => sum + s.clicks, 0)} переходов</div>
                          <div>из {visitorStats.period_unique_visitors} посетителей</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-2">Качество трафика</div>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const conversion = visitorStats.period_unique_visitors > 0
                          ? (clickStats.reduce((sum, s) => sum + s.clicks, 0) / visitorStats.period_unique_visitors) * 100
                          : 0;
                        if (conversion >= 10) {
                          return (
                            <>
                              <Icon name="TrendingUp" size={20} className="text-secondary" />
                              <span className="text-sm font-bold text-secondary">Отличная</span>
                            </>
                          );
                        } else if (conversion >= 5) {
                          return (
                            <>
                              <Icon name="Minus" size={20} className="text-primary" />
                              <span className="text-sm font-bold text-primary">Хорошая</span>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <Icon name="TrendingDown" size={20} className="text-orange-500" />
                              <span className="text-sm font-bold text-orange-500">Низкая</span>
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : null}
    </div>
  );
};
