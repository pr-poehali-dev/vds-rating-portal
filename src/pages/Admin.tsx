import { useState, useEffect, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { providers } from '@/data/providers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Review {
  id: number;
  provider_id: number;
  author: string;
  text: string;
  rating: number;
  date: string;
}

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

interface VisitorStats {
  total_unique_visitors: number;
  period_unique_visitors: number;
  daily_stats: { date: string; visitors: number }[];
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [clickStats, setClickStats] = useState<ClickStats[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [isLoadingDaily, setIsLoadingDaily] = useState(true);
  const [period, setPeriod] = useState<'1' | '7' | '30'>('30');
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(true);

  const fetchPendingReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/15bd2bf9-a831-4ef9-9ce3-fd6c7823ddc8?status=pending');
      if (response.ok) {
        const data = await response.json();
        setPendingReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClickStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await fetch('https://functions.poehali.dev/d0b8e2ce-45c2-4ab9-8d08-baf03c0268f4');
      if (response.ok) {
        const data = await response.json();
        setClickStats(data.stats || []);
      }
    } catch (error) {
      console.error('Error fetching click stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchDailyStats = async (days: string = '30') => {
    setIsLoadingDaily(true);
    try {
      const response = await fetch(`https://functions.poehali.dev/d0b8e2ce-45c2-4ab9-8d08-baf03c0268f4?view=daily&period=${days}`);
      if (response.ok) {
        const data = await response.json();
        setDailyStats(data.daily_stats || []);
      }
    } catch (error) {
      console.error('Error fetching daily stats:', error);
    } finally {
      setIsLoadingDaily(false);
    }
  };

  const fetchVisitorStats = async (days: string = '30') => {
    setIsLoadingVisitors(true);
    try {
      const response = await fetch(`https://functions.poehali.dev/94b30990-d971-403f-a237-849453d2ec73?period=${days}`);
      if (response.ok) {
        const data = await response.json();
        setVisitorStats(data);
      }
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
    } finally {
      setIsLoadingVisitors(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      verifyToken(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/ccab6b74-68f9-4520-ad0e-701c27393f9d', {
        method: 'GET',
        headers: {
          'X-Auth-Token': token,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchPendingReviews();
        fetchClickStats();
        fetchDailyStats(period);
        fetchVisitorStats(period);
      } else {
        localStorage.removeItem('admin_token');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      localStorage.removeItem('admin_token');
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const response = await fetch('https://functions.poehali.dev/ccab6b74-68f9-4520-ad0e-701c27393f9d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        setPassword('');
        fetchPendingReviews();
        fetchClickStats();
        fetchDailyStats(period);
        fetchVisitorStats(period);
      } else {
        setAuthError(data.error || 'Неверные учётные данные');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setAuthError('Ошибка подключения к серверу');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
    setPassword('');
    setUsername('admin');
  };

  const handleReviewAction = async (reviewId: number, action: 'approve' | 'reject' | 'delete') => {
    setProcessingId(reviewId);
    const token = localStorage.getItem('admin_token');
    
    try {
      const response = await fetch('https://functions.poehali.dev/15bd2bf9-a831-4ef9-9ce3-fd6c7823ddc8', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || '',
        },
        body: JSON.stringify({
          review_id: reviewId,
          action: action,
        }),
      });

      if (response.ok) {
        setPendingReviews(pendingReviews.filter(r => r.id !== reviewId));
      } else if (response.status === 401) {
        localStorage.removeItem('admin_token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error processing review:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const getProviderName = (providerId: number) => {
    const provider = providers.find(p => p.id === providerId);
    return provider?.name || `Provider #${providerId}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Вход в админ-панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Имя пользователя
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите имя пользователя"
                  required
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Пароль
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  className="h-11"
                />
                {authError && (
                  <p className="text-sm text-destructive mt-2">{authError}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isAuthenticating}
                className="w-full h-11 font-bold bg-primary text-background disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full h-11"
              >
                <Icon name="Home" size={16} className="mr-2" />
                На главную
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Админ-панель</h1>
            <p className="text-muted-foreground">Управление отзывами и статистика</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive/10"
            >
              <Icon name="LogOut" size={18} />
              Выйти
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
            >
              <Icon name="Home" size={18} />
              На главную
            </Button>
          </div>
        </div>

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
                  onClick={() => {
                    setPeriod('1');
                    fetchDailyStats('1');
                    fetchVisitorStats('1');
                  }}
                  className="font-semibold"
                >
                  День
                </Button>
                <Button
                  variant={period === '7' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setPeriod('7');
                    fetchDailyStats('7');
                    fetchVisitorStats('7');
                  }}
                  className="font-semibold"
                >
                  Неделя
                </Button>
                <Button
                  variant={period === '30' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setPeriod('30');
                    fetchDailyStats('30');
                    fetchVisitorStats('30');
                  }}
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

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="MessageSquare" size={24} className="text-primary" />
          Модерация отзывов
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Icon name="Loader2" size={40} className="animate-spin text-primary" />
          </div>
        ) : pendingReviews.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Icon name="CheckCircle" size={48} className="text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Нет отзывов на модерации</h3>
                <p className="text-muted-foreground">Все отзывы обработаны</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pendingReviews.map((review) => (
              <Card key={review.id} className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{review.author}</CardTitle>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-accent border border-primary/20 text-foreground">
                          {getProviderName(review.provider_id)}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={i < review.rating ? "fill-primary text-primary" : "text-muted"}
                            />
                          ))}
                        </div>
                        <Badge variant="outline" className="border-orange-500 text-orange-500">
                          На модерации
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed mb-6">{review.text}</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleReviewAction(review.id, 'approve')}
                      disabled={processingId === review.id}
                      className="flex-1 bg-secondary text-background hover:bg-secondary/90"
                    >
                      {processingId === review.id ? (
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      ) : (
                        <Icon name="CheckCircle" size={16} className="mr-2" />
                      )}
                      Одобрить
                    </Button>
                    <Button
                      onClick={() => handleReviewAction(review.id, 'reject')}
                      disabled={processingId === review.id}
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                    >
                      {processingId === review.id ? (
                        <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      ) : (
                        <Icon name="XCircle" size={16} className="mr-2" />
                      )}
                      Отклонить
                    </Button>
                    <Button
                      onClick={() => handleReviewAction(review.id, 'delete')}
                      disabled={processingId === review.id}
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      {processingId === review.id ? (
                        <Icon name="Loader2" size={16} className="animate-spin" />
                      ) : (
                        <Icon name="Trash2" size={16} />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;