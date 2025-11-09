import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Что такое VDS и чем отличается от обычного хостинга?',
    answer: 'VDS (Virtual Dedicated Server) — это виртуальный выделенный сервер с гарантированными ресурсами. В отличие от обычного хостинга, вы получаете полный контроль над сервером, root-доступ и изолированные ресурсы (CPU, RAM, диск), которые не делятся с другими пользователями.'
  },
  {
    question: 'Какую конфигурацию VDS выбрать для моего проекта?',
    answer: 'Для небольших сайтов достаточно 1-2 vCPU, 1-2 GB RAM и 10-20 GB диска. Для интернет-магазинов рекомендуется 2-4 vCPU, 4-8 GB RAM и 50+ GB диска. Для highload проектов выбирайте 4+ vCPU, 8+ GB RAM с NVMe дисками.'
  },
  {
    question: 'Что означает 152-ФЗ и зачем это нужно?',
    answer: '152-ФЗ — это федеральный закон "О персональных данных". Провайдеры с соответствием 152-ФЗ имеют сертифицированные дата-центры, где можно законно хранить персональные данные российских граждан. Это обязательно для бизнеса, работающего с конфиденциальной информацией клиентов.'
  },
  {
    question: 'В чём разница между SSD и NVMe дисками?',
    answer: 'NVMe диски в 5-10 раз быстрее обычных SSD благодаря прямому подключению к PCI Express. Для баз данных и highload проектов NVMe критически важен. Для небольших сайтов и блогов достаточно обычного SSD.'
  },
  {
    question: 'Можно ли перенести сайт с другого хостинга?',
    answer: 'Да, все провайдеры поддерживают миграцию. Многие предлагают бесплатную помощь техподдержки в переносе сайтов, баз данных и почты. Процесс обычно занимает от нескольких часов до одного дня.'
  },
  {
    question: 'Что такое виртуализация KVM, OpenVZ и VMware?',
    answer: 'KVM — полная виртуализация с изолированным ядром, подходит для любых задач. OpenVZ — контейнерная виртуализация, дешевле, но с ограничениями. VMware — корпоративное решение с максимальной стабильностью. Для большинства проектов рекомендуется KVM.'
  },
  {
    question: 'Нужна ли мне DDoS защита?',
    answer: 'Для интернет-магазинов, новостных порталов и популярных сайтов DDoS защита обязательна. Она защищает от атак, которые могут привести к недоступности сайта. Многие провайдеры включают базовую защиту в тариф.'
  },
  {
    question: 'Как работают автоматические бэкапы?',
    answer: 'Провайдер ежедневно создаёт копии вашего сервера (файлы и базы данных) и хранит их несколько дней. В случае сбоя или случайного удаления данных, вы можете восстановить всё за несколько минут через панель управления.'
  },
  {
    question: 'Что такое тестовый период и как им воспользоваться?',
    answer: 'Тестовый период — это бесплатное время (от 3 до 30 дней), когда вы можете протестировать сервер без оплаты. Обычно требуется только регистрация. Это позволяет оценить производительность и интерфейс перед покупкой.'
  },
  {
    question: 'Можно ли увеличить ресурсы сервера?',
    answer: 'Да, все провайдеры поддерживают вертикальное масштабирование — вы можете в любой момент добавить CPU, RAM или диск через панель управления. Обычно это занимает 5-10 минут и требует перезагрузки сервера.'
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative" itemScope itemType="https://schema.org/FAQPage">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-accent border border-primary/30 rounded-full px-5 py-2.5">
              <Icon name="HelpCircle" size={16} className="text-primary" />
              <span className="text-sm font-bold text-primary">Часто задаваемые вопросы</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
              FAQ по VPS хостингу
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ответы на популярные вопросы о VDS хостинге
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-card border-2 border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <Button
                  variant="ghost"
                  className="w-full p-6 text-left justify-between h-auto hover:bg-accent/50"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="MessageCircle" size={16} className="text-primary" />
                    </div>
                    <span className="text-base md:text-lg font-bold text-foreground text-left" itemProp="name">
                      {item.question}
                    </span>
                  </div>
                  <Icon
                    name={openIndex === index ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-primary flex-shrink-0 ml-4"
                  />
                </Button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <div className="pl-12 pr-4">
                      <p className="text-muted-foreground leading-relaxed" itemProp="text">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-accent border border-primary/20 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Не нашли ответ на свой вопрос?
                </h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Напишите нам в Telegram — мы поможем с выбором VDS хостинга
              </p>
              <Button
                size="lg"
                className="h-12 px-8 bg-primary text-background font-bold rounded-xl"
                asChild
              >
                <a href="https://t.me/top_vds_com" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" size={18} className="mr-2" />
                  Написать в Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};