import { useState, FormEvent } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Provider, ResourceConfig } from './types';
import { 
  TechnicalSpecsSection,
  ServiceGuaranteesSection,
  AdditionalServicesSection,
  PaymentMethodsSection,
  CaseStudiesSection
} from './ProviderDetailsSections';

interface ProviderCardProps {
  provider: Provider;
  index: number;
  config: ResourceConfig;
  onUpdateConfig: (key: keyof ResourceConfig, value: number) => void;
  calculatedPrice: number;
  configOpen: boolean;
  onToggleConfig: () => void;
  showDetails: boolean;
  onToggleDetails: () => void;
  reviewsToShow: number;
  onLoadMoreReviews: () => void;
  isSelected?: boolean;
  onToggleCompare?: () => void;
}

export const ProviderCard = ({
  provider,
  index,
  config,
  onUpdateConfig,
  calculatedPrice,
  configOpen,
  onToggleConfig,
  showDetails,
  onToggleDetails,
  reviewsToShow,
  onLoadMoreReviews,
  isSelected = false,
  onToggleCompare
}: ProviderCardProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ author: '', text: '', rating: 5 });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <Card 
      className={`group border-2 transition-all duration-300 hover-lift overflow-hidden relative bg-card ${
        isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-border hover:border-primary/50'
      }`}
    >
      {onToggleCompare && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            size="sm"
            variant={isSelected ? "default" : "outline"}
            className="h-9 px-3 text-xs font-bold rounded-lg shadow-lg"
            onClick={onToggleCompare}
          >
            {isSelected ? (
              <>
                <Icon name="CheckCircle" size={14} className="mr-1.5" />
                Выбрано
              </>
            ) : (
              <>
                <Icon name="GitCompare" size={14} className="mr-1.5" />
                Сравнить
              </>
            )}
          </Button>
        </div>
      )}

      {index === 0 && (
        <div className="absolute -top-1 -left-1 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-br-2xl rounded-tl-xl blur-lg"></div>
            <div className="relative bg-primary text-background font-bold px-5 py-2.5 rounded-br-2xl rounded-tl-xl shadow-lg flex items-center gap-2">
              <Icon name="Crown" size={16} />
              Лидер рейтинга
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex items-start gap-6 flex-1">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-accent border border-primary/10 shadow-soft flex items-center justify-center">
                <img src={provider.logo} alt={provider.name} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg text-background text-sm font-bold">
                {index + 1}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{provider.name}</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const avgRating = provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length;
                    return (
                      <Icon 
                        key={i}
                        name="Star" 
                        size={16} 
                        className={i < Math.round(avgRating) ? "fill-primary text-primary" : "text-muted"}
                      />
                    );
                  })}
                </div>
                <span className="text-xl font-bold text-foreground">
                  {(provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length).toFixed(1)}
                </span>
                <span className="text-muted-foreground text-sm">из 5</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {provider.features.slice(0, 3).map((feature, idx) => (
                  <Badge key={idx} className="bg-accent border border-primary/20 text-foreground font-semibold text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} className="text-primary" />
                  <span><span className="font-semibold text-foreground">Расположение серверов:</span> {provider.locations.join(', ')}</span>
                </div>
                {provider.trialDays && (
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Gift" size={14} className="text-secondary" />
                    <span className="font-semibold text-secondary">Тестовый период: {provider.trialDays} {provider.trialDays === 1 ? 'день' : provider.trialDays < 5 ? 'дня' : 'дней'} бесплатно</span>
                  </div>
                )}
                {provider.fz152Compliant && (
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="ShieldCheck" size={14} className="text-primary" />
                    <span className="font-semibold text-foreground">152-ФЗ: {provider.fz152Level || 'Соответствует'}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="HardDrive" size={14} className="text-primary" />
                  <span className="font-semibold text-foreground">Диски: {provider.technicalSpecs.diskType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Box" size={14} className="text-primary" />
                  <span className="font-semibold text-foreground">Виртуализация: {provider.technicalSpecs.virtualization}</span>
                </div>
                {provider.popularity && (
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Users" size={14} className="text-primary" />
                    <span className="text-muted-foreground">{provider.popularity.toLocaleString('ru-RU')}+ пользователей</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-auto flex-shrink-0">
            <div className="bg-accent border-2 border-primary/20 rounded-2xl p-6 text-center">
              {provider.promoText && (
                <div className="bg-secondary/20 border border-secondary rounded-xl px-3 py-1.5 mb-3">
                  <p className="text-xs font-bold text-secondary">{provider.promoText}</p>
                </div>
              )}
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Цена</div>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-4xl md:text-5xl font-black text-primary">{calculatedPrice}</span>
                <span className="text-xl text-muted-foreground">₽/месяц</span>
              </div>
              {provider.pricingDetails.discounts && provider.pricingDetails.discounts.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground mb-1.5">Скидки:</div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {provider.pricingDetails.discounts.map((d, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary/30">
                        -{d.percent}% на {d.months} мес
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <Button 
                className="w-full h-12 text-sm font-bold bg-primary text-background shadow-lg shadow-primary/30 hover:shadow-neon transition-all group mb-3"
                onClick={() => provider.url && window.open(provider.url, '_blank')}
                disabled={!provider.url}
              >
                Перейти
                <Icon name="ExternalLink" size={16} className="ml-2" />
              </Button>
              {provider.uptime30days && (
                <div className="flex items-center justify-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                  <span className="text-muted-foreground">Uptime: {provider.uptime30days}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
        <div className="space-y-4">
          <Button 
            variant="ghost" 
            className="w-full text-sm font-semibold hover:bg-accent/50 hover:text-primary justify-between"
            onClick={onToggleConfig}
          >
            <div className="flex items-center gap-2">
              <Icon name="Settings" size={18} />
              <span>Настроить конфигурацию</span>
            </div>
            <Icon name={configOpen ? "ChevronUp" : "ChevronDown"} size={18} />
          </Button>

          {configOpen && (
            <div className="bg-accent/50 border border-primary/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="Sliders" size={20} className="text-primary" />
                  <h4 className="text-lg font-bold text-foreground">Конфигуратор ресурсов</h4>
                </div>
                <Badge className="bg-primary/20 text-primary border-0">Настрой под себя</Badge>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Cpu" size={16} className="text-primary" />
                      </div>
                      <span className="text-sm font-bold text-foreground">CPU</span>
                    </div>
                    <span className="text-lg font-black text-primary">{config.cpu} vCPU</span>
                  </div>
                  <Slider
                    value={[config.cpu]}
                    onValueChange={(value) => onUpdateConfig('cpu', value[0])}
                    min={1}
                    max={16}
                    step={1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1 vCPU</span>
                    <span>16 vCPU</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="MemoryStick" size={16} className="text-primary" />
                      </div>
                      <span className="text-sm font-bold text-foreground">RAM</span>
                    </div>
                    <span className="text-lg font-black text-primary">{config.ram} GB</span>
                  </div>
                  <Slider
                    value={[config.ram]}
                    onValueChange={(value) => onUpdateConfig('ram', value[0])}
                    min={1}
                    max={64}
                    step={1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1 GB</span>
                    <span>64 GB</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="HardDrive" size={16} className="text-primary" />
                      </div>
                      <span className="text-sm font-bold text-foreground">Диск</span>
                    </div>
                    <span className="text-lg font-black text-primary">{config.storage} GB</span>
                  </div>
                  <Slider
                    value={[config.storage]}
                    onValueChange={(value) => onUpdateConfig('storage', value[0])}
                    min={10}
                    max={500}
                    step={10}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>10 GB</span>
                    <span>500 GB</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Трафик</span>
                  <div className="flex items-center gap-2">
                    <Icon name="Wifi" size={16} className="text-secondary" />
                    <span className="text-sm font-bold text-foreground">Безлимит</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button 
            variant="ghost" 
            className="w-full text-sm font-semibold hover:bg-accent/50 hover:text-primary justify-between"
            onClick={onToggleDetails}
          >
            <div className="flex items-center gap-2">
              <Icon name={showDetails ? "ThumbsDown" : "ThumbsUp"} size={18} />
              <span>{showDetails ? "Скрыть" : "Показать"} плюсы и минусы</span>
            </div>
            <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={18} />
          </Button>

          {showDetails && (
            <div className="pt-4 border-t border-border grid md:grid-cols-2 gap-4">
              <div className="bg-accent border border-secondary/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name="Check" size={18} className="text-background" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">Преимущества</h4>
                </div>
                <ul className="space-y-2.5">
                  {provider.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Plus" size={12} className="text-background" />
                      </div>
                      <span className="text-sm text-foreground font-medium">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-accent border border-destructive/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-destructive rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name="AlertCircle" size={18} className="text-white" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">Недостатки</h4>
                </div>
                <ul className="space-y-2.5">
                  {provider.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-destructive rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Minus" size={12} className="text-white" />
                      </div>
                      <span className="text-sm text-foreground font-medium">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {provider.fz152Compliant && (
                <div className="md:col-span-2 bg-primary/5 border border-primary/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Icon name="ShieldCheck" size={18} className="text-primary" />
                    </div>
                    <h4 className="text-base font-bold text-foreground">Соответствие 152-ФЗ</h4>
                    {provider.fz152Level && (
                      <Badge className="bg-primary/20 text-primary border-0 ml-auto">{provider.fz152Level}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    Провайдер имеет сертификат соответствия требованиям 152-ФЗ "О персональных данных". 
                    Это означает, что все дата-центры соответствуют требованиям законодательства РФ по защите персональных данных, 
                    что особенно важно для организаций, работающих с конфиденциальной информацией клиентов.
                  </p>
                </div>
              )}

              <TechnicalSpecsSection provider={provider} />
              <ServiceGuaranteesSection provider={provider} />
              <AdditionalServicesSection provider={provider} />
              <PaymentMethodsSection provider={provider} />
              <CaseStudiesSection provider={provider} />

              <div className="pt-6 border-t border-border md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="MessageSquare" size={18} className="text-primary" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">Отзывы клиентов</h4>
                </div>

                <div className="bg-accent border border-primary/10 rounded-2xl p-5 mb-4">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-black text-primary mb-1">
                        {(provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length).toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            key={i}
                            name="Star" 
                            size={14} 
                            className={i < Math.round(provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length) ? "fill-primary text-primary" : "text-muted"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">Средний рейтинг</span>
                    </div>

                    <div className="text-center border-x border-border">
                      <div className="text-3xl font-black text-foreground mb-1">
                        {provider.reviews.length}
                      </div>
                      <Icon name="Users" size={20} className="text-primary mx-auto mb-1" />
                      <span className="text-xs text-muted-foreground font-medium">Всего отзывов</span>
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
                      Показать ещё отзывы
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
                      Оставить отзыв
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};