import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Provider, ResourceConfig } from './types';
import { 
  TechnicalSpecsSection,
  ServiceGuaranteesSection,
  AdditionalServicesSection,
  PaymentMethodsSection,
  CaseStudiesSection
} from './ProviderDetailsSections';
import { ProviderCardHeader } from './ProviderCardHeader';
import { ResourceConfigurator } from './ResourceConfigurator';
import { ProviderReviews } from './ProviderReviews';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();
  
  const trackClick = async () => {
    try {
      await fetch('https://functions.poehali.dev/d0b8e2ce-45c2-4ab9-8d08-baf03c0268f4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider_id: provider.id,
        }),
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleProviderClick = () => {
    if (provider.url) {
      trackClick();
      window.open(provider.url, '_blank');
    }
  };

  return (
    <div className="relative h-full flex flex-col group">
      <div className="absolute top-0.5 right-0 z-50 flex gap-2">
        {onToggleCompare && (
          <button 
            onClick={onToggleCompare}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${
              isSelected ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a]' : 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
            }`}
          >
            <Icon name={isSelected ? "Check" : "GitCompare"} size={17} className="text-white" />
          </button>
        )}
        <button 
          onClick={handleProviderClick}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-2xl transition-all"
        >
          <Icon name="ArrowUpRight" size={17} className="text-[#2a2a2a]" />
        </button>
      </div>
      
      <Card 
        className={`border-0 transition-all duration-300 hover-lift overflow-visible relative flex flex-col h-full ${
          isSelected ? 'shadow-lg shadow-primary/30 bg-[#1a1a1a]' : 'bg-[#1a1a1a] group-hover:shadow-xl'
        }`}
        style={{
          borderRadius: '2rem',
          clipPath: 'polygon(0% 2rem, 0% 0.5rem, 0.1rem 0.3rem, 0.3rem 0.1rem, 0.5rem 0%, 2rem 0%, calc(100% - 8rem - 2rem) 0%, calc(100% - 8rem - 1.5rem) 0.15rem, calc(100% - 8rem - 1rem) 0.4rem, calc(100% - 8rem - 0.6rem) 0.6rem, calc(100% - 8rem - 0.4rem) 1rem, calc(100% - 8rem - 0.15rem) 1.5rem, calc(100% - 8rem) 2rem, calc(100% - 8rem) calc(4rem - 2rem), calc(100% - 8rem + 0.15rem) calc(4rem - 1.5rem), calc(100% - 8rem + 0.4rem) calc(4rem - 1rem), calc(100% - 8rem + 0.6rem) calc(4rem - 0.6rem), calc(100% - 8rem + 1rem) calc(4rem - 0.4rem), calc(100% - 8rem + 1.5rem) calc(4rem - 0.15rem), calc(100% - 8rem + 2rem) 4rem, calc(100% - 2rem) 4rem, calc(100% - 1.5rem) calc(4rem + 0.15rem), calc(100% - 1rem) calc(4rem + 0.4rem), calc(100% - 0.6rem) calc(4rem + 0.6rem), calc(100% - 0.4rem) calc(4rem + 1rem), calc(100% - 0.15rem) calc(4rem + 1.5rem), 100% calc(4rem + 2rem), 100% calc(100% - 2rem), 100% calc(100% - 0.5rem), calc(100% - 0.1rem) calc(100% - 0.3rem), calc(100% - 0.3rem) calc(100% - 0.1rem), calc(100% - 0.5rem) 100%, calc(100% - 2rem) 100%, 2rem 100%, 0.5rem 100%, 0.3rem calc(100% - 0.1rem), 0.1rem calc(100% - 0.3rem), 0% calc(100% - 0.5rem), 0% calc(100% - 2rem))'
        }}
      >

      {index === 0 && (
        <div className="absolute -top-1 -left-1 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-br-2xl rounded-tl-2xl blur-lg"></div>
            <div className="relative bg-primary text-background font-bold px-5 py-2.5 rounded-br-2xl rounded-tl-2xl shadow-lg flex items-center gap-2">
              <Icon name="Crown" size={16} />
              {t('card.leader')}
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className={`p-5 ${index === 0 ? 'pt-14' : ''}`}>
        <ProviderCardHeader
          provider={provider}
          index={index}
          calculatedPrice={calculatedPrice}
          onProviderClick={handleProviderClick}
        />
      </CardHeader>
      
      <CardContent className="px-5 pb-5">
        <div className="space-y-3">
          <Button 
            variant="ghost" 
            className="w-full text-sm font-semibold hover:bg-accent/50 hover:text-primary justify-between"
            onClick={onToggleDetails}
          >
            <div className="flex items-center gap-2">
              <Icon name={showDetails ? "ThumbsDown" : "ThumbsUp"} size={18} />
              <span>{showDetails ? t('card.hideProsCons') : t('card.showProsCons')}</span>
            </div>
            <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={18} />
          </Button>

          {showDetails && (
            <div className="pt-3 border-t border-border grid grid-cols-1 gap-3">
              <div className="bg-accent border border-secondary/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name="Check" size={18} className="text-background" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">{t('card.pros')}</h4>
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
              
              <div className="bg-accent border border-destructive/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-destructive rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name="AlertCircle" size={18} className="text-white" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">{t('card.cons')}</h4>
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
                <div className="md:col-span-2 bg-primary/5 border border-primary/20 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Icon name="ShieldCheck" size={18} className="text-primary" />
                    </div>
                    <h4 className="text-base font-bold text-foreground">{t('card.fz152')}</h4>
                    {provider.fz152Level && (
                      <Badge className="bg-primary/20 text-primary border-0 ml-auto">{provider.fz152Level}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {t('card.fz152Description')}
                  </p>
                </div>
              )}

              <TechnicalSpecsSection provider={provider} />
              <ServiceGuaranteesSection provider={provider} />
              <AdditionalServicesSection provider={provider} />
              <PaymentMethodsSection provider={provider} />
              <CaseStudiesSection provider={provider} />

              <ProviderReviews
                provider={provider}
                reviewsToShow={reviewsToShow}
                onLoadMoreReviews={onLoadMoreReviews}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
};