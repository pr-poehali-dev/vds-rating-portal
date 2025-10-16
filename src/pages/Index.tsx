import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Provider {
  id: number;
  name: string;
  logo: string;
  rating: number;
  basePrice: number;
  cpuPrice: number;
  ramPrice: number;
  storagePrice: number;
  features: string[];
  pros: string[];
  cons: string[];
}

interface ResourceConfig {
  cpu: number;
  ram: number;
  storage: number;
}

const providers: Provider[] = [
  {
    id: 1,
    name: 'Timeweb Cloud',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/c68c0760-0692-436d-8905-b2f1b5486586.jpg',
    rating: 9.8,
    basePrice: 199,
    cpuPrice: 100,
    ramPrice: 50,
    storagePrice: 2,
    features: ['DDoS защита', 'NVMe диски', '99.99% SLA', 'Поддержка 24/7'],
    pros: ['Лучшее соотношение цена/качество', 'Быстрая техподдержка', 'Удобная панель управления'],
    cons: ['Минимальная конфигурация для начинающих']
  },
  {
    id: 2,
    name: 'Beget',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/cb5c67be-af76-4963-81a3-66f542907b9d.jpg',
    rating: 9.6,
    basePrice: 150,
    cpuPrice: 90,
    ramPrice: 45,
    storagePrice: 1.5,
    features: ['Защита от DDoS', 'Автобэкапы', 'SSL бесплатно', '24/7 поддержка'],
    pros: ['Низкая стоимость', 'Простота использования', 'Отличная поддержка'],
    cons: ['Базовые ресурсы в минимальной конфигурации']
  },
  {
    id: 3,
    name: 'CloudVDS Pro',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/ae7859e0-64a7-4d13-8a4b-f88d53564d0a.jpg',
    rating: 9.5,
    basePrice: 290,
    cpuPrice: 120,
    ramPrice: 60,
    storagePrice: 2.5,
    features: ['DDoS защита', 'SSD диски', '99.9% Uptime', 'Техподдержка 24/7'],
    pros: ['Высокая производительность', 'Отличная поддержка', 'Гибкие тарифы'],
    cons: ['Цена выше среднего']
  }
];

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [configOpen, setConfigOpen] = useState<number | null>(null);
  const [configs, setConfigs] = useState<Record<number, ResourceConfig>>({
    1: { cpu: 2, ram: 4, storage: 40 },
    2: { cpu: 2, ram: 2, storage: 25 },
    3: { cpu: 4, ram: 8, storage: 160 }
  });

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
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-card/60 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-2xl blur-xl opacity-50 shadow-neon"></div>
                <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <Icon name="Zap" className="text-background" size={22} />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">VDS Rating</h1>
                <p className="text-xs text-muted-foreground font-medium">Топ хостингов</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#providers" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
                Провайдеры
              </a>
              <a href="#compare" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
                Сравнение
              </a>
              <Button className="bg-primary text-background font-bold shadow-lg shadow-primary/30 hover:shadow-neon transition-all">
                Начать
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-accent border border-primary/30 rounded-full px-5 py-2.5">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-neon"></div>
              <span className="text-sm font-bold text-primary">Топ провайдеров 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight">
              <span className="block text-foreground">Найди</span>
              <span className="block gradient-text">идеальный хостинг</span>
              <span className="block text-foreground">для своего проекта</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Сравни характеристики, цены и отзывы. Выбери лучшее решение за пару минут.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="h-14 px-8 text-base font-bold bg-primary text-background shadow-xl shadow-primary/30 hover:shadow-neon transition-all group rounded-xl">
                Посмотреть рейтинг
                <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-2 border-border rounded-xl hover:bg-accent hover:border-primary/50 transition-all">
                <Icon name="Play" size={18} className="mr-2" />
                Как выбрать
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              {[
                { icon: 'Users', value: '2,500+', label: 'Довольных клиентов' },
                { icon: 'Star', value: '4.9', label: 'Средний рейтинг' },
                { icon: 'Shield', value: '100%', label: 'Защита данных' }
              ].map((stat, idx) => (
                <div key={idx} className="group">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-accent border border-primary/20 rounded-2xl mb-4 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-neon transition-all">
                    <Icon name={stat.icon as any} size={24} className="text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
            {providers.map((provider, index) => {
              const config = configs[provider.id];
              const calculatedPrice = calculatePrice(provider, config);

              return (
                <Card 
                  key={provider.id}
                  className="group border-2 border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden relative bg-card"
                >
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary rounded-bl-2xl rounded-tr-xl blur-lg"></div>
                        <div className="relative bg-primary text-background font-bold px-5 py-2.5 rounded-bl-2xl rounded-tr-xl shadow-lg flex items-center gap-2">
                          <Icon name="Crown" size={16} />
                          Лидер рейтинга
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                      <div className="flex items-start gap-6 flex-1">
                        <div className="relative flex-shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-accent border border-primary/10 shadow-soft flex items-center justify-center">
                            <img src={provider.logo} alt={provider.name} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg text-background text-sm font-bold">
                            {index + 1}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{provider.name}</h3>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Icon 
                                  key={i}
                                  name="Star" 
                                  size={16} 
                                  className={i < Math.floor(provider.rating) ? "fill-primary text-primary" : "text-muted"}
                                />
                              ))}
                            </div>
                            <span className="text-xl font-bold text-foreground">{provider.rating}</span>
                            <span className="text-muted-foreground text-sm">/10</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {provider.features.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} className="bg-accent border border-primary/20 text-foreground font-semibold text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full lg:w-auto flex-shrink-0">
                        <div className="bg-accent border-2 border-primary/20 rounded-2xl p-6 text-center">
                          <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Цена</div>
                          <div className="flex items-baseline justify-center gap-1 mb-1">
                            <span className="text-4xl md:text-5xl font-black text-primary">{calculatedPrice}</span>
                            <span className="text-xl text-muted-foreground">₽</span>
                          </div>
                          <div className="text-sm text-muted-foreground font-medium mb-4">/месяц</div>
                          <Button className="w-full h-12 text-sm font-bold bg-primary text-background shadow-lg shadow-primary/30 hover:shadow-neon transition-all group">
                            Перейти
                            <Icon name="ExternalLink" size={16} className="ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="space-y-4">
                      <Button 
                        variant="ghost" 
                        className="w-full text-sm font-semibold hover:bg-accent/50 hover:text-primary justify-between"
                        onClick={() => setConfigOpen(configOpen === provider.id ? null : provider.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="Settings" size={18} />
                          <span>Настроить конфигурацию</span>
                        </div>
                        <Icon name={configOpen === provider.id ? "ChevronUp" : "ChevronDown"} size={18} />
                      </Button>

                      {configOpen === provider.id && (
                        <div className="bg-accent/50 border border-primary/10 rounded-2xl p-6 animate-in slide-in-from-top duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Icon name="Sliders" size={20} className="text-primary" />
                              <h4 className="text-lg font-bold text-foreground">Конфигуратор ресурсов</h4>
                            </div>
                            <Badge className="bg-primary/20 text-primary border-0">Настрой под себя</Badge>
                          </div>
                          
                          <div className="space-y-6">
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                    <Icon name="Cpu" size={16} className="text-primary" />
                                  </div>
                                  <span className="text-sm font-bold text-foreground">CPU</span>
                                </div>
                                <span className="text-lg font-black text-primary">{config.cpu} vCPU</span>
                              </div>
                              <Slider
                                value={[config.cpu]}
                                onValueChange={(value) => updateConfig(provider.id, 'cpu', value[0])}
                                min={1}
                                max={16}
                                step={1}
                                className="cursor-pointer"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>1 vCPU</span>
                                <span>16 vCPU</span>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                    <Icon name="MemoryStick" size={16} className="text-primary" />
                                  </div>
                                  <span className="text-sm font-bold text-foreground">RAM</span>
                                </div>
                                <span className="text-lg font-black text-primary">{config.ram} GB</span>
                              </div>
                              <Slider
                                value={[config.ram]}
                                onValueChange={(value) => updateConfig(provider.id, 'ram', value[0])}
                                min={1}
                                max={64}
                                step={1}
                                className="cursor-pointer"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>1 GB</span>
                                <span>64 GB</span>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                    <Icon name="HardDrive" size={16} className="text-primary" />
                                  </div>
                                  <span className="text-sm font-bold text-foreground">Диск</span>
                                </div>
                                <span className="text-lg font-black text-primary">{config.storage} GB</span>
                              </div>
                              <Slider
                                value={[config.storage]}
                                onValueChange={(value) => updateConfig(provider.id, 'storage', value[0])}
                                min={10}
                                max={500}
                                step={10}
                                className="cursor-pointer"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>10 GB</span>
                                <span>500 GB</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-6 border-t border-border">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Трафик</span>
                              <div className="flex items-center gap-2">
                                <Icon name="Wifi" size={16} className="text-secondary" />
                                <span className="text-sm font-bold text-foreground">Безлимит</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button 
                        variant="ghost" 
                        className="w-full text-sm font-semibold hover:bg-accent/50 hover:text-primary justify-between"
                        onClick={() => setSelectedProvider(selectedProvider?.id === provider.id ? null : provider)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name={selectedProvider?.id === provider.id ? "ThumbsDown" : "ThumbsUp"} size={18} />
                          <span>{selectedProvider?.id === provider.id ? "Скрыть" : "Показать"} плюсы и минусы</span>
                        </div>
                        <Icon name={selectedProvider?.id === provider.id ? "ChevronUp" : "ChevronDown"} size={18} />
                      </Button>

                      {selectedProvider?.id === provider.id && (
                        <div className="pt-4 border-t border-border grid md:grid-cols-2 gap-4">
                          <div className="bg-accent border border-secondary/30 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
                                <Icon name="Check" size={18} className="text-background" />
                              </div>
                              <h4 className="text-base font-bold text-foreground">Преимущества</h4>
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
                          
                          <div className="bg-accent border border-destructive/30 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-9 h-9 bg-destructive rounded-xl flex items-center justify-center shadow-lg">
                                <Icon name="AlertCircle" size={18} className="text-white" />
                              </div>
                              <h4 className="text-base font-bold text-foreground">Недостатки</h4>
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
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent border border-primary/30 rounded-full px-5 py-2.5">
                <Icon name="Lightbulb" size={16} className="text-primary" />
                <span className="text-sm font-bold text-primary">Гайд по выбору</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
                Как выбрать VDS хостинг?
              </h2>
              <p className="text-xl text-muted-foreground">
                Следуй этим 4 шагам для правильного выбора
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: 'Target', 
                  title: 'Определи задачи', 
                  text: 'Понять для чего нужен сервер: сайт, приложение или база данных' 
                },
                { 
                  icon: 'Cpu', 
                  title: 'Выбери ресурсы', 
                  text: 'Подобрать CPU, RAM и диск с запасом для роста проекта' 
                },
                { 
                  icon: 'Globe', 
                  title: 'Проверь локацию', 
                  text: 'Выбрать дата-центр ближе к аудитории для скорости' 
                },
                { 
                  icon: 'Headphones', 
                  title: 'Оцени поддержку', 
                  text: 'Убедиться в наличии поддержки 24/7 на русском языке' 
                }
              ].map((step, idx) => (
                <Card key={idx} className="border-2 border-border hover:border-primary/50 transition-all group hover-lift bg-card">
                  <CardHeader className="p-6 md:p-8">
                    <div className="relative mb-6 inline-block">
                      <div className="absolute inset-0 bg-primary rounded-2xl blur-lg opacity-40"></div>
                      <div className="relative w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-neon transition-all">
                        <Icon name={step.icon as any} size={28} className="text-background" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed font-medium">
                      {step.text}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary rounded-2xl blur-lg opacity-50"></div>
                    <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                      <Icon name="Zap" className="text-background" size={22} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">VDS Rating</h3>
                    <p className="text-xs text-muted-foreground font-medium">Топ хостингов</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Независимая платформа для сравнения VDS провайдеров. Помогаем найти идеальное решение для вашего проекта.
                </p>
                <div className="flex gap-3">
                  {['Mail', 'MessageCircle', 'Send'].map((icon, idx) => (
                    <Button key={idx} size="icon" variant="outline" className="rounded-xl hover:border-primary hover:bg-primary/10 hover:text-primary transition-all">
                      <Icon name={icon as any} size={18} />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Провайдеры</h4>
                <ul className="space-y-3">
                  {['Рейтинг', 'Сравнение', 'Отзывы', 'Акции'].map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Помощь</h4>
                <ul className="space-y-3">
                  {['FAQ', 'Контакты', 'Блог', 'О нас'].map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground font-medium">
                © 2025 VDS Rating. Все права защищены.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground font-medium">
                <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
                <a href="#" className="hover:text-primary transition-colors">Условия</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;