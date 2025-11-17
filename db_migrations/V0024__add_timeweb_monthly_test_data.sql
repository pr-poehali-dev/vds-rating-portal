-- Добавляем тестовые данные для провайдера TimeWeb (ID=44) за январь-июнь 2025
-- Январь: 99.99% uptime (3 минуты простоя = 1 проверка из ~8928 за месяц)
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES (44, '2025-01-15 12:00:00', false, 5000, null);

-- Февраль: 99.98% uptime (6 минут простоя = 2 проверки из ~8064 за месяц)
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-02-10 08:00:00', false, 5000, null),
(44, '2025-02-20 16:00:00', false, 5000, null);

-- Март: 100% uptime (нет простоев)

-- Апрель: 100% uptime (нет простоев)

-- Май: 99.99% uptime (3 минуты простоя = 1 проверка)
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES (44, '2025-05-18 14:00:00', false, 5000, null);

-- Июнь: 99.98% uptime (9 минут простоя = 2 проверки)
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-06-08 10:00:00', false, 5000, null),
(44, '2025-06-22 18:00:00', false, 5000, null);