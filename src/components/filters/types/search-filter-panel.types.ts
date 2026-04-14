export type FilterOption<TFilterValue extends string> = {
  label: string;
  value: TFilterValue;
};

export type SearchFilterPanelProps<TFilterValue extends string> = {
  clearButtonLabel?: string;
  defaultFilterValue: TFilterValue;
  filterLabel: string;
  filterOptions: readonly FilterOption<TFilterValue>[];
  filterValue: TFilterValue;
  onClear: () => void;
  onFilterChange: (value: TFilterValue) => void;
  onSearchChange: (value: string) => void;
  searchLabel: string;
  searchPlaceholder: string;
  searchValue: string;
};
