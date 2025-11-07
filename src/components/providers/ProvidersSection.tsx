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

        <div className="grid gap-6 max-w-6xl mx-auto">
          {providersWithReviews.map((provider, index) => {
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