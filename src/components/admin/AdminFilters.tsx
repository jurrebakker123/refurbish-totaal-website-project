
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

export interface FilterState {
  search: string;
  status: string;
  dateFilter: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface AdminFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  showStatusFilter?: boolean;
}

const AdminFilters: React.FC<AdminFiltersProps> = ({ 
  filters, 
  onFiltersChange,
  showStatusFilter = true 
}) => {
  const updateFilter = (key: keyof FilterState, value: string | 'asc' | 'desc') => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      dateFilter: 'all',
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Zoek op naam, email of plaats..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {showStatusFilter && (
          <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="nieuw">Nieuw</SelectItem>
              <SelectItem value="in_behandeling">In behandeling</SelectItem>
              <SelectItem value="offerte_verzonden">Offerte verzonden</SelectItem>
              <SelectItem value="afgehandeld">Afgehandeld</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Select value={filters.dateFilter} onValueChange={(value) => updateFilter('dateFilter', value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle data</SelectItem>
            <SelectItem value="today">Vandaag</SelectItem>
            <SelectItem value="week">Deze week</SelectItem>
            <SelectItem value="month">Deze maand</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Sorteer op" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Datum</SelectItem>
            <SelectItem value="naam">Naam</SelectItem>
            <SelectItem value="totaal_prijs">Prijs</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
        </Button>

        <Button variant="outline" size="sm" onClick={clearFilters}>
          <Filter className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default AdminFilters;
