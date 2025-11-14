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
  const [checkHistory, setCheckHistory] = useState<{
    total: number;
    successful: number;
    failed: number;
    timestamp: string;
  }[]>([]);
  const [error, setError] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Загружаем состояние автопроверки из localStorage
    const savedState = localStorage.getItem('uptime_auto_check_enabled');
    const savedNextCheckTime = localStorage.getItem('uptime_next_check_time');
    const savedLastResult = localStorage.getItem('uptime_last_check_result');
    const savedHistory = localStorage.getItem('uptime_check_history');
    
    // Восстанавливаем последний результат проверки
    if (savedLastResult) {
      try {
        setLastCheckResult(JSON.parse(savedLastResult));
      } catch (e) {
        console.error('Error parsing saved result:', e);
      }
    }
    
    // Восстанавливаем историю проверок
    if (savedHistory) {
      try {
        setCheckHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error parsing saved history:', e);
      }
    }
    
    if (savedState === 'true') {
      setIsAutoCheckEnabled(true);
      
      // Восстанавливаем таймер
      if (savedNextCheckTime) {
        const nextCheckTime = parseInt(savedNextCheckTime, 10);
        const now = Date.now();
        const remainingSeconds = Math.max(0, Math.floor((nextCheckTime - now) / 1000));
        
        if (remainingSeconds > 0) {
          setNextCheckIn(remainingSeconds);
          // Если время ещё не пришло, планируем следующую проверку
          const timeoutId = setTimeout(() => {
            handleStartCheck();
          }, remainingSeconds * 1000);
          
          // Сохраняем timeout ID для очистки
          intervalRef.current = timeoutId as any;
        } else {
          // Время уже прошло, запускаем проверку сразу
          handleStartCheck();
        }
      } else {
        // Нет сохранённого времени, запускаем первую проверку
        handleStartCheck();
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        clearTimeout(intervalRef.current as any);
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
        const savedNextCheckTime = localStorage.getItem('uptime_next_check_time');
        if (savedNextCheckTime) {
          const nextCheckTime = parseInt(savedNextCheckTime, 10);
          const now = Date.now();
          const remainingSeconds = Math.max(0, Math.floor((nextCheckTime - now) / 1000));
          setNextCheckIn(remainingSeconds);
          
          // Если время вышло, запускаем проверку
          if (remainingSeconds === 0) {
            handleStartCheck();
          }
        }
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

  const scheduleNextCheck = () => {
    // Планируем следующую проверку через 5 минут
    const nextCheckTime = Date.now() + (5 * 60 * 1000);
    localStorage.setItem('uptime_next_check_time', nextCheckTime.toString());
    setNextCheckIn(300);
    
    // Устанавливаем таймер на следующую проверку
    if (intervalRef.current) {
      clearTimeout(intervalRef.current as any);
    }
    
    intervalRef.current = setTimeout(() => {
      handleStartCheck();
    }, 5 * 60 * 1000) as any;
  };

  const handleToggleAutoCheck = () => {
    if (isAutoCheckEnabled) {
      // Выключаем автопроверку
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        clearTimeout(intervalRef.current as any);
        intervalRef.current = null;
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
      setIsAutoCheckEnabled(false);
      localStorage.setItem('uptime_auto_check_enabled', 'false');
      localStorage.removeItem('uptime_next_check_time');
      setNextCheckIn(300);
    } else {
      // Включаем автопроверку
      setIsAutoCheckEnabled(true);
      localStorage.setItem('uptime_auto_check_enabled', 'true');
      // Запускаем первую проверку сразу
      handleStartCheck();
    }
  };

  const handleStartCheck = async () => {
    setIsChecking(true);
    setError('');
    
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
      
      const result = {
        total: data.total || 0,
        successful: data.successful || 0,
        failed: data.failed || 0,
        timestamp: new Date().toLocaleString('ru-RU'),
      };
      
      setLastCheckResult(result);
      
      // Обновляем историю (максимум 5 записей)
      setCheckHistory(prev => {
        const newHistory = [result, ...prev].slice(0, 5);
        localStorage.setItem('uptime_check_history', JSON.stringify(newHistory));
        return newHistory;
      });
      
      // Сохраняем результат в localStorage
      localStorage.setItem('uptime_last_check_result', JSON.stringify(result));

      if (onStatusChange) {
        onStatusChange();
      }
      
      // Планируем следующую проверку если автопроверка включена
      if (isAutoCheckEnabled || localStorage.getItem('uptime_auto_check_enabled') === 'true') {
        scheduleNextCheck();
      }
    } catch (err) {
      console.error('Error starting uptime check:', err);
      setError(err instanceof Error ? err.message : 'Ошибка при запуске проверки');
      
      // Даже при ошибке планируем следующую проверку
      if (isAutoCheckEnabled || localStorage.getItem('uptime_auto_check_enabled') === 'true') {
        scheduleNextCheck();
      }
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
          <Button
            onClick={handleToggleAutoCheck}
            disabled={isChecking}
            variant={isAutoCheckEnabled ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            {isChecking ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin" />
                Проверка...
              </>
            ) : isAutoCheckEnabled ? (
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

        {!lastCheckResult && !isChecking && (
          <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="PlayCircle" size={32} className="text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground mb-2">Статистика пока отсутствует</p>
                <p className="text-sm text-muted-foreground">Включите автопроверку, чтобы начать мониторинг</p>
              </div>
            </div>
          </div>
        )}

        {lastCheckResult && (
          <div className="space-y-4">
            <div className="bg-accent/50 border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-2">Последняя проверка</p>
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

            {checkHistory.length > 1 && (
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="TrendingUp" size={18} className="text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">График доступности</h3>
                </div>
                
                {/* График */}
                <div className="mb-6">
                  <div className="h-48 flex items-end gap-2 px-2">
                    {[...checkHistory].reverse().map((check, index) => {
                      const successRate = (check.successful / check.total) * 100;
                      const height = (successRate / 100) * 100;
                      const barColor = successRate >= 95 ? 'bg-green-500' : successRate >= 85 ? 'bg-yellow-500' : 'bg-red-500';
                      
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full relative group">
                            <div 
                              className={`w-full ${barColor} rounded-t transition-all hover:opacity-80 cursor-pointer`}
                              style={{ height: `${height}%`, minHeight: '8px' }}
                            >
                            </div>
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              <div className="bg-foreground text-background text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                                <div className="font-bold">{successRate.toFixed(1)}%</div>
                                <div className="text-[10px] opacity-80">{check.successful}/{check.total}</div>
                                <div className="text-[10px] opacity-60">{check.timestamp.split(',')[1]}</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-[10px] text-muted-foreground text-center">
                            {index === 0 ? 'Старая' : index === checkHistory.length - 1 ? 'Новая' : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Шкала */}
                  <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* История в виде списка */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="History" size={16} className="text-muted-foreground" />
                    <h4 className="text-sm font-semibold text-foreground">История проверок</h4>
                  </div>
                  <div className="space-y-2">
                    {checkHistory.slice(1).map((check, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-xs text-muted-foreground">
                            {check.timestamp}
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-muted-foreground">Всего: <span className="font-bold text-foreground">{check.total}</span></span>
                            <span className="text-green-600">✓ {check.successful}</span>
                            <span className="text-red-600">✗ {check.failed}</span>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {((check.successful / check.total) * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
                <li><strong>Автопроверка:</strong> проверка запускается каждые 5 минут автоматически</li>
                <li>Таймер сохраняется — после перезагрузки страницы проверка продолжится по расписанию</li>
                <li>Автопроверка работает пока вкладка браузера открыта</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};