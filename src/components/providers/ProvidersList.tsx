import { Provider, ResourceConfig } from './types';
import { ProviderCard } from './ProviderCard';

interface ProvidersListProps {
  filteredProviders: Provider[];
  configs: Record<number, ResourceConfig>;
  calculatePrice: (provider: Provider, config?: ResourceConfig) => number;
  configOpen: number | null;
  setConfigOpen: (value: number | null) => void;
  updateConfig: (providerId: number, key: keyof ResourceConfig, value: number) => void;
  selectedProvider: Provider | null;
  setSelectedProvider: (provider: Provider | null) => void;
  reviewsToShow: Record<number, number>;
  setReviewsToShow: (value: Record<number, number>) => void;
  selectedForComparison: number[];
  toggleComparison: (providerId: number) => void;
}

export const ProvidersList = ({
  filteredProviders,
  configs,
  calculatePrice,
  configOpen,
  setConfigOpen,
  updateConfig,
  selectedProvider,
  setSelectedProvider,
  reviewsToShow,
  setReviewsToShow,
  selectedForComparison,
  toggleComparison
}: ProvidersListProps) => {
  return (
    <div className="flex flex-wrap gap-6">
      <style>{`
        @media (min-width: 1024px) {
          .provider-card-wrapper {
            width: calc(50% - 12px);
          }
        }
        @media (min-width: 1280px) {
          .provider-card-wrapper {
            width: calc(33.333% - 16px);
          }
        }
        .provider-card-wrapper {
          width: 100%;
        }
      `}</style>
      {filteredProviders.map((provider, index) => (
        <div key={provider.id} className="provider-card-wrapper">
          <ProviderCard
            provider={provider}
            index={index}
          config={configs[provider.id]}
          onUpdateConfig={(key, value) => updateConfig(provider.id, key, value)}
          calculatedPrice={calculatePrice(provider, configs[provider.id])}
          configOpen={configOpen === provider.id}
          onToggleConfig={() => setConfigOpen(configOpen === provider.id ? null : provider.id)}
          showDetails={selectedProvider?.id === provider.id}
          onToggleDetails={() => setSelectedProvider(selectedProvider?.id === provider.id ? null : provider)}
          reviewsToShow={reviewsToShow[provider.id] || 5}
          onLoadMoreReviews={() => setReviewsToShow({
            ...reviewsToShow,
            [provider.id]: (reviewsToShow[provider.id] || 5) + 5
          })}
          isSelected={selectedForComparison.includes(provider.id)}
          onToggleCompare={() => toggleComparison(provider.id)}
          />
        </div>
      ))}
    </div>
  );
};