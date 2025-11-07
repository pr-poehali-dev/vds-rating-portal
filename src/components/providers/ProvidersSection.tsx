import { useState, useEffect } from 'react';
import { Provider, ResourceConfig, Review } from './types';
import { ComparisonTable } from './ComparisonTable';
import { FilterPanel } from './FilterPanel';
import { ComparisonControls } from './ComparisonControls';
import { ProvidersList } from './ProvidersList';

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
  const [filterVirtualization, setFilterVirtualization] = useState<string | null>(() => {
    return localStorage.getItem('filterVirtualization') || null;
  });
  const [filterMinDatacenters, setFilterMinDatacenters] = useState<number | null>(() => {
    const saved = localStorage.getItem('filterMinDatacenters');
    return saved ? parseInt(saved) : null;
  });
  const [filterDiskType, setFilterDiskType] = useState<string | null>(() => {
    return localStorage.getItem('filterDiskType') || null;
  });
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string | null>(() => {
    return localStorage.getItem('filterPaymentMethod') || null;
  });
  const [filterOS, setFilterOS] = useState<string | null>(() => {
    return localStorage.getItem('filterOS') || null;
  });
  const [sortBy, setSortBy] = useState<'rating' | 'price'>(() => {
    const saved = localStorage.getItem('sortBy');
    return (saved as 'rating' | 'price') || 'rating';
  });
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [providersToShow, setProvidersToShow] = useState(10);
  const [reviewsToShow, setReviewsToShow] = useState<Record<number, number>>({
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
    7: 5,
    8: 5,
    9: 5,
    10: 5,
    11: 5,
    12: 5,
    13: 5,
    14: 5,
    15: 5,
    16: 5,
    17: 5,
    18: 5,
    19: 5,
    20: 5,
    21: 5,
    22: 5,
    23: 5,
    24: 5,
    25: 5,
    26: 5,
    27: 5,
    28: 5
  });
  const [configs, setConfigs] = useState<Record<number, ResourceConfig>>({
    1: { cpu: 1, ram: 1, storage: 10 },
    2: { cpu: 1, ram: 1, storage: 10 },
    3: { cpu: 1, ram: 1, storage: 10 },
    4: { cpu: 1, ram: 1, storage: 10 },
    5: { cpu: 1, ram: 1, storage: 10 },
    6: { cpu: 1, ram: 1, storage: 10 },
    7: { cpu: 1, ram: 1, storage: 10 },
    8: { cpu: 1, ram: 1, storage: 10 },
    9: { cpu: 1, ram: 1, storage: 10 },
    10: { cpu: 1, ram: 1, storage: 10 },
    11: { cpu: 1, ram: 1, storage: 10 },
    12: { cpu: 1, ram: 1, storage: 10 },
    13: { cpu: 1, ram: 1, storage: 10 },
    14: { cpu: 1, ram: 1, storage: 10 },
    15: { cpu: 1, ram: 1, storage: 10 },
    16: { cpu: 1, ram: 1, storage: 10 },
    17: { cpu: 1, ram: 1, storage: 10 },
    18: { cpu: 1, ram: 1, storage: 10 },
    19: { cpu: 1, ram: 1, storage: 10 },
    20: { cpu: 1, ram: 1, storage: 10 },
    21: { cpu: 1, ram: 1, storage: 10 },
    22: { cpu: 1, ram: 1, storage: 10 },
    23: { cpu: 1, ram: 1, storage: 10 },
    24: { cpu: 1, ram: 1, storage: 10 },
    25: { cpu: 1, ram: 1, storage: 10 },
    26: { cpu: 1, ram: 1, storage: 10 },
    27: { cpu: 1, ram: 1, storage: 10 },
    28: { cpu: 1, ram: 1, storage: 10 }
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
    if (filterVirtualization) {
      localStorage.setItem('filterVirtualization', filterVirtualization);
    } else {
      localStorage.removeItem('filterVirtualization');
    }
  }, [filterVirtualization]);

  useEffect(() => {
    if (filterMinDatacenters !== null) {
      localStorage.setItem('filterMinDatacenters', filterMinDatacenters.toString());
    } else {
      localStorage.removeItem('filterMinDatacenters');
    }
  }, [filterMinDatacenters]);

  useEffect(() => {
    if (filterDiskType) {
      localStorage.setItem('filterDiskType', filterDiskType);
    } else {
      localStorage.removeItem('filterDiskType');
    }
  }, [filterDiskType]);

  useEffect(() => {
    if (filterPaymentMethod) {
      localStorage.setItem('filterPaymentMethod', filterPaymentMethod);
    } else {
      localStorage.removeItem('filterPaymentMethod');
    }
  }, [filterPaymentMethod]);

  useEffect(() => {
    if (filterOS) {
      localStorage.setItem('filterOS', filterOS);
    } else {
      localStorage.removeItem('filterOS');
    }
  }, [filterOS]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  const calculatePrice = (provider: Provider, config?: ResourceConfig) => {
    if (!config) {
      config = { cpu: 1, ram: 1, storage: 10 };
    }
    return Math.round(
      provider.basePrice +
      config.cpu * provider.cpuPrice +
      config.ram * provider.ramPrice +
      config.storage * provider.storagePrice
    );
  };

  const toggleComparison = (providerId: number) => {
    setSelectedForComparison(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const compareProviders = () => {
    if (selectedForComparison.length >= 2) {
      setShowComparison(true);
    }
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

  const allVirtualizations = Array.from(
    new Set(providersWithReviews.flatMap(p => p.technicalSpecs.virtualization))
  ).sort();

  const allDiskTypes = Array.from(
    new Set(providersWithReviews.map(p => p.technicalSpecs.diskType))
  ).sort();

  const allPaymentMethods = Array.from(
    new Set(providersWithReviews.flatMap(p => p.pricingDetails.paymentMethods))
  ).sort();

  const allOS = Array.from(
    new Set(providersWithReviews.flatMap(p => p.technicalSpecs.availableOS))
  ).sort();

  const filteredProviders = providersWithReviews
    .filter(p => {
      if (filterFZ152 && !p.fz152Compliant) return false;
      if (filterTrialPeriod && p.trialDays === 0) return false;
      if (filterLocation && !p.locations.includes(filterLocation)) return false;
      if (filterVirtualization && !p.technicalSpecs.virtualization.includes(filterVirtualization)) return false;
      if (filterMinDatacenters !== null && p.locations.length < filterMinDatacenters) return false;
      if (filterDiskType && p.technicalSpecs.diskType !== filterDiskType) return false;
      if (filterPaymentMethod && !p.pricingDetails.paymentMethods.includes(filterPaymentMethod)) return false;
      if (filterOS && !p.technicalSpecs.availableOS.includes(filterOS)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        const avgRatingA = a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length;
        const avgRatingB = b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length;
        return avgRatingB - avgRatingA;
      } else {
        const priceA = calculatePrice(a, configs[a.id]);
        const priceB = calculatePrice(b, configs[b.id]);
        return priceA - priceB;
      }
    });

  if (showComparison) {
    const selectedProviders = providersWithReviews.filter(p => 
      selectedForComparison.includes(p.id)
    );
    return (
      <ComparisonTable 
        providers={selectedProviders} 
        onClose={() => setShowComparison(false)} 
      />
    );
  }

  return (
    <section id="providers" className="container mx-auto px-4 py-8">
      <FilterPanel
        filterFZ152={filterFZ152}
        setFilterFZ152={setFilterFZ152}
        filterTrialPeriod={filterTrialPeriod}
        setFilterTrialPeriod={setFilterTrialPeriod}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        filterVirtualization={filterVirtualization}
        setFilterVirtualization={setFilterVirtualization}
        filterMinDatacenters={filterMinDatacenters}
        setFilterMinDatacenters={setFilterMinDatacenters}
        filterDiskType={filterDiskType}
        setFilterDiskType={setFilterDiskType}
        filterPaymentMethod={filterPaymentMethod}
        setFilterPaymentMethod={setFilterPaymentMethod}
        filterOS={filterOS}
        setFilterOS={setFilterOS}
        sortBy={sortBy}
        setSortBy={setSortBy}
        allLocations={allLocations}
        allVirtualizations={allVirtualizations}
        allDiskTypes={allDiskTypes}
        allPaymentMethods={allPaymentMethods}
        allOS={allOS}
      />

      <ProvidersList
        filteredProviders={filteredProviders.slice(0, providersToShow)}
        configs={configs}
        calculatePrice={calculatePrice}
        configOpen={configOpen}
        setConfigOpen={setConfigOpen}
        updateConfig={updateConfig}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        reviewsToShow={reviewsToShow}
        setReviewsToShow={setReviewsToShow}
        selectedForComparison={selectedForComparison}
        toggleComparison={toggleComparison}
      />

      {filteredProviders.length > providersToShow && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setProvidersToShow(prev => prev + 10)}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-background font-bold text-lg rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center gap-2">
              Показать ещё 10 провайдеров
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      )}

      <ComparisonControls
        selectedForComparison={selectedForComparison}
        compareProviders={compareProviders}
      />
    </section>
  );
};