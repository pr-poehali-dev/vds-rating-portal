import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Review {
  author: string;
  text: string;
  rating: number;
  date: string;
}

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
  reviews: Review[];
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
    basePrice: 0,
    cpuPrice: 210,
    ramPrice: 120,
    storagePrice: 12,
    features: ['DDoS защита', 'NVMe диски', '99.99% SLA', 'Поддержка 24/7'],
    pros: ['Самая быстрая техподдержка на рынке', 'NVMe диски в базе', 'Гибкое масштабирование ресурсов', 'Бесплатный тестовый период'],
    cons: ['Высокая цена за CPU', 'Нет готовых образов приложений', 'Сложная панель для новичков'],
    reviews: [
      { author: 'Алексей М.', text: 'Перешёл с другого хостинга — разница в скорости просто огромная! NVMe диски реально работают. Поддержка отвечает за 2-3 минуты, даже ночью.', rating: 5, date: '15 окт 2024' },
      { author: 'Мария К.', text: 'Использую для интернет-магазина. За полгода не было ни одного сбоя. Цена кусается, но оно того стоит — клиенты довольны скоростью сайта.', rating: 5, date: '02 ноя 2024' },
      { author: 'Дмитрий П.', text: 'Панель управления поначалу показалась сложной, но через пару дней разобрался. Главное — стабильность на высоте, сервер летает.', rating: 4, date: '28 окт 2024' },
      { author: 'Виктор С.', text: 'NVMe диски — это просто космос! Сайт грузится мгновенно. Поддержка реально работает круглосуточно, проверял в 3 ночи — ответили за 5 минут.', rating: 5, date: '03 окт 2024' },
      { author: 'Ирина Б.', text: 'Дорого, но качество оправдывает цену. Для крупного проекта самое то. Миграция прошла без проблем, помогли специалисты.', rating: 5, date: '07 окт 2024' },
      { author: 'Андрей Ф.', text: 'Использую для высоконагруженного API. Задержки минимальные, NVMe диски показывают себя отлично. Рекомендую для серьёзных задач.', rating: 5, date: '11 окт 2024' },
      { author: 'Наталья Р.', text: 'Техподдержка просто огонь! Помогли настроить всё от А до Я. Правда, панель управления не самая простая, но можно привыкнуть.', rating: 4, date: '14 окт 2024' },
      { author: 'Максим Д.', text: 'За эти деньги можно найти дешевле, но здесь реально быстро всё работает. Uptime 99.99% — не просто слова, проверял.', rating: 4, date: '18 окт 2024' },
      { author: 'Светлана Г.', text: 'Перешла с Beget. Разница ощутимая в скорости, но и ценник в 2 раза выше. Для бизнеса подходит идеально.', rating: 5, date: '21 окт 2024' },
      { author: 'Роман К.', text: 'Отличный хостинг для продакшна. NVMe действительно ускоряет работу БД. Поддержка компетентная, быстро решают проблемы.', rating: 5, date: '25 окт 2024' },
      { author: 'Юлия Н.', text: 'Для новичков сложновато, интерфейс не самый интуитивный. Но когда разберёшься — всё отлично работает.', rating: 3, date: '29 окт 2024' },
      { author: 'Константин В.', text: 'Тестировал месяц бесплатно, остался доволен. Сервер разворачивается быстро, всё стабильно. Оплатил годовой тариф.', rating: 5, date: '01 ноя 2024' },
      { author: 'Елена М.', text: 'Дорого для стартапа, но производительность на высоте. SLA 99.99% реально соблюдают, сбоев не было за 4 месяца.', rating: 4, date: '04 ноя 2024' },
      { author: 'Артём З.', text: 'Техподдержка ответила в 2 часа ночи за 3 минуты! Помогли с настройкой firewall. Сервис на уровне.', rating: 5, date: '06 ноя 2024' },
      { author: 'Татьяна Л.', text: 'Использую для интернет-магазина на WooCommerce. Скорость загрузки страниц выросла в 3 раза по сравнению с прошлым хостингом.', rating: 5, date: '09 ноя 2024' },
      { author: 'Владимир П.', text: 'Панель управления запутанная, долго разбирался. Но производительность действительно высокая, NVMe диски рулят.', rating: 4, date: '11 ноя 2024' },
      { author: 'Оксана Ч.', text: 'Цена завышена. За такие деньги ожидал больше готовых решений и образов приложений. Но скорость работы компенсирует.', rating: 3, date: '13 ноя 2024' },
      { author: 'Георгий А.', text: 'Мигрировал 5 проектов — всё прошло гладко. Техподдержка помогла с переносом БД. Очень доволен качеством сервиса.', rating: 5, date: '01 окт 2024' },
      { author: 'Кристина И.', text: 'Для блога это оверкилл, но для корпоративного сайта — идеально. Производительность и стабильность на высшем уровне.', rating: 5, date: '05 окт 2024' },
      { author: 'Денис О.', text: 'NVMe диски дают огромное преимущество в скорости. База данных работает в разы быстрее. Стоит своих денег.', rating: 5, date: '08 окт 2024' },
      { author: 'Анастасия Т.', text: 'Поддержка реально быстрая, но панель управления слишком сложная для неопытных пользователей. Нужно время на обучение.', rating: 4, date: '12 окт 2024' },
      { author: 'Станислав Ж.', text: 'Работаю с node.js приложениями. Производительность отличная, задержки минимальные. Рекомендую для backend разработки.', rating: 5, date: '16 окт 2024' },
      { author: 'Валерия Е.', text: 'Дорого, но надёжно. За 8 месяцев ни одного простоя. Для e-commerce проектов — лучший выбор.', rating: 5, date: '19 окт 2024' },
      { author: 'Николай У.', text: 'Миграция с другого хостинга прошла без проблем. Техподдержка взяла всё на себя. Скорость работы сайта заметно выросла.', rating: 5, date: '23 окт 2024' },
      { author: 'Дарья Щ.', text: 'Цена кусается, особенно за CPU. Но если нужна производительность и стабильность — это лучший вариант на рынке.', rating: 4, date: '26 окт 2024' },
      { author: 'Евгений Х.', text: 'Отличный хостинг для Django проектов. NVMe диски ускоряют работу с БД в несколько раз. Доволен на 100%.', rating: 5, date: '30 окт 2024' },
      { author: 'Марина Ю.', text: 'Не хватает готовых образов популярных CMS. Приходится всё настраивать вручную. Для новичков сложно.', rating: 3, date: '02 ноя 2024' },
      { author: 'Александр Ц.', text: 'Использую для нескольких клиентских проектов. Все довольны скоростью и стабильностью. Поддержка всегда на связи.', rating: 5, date: '05 ноя 2024' },
      { author: 'Яна Б.', text: 'Тестовый период помог разобраться во всём. Поддержка ответила на все вопросы. Перешла на платный тариф.', rating: 5, date: '07 ноя 2024' },
      { author: 'Сергей Ш.', text: 'За 6 месяцев работы ни разу не пожалел о выборе. Быстро, стабильно, надёжно. Цена оправдана качеством.', rating: 5, date: '10 ноя 2024' },
      { author: 'Людмила К.', text: 'Панель управления перегружена функциями. Для простых задач подойдёт что-то попроще. Но производительность отличная.', rating: 4, date: '12 ноя 2024' },
      { author: 'Тимур Г.', text: 'NVMe диски — это реально прорыв. Сайт на Laravel летает. Поддержка помогла оптимизировать конфигурацию.', rating: 5, date: '04 окт 2024' },
      { author: 'Вероника Д.', text: 'Дорого для малого бизнеса, но если проект растёт — лучше сразу брать качественный хостинг. Миграция потом сложнее.', rating: 4, date: '09 окт 2024' },
      { author: 'Илья Р.', text: 'Техподдержка на высоте! Решили проблему с SSL за 10 минут. Производительность отличная, особенно для БД.', rating: 5, date: '13 окт 2024' },
      { author: 'Карина Ф.', text: 'Использую для SaaS проекта. Масштабирование работает отлично, можно быстро добавить ресурсы. Рекомендую!', rating: 5, date: '17 окт 2024' },
      { author: 'Борис Н.', text: 'Цена высокая, но за надёжность и скорость стоит платить. Uptime действительно близок к 100%.', rating: 4, date: '20 окт 2024' },
      { author: 'София М.', text: 'Перешла с VPS на Timeweb Cloud. Разница огромная! Сайт стал грузиться моментально. Клиенты заметили улучшение.', rating: 5, date: '24 окт 2024' },
      { author: 'Вячеслав Л.', text: 'Отличное решение для highload проектов. NVMe + быстрая поддержка = идеальная комбинация.', rating: 5, date: '27 окт 2024' },
      { author: 'Регина П.', text: 'Не понравился интерфейс панели управления. Слишком много настроек, легко запутаться. Но сервер работает стабильно.', rating: 3, date: '31 окт 2024' },
      { author: 'Михаил А.', text: 'За 9 месяцев использования — ни одной критичной проблемы. Поддержка всегда оперативно отвечает. Цена оправдана.', rating: 5, date: '03 ноя 2024' },
      { author: 'Алина С.', text: 'Использую для WordPress мультисайта. Все 15 сайтов работают быстро и стабильно. NVMe диски творят чудеса!', rating: 5, date: '06 ноя 2024' },
      { author: 'Фёдор В.', text: 'Дорого, но я готов платить за качество. Миграция, настройка, поддержка — всё на 5+. Производительность топ.', rating: 5, date: '08 ноя 2024' },
      { author: 'Жанна К.', text: 'Для стартапа дороговато. Пока проект не окупается, каждая копейка на счету. Но сервис действительно качественный.', rating: 3, date: '11 ноя 2024' },
      { author: 'Олег Т.', text: 'Работаю с React и Node.js. Деплой быстрый, производительность отличная. Поддержка помогла настроить CI/CD.', rating: 5, date: '06 окт 2024' },
      { author: 'Ксения Ю.', text: 'NVMe диски показывают отличные результаты. База на PostgreSQL работает быстрее в 3 раза. Стоит каждого рубля!', rating: 5, date: '10 окт 2024' },
      { author: 'Артур Г.', text: 'Техподдержка — лучшая на рынке. Всегда помогут, всё объяснят. Но цена явно завышена по сравнению с конкурентами.', rating: 4, date: '22 окт 2024' },
      { author: 'Лариса Б.', text: 'Сложная панель, но мощные возможности. Для опытных разработчиков — самое то. Новичкам будет трудно.', rating: 4, date: '03 ноя 2024' },
      { author: 'Руслан Д.', text: 'Отличный хостинг! Быстрый, надёжный, с отзывчивой поддержкой. Перенёс все проекты сюда. Нареканий нет.', rating: 5, date: '09 ноя 2024' }
    ]
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
    pros: ['Самые низкие цены на рынке', 'Идеален для новичков', 'Бесплатные автобэкапы', 'Более 100 готовых CMS'],
    cons: ['Ограниченная производительность', 'Медленная работа техподдержки', 'Нет выделенных IP в базе'],
    reviews: [
      { author: 'Ольга В.', text: 'Отличный вариант для первого сайта! Цена смешная, всё понятно даже новичку. WordPress установился в пару кликов. Для блога хватает с головой.', rating: 5, date: '20 окт 2024' },
      { author: 'Сергей Л.', text: 'Пользуюсь 3 года, за эти деньги — супер. Но когда трафик вырос, начались тормоза. Пришлось переходить на более мощный тариф.', rating: 4, date: '10 ноя 2024' },
      { author: 'Анна Т.', text: 'Техподдержка иногда отвечает по 2-3 часа, это раздражает. Но для небольших проектов за такую цену — идеально. Автобэкапы спасали несколько раз.', rating: 4, date: '05 ноя 2024' },
      { author: 'Игорь П.', text: 'Самый дешёвый хостинг из нормальных. Для простого блога подходит отлично. Установка CMS в один клик — супер удобно!', rating: 5, date: '02 окт 2024' },
      { author: 'Марина Ж.', text: 'Начинала с нуля, всё получилось настроить самой. Панель управления понятная, видеоуроки помогли. За 200₽ в месяц — просто находка!', rating: 5, date: '06 окт 2024' },
      { author: 'Дмитрий К.', text: 'Цена отличная, но производительность слабовата. Сайт иногда тормозит при большом трафике. Для старта сойдёт.', rating: 3, date: '09 окт 2024' },
      { author: 'Светлана Р.', text: 'Автобэкапы уже дважды спасли мой сайт! Бесплатно и автоматически. За эти деньги — просто подарок судьбы.', rating: 5, date: '13 окт 2024' },
      { author: 'Алексей Ф.', text: 'Техподдержка медленная, но вежливая. Ждал ответа 4 часа. Но за такую цену простительно. Для некритичных проектов норм.', rating: 4, date: '16 окт 2024' },
      { author: 'Наталья В.', text: 'Идеально для портфолио и визитки. Цена копеечная, всё работает стабильно. WordPress поставила за 2 минуты.', rating: 5, date: '19 окт 2024' },
      { author: 'Роман Б.', text: 'Использую для 3 небольших сайтов. Все работают нормально. Но на высокие нагрузки не рассчитывайте.', rating: 4, date: '22 окт 2024' },
      { author: 'Юлия М.', text: 'Для первого коммерческого сайта взяла Beget. Пока всё устраивает. Готовых CMS много, выбрала Joomla — установилась моментально.', rating: 5, date: '25 окт 2024' },
      { author: 'Константин Д.', text: 'Выделенный IP пришлось докупать отдельно. Но общая стоимость всё равно ниже конкурентов. Для малого бизнеса топ!', rating: 4, date: '28 окт 2024' },
      { author: 'Елена П.', text: 'Отличный хостинг для новичков! Всё интуитивно понятно. SSL сертификат бесплатный — не нужно ничего настраивать.', rating: 5, date: '31 окт 2024' },
      { author: 'Артём С.', text: 'За год использования — никаких проблем. Сайт работает стабильно. Скорость средняя, но за эту цену претензий нет.', rating: 4, date: '03 ноя 2024' },
      { author: 'Татьяна Г.', text: 'Дешево и сердито. Для блога на WordPress хватает за глаза. Автобэкапы — просто спасение, откатила сайт после неудачного обновления.', rating: 5, date: '07 ноя 2024' },
      { author: 'Владимир Н.', text: 'Производительность оставляет желать лучшего. При 1000+ посетителей в день сайт начинает подвисать. Придётся мигрировать.', rating: 3, date: '09 ноя 2024' },
      { author: 'Оксана Л.', text: 'Самый дружелюбный хостинг для новичков! Всё просто и понятно. Цена смешная. Поддержка помогла разобраться с DNS.', rating: 5, date: '12 ноя 2024' },
      { author: 'Георгий У.', text: 'Беру для клиентов с небольшими бюджетами. Все довольны. Соотношение цена-качество отличное.', rating: 5, date: '01 окт 2024' },
      { author: 'Кристина З.', text: 'WordPress, Drupal, Битрикс — всё есть в автоустановщике. Для новичка это просто находка! Настроила сайт за час.', rating: 5, date: '04 окт 2024' },
      { author: 'Денис Ч.', text: 'Цена низкая, но и ресурсы ограничены. Для блога норм, для магазина уже слабовато. Нужно брать дороже тариф.', rating: 4, date: '08 окт 2024' },
      { author: 'Анастасия Я.', text: 'Техподдержка ответила через 5 часов. Это долго. Но проблему решили. За такие деньги можно и подождать.', rating: 3, date: '11 окт 2024' },
      { author: 'Станислав Э.', text: 'Использую для лендинга. Работает отлично, тормозов нет. SSL бесплатный настроился автоматически — красота!', rating: 5, date: '14 окт 2024' },
      { author: 'Валерия Й.', text: 'Для стартапа — идеально. Минимальные вложения, максимум удобства. Когда проект вырастет — перейду на более мощный хостинг.', rating: 5, date: '17 окт 2024' },
      { author: 'Николай Ш.', text: 'Панель управления удобная, всё на русском. Даже моя мама смогла сама создать сайт! За 150₽ — это просто подарок.', rating: 5, date: '21 окт 2024' },
      { author: 'Дарья Щ.', text: 'Автобэкапы работают как часы. Уже восстанавливала сайт 2 раза — всё прошло гладко. Очень удобная функция!', rating: 5, date: '24 окт 2024' },
      { author: 'Евгений Х.', text: 'Производительность не вау, но для личного блога хватает. Главное — цена копеечная и всё стабильно работает.', rating: 4, date: '27 окт 2024' },
      { author: 'Марина Ц.', text: 'Готовых решений море! Выбрала PrestaShop для магазина — установился за минуту. Для начинающих предпринимателей — супер!', rating: 5, date: '30 окт 2024' },
      { author: 'Александр Ю.', text: 'Поддержка медленная, это факт. Но за такие копейки грех жаловаться. Сам разобрался, почитав форум.', rating: 4, date: '02 ноя 2024' },
      { author: 'Яна Б.', text: 'Лучший бюджетный хостинг! Для простых сайтов — идеально. Никаких сложностей с настройкой. Всё интуитивно понятно.', rating: 5, date: '06 ноя 2024' },
      { author: 'Сергей Ж.', text: 'За 2 года не было ни одного серьёзного сбоя. Для портфолио и блога — лучше не найти. Цена просто смешная!', rating: 5, date: '08 ноя 2024' },
      { author: 'Людмила К.', text: 'Нет выделенного IP в базовом тарифе — пришлось доплачивать. Но даже с этим получается дешевле других.', rating: 4, date: '11 ноя 2024' },
      { author: 'Тимур Г.', text: 'Использую для 5 клиентских сайтов. Все работают стабильно. За эти деньги — просто находка для фрилансера!', rating: 5, date: '03 окт 2024' },
      { author: 'Вероника Д.', text: 'Простота настройки на высоте! За час подняла интернет-магазин на OpenCart. Автоустановщик — просто волшебство.', rating: 5, date: '07 окт 2024' },
      { author: 'Илья Р.', text: 'Для небольших проектов — лучший выбор. Цена низкая, функционал достаточный. Но на рост нагрузки не рассчитывайте.', rating: 4, date: '10 окт 2024' },
      { author: 'Карина Ф.', text: 'Техподдержка долго отвечает, но когда отвечают — помогают реально. Вопрос с почтой решили за день.', rating: 4, date: '15 окт 2024' },
      { author: 'Борис Н.', text: 'Автобэкапы спасли мой сайт после взлома! Восстановил всё за 5 минут. Бесплатная функция, которая окупает хостинг многократно!', rating: 5, date: '18 окт 2024' },
      { author: 'София М.', text: 'Для блога фотографа — идеально. Скорости хватает, цена смешная. WordPress с темой установились в 3 клика.', rating: 5, date: '23 окт 2024' },
      { author: 'Вячеслав Л.', text: 'Ограниченная производительность чувствуется на сложных сайтах. Для простых проектов норм, для магазинов — слабовато.', rating: 3, date: '26 окт 2024' },
      { author: 'Регина П.', text: 'За 8 месяцев ни одной проблемы! Сайт работает как часы. За такую цену — просто нереально круто!', rating: 5, date: '29 окт 2024' },
      { author: 'Михаил А.', text: 'Панель управления — лучшая среди бюджетных хостингов. Всё понятно с первого взгляда. Рекомендую новичкам!', rating: 5, date: '04 ноя 2024' },
      { author: 'Алина С.', text: 'SSL бесплатный, автобэкапы бесплатные, цена копеечная. За эти деньги — просто нереальное предложение!', rating: 5, date: '10 ноя 2024' },
      { author: 'Фёдор В.', text: 'Использую для 10 лендингов. Все работают стабильно. Производительность средняя, но за эту цену — отлично!', rating: 4, date: '13 ноя 2024' },
      { author: 'Жанна К.', text: 'Первый хостинг в моей жизни. Справилась сама, без программистов. Видеоинструкции помогли разобраться. Супер!', rating: 5, date: '05 окт 2024' },
      { author: 'Олег Т.', text: 'Техподдержка не самая быстрая, но проблемы решают. За 200₽ в месяц — грех жаловаться. Для небольших проектов идеально.', rating: 4, date: '12 окт 2024' },
      { author: 'Ксения Ю.', text: 'Готовых CMS больше 100! Выбрала для себя Joomla — установилась моментально. Для новичка — просто сказка!', rating: 5, date: '26 окт 2024' },
      { author: 'Артур Г.', text: 'Соотношение цена-качество на высоте! Для стартапов и малого бизнеса — лучший вариант. Просто, дёшево, надёжно.', rating: 5, date: '01 ноя 2024' },
      { author: 'Лариса Б.', text: 'За 3 года работы — всего пару мелких сбоев. Техподдержка хоть и медленная, но компетентная. Рекомендую!', rating: 4, date: '09 ноя 2024' },
      { author: 'Руслан Д.', text: 'Для фрилансеров с небольшими проектами — идеально! Клиенты довольны, я доволен. Цена просто смешная!', rating: 5, date: '14 ноя 2024' }
    ]
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
    pros: ['Максимальная производительность SSD', 'Быстрое развёртывание за 60 секунд', 'Техподдержка с экспертами', 'Широкий выбор ОС'],
    cons: ['Дороже конкурентов на 15-20%', 'Сложная документация', 'Нет программы лояльности'],
    reviews: [
      { author: 'Игорь Р.', text: 'Работаю с высоконагруженными проектами — CloudVDS справляется на ура! Сервер действительно разворачивается за минуту. Поддержка знает своё дело.', rating: 5, date: '12 ноя 2024' },
      { author: 'Екатерина С.', text: 'Дороговато, конечно, но качество на высоте. Для серьёзного бизнеса самое то. Единственный минус — документация могла бы быть попроще.', rating: 4, date: '08 ноя 2024' },
      { author: 'Павел Н.', text: 'Перешёл с Timeweb, чтобы сэкономить. По скорости почти не заметил разницы, зато плачу на 1500₽ меньше. Выбор дистрибутивов Linux огромный!', rating: 5, date: '01 ноя 2024' },
      { author: 'Виктор С.', text: 'Развёртывание действительно за 60 секунд! Выбрал Ubuntu 22.04 — сервер поднялся моментально. Производительность SSD на высоте.', rating: 5, date: '02 окт 2024' },
      { author: 'Ирина Б.', text: 'Дороже на 20%, но оно того стоит. Для крупных проектов — идеально. Техподдержка с экспертами реально помогает, а не отписывается.', rating: 5, date: '05 окт 2024' },
      { author: 'Андрей Ф.', text: 'Широкий выбор ОС — есть даже FreeBSD и Debian редких версий. Производительность SSD отличная. Рекомендую для dev серверов.', rating: 5, date: '09 окт 2024' },
      { author: 'Наталья Р.', text: 'Документация сложная, но в техподдержке всё объяснили простым языком. Производительность того стоит — сайт летает!', rating: 4, date: '12 окт 2024' },
      { author: 'Максим Д.', text: 'Цена выше среднего, но качество оправдывает. SSD диски работают быстро, uptime действительно 99.9% — проверял.', rating: 5, date: '15 окт 2024' },
      { author: 'Светлана Г.', text: 'Перешла с Beget. Разница в производительности огромная! Для растущего бизнеса — самое то. Стоит своих денег.', rating: 5, date: '18 окт 2024' },
      { author: 'Роман К.', text: 'Быстрое развёртывание — не маркетинг, правда! Сервер готов через минуту. Выбор дистрибутивов огромный, даже Arch нашёл.', rating: 5, date: '21 окт 2024' },
      { author: 'Юлия Н.', text: 'Дороговато для стартапа, но когда проект начал расти — не пожалела. Производительность и поддержка на высоте.', rating: 4, date: '24 окт 2024' },
      { author: 'Константин В.', text: 'Техподдержка с реальными экспертами, а не скриптами отвечают. Помогли настроить сложную конфигурацию nginx. Очень доволен!', rating: 5, date: '27 окт 2024' },
      { author: 'Елена М.', text: 'SSD диски показывают отличную скорость. База данных работает быстрее в 2 раза по сравнению с прошлым хостингом.', rating: 5, date: '30 окт 2024' },
      { author: 'Артём З.', text: 'Цена кусается, но за качество платить не жалко. Uptime 99.9% — это не просто цифры, реально работает стабильно.', rating: 4, date: '02 ноя 2024' },
      { author: 'Татьяна Л.', text: 'Развёртывание за 60 секунд — проверила лично! Выбрала CentOS 8 — сервер поднялся мгновенно. Впечатляет!', rating: 5, date: '04 ноя 2024' },
      { author: 'Владимир П.', text: 'Документация действительно сложная для новичков. Но техподдержка отзывчивая, всё объяснили и помогли настроить.', rating: 4, date: '07 ноя 2024' },
      { author: 'Оксана Ч.', text: 'Дороже конкурентов, но качество на порядок выше. Для серьёзных проектов — лучший выбор. Не пожалела ни разу!', rating: 5, date: '10 ноя 2024' },
      { author: 'Георгий А.', text: 'Широкий выбор ОС — нашёл даже Alpine Linux. Производительность SSD отличная. Для микросервисов — идеально!', rating: 5, date: '13 ноя 2024' },
      { author: 'Кристина И.', text: 'Нет программы лояльности — обидно. Но за качество сервиса готова платить. Производительность того стоит.', rating: 4, date: '03 окт 2024' },
      { author: 'Денис О.', text: 'SSD диски реально быстрые! API на Node.js обрабатывает запросы моментально. Для highload проектов рекомендую.', rating: 5, date: '07 окт 2024' },
      { author: 'Анастасия Т.', text: 'Техподдержка знает своё дело! Помогли с настройкой load balancer. Не просто инструкции прислали, а реально разобрались.', rating: 5, date: '10 окт 2024' },
      { author: 'Станислав Ж.', text: 'Дорого, но для продакшна — самое то. Ни одного сбоя за 7 месяцев. Uptime держат честно.', rating: 5, date: '14 окт 2024' },
      { author: 'Валерия Е.', text: 'Быстрое развёртывание — не обман! Тестировала разные дистрибутивы — все поднимались за минуту. Супер!', rating: 5, date: '17 окт 2024' },
      { author: 'Николай У.', text: 'Цена выше на 15-20%, но производительность компенсирует. Для растущего бизнеса — отличное решение.', rating: 4, date: '20 окт 2024' },
      { author: 'Дарья Щ.', text: 'SSD диски творят чудеса! PostgreSQL работает быстрее в 3 раза. Для баз данных — идеальное решение.', rating: 5, date: '23 окт 2024' },
      { author: 'Евгений Х.', text: 'Техподдержка с экспертами — это не просто слова! Помогли оптимизировать конфиг сервера. Производительность выросла на 40%.', rating: 5, date: '26 окт 2024' },
      { author: 'Марина Ю.', text: 'Документация могла быть проще, но в целом разобралась. Производительность отличная, для e-commerce — самое то!', rating: 4, date: '29 окт 2024' },
      { author: 'Александр Ц.', text: 'Дороже чем у других, но качество на высоте. Для критичных проектов — лучший выбор. Стабильность 99.9% реальна!', rating: 5, date: '01 ноя 2024' },
      { author: 'Яна Б.', text: 'Выбор дистрибутивов огромный! Даже нашла OpenSUSE. Развёртывание действительно быстрое. Очень довольна!', rating: 5, date: '03 ноя 2024' },
      { author: 'Сергей Ш.', text: 'За полгода использования — ни одной проблемы. SSD диски работают быстро, uptime держат. Рекомендую!', rating: 5, date: '06 ноя 2024' },
      { author: 'Людмила К.', text: 'Нет бонусов за лояльность — немного обидно. Но качество сервиса компенсирует. Буду продлевать дальше.', rating: 4, date: '09 ноя 2024' },
      { author: 'Тимур Г.', text: 'Техподдержка реально разбирается в теме! Не просто скрипты читают, а помогают решать сложные задачи. Супер!', rating: 5, date: '11 ноя 2024' },
      { author: 'Вероника Д.', text: 'Производительность SSD на высоте! Для Laravel приложений — идеально. Скорость работы выросла в разы.', rating: 5, date: '14 ноя 2024' },
      { author: 'Илья Р.', text: 'Дороже конкурентов, но за качество готов платить. Для критичных систем — лучший выбор на рынке.', rating: 5, date: '04 окт 2024' },
      { author: 'Карина Ф.', text: 'Быстрое развёртывание — правда! Поднимала серверы с разными ОС — все за минуту. Очень удобно для тестов.', rating: 5, date: '08 окт 2024' },
      { author: 'Борис Н.', text: 'SSD диски дают огромное преимущество в скорости. MongoDB работает отлично. Для NoSQL баз — топ!', rating: 5, date: '11 окт 2024' },
      { author: 'София М.', text: 'Техподдержка помогла с миграцией с другого хостинга. Всё перенесли без простоя. Профессионалы своего дела!', rating: 5, date: '16 окт 2024' },
      { author: 'Вячеслав Л.', text: 'Документация сложная, это минус. Но производительность того стоит. Для опытных разработчиков — отлично!', rating: 4, date: '19 окт 2024' },
      { author: 'Регина П.', text: 'Цена выше среднего, но качество оправдывает каждый рубль. Uptime 99.9% — не маркетинг, а реальность!', rating: 5, date: '22 окт 2024' },
      { author: 'Михаил А.', text: 'Широкий выбор ОС — есть всё что нужно! От Ubuntu до экзотических дистрибутивов. Развёртывание мгновенное.', rating: 5, date: '25 окт 2024' },
      { author: 'Алина С.', text: 'SSD диски работают быстро и стабильно. Для e-commerce проектов — идеальное решение. Клиенты довольны скоростью!', rating: 5, date: '28 окт 2024' },
      { author: 'Фёдор В.', text: 'Техподдержка с экспертами — это реально работает! Помогли настроить кластер. Не каждый хостинг так помогает.', rating: 5, date: '31 окт 2024' },
      { author: 'Жанна К.', text: 'Дороже чем планировала, но качество убедило остаться. Производительность отличная, поддержка на уровне.', rating: 4, date: '05 ноя 2024' },
      { author: 'Олег Т.', text: 'За 8 месяцев ни одного серьёзного сбоя. SSD диски держат нагрузку отлично. Для highload — рекомендую!', rating: 5, date: '12 ноя 2024' },
      { author: 'Ксения Ю.', text: 'Нет программы лояльности, но качество компенсирует. Производительность и стабильность на высшем уровне!', rating: 4, date: '06 окт 2024' },
      { author: 'Артур Г.', text: 'Быстрое развёртывание — не преувеличение! Сервер с Fedora поднялся за 50 секунд. Впечатляет!', rating: 5, date: '13 окт 2024' },
      { author: 'Лариса Б.', text: 'Техподдержка знает своё дело! Помогли оптимизировать MySQL. Производительность выросла на 50%. Супер!', rating: 5, date: '28 окт 2024' },
      { author: 'Руслан Д.', text: 'Дороже чем у других, но для серьёзного бизнеса — лучший выбор. SSD диски и стабильность окупают цену!', rating: 5, date: '15 ноя 2024' }
    ]
  }
];

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [configOpen, setConfigOpen] = useState<number | null>(null);
  const [configs, setConfigs] = useState<Record<number, ResourceConfig>>({
    1: { cpu: 1, ram: 1, storage: 10 },
    2: { cpu: 1, ram: 1, storage: 10 },
    3: { cpu: 1, ram: 1, storage: 10 }
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
                        <div className="bg-accent/50 border border-primary/10 rounded-2xl p-6">
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

                          <div className="pt-6 border-t border-border md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center">
                                <Icon name="MessageSquare" size={18} className="text-primary" />
                              </div>
                              <h4 className="text-base font-bold text-foreground">Отзывы клиентов</h4>
                            </div>

                            <div className="bg-accent border border-primary/10 rounded-2xl p-5 mb-4">
                              <div className="grid grid-cols-3 gap-6">
                                <div className="text-center">
                                  <div className="text-3xl font-black text-primary mb-1">
                                    {(provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length).toFixed(1)}
                                  </div>
                                  <div className="flex items-center justify-center gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Icon 
                                        key={i}
                                        name="Star" 
                                        size={14} 
                                        className={i < Math.round(provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length) ? "fill-primary text-primary" : "text-muted"}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground font-medium">Средний рейтинг</span>
                                </div>

                                <div className="text-center border-x border-border">
                                  <div className="text-3xl font-black text-foreground mb-1">
                                    {provider.reviews.length}
                                  </div>
                                  <Icon name="Users" size={20} className="text-primary mx-auto mb-1" />
                                  <span className="text-xs text-muted-foreground font-medium">Всего отзывов</span>
                                </div>

                                <div className="text-center">
                                  <div className="space-y-1">
                                    {[5, 4, 3, 2, 1].map((star) => {
                                      const count = provider.reviews.filter(r => r.rating === star).length;
                                      const percentage = (count / provider.reviews.length) * 100;
                                      return (
                                        <div key={star} className="flex items-center gap-2 text-xs">
                                          <span className="text-muted-foreground w-3">{star}</span>
                                          <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                                            <div 
                                              className="h-full bg-primary rounded-full transition-all" 
                                              style={{ width: `${percentage}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-muted-foreground w-6 text-right">{count}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {provider.reviews.map((review, idx) => (
                                <div key={idx} className="bg-background border border-border rounded-xl p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-foreground">{review.author}</span>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Icon 
                                          key={i}
                                          name="Star" 
                                          size={12} 
                                          className={i < review.rating ? "fill-primary text-primary" : "text-muted"}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{review.text}</p>
                                  <span className="text-xs text-muted-foreground">{review.date}</span>
                                </div>
                              ))}
                            </div>
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