import { Text, VStack } from '@gluestack-ui/themed';

import { AppButton } from '../actions/app-button';
import { formOptionGroupStyles as styles } from './form-option-group.styles';

type FormOption<TValue extends string> = {
  label: string;
  value: TValue;
};

type FormOptionGroupProps<TValue extends string> = {
  errorMessage?: string;
  helperMessage?: string;
  label: string;
  onChange: (value: TValue) => void;
  options: readonly FormOption<TValue>[];
  value: TValue;
};

export function FormOptionGroup<TValue extends string>({
  errorMessage,
  helperMessage,
  label,
  onChange,
  options,
  value,
}: FormOptionGroupProps<TValue>) {
  const hasError = Boolean(errorMessage);

  return (
    <VStack style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <VStack style={styles.optionsRow}>
        {options.map((option) => (
          <AppButton
            align="start"
            key={option.value}
            label={option.label}
            onPress={() => onChange(option.value)}
            size="sm"
            variant={option.value === value ? 'primary' : 'secondary'}
          />
        ))}
      </VStack>

      {!hasError && helperMessage ? (
        <Text style={styles.helperText}>{helperMessage}</Text>
      ) : null}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </VStack>
  );
}
