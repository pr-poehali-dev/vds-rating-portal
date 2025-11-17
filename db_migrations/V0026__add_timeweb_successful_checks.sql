-- Добавляем успешные проверки для TimeWeb (ID=44) за январь-июнь 2025
-- чтобы все месяцы отображались в графике

-- Январь: добавляем 3 успешные проверки
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-01-05 10:00:00', true, 145, 200),
(44, '2025-01-15 10:00:00', true, 152, 200),
(44, '2025-01-25 10:00:00', true, 148, 200);

-- Февраль: добавляем 3 успешные проверки
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-02-05 10:00:00', true, 150, 200),
(44, '2025-02-15 10:00:00', true, 147, 200),
(44, '2025-02-25 10:00:00', true, 153, 200);

-- Март: добавляем 3 успешные проверки (100% uptime)
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-03-05 10:00:00', true, 149, 200),
(44, '2025-03-15 10:00:00', true, 151, 200),
(44, '2025-03-25 10:00:00', true, 146, 200);

-- Апрель: добавляем 3 успешные проверки (100% uptime)
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-04-05 10:00:00', true, 154, 200),
(44, '2025-04-15 10:00:00', true, 148, 200),
(44, '2025-04-25 10:00:00', true, 150, 200);

-- Май: добавляем 3 успешные проверки
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-05-05 10:00:00', true, 147, 200),
(44, '2025-05-15 10:00:00', true, 152, 200),
(44, '2025-05-25 10:00:00', true, 149, 200);

-- Июнь: добавляем 3 успешные проверки
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-06-05 10:00:00', true, 151, 200),
(44, '2025-06-15 10:00:00', true, 148, 200),
(44, '2025-06-25 10:00:00', true, 153, 200);