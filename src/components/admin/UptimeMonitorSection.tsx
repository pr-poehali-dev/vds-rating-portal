import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface UptimeMonitorSectionProps {
  onStatusChange?: () => void;
}

export const UptimeMonitorSection = ({ onStatusChange }: UptimeMonitorSectionProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAutoCheckEnabled, setIsAutoCheckEnabled] = useState(false);
  const [nextCheckIn, setNextCheckIn] = useState<number>(300);
  const [lastCheckResult, setLastCheckResult] = useState<{
    total: number;
    successful: number;
    failed: number;
    timestamp: string;
  } | null>(null);
  const [error, setError] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Загружаем состояние автопроверки из localStorage
    const savedState = localStorage.getItem('uptime_auto_check_enabled');
    if (savedState === 'true') {
      setIsAutoCheckEnabled(true);
      startAutoCheck();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isAutoCheckEnabled) {
      // Обновляем обратный отсчёт каждую секунду
      countdownRef.current = setInterval(() => {
        setNextCheckIn(prev => {
          if (prev <= 1) {
            return 300; // Сбрасываем на 5 минут
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
      setNextCheckIn(300);
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [isAutoCheckEnabled]);

  const startAutoCheck = () => {
    // Запускаем проверку каждые 5 минут
    intervalRef.current = setInterval(() => {
      handleStartCheck();
    }, 5 * 60 * 1000);
  };

  const handleToggleAutoCheck = () => {
    if (isAutoCheckEnabled) {
      // Выключаем автопроверку
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
      setIsAutoCheckEnabled(false);
      localStorage.setItem('uptime_auto_check_enabled', 'false');
      setNextCheckIn(300);
    } else {
      // Включаем автопроверку
      setIsAutoCheckEnabled(true);
      localStorage.setItem('uptime_auto_check_enabled', 'true');
      setNextCheckIn(300);
      startAutoCheck();
      // Запускаем первую проверку сразу
      handleStartCheck();
    }
  };

  const handleStartCheck = async () => {
    setIsChecking(true);
    setError('');
    setNextCheckIn(300); // Сбрасываем таймер
    
    try {
      // Вызываем uptime-checker для всех провайдеров
      const response = await fetch('https://functions.poehali.dev/cb148476-2d49-4e4f-8a7e-f1e399493259', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providers: [
            { id: 1, url: 'https://timeweb.cloud' },
            { id: 2, url: 'https://beget.com' },
            { id: 3, url: 'https://www.reg.ru' },
            { id: 5, url: 'https://ruvds.com' },
            { id: 7, url: 'https://sprinthost.ru' },
            { id: 8, url: 'https://fastvps.ru' },
            { id: 9, url: 'https://my.rusonyx.ru' },
            { id: 10, url: 'https://netangels.ru' },
            { id: 11, url: 'https://www.hostland.ru' },
            { id: 12, url: 'https://fornex.com' },
            { id: 13, url: 'https://smartape.ru' },
            { id: 14, url: 'https://mchost.ru' },
            { id: 15, url: 'https://justhost.ru' },
            { id: 16, url: 'https://u1host.com' },
            { id: 17, url: 'https://vdska.ru' },
            { id: 18, url: 'https://cloud4box.com' },
            { id: 19, url: 'https://eurobyte.ru' },
            { id: 20, url: 'https://www.ihc.ru' },
            { id: 21, url: 'http://handyhost.ru' },
            { id: 22, url: 'https://adminvps.ru' },
            { id: 23, url: 'https://adman.com' },
            { id: 24, url: 'https://selectel.ru' },
            { id: 25, url: 'https://cloud.yandex.ru' },
            { id: 26, url: 'https://serverspace.ru' },
            { id: 27, url: 'https://cloud.ru' },
            { id: 28, url: 'https://cloud.vk.com' },
            { id: 29, url: 'https://www.hostkey.com' },
            { id: 30, url: 'https://www.hetzner.com' },
            { id: 31, url: 'https://aeza.net' },
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      setLastCheckResult({
        total: data.total || 0,
        successful: data.successful || 0,
        failed: data.failed || 0,
        timestamp: new Date().toLocaleString('ru-RU'),
      });

      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      console.error('Error starting uptime check:', err);
      setError(err instanceof Error ? err.message : 'Ошибка при запуске проверки');
    } finally {
      setIsChecking(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="Activity" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Мониторинг Uptime</h2>
            <p className="text-sm text-muted-foreground">Управление проверкой доступности провайдеров</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Button
              onClick={handleStartCheck}
              disabled={isChecking}
              className="flex items-center gap-2"
            >
              {isChecking ? (
                <>
                  <Icon name="Loader2" size={18} className="animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="Play" size={18} />
                  Запустить проверку
                </>
              )}
            </Button>

            <Button
              onClick={handleToggleAutoCheck}
              disabled={isChecking}
              variant={isAutoCheckEnabled ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              {isAutoCheckEnabled ? (
                <>
                  <Icon name="PauseCircle" size={18} />
                  Остановить автопроверку
                </>
              ) : (
                <>
                  <Icon name="PlayCircle" size={18} />
                  Включить автопроверку
                </>
              )}
            </Button>
          </div>

          {isAutoCheckEnabled && (
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
              <Icon name="Clock" size={18} className="text-primary" />
              <div className="text-sm">
                <span className="text-muted-foreground">Следующая проверка через:</span>
                <span className="ml-2 font-bold text-foreground">
                  {formatTime(nextCheckIn)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Проверка доступности всех провайдеров (31 шт.)
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive mb-1">Ошибка</p>
                <p className="text-sm text-destructive/80">{error}</p>
              </div>
            </div>
          </div>
        )}

        {lastCheckResult && (
          <div className="bg-accent/50 border border-border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-2">Результаты проверки</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Всего проверено</p>
                    <p className="text-xl font-bold text-foreground">{lastCheckResult.total}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Успешно</p>
                    <p className="text-xl font-bold text-green-600">{lastCheckResult.successful}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Недоступно</p>
                    <p className="text-xl font-bold text-red-600">{lastCheckResult.failed}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Время проверки: {lastCheckResult.timestamp}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Как работает:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Проверка отправляет HTTP-запросы ко всем провайдерам</li>
                <li>Результаты сохраняются в базу данных</li>
                <li>Статистика обновляется на странице /uptime каждые 30 секунд</li>
                <li><strong>Автопроверка:</strong> при включении проверка запускается каждые 5 минут автоматически</li>
                <li>Состояние автопроверки сохраняется и восстанавливается при перезагрузке страницы</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
