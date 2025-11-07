import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Provider } from './types';

interface TechnicalSpecsSectionProps {
  provider: Provider;
}

export const TechnicalSpecsSection = ({ provider }: TechnicalSpecsSectionProps) => {
  const { technicalSpecs } = provider;
  
  return (
    <div className="md:col-span-2 bg-accent/50 border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
          <Icon name="Settings" size={18} className="text-primary" />
        </div>
        <h4 className="text-base font-bold text-foreground">Технические характеристики</h4>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <Icon name="HardDrive" size={16} className="text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Тип дисков</div>
            <div className="text-sm font-semibold text-foreground">{technicalSpecs.diskType}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="Wifi" size={16} className="text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Скорость сети</div>
            <div className="text-sm font-semibold text-foreground">{technicalSpecs.networkSpeed}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="Box" size={16} className="text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Виртуализация</div>
            <Badge className="bg-primary/10 border border-primary/30 text-primary font-bold text-xs">
              <Icon name="Box" size={12} className="mr-1" />
              {technicalSpecs.virtualization}
            </Badge>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">DDoS защита</div>
            <div className="text-sm font-semibold text-foreground">{technicalSpecs.ddosProtection}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="Layout" size={16} className="text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Панель управления</div>
            <div className="text-sm font-semibold text-foreground">{technicalSpecs.controlPanel}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="Network" size={16} className="text-primary mt-0.5" />
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">IP протоколы</div>
            <div className="flex gap-1.5">
              {technicalSpecs.ipv4 && <Badge variant="outline" className="text-xs">IPv4</Badge>}
              {technicalSpecs.ipv6 && <Badge variant="outline" className="text-xs">IPv6</Badge>}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground mb-2">Доступные ОС:</div>
        <div className="flex flex-wrap gap-1.5">
          {technicalSpecs.availableOS.map((os, idx) => (
            <Badge key={idx} variant="outline" className="text-xs bg-background">
              {os}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {technicalSpecs.guaranteedResources && (
            <div className="flex items-center gap-1.5 text-xs">
              <Icon name="CheckCircle" size={14} className="text-secondary" />
              <span className="text-foreground font-medium">Гарантированные ресурсы</span>
            </div>
          )}
          {technicalSpecs.apiAccess && (
            <div className="flex items-center gap-1.5 text-xs">
              <Icon name="Code" size={14} className="text-secondary" />
              <span className="text-foreground font-medium">API доступ</span>
            </div>
          )}
          {technicalSpecs.customOS && (
            <div className="flex items-center gap-1.5 text-xs">
              <Icon name="Upload" size={14} className="text-secondary" />
              <span className="text-foreground font-medium">Своя ОС</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ServiceGuaranteesSectionProps {
  provider: Provider;
}

export const ServiceGuaranteesSection = ({ provider }: ServiceGuaranteesSectionProps) => {
  const { serviceGuarantees } = provider;
  
  return (
    <div className="md:col-span-2 bg-secondary/5 border border-secondary/20 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 bg-secondary/20 rounded-xl flex items-center justify-center">
          <Icon name="Award" size={18} className="text-secondary" />
        </div>
        <h4 className="text-base font-bold text-foreground">Гарантии сервиса</h4>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-background rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Activity" size={16} className="text-secondary" />
            <div className="text-xs font-bold text-muted-foreground uppercase">Uptime SLA</div>
          </div>
          <div className="text-2xl font-black text-secondary">{serviceGuarantees.uptimeSLA}</div>
        </div>
        {serviceGuarantees.supportResponseTime && (
          <div className="bg-background rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Clock" size={16} className="text-secondary" />
              <div className="text-xs font-bold text-muted-foreground uppercase">Ответ поддержки</div>
            </div>
            <div className="text-2xl font-black text-secondary">{serviceGuarantees.supportResponseTime}</div>
          </div>
        )}
        {serviceGuarantees.moneyBackGuarantee && (
          <div className="bg-background rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="DollarSign" size={16} className="text-secondary" />
              <div className="text-xs font-bold text-muted-foreground uppercase">Возврат денег</div>
            </div>
            <div className="text-2xl font-black text-secondary">{serviceGuarantees.moneyBackGuarantee} дней</div>
          </div>
        )}
      </div>
    </div>
  );
};

interface AdditionalServicesSectionProps {
  provider: Provider;
}

export const AdditionalServicesSection = ({ provider }: AdditionalServicesSectionProps) => {
  const { additionalServices } = provider;
  
  return (
    <div className="md:col-span-2 bg-accent/30 border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
          <Icon name="Package" size={18} className="text-primary" />
        </div>
        <h4 className="text-base font-bold text-foreground">Дополнительные услуги</h4>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className={`flex items-center gap-2 p-3 rounded-xl ${additionalServices.autoBackups ? 'bg-secondary/10 border border-secondary/30' : 'bg-background border border-border'}`}>
          <Icon name={additionalServices.autoBackups ? "CheckCircle" : "XCircle"} size={16} className={additionalServices.autoBackups ? "text-secondary" : "text-muted"} />
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">Автобэкапы</div>
            {additionalServices.autoBackups && additionalServices.backupPrice && (
              <div className="text-xs text-muted-foreground">{additionalServices.backupPrice}₽/мес</div>
            )}
            {additionalServices.autoBackups && !additionalServices.backupPrice && (
              <div className="text-xs text-secondary font-medium">Бесплатно</div>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-2 p-3 rounded-xl ${additionalServices.monitoring ? 'bg-secondary/10 border border-secondary/30' : 'bg-background border border-border'}`}>
          <Icon name={additionalServices.monitoring ? "CheckCircle" : "XCircle"} size={16} className={additionalServices.monitoring ? "text-secondary" : "text-muted"} />
          <div className="text-sm font-semibold text-foreground">Мониторинг</div>
        </div>
        <div className={`flex items-center gap-2 p-3 rounded-xl ${additionalServices.snapshots ? 'bg-secondary/10 border border-secondary/30' : 'bg-background border border-border'}`}>
          <Icon name={additionalServices.snapshots ? "CheckCircle" : "XCircle"} size={16} className={additionalServices.snapshots ? "text-secondary" : "text-muted"} />
          <div className="text-sm font-semibold text-foreground">Snapshots</div>
        </div>
        <div className={`flex items-center gap-2 p-3 rounded-xl ${additionalServices.customOS ? 'bg-secondary/10 border border-secondary/30' : 'bg-background border border-border'}`}>
          <Icon name={additionalServices.customOS ? "CheckCircle" : "XCircle"} size={16} className={additionalServices.customOS ? "text-secondary" : "text-muted"} />
          <div className="text-sm font-semibold text-foreground">Своя ОС</div>
        </div>
      </div>
    </div>
  );
};

interface PaymentMethodsSectionProps {
  provider: Provider;
}

export const PaymentMethodsSection = ({ provider }: PaymentMethodsSectionProps) => {
  const { pricingDetails } = provider;
  
  return (
    <div className="bg-accent/50 border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
          <Icon name="CreditCard" size={18} className="text-primary" />
        </div>
        <h4 className="text-base font-bold text-foreground">Методы оплаты</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {pricingDetails.paymentMethods.map((method, idx) => (
          <Badge key={idx} className="bg-background border border-primary/20 text-foreground">
            {method}
          </Badge>
        ))}
      </div>
    </div>
  );
};

interface CaseStudiesSectionProps {
  provider: Provider;
}

export const CaseStudiesSection = ({ provider }: CaseStudiesSectionProps) => {
  if (!provider.caseStudies || provider.caseStudies.length === 0) return null;
  
  return (
    <div className="bg-accent/50 border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
          <Icon name="Briefcase" size={18} className="text-primary" />
        </div>
        <h4 className="text-base font-bold text-foreground">Подходит для</h4>
      </div>
      <div className="space-y-2">
        {provider.caseStudies.map((caseStudy, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Icon name="CheckCircle2" size={14} className="text-secondary flex-shrink-0" />
            <span className="text-sm text-foreground">{caseStudy}</span>
          </div>
        ))}
      </div>
    </div>
  );
};