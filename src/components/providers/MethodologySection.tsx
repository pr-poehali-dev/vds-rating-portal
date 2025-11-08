import Icon from '@/components/ui/icon';

export const MethodologySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2.5">
              <Icon name="FlaskConical" size={16} className="text-primary" />
              <span className="text-sm font-bold text-primary">Методология тестирования</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
              Как мы тестируем хостинги
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Объективные метрики на основе реальных измерений, без субъективных оценок
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:border-primary/50">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Icon name="Gauge" size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Скорость загрузки</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Тестовый сайт на WordPress с плагинами и медиа</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>10 последовательных замеров с разных локаций России</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>GTmetrix и Google PageSpeed Insights для проверки</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Измеряем TTFB, FCP, LCP и общее время загрузки</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:border-green-500/50">
              <div className="bg-green-500/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Icon name="Activity" size={28} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Мониторинг Uptime</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Автоматический пинг каждые 5 минут круглосуточно</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Фиксация времени недоступности до секунды</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Статистика за последние 30 дней в реальном времени</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Мониторинг с серверов в Москве, СПб и регионах</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:border-blue-500/50">
              <div className="bg-blue-500/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Icon name="DollarSign" size={28} className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Проверка цен</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Еженедельный парсинг официальных сайтов провайдеров</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Цены указаны с учётом всех скидок и акций</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Учитываем скрытые комиссии и доп. услуги</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Сравнение цен за месяц, квартал и год</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:border-orange-500/50">
              <div className="bg-orange-500/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Icon name="Users" size={28} className="text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Анализ поддержки</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Реальные обращения с типичными проблемами</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Замер времени ответа в чате, почте и по телефону</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Оценка качества решения проблемы и вежливости</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Проверка работы в ночное время и выходные</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-green-500/10 to-blue-500/10 border-2 border-border rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary rounded-full p-3 flex-shrink-0">
                <Icon name="CalendarCheck" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Данные обновляются регулярно
                </h3>
                <p className="text-muted-foreground mb-4">
                  Мы следим за актуальностью всех показателей и сразу фиксируем изменения в работе провайдеров.
                </p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground font-semibold">Uptime:</span>
                    <span className="text-muted-foreground">каждые 5 минут</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground font-semibold">Скорость:</span>
                    <span className="text-muted-foreground">каждые 2 дня</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-foreground font-semibold">Цены:</span>
                    <span className="text-muted-foreground">каждую неделю</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
