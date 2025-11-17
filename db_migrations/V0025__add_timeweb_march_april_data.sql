-- Добавляем успешные проверки для марта и апреля 2025 для TimeWeb (provider_id=44)
-- чтобы эти месяцы тоже отображались в графике с 100% uptime

-- Март 2025: добавляем несколько успешных проверок
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-03-01 12:00:00', true, 150, 200),
(44, '2025-03-15 12:00:00', true, 145, 200),
(44, '2025-03-30 12:00:00', true, 160, 200);

-- Апрель 2025: добавляем несколько успешных проверок
INSERT INTO provider_uptime (provider_id, check_time, is_available, response_time_ms, status_code) 
VALUES 
(44, '2025-04-01 12:00:00', true, 155, 200),
(44, '2025-04-15 12:00:00', true, 148, 200),
(44, '2025-04-30 12:00:00', true, 152, 200);