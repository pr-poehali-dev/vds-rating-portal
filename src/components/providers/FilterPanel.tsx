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
  allOS
}: FilterPanelProps) => {
  const hasActiveFilters = filterFZ152 || filterTrialPeriod || filterLocation || 
                          filterVirtualization || filterMinDatacenters !== null || 
                          filterDiskType || filterPaymentMethod || filterOS;

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
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-xl font-bold text-foreground">Фильтры и сортировка</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            <Icon name="X" size={14} className="mr-1" />
            Сбросить всё
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Соответствие 152-ФЗ</label>
          <Button
            variant={filterFZ152 ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setFilterFZ152(!filterFZ152)}
          >
            <Icon name="ShieldCheck" size={16} className="mr-2" />
            {filterFZ152 ? 'Только с 152-ФЗ' : 'Все провайдеры'}
          </Button>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Тестовый период</label>
          <Button
            variant={filterTrialPeriod ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setFilterTrialPeriod(!filterTrialPeriod)}
          >
            <Icon name="Gift" size={16} className="mr-2" />
            {filterTrialPeriod ? 'С тестовым периодом' : 'Все провайдеры'}
          </Button>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Локация ЦОД</label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
            value={filterLocation || ''}
            onChange={(e) => setFilterLocation(e.target.value || null)}
          >
            <option value="">Все локации</option>
            {allLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Виртуализация</label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
            value={filterVirtualization || ''}
            onChange={(e) => setFilterVirtualization(e.target.value || null)}
          >
            <option value="">Все типы</option>
            {allVirtualizations.map(virt => (
              <option key={virt} value={virt}>{virt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Тип дисков</label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
            value={filterDiskType || ''}
            onChange={(e) => setFilterDiskType(e.target.value || null)}
          >
            <option value="">Все типы</option>
            {allDiskTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Способ оплаты</label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
            value={filterPaymentMethod || ''}
            onChange={(e) => setFilterPaymentMethod(e.target.value || null)}
          >
            <option value="">Все способы</option>
            {allPaymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Операционная система</label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
            value={filterOS || ''}
            onChange={(e) => setFilterOS(e.target.value || null)}
          >
            <option value="">Все ОС</option>
            {allOS.map(os => (
              <option key={os} value={os}>{os}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Мин. количество ЦОД</label>
          <select
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
            value={filterMinDatacenters || ''}
            onChange={(e) => setFilterMinDatacenters(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Не важно</option>
            <option value="3">3+ ЦОДа</option>
            <option value="5">5+ ЦОДов</option>
            <option value="10">10+ ЦОДов</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Сортировка</label>
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'rating' ? "default" : "outline"}
              className="flex-1 justify-start"
              onClick={() => setSortBy('rating')}
            >
              <Icon name="Star" size={16} className="mr-2" />
              По рейтингу
            </Button>
            <Button
              variant={sortBy === 'price' ? "default" : "outline"}
              className="flex-1 justify-start"
              onClick={() => setSortBy('price')}
            >
              <Icon name="DollarSign" size={16} className="mr-2" />
              По цене
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
