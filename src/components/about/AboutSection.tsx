import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/contact/ContactForm';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-accent border border-primary/30 rounded-full px-5 py-2.5">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="text-sm font-bold text-primary">О проекте</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
              О top-vds
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Независимая платформа для сравнения VDS хостинг-провайдеров
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Наша миссия</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы помогаем бизнесу и разработчикам найти идеальный VDS хостинг для их проектов. 
                    Наша платформа собирает актуальные данные о провайдерах, реальные отзывы пользователей 
                    и предоставляет удобные инструменты для сравнения конфигураций и цен.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Heart" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Почему мы создали top-vds</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Выбор VDS хостинга — это сложная задача. Провайдеров десятки, у каждого свои тарифы, 
                    особенности и подводные камни. Мы сами столкнулись с этой проблемой при выборе 
                    инфраструктуры для наших проектов.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Так родилась идея создать независимую платформу, где можно быстро сравнить провайдеров, 
                    настроить нужную конфигурацию и увидеть реальную стоимость. Без скрытых платежей и маркетинговых уловок.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Наши принципы</h2>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Независимость</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы не принадлежим ни одному провайдеру и публикуем объективную информацию
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Прозрачность</h3>
                    <p className="text-sm text-muted-foreground">
                      Все цены актуальны и рассчитываются в реальном времени на основе выбранной конфигурации
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Актуальность</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы регулярно обновляем информацию о провайдерах, тарифах и акциях
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Честность</h3>
                    <p className="text-sm text-muted-foreground">
                      Реальные отзывы пользователей проходят модерацию, но не цензурируются
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="TrendingUp" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Что мы предлагаем</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-xl">
                  <Icon name="Calculator" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Калькулятор стоимости</h3>
                    <p className="text-sm text-muted-foreground">
                      Настройте CPU, RAM и диск — мгновенно увидите точную стоимость у всех провайдеров
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-xl">
                  <Icon name="GitCompare" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Сравнение провайдеров</h3>
                    <p className="text-sm text-muted-foreground">
                      Выберите до 6 провайдеров и сравните их по всем параметрам в одной таблице
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-xl">
                  <Icon name="Star" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Реальные отзывы</h3>
                    <p className="text-sm text-muted-foreground">
                      Тысячи отзывов реальных пользователей о качестве работы провайдеров
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-xl">
                  <Icon name="Filter" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Умные фильтры</h3>
                    <p className="text-sm text-muted-foreground">
                      Фильтруйте по 152-ФЗ, локациям, виртуализации, наличию тестового периода и другим критериям
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="Mail" size={28} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Свяжитесь с нами
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Есть вопросы, предложения или хотите добавить своего провайдера в рейтинг? 
                  Мы всегда открыты для диалога и рады обратной связи!
                </p>
                <div className="flex items-center justify-center gap-3">
                  <ContactForm />
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-xl hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
                    asChild
                  >
                    <a href="https://t.me/top_vds_com" target="_blank" rel="noopener noreferrer">
                      <Icon name="Send" size={18} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};