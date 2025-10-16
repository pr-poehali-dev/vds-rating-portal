import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Provider {
  id: number;
  name: string;
  logo: string;
  rating: number;
  price: string;
  cpu: string;
  ram: string;
  storage: string;
  traffic: string;
  features: string[];
  pros: string[];
  cons: string[];
}

const providers: Provider[] = [
  {
    id: 1,
    name: 'Timeweb Cloud',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/c68c0760-0692-436d-8905-b2f1b5486586.jpg',
    rating: 9.8,
    price: '399 ₽/мес',
    cpu: '2 vCPU',
    ram: '4 GB',
    storage: '40 GB NVMe',
    traffic: 'Безлимит',
    features: ['DDoS защита', 'NVMe диски', '99.99% SLA', 'Поддержка 24/7', 'Панель управления'],
    pros: ['Лучшее соотношение цена/качество', 'Быстрая техподдержка', 'Удобная панель управления', 'Стабильная работа'],
    cons: ['Минимальная конфигурация для начинающих']
  },
  {
    id: 2,
    name: 'Beget',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/cb5c67be-af76-4963-81a3-66f542907b9d.jpg',
    rating: 9.6,
    price: '350 ₽/мес',
    cpu: '2 vCPU',
    ram: '2 GB',
    storage: '25 GB SSD',
    traffic: 'Безлимит',
    features: ['Защита от DDoS', 'Автобэкапы', 'SSL бесплатно', '24/7 поддержка', 'ISPmanager'],
    pros: ['Низкая стоимость', 'Простота использования', 'Отличная поддержка', 'Стабильная работа'],
    cons: ['Базовые ресурсы в минимальной конфигурации']
  },
  {
    id: 3,
    name: 'CloudVDS Pro',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/ae7859e0-64a7-4d13-8a4b-f88d53564d0a.jpg',
    rating: 9.5,
    price: '590 ₽/мес',
    cpu: '4 vCPU',
    ram: '8 GB',
    storage: '160 GB NVMe',
    traffic: 'Безлимит',
    features: ['DDoS защита', 'SSD диски', '99.9% Uptime', 'Техподдержка 24/7'],
    pros: ['Высокая производительность', 'Отличная поддержка', 'Гибкие тарифы'],
    cons: ['Цена выше среднего']
  },
  {
    id: 4,
    name: 'ServerSpace',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/ae7859e0-64a7-4d13-8a4b-f88d53564d0a.jpg',
    rating: 9.2,
    price: '450 ₽/мес',
    cpu: '2 vCPU',
    ram: '4 GB',
    storage: '80 GB SSD',
    traffic: '1000 GB',
    features: ['Snapshot', 'Firewall', 'Мониторинг', 'API доступ'],
    pros: ['Хорошее соотношение цена/качество', 'Простая панель управления'],
    cons: ['Ограниченный трафик']
  },
  {
    id: 5,
    name: 'HostPro VDS',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/ae7859e0-64a7-4d13-8a4b-f88d53564d0a.jpg',
    rating: 8.8,
    price: '390 ₽/мес',
    cpu: '2 vCPU',
    ram: '4 GB',
    storage: '60 GB SSD',
    traffic: '500 GB',
    features: ['Бэкапы', 'SSL сертификаты', 'cPanel'],
    pros: ['Низкая цена', 'Быстрая активация'],
    cons: ['Базовая конфигурация', 'Медленная техподдержка']
  }
];

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Icon name="Server" className="text-primary-foreground" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  VDS Рейтинг
                </h1>
                <p className="text-xs text-muted-foreground">Лучшие провайдеры 2024</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#rating" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Рейтинг
              </a>
              <a href="#reviews" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Обзоры
              </a>
              <Button size="sm" className="shadow-lg shadow-primary/20">
                Сравнить
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-0 px-4 py-2">
              <Icon name="Sparkles" size={14} className="mr-2" />
              Обновлено в октябре 2024
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Найдите идеальный <span className="text-primary">VDS</span> для вашего проекта
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Независимое сравнение лучших VDS провайдеров России по цене, производительности и отзывам
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button size="lg" className="h-14 px-8 shadow-lg shadow-primary/20 text-base">
                <Icon name="Award" size={20} className="mr-2" />
                Посмотреть рейтинг
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Читать обзоры
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="rating" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Trophy" size={20} className="text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Топ VDS провайдеров
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Рейтинг основан на производительности, надежности и отзывах реальных пользователей
            </p>
          </div>

          <div className="grid gap-4 max-w-5xl mx-auto">
            {providers.map((provider, index) => (
              <Card 
                key={provider.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border bg-card group"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted flex items-center justify-center ring-1 ring-border">
                          <img src={provider.logo} alt={provider.name} className="w-14 h-14 object-contain" />
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 w-7 h-7 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                            <Icon name="Crown" size={14} className="text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl text-foreground">{provider.name}</CardTitle>
                          <Badge variant="secondary" className="font-semibold">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={14} 
                                className={i < Math.floor(provider.rating) ? "fill-secondary text-secondary" : "text-muted-foreground/30"}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-lg text-foreground">{provider.rating}</span>
                          <span className="text-muted-foreground text-sm">/ 10</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left md:text-right flex-shrink-0">
                      <div className="text-sm text-muted-foreground mb-1">От</div>
                      <div className="text-4xl font-bold text-primary mb-3">
                        {provider.price}
                      </div>
                      <Button className="w-full md:w-auto shadow-md">
                        <Icon name="ExternalLink" size={16} className="mr-2" />
                        Перейти
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Cpu" size={16} className="text-primary" />
                        <div className="text-xs text-muted-foreground font-medium">Процессор</div>
                      </div>
                      <div className="font-semibold text-foreground">{provider.cpu}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="MemoryStick" size={16} className="text-primary" />
                        <div className="text-xs text-muted-foreground font-medium">Память</div>
                      </div>
                      <div className="font-semibold text-foreground">{provider.ram}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="HardDrive" size={16} className="text-primary" />
                        <div className="text-xs text-muted-foreground font-medium">Диск</div>
                      </div>
                      <div className="font-semibold text-foreground">{provider.storage}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Network" size={16} className="text-primary" />
                        <div className="text-xs text-muted-foreground font-medium">Трафик</div>
                      </div>
                      <div className="font-semibold text-foreground">{provider.traffic}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="bg-background">
                        <Icon name="Check" size={12} className="mr-1 text-primary" />
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full text-sm"
                    onClick={() => setSelectedProvider(selectedProvider?.id === provider.id ? null : provider)}
                  >
                    {selectedProvider?.id === provider.id ? (
                      <>
                        <Icon name="ChevronUp" size={16} className="mr-2" />
                        Скрыть детали
                      </>
                    ) : (
                      <>
                        <Icon name="ChevronDown" size={16} className="mr-2" />
                        Показать детали
                      </>
                    )}
                  </Button>

                  {selectedProvider?.id === provider.id && (
                    <div className="mt-6 pt-6 border-t grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                          <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Icon name="ThumbsUp" size={16} className="text-green-600 dark:text-green-400" />
                          </div>
                          Преимущества
                        </h4>
                        <ul className="space-y-2">
                          {provider.pros.map((pro, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2 text-muted-foreground">
                              <Icon name="Plus" size={14} className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                          <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                            <Icon name="ThumbsDown" size={16} className="text-orange-600 dark:text-orange-400" />
                          </div>
                          Недостатки
                        </h4>
                        <ul className="space-y-2">
                          {provider.cons.map((con, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2 text-muted-foreground">
                              <Icon name="Minus" size={14} className="text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Детальные обзоры
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Глубокий анализ каждого провайдера от наших экспертов
            </p>
          </div>

          <Tabs defaultValue="timeweb" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-5 mb-10 h-auto p-1 bg-muted/30">
              <TabsTrigger value="timeweb" className="text-sm py-3">Timeweb</TabsTrigger>
              <TabsTrigger value="beget" className="text-sm py-3">Beget</TabsTrigger>
              <TabsTrigger value="cloudvds" className="text-sm py-3">CloudVDS</TabsTrigger>
              <TabsTrigger value="serverspace" className="text-sm py-3">ServerSpace</TabsTrigger>
              <TabsTrigger value="hostpro" className="text-sm py-3">HostPro</TabsTrigger>
            </TabsList>
            
            {[
              { value: 'timeweb', provider: providers[0], desc: 'Лидер облачных VDS решений', sections: [
                { icon: 'Info', title: 'О провайдере', text: 'Timeweb Cloud — крупнейший российский хостинг-провайдер с 20-летней историей. Предлагает облачные VDS на базе собственной инфраструктуры с дата-центрами в России. Известен надежностью, быстрой техподдержкой и удобной панелью управления.' },
                { icon: 'Zap', title: 'Производительность', text: 'Все серверы работают на NVMe дисках со скоростью до 3000 МБ/с. Использование новейших процессоров Intel Xeon и выделенные ресурсы гарантируют стабильную работу. SLA 99.99% подтверждает высокую надежность инфраструктуры.' },
                { icon: 'Shield', title: 'Безопасность и поддержка', text: 'Бесплатная защита от DDoS атак, автоматические бэкапы и мониторинг серверов. Техническая поддержка работает круглосуточно на русском языке. Среднее время ответа — менее 5 минут.' }
              ]},
              { value: 'beget', provider: providers[1], desc: 'Доступный и надежный VDS хостинг', sections: [
                { icon: 'Info', title: 'О провайдере', text: 'Beget — один из самых популярных российских хостинг-провайдеров с 2005 года. Известен простотой использования, доступными ценами и качественной технической поддержкой. Отлично подходит как для начинающих, так и для опытных пользователей.' },
                { icon: 'Zap', title: 'Производительность', text: 'VDS серверы работают на SSD дисках с хорошей скоростью доступа. Панель управления ISPmanager делает администрирование простым и понятным. Безлимитный трафик позволяет не беспокоиться о дополнительных расходах при высокой нагрузке.' },
                { icon: 'Shield', title: 'Преимущества', text: 'Защита от DDoS атак, бесплатные SSL сертификаты и автоматические бэкапы входят в стоимость. Техподдержка 24/7 отвечает быстро и помогает решить любые вопросы. Низкая стоимость делает Beget отличным выбором для малого бизнеса.' }
              ]},
              { value: 'cloudvds', provider: providers[2], desc: 'Премиальный VDS хостинг', sections: [
                { icon: 'Info', title: 'О провайдере', text: 'CloudVDS Pro — один из лидеров рынка VDS хостинга в России. Компания специализируется на высокопроизводительных виртуальных серверах с использованием последних технологий. Отличается стабильной работой и профессиональной технической поддержкой.' },
                { icon: 'Zap', title: 'Производительность', text: 'Серверы оснащены процессорами последнего поколения Intel Xeon и AMD EPYC. Использование NVMe SSD дисков обеспечивает скорость чтения до 3500 МБ/с. Время отклика серверов составляет менее 1 мс в пределах ЦОД.' },
                { icon: 'Shield', title: 'Безопасность', text: 'Встроенная защита от DDoS атак до 500 Гбит/с. Возможность настройки firewall правил через удобную панель управления. Регулярное автоматическое резервное копирование данных.' }
              ]},
              { value: 'serverspace', provider: providers[3], desc: 'Оптимальное соотношение цены и качества', sections: [
                { icon: 'Info', title: 'О провайдере', text: 'ServerSpace предлагает надежные VDS решения по доступным ценам. Компания фокусируется на балансе между стоимостью и производительностью, делая качественный хостинг доступным для малого и среднего бизнеса.' },
                { icon: 'Zap', title: 'Производительность', text: 'SSD диски SATA III обеспечивают хорошую скорость работы для большинства проектов. Процессоры Intel Xeon E5 показывают стабильную производительность. Средняя загрузка серверов не превышает 60%, что гарантирует запас мощности.' },
                { icon: 'DollarSign', title: 'Ценовая политика', text: 'Гибкая система тарифов позволяет выбрать оптимальную конфигурацию под конкретные задачи. При годовой оплате предоставляется скидка до 20%. Отсутствие скрытых платежей.' }
              ]},
              { value: 'hostpro', provider: providers[4], desc: 'Бюджетное решение для стартапов', sections: [
                { icon: 'Info', title: 'О провайдере', text: 'HostPro VDS специализируется на предоставлении базовых VDS конфигураций по минимальным ценам. Идеальный выбор для небольших проектов, разработчиков и тех, кто только начинает работу с VDS.' },
                { icon: 'Zap', title: 'Производительность', text: 'Базовые конфигурации достаточны для работы небольших сайтов и тестовых проектов. SSD диски обеспечивают приемлемую скорость работы. Возможность быстрого апгрейда при необходимости.' },
                { icon: 'Target', title: 'Для кого подходит', text: 'Отличный вариант для разработчиков, изучающих работу с VDS, небольших landing page, тестовых окружений и pet-проектов. Простая панель управления не требует специальных знаний.' }
              ]}
            ].map(({ value, provider, desc, sections }) => (
              <TabsContent key={value} value={value}>
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-5 mb-6">
                      <img 
                        src={provider.logo} 
                        alt={provider.name} 
                        className="w-24 h-24 rounded-2xl object-cover ring-2 ring-border"
                      />
                      <div>
                        <CardTitle className="text-3xl mb-2">{provider.name}</CardTitle>
                        <CardDescription className="text-base">{desc}</CardDescription>
                        <div className="flex items-center gap-2 mt-3">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="Star" 
                              size={16} 
                              className={i < Math.floor(provider.rating) ? "fill-secondary text-secondary" : "text-muted-foreground/30"}
                            />
                          ))}
                          <span className="font-bold text-lg ml-2">{provider.rating}</span>
                          <span className="text-muted-foreground">/ 10</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {sections.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Icon name={section.icon as any} size={20} className="text-primary" />
                          </div>
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {section.text}
                        </p>
                      </div>
                    ))}

                    <div className="pt-6 border-t">
                      <Button size="lg" className="w-full shadow-lg shadow-primary/20">
                        <Icon name="ExternalLink" size={20} className="mr-2" />
                        Перейти на сайт {provider.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <Card className="max-w-5xl mx-auto border-2 shadow-xl">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="Lightbulb" size={20} className="text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-3">
                Как выбрать VDS?
              </CardTitle>
              <CardDescription className="text-base">
                Основные критерии для правильного выбора хостинга
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              {[
                { icon: 'Target', title: 'Определите задачи', text: 'Оцените требования вашего проекта: веб-сайт, база данных, игровой сервер или что-то другое' },
                { icon: 'Gauge', title: 'Подберите ресурсы', text: 'Выберите конфигурацию с запасом: CPU, RAM, дисковое пространство и трафик' },
                { icon: 'MapPin', title: 'Учтите географию', text: 'Выбирайте дата-центр ближе к вашей целевой аудитории для минимальной задержки' },
                { icon: 'Headphones', title: 'Проверьте поддержку', text: 'Наличие круглосуточной техподдержки на русском языке критично для быстрого решения проблем' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-background rounded-2xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as any} size={22} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground text-base">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center">
                  <Icon name="Server" className="text-primary-foreground" size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    VDS Рейтинг
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Независимая платформа сравнения провайдеров
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Icon name="Mail" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground pt-8 mt-8 border-t text-center">
              © 2024 VDS Рейтинг. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
