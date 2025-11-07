import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ComparisonControlsProps {
  selectedForComparison: number[];
  compareProviders: () => void;
}

export const ComparisonControls = ({
  selectedForComparison,
  compareProviders
}: ComparisonControlsProps) => {
  if (selectedForComparison.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-card border-2 border-primary rounded-2xl shadow-2xl p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon name="GitCompare" size={20} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Выбрано: {selectedForComparison.length}
          </span>
        </div>
        <Button
          disabled={selectedForComparison.length < 2}
          onClick={compareProviders}
          className="bg-primary text-background hover:bg-primary/90"
        >
          Сравнить
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
