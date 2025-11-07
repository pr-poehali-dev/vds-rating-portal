import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ContactForm } from '@/components/contact/ContactForm';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                    <Icon name="Zap" className="text-background" size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">VDS Rating</h3>
                  <p className="text-xs text-muted-foreground font-medium">Топ хостингов</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Независимая платформа для сравнения VDS провайдеров. Помогаем найти идеальное решение для вашего проекта.
              </p>
              <div className="flex gap-3">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-xl hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
                  asChild
                >
                  <a href="https://t.me/top_vds_com" target="_blank" rel="noopener noreferrer">
                    <Icon name="MessageCircle" size={18} />
                  </a>
                </Button>
                <ContactForm />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Провайдеры</h4>
              <ul className="space-y-3">
                {['Рейтинг', 'Сравнение', 'Отзывы', 'Акции'].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Помощь</h4>
              <ul className="space-y-3">
                {['FAQ', 'Контакты', 'Блог', 'О нас'].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-medium">
              © 2025 VDS Rating. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground font-medium">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия</a>
              <a href="/admin" className="hover:text-primary transition-colors flex items-center gap-1">
                <Icon name="Shield" size={14} />
                Админ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};