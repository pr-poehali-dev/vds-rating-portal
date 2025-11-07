import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Provider, ResourceConfig, Review } from './types';
import { ProviderCard } from './ProviderCard';

interface ProvidersSectionProps {
  providers: Provider[];
}

export const ProvidersSection = ({ providers }: ProvidersSectionProps) => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [configOpen, setConfigOpen] = useState<number | null>(null);
  const [filterFZ152, setFilterFZ152] = useState(() => {
    const saved = localStorage.getItem('filterFZ152');
    return saved ? JSON.parse(saved) : false;
  });
  const [filterTrialPeriod, setFilterTrialPeriod] = useState(() => {
    const saved = localStorage.getItem('filterTrialPeriod');
    return saved ? JSON.parse(saved) : false;
  });
  const [filterLocation, setFilterLocation] = useState<string | null>(() => {
    return localStorage.getItem('filterLocation') || null;
  });
  const [sortBy, setSortBy] = useState<'rating' | 'price'>(() => {
    const saved = localStorage.getItem('sortBy');
    return (saved as 'rating' | 'price') || 'rating';
  });
  const [reviewsToShow, setReviewsToShow] = useState<Record<number, number>>({
    1: 5,
    2: 5,
    3: 5,
    4: 5
  });
  const [configs, setConfigs] = useState<Record<number, ResourceConfig>>({
    1: { cpu: 1, ram: 1, storage: 10 },
    2: { cpu: 1, ram: 1, storage: 10 },
    3: { cpu: 1, ram: 1, storage: 10 },
    4: { cpu: 1, ram: 1, storage: 10 }
  });
  const [loadedReviews, setLoadedReviews] = useState<Record<number, Review[]>>({});
  const [providersWithReviews, setProvidersWithReviews] = useState<Provider[]>(providers);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/15bd2bf9-a831-4ef9-9ce3-fd6c7823ddc8?status=approved');
        if (response.ok) {
          const data = await response.json();
          const reviewsByProvider: Record<number, Review[]> = {};
          
          data.reviews.forEach((review: Review) => {
            if (!reviewsByProvider[review.provider_id]) {
              reviewsByProvider[review.provider_id] = [];
            }
            reviewsByProvider[review.provider_id].push(review);
          });
          
          setLoadedReviews(reviewsByProvider);
          
          const updatedProviders = providers.map(provider => ({
            ...provider,
            reviews: reviewsByProvider[provider.id] || provider.reviews
          }));
          setProvidersWithReviews(updatedProviders);
        }
      } catch (error) {
        console.error('Error fetching approved reviews:', error);
      }
    };

    fetchApprovedReviews();
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('filterFZ152', JSON.stringify(filterFZ152));
  }, [filterFZ152]);

  useEffect(() => {
    localStorage.setItem('filterTrialPeriod', JSON.stringify(filterTrialPeriod));
  }, [filterTrialPeriod]);

  useEffect(() => {
    if (filterLocation) {
      localStorage.setItem('filterLocation', filterLocation);
    } else {
      localStorage.removeItem('filterLocation');
    }
  }, [filterLocation]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  const calculatePrice = (provider: Provider, config: ResourceConfig) => {
    return Math.round(
      provider.basePrice +
      config.cpu * provider.cpuPrice +
      config.ram * provider.ramPrice +
      config.storage * provider.storagePrice
    );
  };

  const updateConfig = (providerId: number, key: keyof ResourceConfig, value: number) => {
    setConfigs(prev => ({
      ...prev,
      [providerId]: { ...prev[providerId], [key]: value }
    }));
  };

  const allLocations = Array.from(
    new Set(providersWithReviews.flatMap(p => p.locations))
  ).sort();

  const filteredProviders = providersWithReviews
    .filter(p => {
      if (filterFZ152 && !p.fz152Compliant) return false;
      if (filterTrialPeriod && !p.trialDays) return false;
      if (filterLocation && !p.locations.includes(filterLocation)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        const ratingA = a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length;
        const ratingB = b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length;
        return ratingB - ratingA;
      } else {
        const priceA = calculatePrice(a, configs[a.id]);
        const priceB = calculatePrice(b, configs[b.id]);
        return priceA - priceB;
      }
    });

  return (
    <section id="providers" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent border border-primary/30 rounded-full px-5 py-2.5">
            <Icon name="Trophy" size={16} className="text-primary" />
            <span className="text-sm font-bold text-primary">Лучшие провайдеры</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-foreground">
            Топ VDS хостингов
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Настрой конфигурацию под свой проект и сравни цены
          </p>
        </div>

        <div className="mb-10 max-w-6xl mx-auto">
          <div className="bg-accent/50 border border-primary/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Filter" size={18} className="text-primary" />
              <h3 className="text-lg font-bold text-foreground">Фильтры</h3>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <Button 
                variant={filterFZ152 ? "default" : "outline"}
                className="h-10 px-4 text-sm font-semibold rounded-xl transition-all"
                onClick={() => setFilterFZ152(!filterFZ152)}
              >
                <Icon name="ShieldCheck" size={16} className="mr-2" />
                152-ФЗ
                {filterFZ152 && <Icon name="Check" size={16} className="ml-1" />}
              </Button>

              <Button 
                variant={filterTrialPeriod ? "default" : "outline"}
                className="h-10 px-4 text-sm font-semibold rounded-xl transition-all"
                onClick={() => setFilterTrialPeriod(!filterTrialPeriod)}
              >
                <Icon name="Gift" size={16} className="mr-2" />
                Тестовый период
                {filterTrialPeriod && <Icon name="Check" size={16} className="ml-1" />}
              </Button>

              <div className="relative">
                <select
                  value={filterLocation || ''}
                  onChange={(e) => setFilterLocation(e.target.value || null)}
                  className="h-10 pl-4 pr-10 text-sm font-semibold rounded-xl border-2 border-border bg-background hover:bg-accent hover:border-primary/50 transition-all cursor-pointer appearance-none"
                >
                  <option value="">Все локации</option>
                  {allLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground">Сортировка:</span>
              <Button 
                variant={sortBy === 'rating' ? "default" : "outline"}
                size="sm"
                className="h-9 px-4 text-sm font-semibold rounded-xl"
                onClick={() => setSortBy('rating')}
              >
                <Icon name="Star" size={14} className="mr-1.5" />
                По рейтингу
              </Button>
              <Button 
                variant={sortBy === 'price' ? "default" : "outline"}
                size="sm"
                className="h-9 px-4 text-sm font-semibold rounded-xl"
                onClick={() => setSortBy('price')}
              >
                <Icon name="DollarSign" size={14} className="mr-1.5" />
                По цене
              </Button>

              {(filterFZ152 || filterTrialPeriod || filterLocation) && (
                <div className="flex items-center gap-2 ml-auto">
                  <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-xl px-3 py-1.5">
                    <span className="text-sm font-medium text-foreground">
                      Найдено: {filteredProviders.length}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-9 px-3 text-sm font-semibold hover:bg-destructive/20 hover:text-destructive rounded-xl"
                    onClick={() => {
                      setFilterFZ152(false);
                      setFilterTrialPeriod(false);
                      setFilterLocation(null);
                      localStorage.removeItem('filterFZ152');
                      localStorage.removeItem('filterTrialPeriod');
                      localStorage.removeItem('filterLocation');
                    }}
                  >
                    <Icon name="X" size={14} className="mr-1.5" />
                    Сбросить
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 max-w-6xl mx-auto">
          {filteredProviders.map((provider, index) => {
            const config = configs[provider.id];
            const calculatedPrice = calculatePrice(provider, config);

            return (
              <ProviderCard
                key={provider.id}
                provider={provider}
                index={index}
                config={config}
                onUpdateConfig={(key, value) => updateConfig(provider.id, key, value)}
                calculatedPrice={calculatedPrice}
                configOpen={configOpen === provider.id}
                onToggleConfig={() => setConfigOpen(configOpen === provider.id ? null : provider.id)}
                showDetails={selectedProvider?.id === provider.id}
                onToggleDetails={() => setSelectedProvider(selectedProvider?.id === provider.id ? null : provider)}
                reviewsToShow={reviewsToShow[provider.id]}
                onLoadMoreReviews={() => setReviewsToShow(prev => ({
                  ...prev,
                  [provider.id]: prev[provider.id] + 10
                }))}
              />
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-2 border-border rounded-xl hover:bg-accent hover:border-primary/50">
            Посмотреть все провайдеры
            <Icon name="Grid" size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};