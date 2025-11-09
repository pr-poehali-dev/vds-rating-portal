import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Provider } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProviderReviewsProps {
  provider: Provider;
  reviewsToShow: number;
  onLoadMoreReviews: () => void;
}

export const ProviderReviews = ({
  provider,
  reviewsToShow,
  onLoadMoreReviews
}: ProviderReviewsProps) => {
  const { t } = useLanguage();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ author: '', text: '', rating: 5 });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const avgRating = provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length;

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/15bd2bf9-a831-4ef9-9ce3-fd6c7823ddc8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider_id: provider.id,
          author: reviewForm.author,
          text: reviewForm.text,
          rating: reviewForm.rating,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setShowReviewForm(false);
        setReviewForm({ author: '', text: '', rating: 5 });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-6 border-t border-border md:col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
          <Icon name="MessageSquare" size={18} className="text-primary" />
        </div>
        <h4 className="text-base font-bold text-foreground">{t('card.reviewsTitle')}</h4>
      </div>

      <div className="bg-accent border border-primary/10 rounded-2xl p-5 mb-4">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-black text-primary mb-1">
              {avgRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i}
                  name="Star" 
                  size={14} 
                  className={i < Math.round(avgRating) ? "fill-primary text-primary" : "text-muted"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">{t('common.uptime')}</span>
          </div>

          <div className="text-center border-x border-border">
            <div className="text-3xl font-black text-foreground mb-1">
              {provider.reviews.length}
            </div>
            <Icon name="Users" size={20} className="text-primary mx-auto mb-1" />
            <span className="text-xs text-muted-foreground font-medium">{t('common.reviews')}</span>
          </div>

          <div className="text-center">
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = provider.reviews.filter(r => r.rating === star).length;
                const percentage = (count / provider.reviews.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-3">{star}</span>
                    <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-muted-foreground w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {provider.reviews.slice(0, reviewsToShow).map((review, idx) => (
          <div key={idx} className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-foreground">{review.author}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i}
                    name="Star" 
                    size={12} 
                    className={i < review.rating ? "fill-primary text-primary" : "text-muted"}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{review.text}</p>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        ))}
      </div>

      {reviewsToShow < provider.reviews.length && (
        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            className="w-full h-11 text-sm font-semibold border-2 border-border hover:bg-accent hover:border-primary/50 rounded-xl"
            onClick={onLoadMoreReviews}
          >
            {t('card.loadMoreReviews')}
            <Icon name="ChevronDown" size={18} className="ml-2" />
            <span className="ml-2 text-muted-foreground">
              ({provider.reviews.length - reviewsToShow} осталось)
            </span>
          </Button>
        </div>
      )}

      {submitSuccess && (
        <div className="mt-4 bg-secondary/20 border border-secondary rounded-xl p-4 flex items-center gap-3">
          <Icon name="CheckCircle" size={20} className="text-secondary" />
          <span className="text-sm font-medium text-foreground">Спасибо за отзыв! Он будет опубликован после модерации.</span>
        </div>
      )}

      <div className="mt-6">
        {!showReviewForm ? (
          <Button
            onClick={() => setShowReviewForm(true)}
            className="w-full h-12 text-sm font-bold bg-primary text-background hover:bg-primary/90 rounded-xl"
          >
            <Icon name="PenLine" size={18} className="mr-2" />
            Написать отзыв
          </Button>
        ) : (
          <div className="bg-accent border border-primary/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-bold text-foreground">Ваш отзыв</h5>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReviewForm(false)}
                className="h-8 w-8 p-0"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Ваше имя
                </label>
                <Input
                  value={reviewForm.author}
                  onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                  placeholder="Введите ваше имя"
                  required
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Оценка
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Icon
                        name="Star"
                        size={28}
                        className={star <= reviewForm.rating ? "fill-primary text-primary" : "text-muted hover:text-primary/50"}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Отзыв
                </label>
                <Textarea
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  placeholder="Расскажите о вашем опыте использования хостинга..."
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-11 font-bold bg-primary text-background disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                  className="h-11 px-6"
                  disabled={isSubmitting}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};