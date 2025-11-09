import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/auth-oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider }),
      });

      const data = await response.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error('OAuth login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const providers = [
    {
      id: 'vk',
      name: 'ВКонтакте',
      icon: 'Circle',
      color: 'bg-[#0077FF] hover:bg-[#0066DD]',
    },
    {
      id: 'yandex',
      name: 'Яндекс',
      icon: 'Circle',
      color: 'bg-[#FC3F1D] hover:bg-[#E63619]',
    },
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-[#4285F4] hover:bg-[#3367D6]',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'bg-[#24292e] hover:bg-[#1a1e22]',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-[#0088cc] hover:bg-[#0077b5]',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-2 border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Вход на сайт
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <p className="text-center text-muted-foreground text-sm mb-6">
            Выберите удобный способ входа
          </p>

          {providers.map((provider) => (
            <Button
              key={provider.id}
              onClick={() => handleOAuthLogin(provider.id)}
              disabled={isLoading}
              className={`w-full h-12 ${provider.color} text-white font-semibold transition-all hover:scale-[1.02] disabled:opacity-50`}
            >
              <Icon name={provider.icon as any} size={20} className="mr-3" />
              Войти через {provider.name}
            </Button>
          ))}
        </div>

        <div className="text-center text-xs text-muted-foreground mt-4">
          Продолжая, вы соглашаетесь с{' '}
          <a href="/privacy" className="text-primary hover:underline">
            политикой конфиденциальности
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
