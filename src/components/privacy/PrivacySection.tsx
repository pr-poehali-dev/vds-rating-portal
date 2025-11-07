import Icon from '@/components/ui/icon';

export const PrivacySection = () => {
  return (
    <section id="privacy" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-accent border border-primary/30 rounded-full px-5 py-2.5">
              <Icon name="Shield" size={16} className="text-primary" />
              <span className="text-sm font-bold text-primary">Конфиденциальность</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
              Политика конфиденциальности
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Как мы собираем, используем и защищаем ваши данные
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Info" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Общие положения</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                    пользователей сайта top-vds.com (далее — "Сайт").
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности. 
                    Если вы не согласны с условиями, пожалуйста, не используйте Сайт.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Database" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Какие данные мы собираем</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    В процессе использования Сайта мы можем собирать следующую информацию:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold mb-1">Информация, которую вы предоставляете добровольно:</p>
                        <p className="text-sm text-muted-foreground">
                          Имя, email и текст сообщения при отправке формы обратной связи или добавлении отзыва
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold mb-1">Автоматически собираемые данные:</p>
                        <p className="text-sm text-muted-foreground">
                          IP-адрес, тип браузера, операционная система, страницы просмотра, время посещения, 
                          реферальные источники для улучшения работы Сайта
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold mb-1">Файлы cookie:</p>
                        <p className="text-sm text-muted-foreground">
                          Используются для сохранения настроек фильтров, запоминания предпочтений и улучшения пользовательского опыта
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Как мы используем данные</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Мы используем собранную информацию для следующих целей:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Обработка обращений через форму обратной связи и ответы на ваши вопросы
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Публикация отзывов пользователей о VDS провайдерах (после модерации)
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Улучшение работы Сайта и анализ поведения пользователей для оптимизации интерфейса
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Защита от мошенничества, спама и злоупотреблений
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Соблюдение требований законодательства Российской Федерации
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Share2" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Передача данных третьим лицам</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением следующих случаев:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        С вашего явного согласия
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        По требованию уполномоченных государственных органов в соответствии с законодательством РФ
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Нашим сервисным партнёрам (хостинг-провайдеры, аналитические сервисы), которые обязаны 
                        соблюдать конфиденциальность и использовать данные только для предоставления услуг
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Lock" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Защита данных</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Мы применяем современные технические и организационные меры для защиты ваших данных:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        SSL/TLS шифрование для защиты данных при передаче
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Регулярное обновление систем безопасности
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Ограниченный доступ к персональным данным только уполномоченных сотрудников
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Регулярный аудит безопасности и мониторинг угроз
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Cookie" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Файлы cookie</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Сайт использует cookie-файлы для улучшения пользовательского опыта. Cookie — это небольшие текстовые 
                    файлы, сохраняемые на вашем устройстве при посещении Сайта.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Мы используем следующие типы cookie:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold mb-1">Обязательные cookie:</p>
                        <p className="text-sm text-muted-foreground">
                          Необходимы для корректной работы Сайта и сохранения настроек фильтров
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold mb-1">Аналитические cookie:</p>
                        <p className="text-sm text-muted-foreground">
                          Помогают понять, как пользователи взаимодействуют с Сайтом для улучшения функциональности
                        </p>
                      </div>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Вы можете отключить cookie в настройках браузера, но это может повлиять на функциональность Сайта.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="UserCheck" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Ваши права</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    В соответствии с законодательством РФ (152-ФЗ "О персональных данных") вы имеете право:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Получить информацию о том, какие ваши данные обрабатываются
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Требовать исправления неточных или неполных данных
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Требовать удаления ваших персональных данных
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Отозвать согласие на обработку данных в любое время
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground text-sm">
                        Обратиться в Роскомнадзор с жалобой на нарушение ваших прав
                      </p>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Для реализации своих прав свяжитесь с нами через форму обратной связи или Telegram.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Хранение данных</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы храним ваши персональные данные только в течение времени, необходимого для достижения целей 
                    обработки или до момента отзыва вашего согласия. Отзывы пользователей могут храниться неограниченно 
                    долго для обеспечения достоверности рейтингов.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="RefreshCw" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Изменения в Политике</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                    Все изменения вступают в силу с момента их публикации на Сайте. Дата последнего обновления 
                    указывается в начале документа. Рекомендуем регулярно проверять данную страницу.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Контакты</h2>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Если у вас есть вопросы по Политике конфиденциальности или вы хотите воспользоваться своими правами, 
                    свяжитесь с нами:
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Icon name="Send" size={16} />
                    <a href="https://t.me/top_vds_com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Telegram: @top_vds_com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Дата последнего обновления: 7 ноября 2025 г.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
