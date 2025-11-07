import { FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AdminLoginProps {
  username: string;
  password: string;
  authError: string;
  isAuthenticating: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const AdminLogin = ({
  username,
  password,
  authError,
  isAuthenticating,
  onUsernameChange,
  onPasswordChange,
  onSubmit
}: AdminLoginProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Вход в админ-панель</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Имя пользователя
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                placeholder="Введите имя пользователя"
                required
                className="h-11"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Пароль
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Введите пароль"
                required
                className="h-11"
              />
              {authError && (
                <p className="text-sm text-destructive mt-2">{authError}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isAuthenticating}
              className="w-full h-11 font-bold bg-primary text-background disabled:opacity-50"
            >
              {isAuthenticating ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Войти
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="w-full h-11"
            >
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
