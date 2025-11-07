import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/57569d96-5fa9-4681-99ff-ecf0bcac037f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Сообщение отправлено!',
          description: 'Мы свяжемся с вами в ближайшее время.',
        });
        setName('');
        setEmail('');
        setMessage('');
        setIsOpen(false);
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось отправить сообщение',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Проблема с подключением к серверу',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-xl hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
        >
          <Icon name="MessageCircle" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="Send" size={24} className="text-primary" />
            Обратная связь
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Ваше имя
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              required
              className="h-11"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="h-11"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Сообщение
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Напишите ваше сообщение..."
              required
              rows={5}
              className="resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 font-bold"
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" size={16} className="mr-2" />
                Отправить сообщение
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};