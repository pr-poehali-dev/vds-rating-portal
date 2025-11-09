import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Provider } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProviderCardHeaderProps {
  provider: Provider;
  index: number;
  calculatedPrice: number;
  onProviderClick: () => void;
}

export const ProviderCardHeader = ({
  provider,
  index,
  calculatedPrice,
  onProviderClick
}: ProviderCardHeaderProps) => {
  const { t, language } = useLanguage();
  const avgRating = provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3 flex-1">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white border border-primary/10 shadow-soft flex items-center justify-center">
            <img src={provider.logo} alt={provider.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-lg flex items-center justify-center shadow-lg text-background text-xs font-bold">
            {index + 1}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 truncate">{provider.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i}
                  name="Star" 
                  size={16} 
                  className={i < Math.round(avgRating) ? "fill-primary text-primary" : "text-muted"}
                />
              ))}
            </div>
            <span className="text-base font-bold text-foreground">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-muted-foreground text-xs">из 5</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {provider.features.slice(0, 2).map((feature, idx) => (
              <Badge key={idx} className="bg-accent border border-primary/20 text-foreground font-semibold text-[10px] px-1.5 py-0.5">
                {feature}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-1.5 text-xs">
              <Icon name="Database" size={12} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="font-semibold text-foreground truncate">
                {provider.locations.length} {provider.locations.length === 1 ? t('common.datacenter') : provider.locations.length < 5 ? t('common.datacenters') : t('common.dataCenters')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Icon name="Gift" size={12} className={provider.trialDays ? "text-primary" : "text-muted-foreground"} />
              <span className="font-semibold text-foreground truncate">
                {provider.trialDays ? `${provider.trialDays} ${provider.trialDays === 1 ? t('common.day') : provider.trialDays < 5 ? t('common.daysGenitive') : t('common.days')} ${t('common.free')}` : t('common.noTrial')}
              </span>
            </div>
            {provider.fz152Compliant && (
              <div className="flex items-center gap-1.5 text-xs">
                <Icon name="ShieldCheck" size={12} className="text-primary flex-shrink-0" />
                <span className="font-semibold text-foreground truncate">152-ФЗ</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs">
              <Icon name="HardDrive" size={12} className="text-primary flex-shrink-0" />
              <span className="font-semibold text-foreground truncate">{provider.technicalSpecs.diskType}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Icon name="Box" size={12} className="text-primary flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {provider.technicalSpecs.virtualization.slice(0, 2).map((virt, idx) => {
                  const getVirtColor = (type: string) => {
                    switch(type) {
                      case 'KVM': return 'bg-blue-500/10 border-blue-500/30 text-blue-600';
                      case 'VMware': return 'bg-purple-500/10 border-purple-500/30 text-purple-600';
                      case 'OpenVZ': return 'bg-orange-500/10 border-orange-500/30 text-orange-600';
                      case 'Hyper-V': return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600';
                      case 'LXC': return 'bg-green-500/10 border-green-500/30 text-green-600';
                      case 'Xen': return 'bg-pink-500/10 border-pink-500/30 text-pink-600';
                      default: return 'bg-primary/10 border-primary/30 text-primary';
                    }
                  };
                  return (
                    <Badge key={idx} className={`${getVirtColor(virt)} border font-semibold text-[10px] px-1 py-0`}>
                      {virt}
                    </Badge>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <div className="w-full flex-shrink-0">
        <div className="bg-[#0a0a0a] border-0 rounded-2xl p-3 text-center flex flex-col">
          {provider.promoText && (
            <div className="bg-secondary/20 border border-secondary rounded-xl px-2 py-1 mb-2">
              <p className="text-[10px] font-bold text-secondary truncate">{provider.promoText}</p>
            </div>
          )}
          <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{t('common.price')}</div>
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="text-xs text-muted-foreground font-semibold">{t('common.from')}</span>
            <span className="text-2xl sm:text-3xl font-black text-primary">{calculatedPrice}</span>
            <span className="text-sm text-muted-foreground">{t('common.perMonth')}</span>
          </div>
          {provider.pricingDetails.discounts && provider.pricingDetails.discounts.length > 0 && (
            <div className="mb-2">
              <div className="text-[10px] text-muted-foreground mb-1">{t('common.discounts')}:</div>
              <div className="flex flex-wrap gap-0.5 justify-center">
                {provider.pricingDetails.discounts.slice(0, 2).map((d, idx) => (
                  <Badge key={idx} variant="outline" className="text-[9px] bg-secondary/10 text-secondary border-secondary/30 px-1 py-0">
                    -{d.percent}%
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <Button 
            className="w-full h-9 text-xs font-bold bg-primary text-background shadow-lg shadow-primary/30 hover:shadow-neon transition-all group mb-2"
            onClick={onProviderClick}
            disabled={!provider.url}
          >
            {t('common.goTo')}
            <Icon name="ExternalLink" size={14} className="ml-1" />
          </Button>
          {provider.uptime30days && (
            <div className="flex items-center justify-center gap-1.5 text-[10px]">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-muted-foreground">{provider.uptime30days}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};