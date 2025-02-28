
import React from 'react';
import { ViewMode } from '@/types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <ToggleGroup type="single" value={view} onValueChange={(value) => value && onViewChange(value as ViewMode)}>
      <ToggleGroupItem value="card" aria-label="Card view" className="flex items-center gap-1">
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline-block">Cards</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table view" className="flex items-center gap-1">
        <List className="h-4 w-4" />
        <span className="hidden sm:inline-block">Table</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewToggle;
