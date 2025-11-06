import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    fetchPendingReviews();
  }, []);

  const handleReviewAction = async (reviewId: number, action: 'approve' | 'reject' | 'delete') => {
    setProcessingId(reviewId);
    try {
      const response = await fetch('https://functions.poehali.dev/15bd2bf9-a831-4ef9-9ce3-fd6c7823ddc8', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review_id: reviewId,
          action: action,
        }),
      });

      if (response.ok) {
        setPendingReviews(pendingReviews.filter(r => r.id !== reviewId));
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Модерация отзывов</h1>
            <p className="text-muted-foreground">Управление отзывами пользователей</p>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2"
          >
            <Icon name="Home" size={18} />
            На главную
          </Button>
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
