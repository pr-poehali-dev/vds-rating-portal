import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FilterPanelProps {
  filterFZ152: boolean;
  setFilterFZ152: (value: boolean) => void;
  filterTrialPeriod: boolean;
  setFilterTrialPeriod: (value: boolean) => void;
  filterLocation: string | null;
  setFilterLocation: (value: string | null) => void;
  filterVirtualization: string | null;
  setFilterVirtualization: (value: string | null) => void;
  filterMinDatacenters: number | null;
  setFilterMinDatacenters: (value: number | null) => void;
  filterDiskType: string | null;
  setFilterDiskType: (value: string | null) => void;
  filterPaymentMethod: string | null;
  setFilterPaymentMethod: (value: string | null) => void;
  filterOS: string | null;
  setFilterOS: (value: string | null) => void;
  sortBy: 'rating' | 'price';
  setSortBy: (value: 'rating' | 'price') => void;
  allLocations: string[];
  allVirtualizations: string[];
  allDiskTypes: string[];
  allPaymentMethods: string[];
  allOS: string[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredCount: number;
}

export const FilterPanel = ({
  filterFZ152,
  setFilterFZ152,
  filterTrialPeriod,
  setFilterTrialPeriod,
  filterLocation,
  setFilterLocation,
  filterVirtualization,
  setFilterVirtualization,
  filterMinDatacenters,
  setFilterMinDatacenters,
  filterDiskType,
  setFilterDiskType,
  filterPaymentMethod,
  setFilterPaymentMethod,
  filterOS,
  setFilterOS,
  sortBy,
  setSortBy,
  allLocations,
  allVirtualizations,
  allDiskTypes,
  allPaymentMethods,
  allOS,
  searchQuery,
  setSearchQuery,
  filteredCount
}: FilterPanelProps) => {
  const hasActiveFilters = filterFZ152 || filterTrialPeriod || filterLocation || 
                          filterVirtualization || filterMinDatacenters !== null || 
                          filterDiskType || filterPaymentMethod || filterOS || searchQuery;

  const clearFilters = () => {
    setFilterFZ152(false);
    setFilterTrialPeriod(false);
    setFilterLocation(null);
    setFilterVirtualization(null);
    setFilterMinDatacenters(null);
    setFilterDiskType(null);
    setFilterPaymentMethod(null);
    setFilterOS(null);
    setSortBy('rating');
    setSearchQuery('');
  };

  return (
    <div className="bg-gradient-to-br from-card via-card to-accent/30 border-2 border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="flex items-center justify-between mb-6 sm:mb-8 relative z-10 gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="Filter" size={16} className="text-background sm:w-5 sm:h-5" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground">Фильтры и сортировка</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-[10px] sm:text-xs font-bold hover:bg-destructive hover:text-white hover:border-destructive transition-all shadow-lg hover:shadow-xl h-8 sm:h-9 px-2 sm:px-3 flex-shrink-0"
          >
            <Icon name="X" size={12} className="sm:mr-1" />
            <span className="hidden sm:inline">Сбросить всё</span>
          </Button>
        )}
      </div>

      <div className="mb-5 sm:mb-6 relative z-10">
        <label className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3 flex items-center gap-2">
          <Icon name="Search" size={14} className="text-primary sm:w-4 sm:h-4" />
          Поиск по названию
        </label>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Найти провайдера..."
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base text-foreground placeholder:text-muted-foreground font-semibold hover:border-primary/50 hover:shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-accent rounded-lg transition-colors"
            >
              <Icon name="X" size={18} className="text-muted-foreground" />
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="mt-2 text-sm text-muted-foreground">
            Найдено: <span className="font-bold text-foreground">{filteredCount}</span> провайдер(ов)
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 relative z-10">
        <div className="group">
          <label className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <Icon name="ShieldCheck" size={14} className="text-primary sm:w-4 sm:h-4" />
            Соответствие 152-ФЗ
          </label>
          <Button
            variant={filterFZ152 ? "default" : "outline"}
            className={`w-full justify-start h-10 sm:h-11 md:h-12 rounded-xl font-semibold transition-all text-xs sm:text-sm ${
              filterFZ152 
                ? 'shadow-lg shadow-primary/30 scale-[1.02]' 
                : 'hover:scale-[1.02] hover:shadow-md hover:border-primary/50'
            }`}
            onClick={() => setFilterFZ152(!filterFZ152)}
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mr-1.5 sm:mr-2 flex-shrink-0 ${
              filterFZ152 ? 'bg-background/20' : 'bg-primary/10'
            }`}>
              <Icon name="ShieldCheck" size={16} className={filterFZ152 ? 'text-background' : 'text-primary'} />
            </div>
            <span className="truncate">{filterFZ152 ? 'Только с 152-ФЗ' : 'Все провайдеры'}</span>
          </Button>
        </div>

        <div className="group">
          <label className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <Icon name="Gift" size={14} className="text-primary sm:w-4 sm:h-4" />
            Тестовый период
          </label>
          <Button
            variant={filterTrialPeriod ? "default" : "outline"}
            className={`w-full justify-start h-10 sm:h-11 md:h-12 rounded-xl font-semibold transition-all text-xs sm:text-sm ${
              filterTrialPeriod 
                ? 'shadow-lg shadow-primary/30 scale-[1.02]' 
                : 'hover:scale-[1.02] hover:shadow-md hover:border-primary/50'
            }`}
            onClick={() => setFilterTrialPeriod(!filterTrialPeriod)}
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mr-1.5 sm:mr-2 flex-shrink-0 ${
              filterTrialPeriod ? 'bg-background/20' : 'bg-primary/10'
            }`}>
              <Icon name="Gift" size={16} className={filterTrialPeriod ? 'text-background' : 'text-primary'} />
            </div>
            <span className="truncate">{filterTrialPeriod ? 'С тестовым периодом' : 'Все провайдеры'}</span>
          </Button>
        </div>

        <div className="group">
          <label className="text-xs sm:text-sm font-bold text-foreground mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <Icon name="MapPin" size={14} className="text-primary sm:w-4 sm:h-4" />
            Локация ЦОД
          </label>
          <div className="relative">
            <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Globe" size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
            </div>
            <select
              className="w-full h-10 sm:h-11 md:h-12 pl-9 sm:pl-11 pr-3 sm:pr-4 rounded-xl border-2 border-input bg-background text-foreground text-xs sm:text-sm font-semibold appearance-none cursor-pointer hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              value={filterLocation || ''}
              onChange={(e) => setFilterLocation(e.target.value || null)}
            >
              <option value="">Все локации</option>
              {allLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Boxes" size={16} className="text-primary" />
            Виртуализация
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Box" size={18} className="text-primary" />
            </div>
            <select
              className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-input bg-background text-foreground text-sm font-semibold appearance-none cursor-pointer hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              value={filterVirtualization || ''}
              onChange={(e) => setFilterVirtualization(e.target.value || null)}
            >
              <option value="">Все типы</option>
              {allVirtualizations.map(virt => (
                <option key={virt} value={virt}>{virt}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Icon name="HardDrive" size={16} className="text-primary" />
            Тип дисков
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Database" size={18} className="text-primary" />
            </div>
            <select
              className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-input bg-background text-foreground text-sm font-semibold appearance-none cursor-pointer hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              value={filterDiskType || ''}
              onChange={(e) => setFilterDiskType(e.target.value || null)}
            >
              <option value="">Все типы</option>
              {allDiskTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Icon name="CreditCard" size={16} className="text-primary" />
            Способ оплаты
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Wallet" size={18} className="text-primary" />
            </div>
            <select
              className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-input bg-background text-foreground text-sm font-semibold appearance-none cursor-pointer hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              value={filterPaymentMethod || ''}
              onChange={(e) => setFilterPaymentMethod(e.target.value || null)}
            >
              <option value="">Все способы</option>
              {allPaymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Monitor" size={16} className="text-primary" />
            Операционная система
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Terminal" size={18} className="text-primary" />
            </div>
            <select
              className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-input bg-background text-foreground text-sm font-semibold appearance-none cursor-pointer hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              value={filterOS || ''}
              onChange={(e) => setFilterOS(e.target.value || null)}
            >
              <option value="">Все ОС</option>
              {allOS.map(os => (
                <option key={os} value={os}>{os}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Server" size={16} className="text-primary" />
            Мин. количество ЦОД
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Building2" size={18} className="text-primary" />
            </div>
            <select
              className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-input bg-background text-foreground text-sm font-semibold appearance-none cursor-pointer hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              value={filterMinDatacenters || ''}
              onChange={(e) => setFilterMinDatacenters(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">Не важно</option>
              <option value="3">3+ ЦОДа</option>
              <option value="5">5+ ЦОДов</option>
              <option value="10">10+ ЦОДов</option>
            </select>
            <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        <div className="group md:col-span-2">
          <label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Icon name="ArrowUpDown" size={16} className="text-primary" />
            Сортировка
          </label>
          <div className="flex gap-3">
            <Button
              variant={sortBy === 'rating' ? "default" : "outline"}
              className={`flex-1 justify-center h-12 rounded-xl font-bold transition-all ${
                sortBy === 'rating' 
                  ? 'shadow-lg shadow-primary/30 scale-[1.02]' 
                  : 'hover:scale-[1.02] hover:shadow-md hover:border-primary/50'
              }`}
              onClick={() => setSortBy('rating')}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${
                sortBy === 'rating' ? 'bg-background/20' : 'bg-primary/10'
              }`}>
                <Icon name="Star" size={18} className={sortBy === 'rating' ? 'text-background' : 'text-primary'} />
              </div>
              По рейтингу
            </Button>
            <Button
              variant={sortBy === 'price' ? "default" : "outline"}
              className={`flex-1 justify-center h-12 rounded-xl font-bold transition-all ${
                sortBy === 'price' 
                  ? 'shadow-lg shadow-primary/30 scale-[1.02]' 
                  : 'hover:scale-[1.02] hover:shadow-md hover:border-primary/50'
              }`}
              onClick={() => setSortBy('price')}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${
                sortBy === 'price' ? 'bg-background/20' : 'bg-primary/10'
              }`}>
                <Icon name="DollarSign" size={18} className={sortBy === 'price' ? 'text-background' : 'text-primary'} />
              </div>
              По цене
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};