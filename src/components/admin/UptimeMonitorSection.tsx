import { useState, useEffect, useRef, useCallback } from 'react';
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
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleNextCheck = useCallback(() => {
    const nextCheckTime = Date.now() + (5 * 60 * 1000);
    localStorage.setItem('uptime_next_check_time', nextCheckTime.toString());
    setNextCheckIn(300);
  }, []);

  const performCheck = useCallback(async () => {
    setIsChecking(true);
    setError('');
    
    try {
      const response = await fetch('https://functions.poehali.dev/cb148476-2d49-4e4f-8a7e-f1e399493259', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providers: [
            { id: 1, url: 'https://cloud.vk.com' },
            { id: 2, url: 'https://mcs.mail.ru' },
            { id: 3, url: 'https://sbercloud.ru' },
            { id: 4, url: 'https://netangels.ru' },
            { id: 5, url: 'https://oblakoteka.ru' },
            { id: 6, url: 'https://vscale.io' },
            { id: 7, url: 'https://beget.com' },
            { id: 8, url: 'https://reg.ru' },
            { id: 9, url: 'https://1cloud.ru' },
            { id: 10, url: 'https://cloud4y.ru' },
            { id: 11, url: 'https://fastvps.ru' },
            { id: 12, url: 'https://gcorelabs.com' },
            { id: 13, url: 'https://deltahost.ua' },
            { id: 14, url: 'https://serverspace.ru' },
            { id: 15, url: 'https://adminvps.ru' },
            { id: 16, url: 'https://zomro.com' },
            { id: 17, url: 'https://justhost.ru' },
            { id: 18, url: 'https://sweb.ru' },
            { id: 19, url: 'https://ruvds.com' },
            { id: 20, url: 'https://fornex.com' },
            { id: 21, url: 'https://cloud.yandex.ru' },
            { id: 22, url: 'https://timeweb.cloud' },
            { id: 23, url: 'https://selectel.ru' },
            { id: 24, url: 'https://www.vdsina.ru' },
            { id: 25, url: 'https://www.ixbt.com/live/hosting/vps-hosting-nedorogo-nadezhno-kachestvenno.html' },
            { id: 26, url: 'https://3data.ru' },
            { id: 27, url: 'https://firstvds.ru' },
            { id: 28, url: 'https://xelent.ru' },
            { id: 29, url: 'https://www.hostkey.com' },
            { id: 30, url: 'https://www.hetzner.com' },
            { id: 31, url: 'https://aeza.net' },
            { id: 32, url: 'https://kamatera.com' },
            { id: 33, url: 'https://digitalocean.com' },
            { id: 34, url: 'https://vultr.com' },
            { id: 35, url: 'https://linode.com' },
            { id: 36, url: 'https://aws.amazon.com' },
            { id: 37, url: 'https://azure.microsoft.com' },
            { id: 38, url: 'https://cloud.google.com' },
            { id: 39, url: 'https://upcloud.com' },
            { id: 40, url: 'https://contabo.com' },
            { id: 41, url: 'https://ovhcloud.com' },
            { id: 42, url: 'https://scaleway.com' },
            { id: 43, url: 'https://ionos.com' },
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
        timestamp: new Date().toISOString(),
      };
      
      setLastCheckResult(result);
      localStorage.setItem('uptime_last_check_result', JSON.stringify(result));
      
      setCheckHistory(prev => {
        const newHistory = [result, ...prev].slice(0, 10);
        localStorage.setItem('uptime_check_history', JSON.stringify(newHistory));
        return newHistory;
      });
      
      if (localStorage.getItem('uptime_auto_check_enabled') === 'true') {
        scheduleNextCheck();
      }
      
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (err) {
      console.error('Uptime check error:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка при проверке');
    } finally {
      setIsChecking(false);
    }
  }, [onStatusChange, scheduleNextCheck]);

  useEffect(() => {
    const savedState = localStorage.getItem('uptime_auto_check_enabled');
    const savedLastResult = localStorage.getItem('uptime_last_check_result');
    const savedHistory = localStorage.getItem('uptime_check_history');
    
    if (savedLastResult) {
      try {
        setLastCheckResult(JSON.parse(savedLastResult));
      } catch (e) {
        console.error('Error parsing saved result:', e);
      }
    }
    
    if (savedHistory) {
      try {
        setCheckHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error parsing saved history:', e);
      }
    }
    
    if (savedState === 'true') {
      setIsAutoCheckEnabled(true);
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isAutoCheckEnabled) {
      const checkAndUpdate = () => {
        const savedNextCheckTime = localStorage.getItem('uptime_next_check_time');
        if (savedNextCheckTime) {
          const nextCheckTime = parseInt(savedNextCheckTime, 10);
          const now = Date.now();
          const remainingSeconds = Math.max(0, Math.floor((nextCheckTime - now) / 1000));
          setNextCheckIn(remainingSeconds);
          
          if (remainingSeconds === 0 && !isChecking) {
            localStorage.removeItem('uptime_next_check_time');
            performCheck();
          }
        }
      };
      
      checkAndUpdate();
      countdownRef.current = setInterval(checkAndUpdate, 1000);
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
  }, [isAutoCheckEnabled, isChecking, performCheck]);

  const handleToggleAutoCheck = () => {
    if (isAutoCheckEnabled) {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
      setIsAutoCheckEnabled(false);
      localStorage.setItem('uptime_auto_check_enabled', 'false');
      localStorage.removeItem('uptime_next_check_time');
      setNextCheckIn(300);
    } else {
      setIsAutoCheckEnabled(true);
      localStorage.setItem('uptime_auto_check_enabled', 'true');
      scheduleNextCheck();
    }
  };

  const handleStartCheck = () => {
    performCheck();
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
                Запустить автопроверку
              </>
            )}
          </Button>

          {!isAutoCheckEnabled && (
            <Button
              onClick={handleStartCheck}
              disabled={isChecking}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isChecking ? (
                <>
                  <Icon name="Loader2" size={18} className="animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="RefreshCw" size={18} />
                  Запустить проверку
                </>
              )}
            </Button>
          )}

          {isAutoCheckEnabled && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Clock" size={18} />
              <span className="text-sm font-medium">
                Следующая проверка через: {formatTime(nextCheckIn)}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-destructive">
              <Icon name="AlertCircle" size={18} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {lastCheckResult && (
          <div className="bg-muted/50 border border-border rounded-xl p-4">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Icon name="BarChart3" size={16} className="text-primary" />
              Последняя проверка
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-background rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Всего провайдеров</div>
                <div className="text-2xl font-bold text-foreground">{lastCheckResult.total}</div>
              </div>
              <div className="bg-background rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Доступны</div>
                <div className="text-2xl font-bold text-green-600">{lastCheckResult.successful}</div>
              </div>
              <div className="bg-background rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Недоступны</div>
                <div className="text-2xl font-bold text-destructive">{lastCheckResult.failed}</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Время проверки: {new Date(lastCheckResult.timestamp).toLocaleString('ru-RU')}
            </div>
          </div>
        )}

        {checkHistory.length > 0 && (
          <div className="bg-muted/50 border border-border rounded-xl p-4">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Icon name="History" size={16} className="text-primary" />
              История проверок
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {checkHistory.map((check, index) => (
                <div key={index} className="bg-background rounded-lg p-3 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {new Date(check.timestamp).toLocaleString('ru-RU')}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs">
                      <span className="text-green-600 font-medium">{check.successful}</span>
                      {' / '}
                      <span className="text-destructive font-medium">{check.failed}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};