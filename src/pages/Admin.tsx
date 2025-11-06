import { useState, useEffect, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { providers } from '@/data/providers';

interface Review {
  id: number;
  provider_id: number;
  author: string;
  text: string;
  rating: number;
  date: string;
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Модерация отзывов</h1>
            <p className="text-muted-foreground">Управление отзывами пользователей</p>
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