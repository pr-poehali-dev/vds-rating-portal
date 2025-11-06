import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent border border-primary/30 rounded-full px-5 py-2.5 mb-6">
              <Icon name="Mail" size={16} className="text-primary" />
              <span className="text-sm font-bold text-primary">Свяжитесь с нами</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="gradient-text">Есть вопросы?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы поможем выбрать идеальный хостинг для вашего проекта
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card border-2 border-border hover:border-primary/50 transition-all">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">
                    Ваше имя
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    required
                    className="h-12 bg-background border-2"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ivan@example.com"
                    required
                    className="h-12 bg-background border-2"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2">
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите о вашем проекте..."
                    required
                    rows={5}
                    className="bg-background border-2 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-bold bg-primary text-background shadow-lg shadow-primary/30 hover:shadow-neon transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Icon name="Check" size={18} className="mr-2" />
                      Отправлено!
                    </>
                  ) : (
                    <>
                      Отправить
                      <Icon name="Send" size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent border border-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all">
                    <Icon name="Mail" size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">support@vdsrating.ru</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent border border-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all">
                    <Icon name="Phone" size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (800) 555-35-35</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent border border-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all">
                    <Icon name="MessageCircle" size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telegram</h3>
                    <p className="text-muted-foreground">@vdsrating_support</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent border border-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all">
                    <Icon name="Clock" size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Время работы</h3>
                    <p className="text-muted-foreground">Круглосуточно, 24/7</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
