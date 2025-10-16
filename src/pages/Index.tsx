import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    price: '399',
    cpu: '2 vCPU',
    ram: '4 GB',
    storage: '40 GB NVMe',
    traffic: 'Безлимит',
    features: ['DDoS защита', 'NVMe диски', '99.99% SLA', 'Поддержка 24/7'],
    pros: ['Лучшее соотношение цена/качество', 'Быстрая техподдержка', 'Удобная панель управления'],
    cons: ['Минимальная конфигурация для начинающих']
  },
  {
    id: 2,
    name: 'Beget',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/cb5c67be-af76-4963-81a3-66f542907b9d.jpg',
    rating: 9.6,
    price: '350',
    cpu: '2 vCPU',
    ram: '2 GB',
    storage: '25 GB SSD',
    traffic: 'Безлимит',
    features: ['Защита от DDoS', 'Автобэкапы', 'SSL бесплатно', '24/7 поддержка'],
    pros: ['Низкая стоимость', 'Простота использования', 'Отличная поддержка'],
    cons: ['Базовые ресурсы в минимальной конфигурации']
  },
  {
    id: 3,
    name: 'CloudVDS Pro',
    logo: 'https://cdn.poehali.dev/projects/59a78fde-be4d-41d0-a25a-c34adf675973/files/ae7859e0-64a7-4d13-8a4b-f88d53564d0a.jpg',
    rating: 9.5,
    price: '590',
    cpu: '4 vCPU',
    ram: '8 GB',
    storage: '160 GB NVMe',
    traffic: 'Безлимит',
    features: ['DDoS защита', 'SSD диски', '99.9% Uptime', 'Техподдержка 24/7'],
    pros: ['Высокая производительность', 'Отличная поддержка', 'Гибкие тарифы'],
    cons: ['Цена выше среднего']
  }
];

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">VDS Rating</h1>
                <p className="text-xs text-muted-foreground">Выбирай лучшее</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#providers" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Провайдеры
              </a>
              <a href="#compare" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Сравнение
              </a>
              <Button className="bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                Начать выбор
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-0 px-6 py-2.5 text-sm font-semibold">
              <Icon name="Sparkles" size={14} className="mr-2" />
              Топ провайдеров России
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-black leading-tight">
              <span className="block text-foreground">Выбери</span>
              <span className="block gradient-text">идеальный VDS</span>
              <span className="block text-foreground">за 2 минуты</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Сравнивай цены, характеристики и отзывы. Находи лучшее решение для твоего проекта.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="h-16 px-10 text-lg font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all group">
                Смотреть рейтинг
                <Icon name="TrendingUp" size={22} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-semibold border-2">
                Как выбрать VDS
                <Icon name="Play" size={20} className="ml-3" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto">
              {[
                { icon: 'Users', value: '2,500+', label: 'Довольных клиентов' },
                { icon: 'Star', value: '4.9/5', label: 'Средний рейтинг' },
                { icon: 'Award', value: '20+', label: 'Проверенных провайдеров' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                    <Icon name={stat.icon as any} size={20} className="text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="providers" className="py-24 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-secondary/10 text-secondary border-0 px-5 py-2 mb-6">
              <Icon name="Crown" size={14} className="mr-2" />
              Лучшие провайдеры
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              Топ-3 VDS хостинга
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выбрано на основе реальных отзывов и независимого тестирования
            </p>
          </div>

          <div className="grid gap-8 max-w-6xl mx-auto">
            {providers.map((provider, index) => (
              <Card 
                key={provider.id}
                className="group overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-2xl relative"
              >
                {index === 0 && (
                  <div className="absolute top-6 right-6 z-20">
                    <Badge className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary text-foreground font-bold px-4 py-2 shadow-lg shadow-secondary/30 animate-pulse">
                      <Icon name="Trophy" size={14} className="mr-1" />
                      Лучший выбор
                    </Badge>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <CardHeader className="relative z-10 p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="relative flex-shrink-0">
                        <div className="w-28 h-28 rounded-3xl overflow-hidden bg-white shadow-lg ring-4 ring-primary/10 flex items-center justify-center">
                          <img src={provider.logo} alt={provider.name} className="w-20 h-20 object-contain" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg text-white font-bold">
                          #{index + 1}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-3xl font-bold text-foreground mb-3">{provider.name}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i}
                                name="Star" 
                                size={18} 
                                className={i < Math.floor(provider.rating) ? "fill-secondary text-secondary" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-2xl font-bold text-foreground">{provider.rating}</span>
                          <span className="text-muted-foreground">/10</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {provider.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="font-medium">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 text-center lg:text-right bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border-2 border-primary/20">
                      <div className="text-sm font-semibold text-primary mb-2">ЦЕНА ОТ</div>
                      <div className="text-5xl font-black text-foreground mb-1">
                        {provider.price}
                        <span className="text-2xl text-muted-foreground ml-1">₽</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-6">/месяц</div>
                      <Button className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all group">
                        Перейти к оформлению
                        <Icon name="ArrowRight" size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 px-8 pb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { icon: 'Cpu', label: 'CPU', value: provider.cpu },
                      { icon: 'MemoryStick', label: 'RAM', value: provider.ram },
                      { icon: 'HardDrive', label: 'Диск', value: provider.storage },
                      { icon: 'Wifi', label: 'Трафик', value: provider.traffic }
                    ].map((spec, idx) => (
                      <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name={spec.icon as any} size={16} className="text-primary" />
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{spec.label}</span>
                        </div>
                        <div className="text-lg font-bold text-foreground">{spec.value}</div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full text-sm font-medium"
                    onClick={() => setSelectedProvider(selectedProvider?.id === provider.id ? null : provider)}
                  >
                    {selectedProvider?.id === provider.id ? (
                      <>
                        <Icon name="ChevronUp" size={18} className="mr-2" />
                        Скрыть подробности
                      </>
                    ) : (
                      <>
                        <Icon name="ChevronDown" size={18} className="mr-2" />
                        Показать плюсы и минусы
                      </>
                    )}
                  </Button>

                  {selectedProvider?.id === provider.id && (
                    <div className="mt-6 pt-6 border-t grid md:grid-cols-2 gap-6 animate-in slide-in-from-top duration-300">
                      <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                            <Icon name="ThumbsUp" size={20} className="text-green-600" />
                          </div>
                          <h4 className="text-lg font-bold text-foreground">Преимущества</h4>
                        </div>
                        <ul className="space-y-3">
                          {provider.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-foreground">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                            <Icon name="AlertCircle" size={20} className="text-orange-600" />
                          </div>
                          <h4 className="text-lg font-bold text-foreground">Недостатки</h4>
                        </div>
                        <ul className="space-y-3">
                          {provider.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Icon name="Minus" size={18} className="text-orange-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-foreground">{con}</span>
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

          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold border-2">
              Смотреть все {providers.length + 17} провайдеров
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-0 px-5 py-2 mb-6">
                <Icon name="Lightbulb" size={14} className="mr-2" />
                Полезные советы
              </Badge>
              <h2 className="text-5xl font-black text-foreground mb-4">
                Как выбрать VDS?
              </h2>
              <p className="text-xl text-muted-foreground">
                4 простых шага к правильному решению
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: 'Target', 
                  color: 'from-blue-500 to-cyan-500',
                  title: 'Определи задачи', 
                  text: 'Понять для чего нужен сервер: сайт, приложение, база данных или игровой сервер' 
                },
                { 
                  icon: 'Settings', 
                  color: 'from-purple-500 to-pink-500',
                  title: 'Выбери ресурсы', 
                  text: 'Подобрать нужное количество CPU, RAM и дискового пространства с запасом' 
                },
                { 
                  icon: 'MapPin', 
                  color: 'from-green-500 to-emerald-500',
                  title: 'Проверь локацию', 
                  text: 'Выбрать дата-центр ближе к целевой аудитории для минимальных задержек' 
                },
                { 
                  icon: 'Headphones', 
                  color: 'from-orange-500 to-yellow-500',
                  title: 'Оцени поддержку', 
                  text: 'Убедиться в наличии техподдержки 24/7 на русском языке' 
                }
              ].map((step, idx) => (
                <Card key={idx} className="border-2 hover:border-primary/30 transition-all group shadow-lg hover:shadow-xl">
                  <CardHeader className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon name={step.icon as any} size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {step.text}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Icon name="Zap" className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">VDS Rating</h3>
                    <p className="text-xs text-muted-foreground">Выбирай лучшее</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Независимая платформа для сравнения VDS провайдеров. Помогаем выбрать лучшее решение для вашего проекта.
                </p>
                <div className="flex gap-3">
                  {['Mail', 'MessageCircle', 'Send'].map((icon, idx) => (
                    <Button key={idx} variant="outline" size="icon" className="rounded-xl hover:border-primary hover:text-primary transition-colors">
                      <Icon name={icon as any} size={18} />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-foreground mb-4">Провайдеры</h4>
                <ul className="space-y-3">
                  {['Рейтинг', 'Сравнение', 'Отзывы', 'Акции'].map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-foreground mb-4">Помощь</h4>
                <ul className="space-y-3">
                  {['FAQ', 'Контакты', 'Блог', 'О проекте'].map((item, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 VDS Rating. Все права защищены.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
                <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
