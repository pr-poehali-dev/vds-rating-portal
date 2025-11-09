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
    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
      <div className="flex items-start gap-4 sm:gap-6 flex-1">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white border border-primary/10 shadow-soft flex items-center justify-center">
            <img src={provider.logo} alt={provider.name} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg text-background text-sm font-bold">
            {index + 1}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">{provider.name}</h3>
          <div className="flex items-center gap-3 mb-3">
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
            <span className="text-lg sm:text-xl font-bold text-foreground">
              {avgRating.toFixed(1)}
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
            <div className="flex items-start gap-2 text-sm">
              <Icon name="Database" size={14} className="text-primary mt-0.5" />
              <div>
                <span className="font-semibold text-foreground">
                  {provider.locations.length} {provider.locations.length === 1 ? t('common.datacenter') : provider.locations.length < 5 ? t('common.datacenters') : t('common.dataCenters')}
                </span>
                <span className="text-[#2a2a2a]/60 font-normal"> — {provider.locations.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Gift" size={14} className={provider.trialDays ? "text-primary" : "text-muted-foreground"} />
              <span className="font-semibold text-foreground">
                {t('common.trialPeriod')}: {provider.trialDays ? `${provider.trialDays} ${provider.trialDays === 1 ? t('common.day') : provider.trialDays < 5 ? t('common.daysGenitive') : t('common.days')} ${t('common.free')}` : t('common.absent')}
              </span>
            </div>
            {provider.fz152Compliant && (
              <div className="flex items-center gap-2 text-sm">
                <Icon name="ShieldCheck" size={14} className="text-primary" />
                <span className="font-semibold text-foreground">152-ФЗ: {provider.fz152Level || t('common.compliant')}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Icon name="HardDrive" size={14} className="text-primary" />
              <span className="font-semibold text-foreground">{t('common.disks')}: {provider.technicalSpecs.diskType}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Box" size={14} className="text-primary" />
              <span className="font-semibold text-foreground">{t('common.virtualization')}:</span>
              <div className="flex flex-wrap gap-1.5">
                {provider.technicalSpecs.virtualization.map((virt, idx) => {
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
                    <Badge key={idx} className={`${getVirtColor(virt)} border font-semibold text-[11px] px-1.5 py-0.5`}>
                      {virt}
                    </Badge>
                  );
                })}
              </div>
            </div>
            {provider.popularity && (
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Users" size={14} className="text-primary" />
                <span className="text-muted-foreground">{provider.popularity.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US')}+ {t('common.users')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-[220px] flex-shrink-0">
        <div className="bg-[#0a0a0a] border-0 rounded-[2rem] p-3 sm:p-4 text-center flex flex-col h-full">
          <div className="min-h-[48px] sm:min-h-[60px] flex items-center justify-center mb-3">
            {provider.promoText && (
              <div className="bg-secondary/20 border border-secondary rounded-xl px-2 sm:px-3 py-1.5">
                <p className="text-[10px] sm:text-xs font-bold text-secondary">{provider.promoText}</p>
              </div>
            )}
          </div>
          <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{t('common.price')}</div>
          <div className="flex items-baseline justify-center gap-1 sm:gap-2 mb-4">
            <span className="text-sm sm:text-lg text-muted-foreground font-semibold">{t('common.from')}</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-primary">{calculatedPrice}</span>
            <span className="text-base sm:text-xl text-muted-foreground">{t('common.perMonth')}</span>
          </div>
          <div className="min-h-[72px] mb-4">
            {provider.pricingDetails.discounts && provider.pricingDetails.discounts.length > 0 && (
              <div>
                <div className="text-xs text-muted-foreground mb-1.5">{t('common.discounts')}:</div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {provider.pricingDetails.discounts.map((d, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary/30">
                      -{d.percent}% {d.months} {t('common.month')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button 
            className="w-full h-11 sm:h-12 text-sm font-bold bg-primary text-background shadow-lg shadow-primary/30 hover:shadow-neon transition-all group mb-3"
            onClick={onProviderClick}
            disabled={!provider.url}
          >
            {t('common.goTo')}
            <Icon name="ExternalLink" size={16} className="ml-2" />
          </Button>
          {provider.uptime30days && (
            <div className="flex items-center justify-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-muted-foreground">{t('common.uptime')}: {provider.uptime30days}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};