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
    id: 3,
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
    id: 4,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50 dark:to-purple-950/20">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Server" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  VDS Рейтинг
                </h1>
                <p className="text-xs text-muted-foreground">Лучшие VDS провайдеры 2024</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#rating" className="text-sm font-medium hover:text-primary transition-colors">
                Рейтинг
              </a>
              <a href="#reviews" className="text-sm font-medium hover:text-primary transition-colors">
                Обзоры
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
              <Icon name="TrendingUp" size={16} className="mr-1" />
              Актуально на октябрь 2024
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Независимый рейтинг VDS провайдеров
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Сравните характеристики, цены и отзывы о лучших VDS/VPS хостингах России и выберите оптимальное решение для вашего проекта
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Award" size={20} className="mr-2" />
                Посмотреть рейтинг
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Читать обзоры
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <section id="rating" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <Icon name="Trophy" size={32} className="inline-block mr-2 text-primary" />
              Топ VDS провайдеров
            </h2>
            <p className="text-muted-foreground">Рейтинг основан на производительности, цене и отзывах пользователей</p>
          </div>

          <div className="grid gap-6 max-w-6xl mx-auto">
            {providers.map((provider, index) => (
              <Card 
                key={provider.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          <img src={provider.logo} alt={provider.name} className="w-12 h-12 object-contain" />
                        </div>
                        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-secondary text-white border-0">
                          #{index + 1}
                        </Badge>
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{provider.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-lg">{provider.rating}</span>
                          </div>
                          <span className="text-muted-foreground">/ 10</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {provider.price}
                      </div>
                      <Button className="mt-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="ExternalLink" size={16} className="mr-2" />
                        Перейти
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Icon name="Cpu" size={20} className="text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">CPU</div>
                        <div className="font-semibold">{provider.cpu}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Icon name="MemoryStick" size={20} className="text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">RAM</div>
                        <div className="font-semibold">{provider.ram}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Icon name="HardDrive" size={20} className="text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Диск</div>
                        <div className="font-semibold">{provider.storage}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Icon name="Network" size={20} className="text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Трафик</div>
                        <div className="font-semibold">{provider.traffic}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        <Icon name="Check" size={14} className="mr-1" />
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setSelectedProvider(selectedProvider?.id === provider.id ? null : provider)}
                  >
                    {selectedProvider?.id === provider.id ? (
                      <>
                        <Icon name="ChevronUp" size={16} className="mr-2" />
                        Скрыть подробности
                      </>
                    ) : (
                      <>
                        <Icon name="ChevronDown" size={16} className="mr-2" />
                        Показать подробности
                      </>
                    )}
                  </Button>

                  {selectedProvider?.id === provider.id && (
                    <div className="mt-4 pt-4 border-t grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Icon name="ThumbsUp" size={18} />
                          Преимущества
                        </h4>
                        <ul className="space-y-1">
                          {provider.pros.map((pro, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <Icon name="Plus" size={16} className="text-green-600 dark:text-green-400 mt-0.5" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                          <Icon name="ThumbsDown" size={18} />
                          Недостатки
                        </h4>
                        <ul className="space-y-1">
                          {provider.cons.map((con, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <Icon name="Minus" size={16} className="text-orange-600 dark:text-orange-400 mt-0.5" />
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

      <section id="reviews" className="py-16 bg-gradient-to-br from-muted/30 to-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <Icon name="FileText" size={32} className="inline-block mr-2 text-primary" />
              Детальные обзоры
            </h2>
            <p className="text-muted-foreground">Подробный анализ каждого провайдера</p>
          </div>

          <Tabs defaultValue="timeweb" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="timeweb">Timeweb Cloud</TabsTrigger>
              <TabsTrigger value="cloudvds">CloudVDS Pro</TabsTrigger>
              <TabsTrigger value="serverspace">ServerSpace</TabsTrigger>
              <TabsTrigger value="hostpro">HostPro VDS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeweb">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={providers[0].logo} 
                      alt="Timeweb Cloud" 
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <CardTitle className="text-2xl">Timeweb Cloud</CardTitle>
                      <CardDescription>Лидер облачных VDS решений</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">9.8</span>
                        <span className="text-muted-foreground">/ 10</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Info" size={20} className="text-primary" />
                      О провайдере
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Timeweb Cloud — крупнейший российский хостинг-провайдер с 20-летней историей. 
                      Предлагает облачные VDS на базе собственной инфраструктуры с дата-центрами в России. 
                      Известен надежностью, быстрой техподдержкой и удобной панелью управления.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Zap" size={20} className="text-primary" />
                      Производительность
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Все серверы работают на NVMe дисках с скоростью до 3000 МБ/с. Использование новейших 
                      процессоров Intel Xeon и выделенные ресурсы гарантируют стабильную работу. 
                      SLA 99.99% подтверждает высокую надежность инфраструктуры.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Shield" size={20} className="text-primary" />
                      Безопасность и поддержка
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Бесплатная защита от DDoS атак, автоматические бэкапы и мониторинг серверов. 
                      Техническая поддержка работает круглосуточно на русском языке. 
                      Среднее время ответа — менее 5 минут.
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="ExternalLink" size={20} className="mr-2" />
                      Перейти на сайт Timeweb Cloud
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cloudvds">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={providers[1].logo} 
                      alt="CloudVDS Pro" 
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <CardTitle className="text-2xl">CloudVDS Pro</CardTitle>
                      <CardDescription>Премиальный VDS хостинг</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">9.5</span>
                        <span className="text-muted-foreground">/ 10</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Info" size={20} className="text-primary" />
                      О провайдере
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      CloudVDS Pro — один из лидеров рынка VDS хостинга в России. Компания специализируется на 
                      высокопроизводительных виртуальных серверах с использованием последних технологий. 
                      Отличается стабильной работой и профессиональной технической поддержкой.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Zap" size={20} className="text-primary" />
                      Производительность
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Серверы оснащены процессорами последнего поколения Intel Xeon и AMD EPYC. 
                      Использование NVMe SSD дисков обеспечивает скорость чтения до 3500 МБ/с. 
                      Время отклика серверов составляет менее 1 мс в пределах ЦОД.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Shield" size={20} className="text-primary" />
                      Безопасность
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Встроенная защита от DDoS атак до 500 Гбит/с. Возможность настройки firewall правил 
                      через удобную панель управления. Регулярное автоматическое резервное копирование данных.
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="ExternalLink" size={20} className="mr-2" />
                      Перейти на сайт CloudVDS Pro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="serverspace">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={providers[2].logo} 
                      alt="ServerSpace" 
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <CardTitle className="text-2xl">ServerSpace</CardTitle>
                      <CardDescription>Оптимальное соотношение цены и качества</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">9.2</span>
                        <span className="text-muted-foreground">/ 10</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Info" size={20} className="text-primary" />
                      О провайдере
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      ServerSpace предлагает надежные VDS решения по доступным ценам. 
                      Компания фокусируется на балансе между стоимостью и производительностью, 
                      делая качественный хостинг доступным для малого и среднего бизнеса.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Zap" size={20} className="text-primary" />
                      Производительность
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      SSD диски SATA III обеспечивают хорошую скорость работы для большинства проектов. 
                      Процессоры Intel Xeon E5 показывают стабильную производительность. 
                      Средняя загрузка серверов не превышает 60%, что гарантирует запас мощности.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="DollarSign" size={20} className="text-primary" />
                      Ценовая политика
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Гибкая система тарифов позволяет выбрать оптимальную конфигурацию под конкретные задачи. 
                      При годовой оплате предоставляется скидка до 20%. Отсутствие скрытых платежей.
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="ExternalLink" size={20} className="mr-2" />
                      Перейти на сайт ServerSpace
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hostpro">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={providers[3].logo} 
                      alt="HostPro VDS" 
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <CardTitle className="text-2xl">HostPro VDS</CardTitle>
                      <CardDescription>Бюджетное решение для стартапов</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">8.8</span>
                        <span className="text-muted-foreground">/ 10</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Info" size={20} className="text-primary" />
                      О провайдере
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      HostPro VDS специализируется на предоставлении базовых VDS конфигураций по минимальным ценам. 
                      Идеальный выбор для небольших проектов, разработчиков и тех, кто только начинает работу с VDS.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Zap" size={20} className="text-primary" />
                      Производительность
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Базовые конфигурации достаточны для работы небольших сайтов и тестовых проектов. 
                      SSD диски обеспечивают приемлемую скорость работы. Возможность быстрого апгрейда при необходимости.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Target" size={20} className="text-primary" />
                      Для кого подходит
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Отличный вариант для разработчиков, изучающих работу с VDS, небольших landing page, 
                      тестовых окружений и pet-проектов. Простая панель управления не требует специальных знаний.
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="ExternalLink" size={20} className="mr-2" />
                      Перейти на сайт HostPro VDS
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">
                <Icon name="Lightbulb" size={32} className="inline-block mr-2 text-primary" />
                Как выбрать VDS?
              </CardTitle>
              <CardDescription>Основные критерии для правильного выбора</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <Icon name="Target" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Определите задачи</h4>
                  <p className="text-sm text-muted-foreground">
                    Оцените требования вашего проекта: веб-сайт, база данных, игровой сервер или что-то другое
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <Icon name="Gauge" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Подберите ресурсы</h4>
                  <p className="text-sm text-muted-foreground">
                    Выберите конфигурацию с запасом: CPU, RAM, дисковое пространство и трафик
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <Icon name="MapPin" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Учтите географию</h4>
                  <p className="text-sm text-muted-foreground">
                    Выбирайте дата-центр ближе к вашей целевой аудитории для минимальной задержки
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <Icon name="Headphones" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Проверьте поддержку</h4>
                  <p className="text-sm text-muted-foreground">
                    Наличие круглосуточной техподдержки на русском языке критично для быстрого решения проблем
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Server" className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                VDS Рейтинг
              </h3>
            </div>
            <p className="text-muted-foreground">
              Независимая платформа для сравнения VDS провайдеров
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Send" size={20} />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground pt-4 border-t">
              © 2024 VDS Рейтинг. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;