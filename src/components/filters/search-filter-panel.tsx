import { Card, VStack } from '@gluestack-ui/themed';

import { AppButton } from '../actions/app-button';
import { FormOptionGroup } from '../forms/form-option-group';
import { FormTextInput } from '../forms/form-text-input';
import { searchFilterPanelStyles as styles } from './search-filter-panel.styles';
import type { SearchFilterPanelProps } from './types/search-filter-panel.types';

export function SearchFilterPanel<TFilterValue extends string>({
  clearButtonLabel = 'Limpar filtros',
  defaultFilterValue,
  filterLabel,
  filterOptions,
  filterValue,
  onClear,
  onFilterChange,
  onSearchChange,
  searchLabel,
  searchPlaceholder,
  searchValue,
}: SearchFilterPanelProps<TFilterValue>) {
  const hasActiveFilters =
    searchValue.trim().length > 0 || filterValue !== defaultFilterValue;

  return (
    <Card style={styles.panel}>
      <VStack style={styles.content}>
        <FormTextInput
          label={searchLabel}
          onChangeText={onSearchChange}
          placeholder={searchPlaceholder}
          value={searchValue}
        />

        <FormOptionGroup
          label={filterLabel}
          onChange={onFilterChange}
          options={filterOptions}
          value={filterValue}
        />

        {hasActiveFilters ? (
          <VStack style={styles.actions}>
            <AppButton
              align="start"
              label={clearButtonLabel}
              onPress={onClear}
              size="compact"
              variant="soft"
            />
          </VStack>
        ) : null}
      </VStack>
    </Card>
  );
}
