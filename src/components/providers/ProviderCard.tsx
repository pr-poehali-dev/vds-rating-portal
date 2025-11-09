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
    <Card 
      className={`group border-2 transition-all duration-300 hover-lift overflow-hidden relative rounded-[2.5rem] ${
        isSelected ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5' : 'border-border hover:border-primary/50 bg-gradient-to-br from-primary/10 via-card to-card'
      }`}
    >
      <div className="absolute top-8 right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-12 right-8 w-24 h-24 rounded-full border-2 border-primary/20" style={{background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(212, 255, 0, 0.1) 4px, rgba(212, 255, 0, 0.1) 8px)'}}></div>
      <div className="absolute top-1/3 right-16 w-20 h-20 rounded-full" style={{background: 'radial-gradient(circle at 30% 30%, rgba(212, 255, 0, 0.15), transparent), repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, rgba(212, 255, 0, 0.08) 2px, rgba(212, 255, 0, 0.08) 4px)'}}></div>
      <div className="absolute bottom-24 left-8 w-16 h-16 bg-accent/50 rounded-full"></div>
      
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
                {t('card.selected')}
              </>
            ) : (
              <>
                <Icon name="GitCompare" size={14} className="mr-1.5" />
                {t('card.compare')}
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
              {t('card.leader')}
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className={`p-6 md:p-8 ${index === 0 ? 'pt-12 md:pt-14' : ''}`}>
        <ProviderCardHeader
          provider={provider}
          index={index}
          calculatedPrice={calculatedPrice}
          onProviderClick={handleProviderClick}
        />
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
              <span>{t('card.configureResources')}</span>
            </div>
            <Icon name={configOpen ? "ChevronUp" : "ChevronDown"} size={18} />
          </Button>

          {configOpen && (
            <ResourceConfigurator
              config={config}
              onUpdateConfig={onUpdateConfig}
            />
          )}

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
            <div className="pt-4 border-t border-border grid md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-accent border border-secondary/30 rounded-2xl p-4 sm:p-5">
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
              
              <div className="bg-accent border border-destructive/30 rounded-2xl p-4 sm:p-5">
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
                <div className="md:col-span-2 bg-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-5">
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
  );
};