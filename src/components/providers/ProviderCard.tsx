import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Provider, ResourceConfig } from './types';

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
  onLoadMoreReviews
}: ProviderCardProps) => {
  return (
    <Card 
      className="group border-2 border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden relative bg-card"
    >
      {index === 0 && (
        <div className="absolute -top-1 -right-1 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-bl-2xl rounded-tr-xl blur-lg"></div>
            <div className="relative bg-primary text-background font-bold px-5 py-2.5 rounded-bl-2xl rounded-tr-xl shadow-lg flex items-center gap-2">
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
              <div className="flex flex-wrap gap-2">
                {provider.features.slice(0, 3).map((feature, idx) => (
                  <Badge key={idx} className="bg-accent border border-primary/20 text-foreground font-semibold text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-auto flex-shrink-0">
            <div className="bg-accent border-2 border-primary/20 rounded-2xl p-6 text-center">
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Цена</div>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-4xl md:text-5xl font-black text-primary">{calculatedPrice}</span>
                <span className="text-xl text-muted-foreground">₽</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium mb-4">/месяц</div>
              <Button className="w-full h-12 text-sm font-bold bg-primary text-background shadow-lg shadow-primary/30 hover:shadow-neon transition-all group">
                Перейти
                <Icon name="ExternalLink" size={16} className="ml-2" />
              </Button>
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
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};